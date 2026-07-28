import { getRoute } from "@/content/routes";
import {
  services,
  siteConfig,
  type Locale,
  type ServiceKey,
} from "@/content/site";

export function organizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/icon.svg`,
    email: siteConfig.email,
    telephone: siteConfig.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kemistvägen 2A",
      postalCode: "183 79",
      addressLocality: "Täby",
      addressCountry: "SE",
    },
    areaServed: {
      "@type": "Country",
      name: locale === "sv" ? "Sverige" : "Sweden",
    },
    sameAs: [siteConfig.linkedIn, siteConfig.instagram],
  };
}

export function serviceSchema(serviceKey: ServiceKey, locale: Locale) {
  const service = services.find((candidate) => candidate.key === serviceKey);
  if (!service) {
    throw new Error(`Unknown service ${serviceKey}`);
  }
  const copy = service.copy[locale];
  const url = `${siteConfig.siteUrl}${getRoute(`service:${serviceKey}`, locale)}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.navLabel,
    description: copy.intro,
    serviceType: copy.navLabel,
    url,
    provider: {
      "@id": `${siteConfig.siteUrl}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: locale === "sv" ? "Sverige" : "Sweden",
    },
  };
}

export function breadcrumbSchema(
  locale: Locale,
  serviceKey?: ServiceKey,
) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: locale === "sv" ? "Start" : "Home",
      item: `${siteConfig.siteUrl}${getRoute("home", locale)}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: locale === "sv" ? "Tjänster" : "Services",
      item: `${siteConfig.siteUrl}${getRoute("services", locale)}`,
    },
  ];

  if (serviceKey) {
    const service = services.find((candidate) => candidate.key === serviceKey);
    if (service) {
      items.push({
        "@type": "ListItem",
        position: 3,
        name: service.copy[locale].navLabel,
        item: `${siteConfig.siteUrl}${getRoute(`service:${serviceKey}`, locale)}`,
      });
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

export function faqSchema(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
