import type { MetadataRoute } from "next";
import { allPublicRoutes } from "@/content/routes";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return allPublicRoutes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: now,
    changeFrequency:
      route === "/" || route === "/en/" ? "weekly" : "monthly",
    priority:
      route === "/" || route === "/en/"
        ? 1
        : route.includes("/tjanster/") || route.includes("/services/")
          ? 0.8
          : 0.6,
  }));
}
