import type { Metadata } from "next";
import {
  getRoute,
  routePairs,
  type StaticPageKey,
} from "@/content/routes";
import {
  commonCopy,
  services,
  siteConfig,
  type Locale,
  type ServiceKey,
} from "@/content/site";

const staticMeta: Record<
  Exclude<StaticPageKey, "home">,
  Record<Locale, { title: string; description: string }>
> = {
  services: {
    sv: {
      title: "SEO, AEO, webbplatser och AI-agenter | All-in-One Labs",
      description:
        "Fem sammanhängande tjänster för svenska företag: SEO, AEO, webbutveckling, AI-chattbotar och AI-telefonister.",
    },
    en: {
      title: "SEO, AEO, websites, and AI agents | All-in-One Labs",
      description:
        "Five connected services for Swedish companies: SEO, AEO, website development, AI chatbots, and AI voice agents.",
    },
  },
  cases: {
    sv: {
      title: "Utvalda case och samarbeten | All-in-One Labs",
      description:
        "Spårbar erfarenhet från e-handel, webb, retention, kundanskaffning och digital tillväxt.",
    },
    en: {
      title: "Selected cases and engagements | All-in-One Labs",
      description:
        "Traceable experience across ecommerce, web, retention, acquisition, and digital growth.",
    },
  },
  about: {
    sv: {
      title: "Om All-in-One Labs | Operatörer och tekniskt genomförande",
      description:
        "Möt teamet bakom All-in-One Labs och principerna som styr våra webb-, sök- och AI-projekt.",
    },
    en: {
      title: "About All-in-One Labs | Operators and technical delivery",
      description:
        "Meet the team behind All-in-One Labs and the principles guiding our web, search, and AI work.",
    },
  },
  contact: {
    sv: {
      title: "Boka en kostnadsfri tillväxt- och AI-analys",
      description:
        "Berätta var synlighet, webb eller kundhantering tappar affärsvärde. Vi återkommer med ett tydligt nästa steg.",
    },
    en: {
      title: "Book a free growth and AI assessment",
      description:
        "Tell us where visibility, web, or customer handling is losing business value. We will return with a clear next step.",
    },
  },
  privacy: {
    sv: {
      title: "Integritetspolicy | All-in-One Labs",
      description:
        "Så hanterar All-in-One Labs kontaktuppgifter, webbstatistik och leverantörer.",
    },
    en: {
      title: "Privacy policy | All-in-One Labs",
      description:
        "How All-in-One Labs handles contact information, website analytics, and suppliers.",
    },
  },
};

const homeMeta = {
  sv: {
    title: "All-in-One Labs | SEO, AEO, webbplatser och AI-agenter",
    description:
      "Tillväxtsystem för svenska företag: SEO, AEO, webbplatser, AI-chattbotar och transparenta AI-telefonister.",
  },
  en: {
    title: "All-in-One Labs | SEO, AEO, websites, and AI agents",
    description:
      "Growth systems for Swedish companies: SEO, AEO, websites, AI chatbots, and transparent AI voice agents.",
  },
};

function getPair(key: StaticPageKey | `service:${ServiceKey}`) {
  const pair = routePairs.find((candidate) => candidate.key === key);
  if (!pair) {
    throw new Error(`Missing route pair for ${key}`);
  }
  return pair;
}

export function buildStaticMetadata(
  key: StaticPageKey,
  locale: Locale,
): Metadata {
  const copy = key === "home" ? homeMeta[locale] : staticMeta[key][locale];
  const pair = getPair(key);
  const path = getRoute(key, locale);

  return buildMetadata(copy, path, pair, locale);
}

export function buildServiceMetadata(
  serviceKey: ServiceKey,
  locale: Locale,
): Metadata {
  const service = services.find((candidate) => candidate.key === serviceKey);
  if (!service) {
    throw new Error(`Missing service metadata for ${serviceKey}`);
  }
  const copy = service.copy[locale];
  const pair = getPair(`service:${serviceKey}`);

  return buildMetadata(
    { title: copy.metaTitle, description: copy.metaDescription },
    pair[locale],
    pair,
    locale,
  );
}

function buildMetadata(
  copy: { title: string; description: string },
  path: string,
  pair: { sv: string; en: string },
  locale: Locale,
): Metadata {
  const absolute = (value: string) =>
    new URL(value, siteConfig.siteUrl).toString();

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absolute(path),
      languages: {
        "sv-SE": absolute(pair.sv),
        "en-US": absolute(pair.en),
        "x-default": absolute(pair.sv),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "sv" ? "sv_SE" : "en_US",
      alternateLocale: locale === "sv" ? ["en_US"] : ["sv_SE"],
      siteName: siteConfig.name,
      title: copy.title,
      description: copy.description,
      url: absolute(path),
      images: [
        {
          url: absolute("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${commonCopy[locale].servicesTitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [absolute("/opengraph-image")],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: "business",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
};
