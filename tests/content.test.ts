import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { evidenceRecords } from "@/content/evidence";
import {
  allPublicRoutes,
  getAlternateRoute,
  routePairs,
} from "@/content/routes";
import { commonCopy, homeCopy, services, team } from "@/content/site";
import { contactSchema } from "@/lib/contact";

describe("bilingual route architecture", () => {
  it("publishes twelve pages per locale", () => {
    expect(routePairs).toHaveLength(12);
    expect(allPublicRoutes).toHaveLength(24);
    expect(new Set(allPublicRoutes).size).toBe(24);
  });

  it("pairs every Swedish route with an English route", () => {
    for (const pair of routePairs) {
      expect(pair.sv.startsWith("/")).toBe(true);
      expect(pair.en === "/en" || pair.en.startsWith("/en/")).toBe(true);
      expect(getAlternateRoute(pair.sv)).toBe(pair.en);
      expect(getAlternateRoute(pair.en)).toBe(pair.sv);
    }
  });

  it("uses canonical non-trailing-slash URLs", () => {
    for (const route of allPublicRoutes) {
      expect(route === "/" || !route.endsWith("/")).toBe(true);
    }
  });

  it("publishes stable sitemap modification dates", () => {
    const first = sitemap();
    const second = sitemap();
    expect(first).toEqual(second);
    expect(
      new Set(first.map((entry) => entry.lastModified?.toString())).size,
    ).toBe(1);
  });
});

describe("service content", () => {
  it("contains six complete offers in both languages", () => {
    expect(services).toHaveLength(6);

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

  it("keeps Swedish copy free from unfinished English conjunctions", () => {
    const swedishCopy = JSON.stringify({
      services: services.map((service) => service.copy.sv),
      home: homeCopy.sv,
      common: commonCopy.sv,
      team: team.map((person) => ({
        role: person.role.sv,
        focus: person.focus.sv,
      })),
    });

    expect(swedishCopy).not.toMatch(/—(?:not|and)\b/i);
    expect(swedishCopy).not.toContain("Account Manager");
  });

  it("uses unique service slugs per locale", () => {
    const swedish = services.map((service) => service.copy.sv.slug);
    const english = services.map((service) => service.copy.en.slug);
    expect(new Set(swedish).size).toBe(services.length);
    expect(new Set(english).size).toBe(services.length);
  });

  it("positions localisation as a bounded Q4 lever without pricing or guarantees", () => {
    const localisation = services.find(
      (service) => service.key === "localization",
    );

    expect(localisation).toBeDefined();
    expect(localisation?.copy.sv.slug).toBe("flersprakig-ehandel");
    expect(localisation?.copy.en.slug).toBe("multilingual-ecommerce");
    expect(localisation?.copy.sv.faqs.map((faq) => faq.answer).join(" ")).toContain(
      "en av de snabbaste Q4-vägarna",
    );

    const offer = JSON.stringify(localisation);
    expect(offer).not.toMatch(/\b(pris|price|pricing|SEK|EUR|USD)\b/i);
    expect(offer).toContain("Inga garantier om placeringar");
    expect(offer).toContain("No guarantees of rankings");
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
      expect(record.image).toMatch(/^\/cases\/.+\.webp$/);
      expect(record.imageAlt.sv.length).toBeGreaterThan(10);
      expect(record.imageAlt.en.length).toBeGreaterThan(10);
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
