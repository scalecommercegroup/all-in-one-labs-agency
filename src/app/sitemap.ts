import type { MetadataRoute } from "next";
import { allPublicRoutes } from "@/content/routes";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-28T00:00:00.000Z");

  return allPublicRoutes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified,
    changeFrequency:
      route === "/" || route === "/en" ? "weekly" : "monthly",
    priority:
      route === "/" || route === "/en"
        ? 1
        : route === "/tjanster" ||
            route.startsWith("/tjanster/") ||
            route === "/en/services" ||
            route.startsWith("/en/services/")
          ? 0.8
          : 0.6,
  }));
}
