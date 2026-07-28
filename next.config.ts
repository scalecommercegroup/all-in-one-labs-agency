import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    globalNotFound: true,
    optimizePackageImports: ["@marsidev/react-turnstile"],
  },
};

export default nextConfig;
