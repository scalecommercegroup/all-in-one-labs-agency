import type { Locale, Localized } from "@/content/site";

export interface EvidenceRecord {
  id: string;
  brand: string;
  image: string;
  imageAlt: Localized<string>;
  services: Localized<string[]>;
  summary: Localized<string>;
  source: string;
  permissionStatus: "existing-public-brand-proof";
  verified: true;
  reviewedAt: string;
}

export const evidenceRecords: EvidenceRecord[] = [
  {
    id: "keauty",
    brand: "Keauty",
    image: "/cases/keauty.webp",
    imageAlt: {
      sv: "Porträttbild från Keautys varumärkesmaterial.",
      en: "Portrait from Keauty's brand material.",
    },
    services: {
      sv: ["Webb", "E-post", "Tillväxt"],
      en: ["Web", "Email", "Growth"],
    },
    summary: {
      sv: "E-handelsarbete inom upplevelse, retention och kommersiell utveckling.",
      en: "Ecommerce work across experience, retention, and commercial development.",
    },
    source: "https://all-in-one-ecom.com/pages/our-case",
    permissionStatus: "existing-public-brand-proof",
    verified: true,
    reviewedAt: "2026-07-28",
  },
  {
    id: "vanil-a-bean",
    brand: "Vanil A Bean",
    image: "/cases/vanil-a-bean.webp",
    imageAlt: {
      sv: "Vanil A Beans doftprodukter arrangerade på ett bord.",
      en: "Vanil A Bean fragrance products arranged on a table.",
    },
    services: {
      sv: ["Webb", "Retention"],
      en: ["Web", "Retention"],
    },
    summary: {
      sv: "Digital kundresa och retention för ett produktdrivet varumärke.",
      en: "Digital customer journey and retention for a product-led brand.",
    },
    source: "https://all-in-one-ecom.com/pages/our-case",
    permissionStatus: "existing-public-brand-proof",
    verified: true,
    reviewedAt: "2026-07-28",
  },
  {
    id: "telling-stories",
    brand: "Telling Stories",
    image: "/cases/telling-stories.webp",
    imageAlt: {
      sv: "Interiör från Telling Stories butik.",
      en: "Interior from the Telling Stories store.",
    },
    services: {
      sv: ["Performance", "Kundanskaffning"],
      en: ["Performance", "Acquisition"],
    },
    summary: {
      sv: "Tillväxtarbete med fokus på kundanskaffning och tydligare kommersiella flöden.",
      en: "Growth work focused on acquisition and clearer commercial flows.",
    },
    source: "https://all-in-one-ecom.com/pages/our-case",
    permissionStatus: "existing-public-brand-proof",
    verified: true,
    reviewedAt: "2026-07-28",
  },
  {
    id: "barkalot",
    brand: "Barkalot",
    image: "/cases/barkalot.webp",
    imageAlt: {
      sv: "Hund i Barkalots varumärkesmaterial.",
      en: "Dog featured in Barkalot's brand material.",
    },
    services: {
      sv: ["Shopify", "Webb"],
      en: ["Shopify", "Web"],
    },
    summary: {
      sv: "E-handelsutveckling med fokus på en tydligare och mer användbar köpresa.",
      en: "Ecommerce development focused on a clearer, more usable buying journey.",
    },
    source: "https://all-in-one-ecom.com/pages/our-case",
    permissionStatus: "existing-public-brand-proof",
    verified: true,
    reviewedAt: "2026-07-28",
  },
];

export function getEvidence(locale: Locale) {
  return evidenceRecords.map((record) => ({
    ...record,
    imageAlt: record.imageAlt[locale],
    services: record.services[locale],
    summary: record.summary[locale],
  }));
}
