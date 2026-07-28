import { describe, expect, it } from "vitest";
import { evidenceRecords } from "@/content/evidence";
import {
  allPublicRoutes,
  getAlternateRoute,
  routePairs,
} from "@/content/routes";
import { services } from "@/content/site";
import { contactSchema } from "@/lib/contact";

describe("bilingual route architecture", () => {
  it("publishes eleven pages per locale", () => {
    expect(routePairs).toHaveLength(11);
    expect(allPublicRoutes).toHaveLength(22);
    expect(new Set(allPublicRoutes).size).toBe(22);
  });

  it("pairs every Swedish route with an English route", () => {
    for (const pair of routePairs) {
      expect(pair.sv.startsWith("/")).toBe(true);
      expect(pair.en.startsWith("/en/")).toBe(true);
      expect(getAlternateRoute(pair.sv)).toBe(pair.en);
      expect(getAlternateRoute(pair.en)).toBe(pair.sv);
    }
  });
});

describe("service content", () => {
  it("contains five complete offers in both languages", () => {
    expect(services).toHaveLength(5);

    for (const service of services) {
      for (const locale of ["sv", "en"] as const) {
        const copy = service.copy[locale];
        expect(copy.title.length).toBeGreaterThan(20);
        expect(copy.deliverables.length).toBeGreaterThanOrEqual(5);
        expect(copy.process).toHaveLength(4);
        expect(copy.boundaries.length).toBeGreaterThanOrEqual(3);
        expect(copy.measures.length).toBeGreaterThanOrEqual(4);
        expect(copy.faqs.length).toBeGreaterThanOrEqual(4);
        expect(copy.metaTitle.length).toBeGreaterThan(20);
        expect(copy.metaDescription.length).toBeGreaterThan(50);
      }
    }
  });

  it("uses unique service slugs per locale", () => {
    const swedish = services.map((service) => service.copy.sv.slug);
    const english = services.map((service) => service.copy.en.slug);
    expect(new Set(swedish).size).toBe(services.length);
    expect(new Set(english).size).toBe(services.length);
  });
});

describe("evidence controls", () => {
  it("publishes only reviewed and verified evidence", () => {
    expect(evidenceRecords.length).toBeGreaterThan(0);
    for (const record of evidenceRecords) {
      expect(record.verified).toBe(true);
      expect(record.permissionStatus).toBe("existing-public-brand-proof");
      expect(record.source).toMatch(/^https:\/\//);
      expect(record.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("contact validation", () => {
  const validPayload = {
    name: "Ada Lovelace",
    email: "ada@example.com",
    phone: "",
    company: "Analytical Engines AB",
    companyUrl: "https://example.com",
    companySize: "10-49",
    service: "aeo",
    challenge:
      "We need a clearer organic acquisition strategy for our Swedish market.",
    locale: "en",
    privacyAccepted: true,
    turnstileToken: "",
    website: "",
  };

  it("accepts a complete enquiry", () => {
    expect(contactSchema.safeParse(validPayload).success).toBe(true);
  });

  it("rejects a short challenge and missing acknowledgement", () => {
    const invalid = {
      ...validPayload,
      challenge: "Help",
      privacyAccepted: false,
    };
    expect(contactSchema.safeParse(invalid).success).toBe(false);
  });

  it("accepts a filled honeypot so the endpoint can fail silently", () => {
    expect(
      contactSchema.safeParse({ ...validPayload, website: "bot-value" }).success,
    ).toBe(true);
  });
});
