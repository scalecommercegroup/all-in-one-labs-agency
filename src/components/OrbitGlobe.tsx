"use client";

import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/content/site";

type GlobeStatus = "loading" | "ready" | "fallback";

const accessibleLabel = {
  sv: "Roterande jordglob",
  en: "Rotating globe",
} satisfies Record<Locale, string>;

export function OrbitGlobe({ locale }: { locale: Locale }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<GlobeStatus>("loading");

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;

    if (!root || !canvas) {
      return;
    }

    let disposed = false;
    let frameId: number | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let renderer: import("three").WebGLRenderer | null = null;
    let geometries: import("three").BufferGeometry[] = [];
    let materials: import("three").Material[] = [];
    let textures: import("three").Texture[] = [];
    const cleanupCallbacks: Array<() => void> = [];

    async function initialiseGlobe(
      root: HTMLDivElement,
      canvas: HTMLCanvasElement,
    ) {
      try {
        const THREE = await import("three");

        if (disposed) {
          return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(90, 1, 0.1, 50);
        const origin = new THREE.Vector3(0, 0, 0);
        const textureLoader = new THREE.TextureLoader();
        const [earthTexture, satelliteCloudTexture, softCloudTexture] =
          await Promise.all([
            textureLoader.loadAsync("/globe/earth.jpg"),
            textureLoader.loadAsync("/globe/clouds-satellite.png"),
            textureLoader.loadAsync("/globe/clouds-soft.png"),
          ]);

        if (disposed) {
          earthTexture.dispose();
          satelliteCloudTexture.dispose();
          softCloudTexture.dispose();
          return;
        }

        textures = [earthTexture, satelliteCloudTexture, softCloudTexture];

        earthTexture.colorSpace = THREE.SRGBColorSpace;
        earthTexture.minFilter = THREE.LinearFilter;

        satelliteCloudTexture.colorSpace = THREE.SRGBColorSpace;
        satelliteCloudTexture.minFilter = THREE.LinearFilter;
        satelliteCloudTexture.repeat.set(4, 4);
        satelliteCloudTexture.wrapS = THREE.RepeatWrapping;
        satelliteCloudTexture.wrapT = THREE.RepeatWrapping;

        softCloudTexture.colorSpace = THREE.SRGBColorSpace;
        softCloudTexture.minFilter = THREE.LinearFilter;
        softCloudTexture.repeat.set(4, 3);
        softCloudTexture.wrapS = THREE.RepeatWrapping;
        softCloudTexture.wrapT = THREE.RepeatWrapping;

        const earthGeometry = new THREE.SphereGeometry(1.2, 128, 128);
        const satelliteCloudGeometry = new THREE.SphereGeometry(1.21, 128, 128);
        const softCloudGeometry = new THREE.SphereGeometry(1.23, 128, 128);
        geometries = [
          earthGeometry,
          satelliteCloudGeometry,
          softCloudGeometry,
        ];

        const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
        const satelliteCloudMaterial = new THREE.MeshBasicMaterial({
          map: satelliteCloudTexture,
          opacity: 0.7,
          transparent: true,
        });
        const softCloudMaterial = new THREE.MeshBasicMaterial({
          map: softCloudTexture,
          transparent: true,
        });
        materials = [
          earthMaterial,
          satelliteCloudMaterial,
          softCloudMaterial,
        ];

        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        const satelliteClouds = new THREE.Mesh(
          satelliteCloudGeometry,
          satelliteCloudMaterial,
        );
        const softClouds = new THREE.Mesh(
          softCloudGeometry,
          softCloudMaterial,
        );

        camera.position.z = 2;
        scene.add(earth, satelliteClouds, softClouds, camera);

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          canvas,
          powerPreference: "high-performance",
        });
        renderer.setClearAlpha(0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        let inViewport = true;
        let pageVisible = document.visibilityState === "visible";
        let previousTime = performance.now();
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );

        const renderFrame = () => {
          renderer?.render(scene, camera);
        };

        const stopAnimation = () => {
          if (frameId !== null) {
            window.cancelAnimationFrame(frameId);
            frameId = null;
          }
        };

        const animate = (time: number) => {
          const deltaSeconds = Math.min((time - previousTime) / 1000, 0.1);
          previousTime = time;

          earth.rotation.y += (Math.PI * 2 * deltaSeconds) / 75;
          satelliteClouds.rotation.y +=
            (Math.PI * 2 * deltaSeconds) / (75 / 1.3);
          softClouds.rotation.y +=
            (Math.PI * 2 * deltaSeconds) / (75 / 1.9);

          renderFrame();
          frameId = window.requestAnimationFrame(animate);
        };

        const updateAnimation = () => {
          const shouldAnimate =
            inViewport && pageVisible && !reducedMotion.matches;

          if (shouldAnimate && frameId === null) {
            previousTime = performance.now();
            frameId = window.requestAnimationFrame(animate);
          } else if (!shouldAnimate) {
            stopAnimation();
            renderFrame();
          }
        };

        const resize = () => {
          const { width, height } = root.getBoundingClientRect();

          if (width <= 0 || height <= 0) {
            return;
          }

          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer?.setSize(width, height, false);
          renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          renderFrame();
        };

        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(root);

        intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            inViewport = entry.isIntersecting;
            updateAnimation();
          },
          { rootMargin: "160px" },
        );
        intersectionObserver.observe(root);

        const handleVisibilityChange = () => {
          pageVisible = document.visibilityState === "visible";
          updateAnimation();
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        cleanupCallbacks.push(() =>
          document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange,
          ),
        );

        const handleMotionPreferenceChange = () => updateAnimation();
        reducedMotion.addEventListener("change", handleMotionPreferenceChange);
        cleanupCallbacks.push(() =>
          reducedMotion.removeEventListener(
            "change",
            handleMotionPreferenceChange,
          ),
        );

        let dragging = false;
        let activePointerId: number | null = null;
        let previousX = 0;

        const handlePointerDown = (event: PointerEvent) => {
          if (event.pointerType === "mouse" && event.button !== 0) {
            return;
          }

          dragging = true;
          activePointerId = event.pointerId;
          previousX = event.clientX;
          root.setPointerCapture(event.pointerId);
          root.classList.add("is-dragging");
        };

        const handlePointerMove = (event: PointerEvent) => {
          if (!dragging || event.pointerId !== activePointerId) {
            return;
          }

          const delta = (event.clientX - previousX) * 0.003;
          const { x, z } = camera.position;

          camera.position.x = x * Math.cos(delta) - z * Math.sin(delta);
          camera.position.z = z * Math.cos(delta) + x * Math.sin(delta);
          camera.lookAt(origin);
          previousX = event.clientX;
          renderFrame();
        };

        const endDrag = (event: PointerEvent) => {
          if (event.pointerId !== activePointerId) {
            return;
          }

          dragging = false;
          activePointerId = null;
          root.classList.remove("is-dragging");

          if (root.hasPointerCapture(event.pointerId)) {
            root.releasePointerCapture(event.pointerId);
          }
        };

        root.addEventListener("pointerdown", handlePointerDown);
        root.addEventListener("pointermove", handlePointerMove);
        root.addEventListener("pointerup", endDrag);
        root.addEventListener("pointercancel", endDrag);
        cleanupCallbacks.push(() => {
          root.removeEventListener("pointerdown", handlePointerDown);
          root.removeEventListener("pointermove", handlePointerMove);
          root.removeEventListener("pointerup", endDrag);
          root.removeEventListener("pointercancel", endDrag);
        });

        const handleContextLost = (event: Event) => {
          event.preventDefault();
          stopAnimation();
          setStatus("fallback");
        };
        canvas.addEventListener("webglcontextlost", handleContextLost);
        cleanupCallbacks.push(() =>
          canvas.removeEventListener("webglcontextlost", handleContextLost),
        );

        resize();
        renderFrame();
        updateAnimation();
        setStatus("ready");

        cleanupCallbacks.push(stopAnimation);
      } catch {
        if (!disposed) {
          setStatus("fallback");
        }
      }
    }

    void initialiseGlobe(root, canvas);

    return () => {
      disposed = true;
      cleanupCallbacks.forEach((cleanup) => cleanup());
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      aria-label={accessibleLabel[locale]}
      className={`orbit-globe orbit-globe--${status}`}
      data-globe-ready={status === "ready"}
      ref={rootRef}
      role="img"
    >
      <div className="orbit-globe__glow" aria-hidden="true" />
      <div className="orbit-globe__fallback" aria-hidden="true" />
      <canvas
        aria-hidden="true"
        className="orbit-globe__canvas"
        ref={canvasRef}
      />
    </div>
  );
}
