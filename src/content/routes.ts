import { services, type Locale, type ServiceKey } from "@/content/site";

export type StaticPageKey =
  | "home"
  | "services"
  | "cases"
  | "about"
  | "contact"
  | "privacy";

export interface RoutePair {
  key: StaticPageKey | `service:${ServiceKey}`;
  sv: string;
  en: string;
}

export const routePairs: RoutePair[] = [
  { key: "home", sv: "/", en: "/en/" },
  { key: "services", sv: "/tjanster/", en: "/en/services/" },
  ...services.map((service) => ({
    key: `service:${service.key}` as const,
    sv: `/tjanster/${service.copy.sv.slug}/`,
    en: `/en/services/${service.copy.en.slug}/`,
  })),
  { key: "cases", sv: "/case/", en: "/en/case-studies/" },
  { key: "about", sv: "/om-oss/", en: "/en/about/" },
  { key: "contact", sv: "/kontakt/", en: "/en/contact/" },
  { key: "privacy", sv: "/integritet/", en: "/en/privacy/" },
];

export const allPublicRoutes = routePairs.flatMap((pair) => [pair.sv, pair.en]);

export function getRoute(
  key: RoutePair["key"],
  locale: Locale,
): string {
  const route = routePairs.find((pair) => pair.key === key);
  if (!route) {
    throw new Error(`Unknown route key: ${key}`);
  }
  return route[locale];
}

export function getAlternateRoute(pathname: string): string {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const pair = routePairs.find(
    (candidate) => candidate.sv === normalized || candidate.en === normalized,
  );
  if (!pair) {
    return normalized.startsWith("/en/") ? "/" : "/en/";
  }
  return pair.sv === normalized ? pair.en : pair.sv;
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "sv";
}
