import type { Locale, Localized } from "@/content/site";

export interface EvidenceRecord {
  id: string;
  brand: string;
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
    services: record.services[locale],
    summary: record.summary[locale],
  }));
}
