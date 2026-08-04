import { z } from "zod";

export const serviceOptions = [
  "seo",
  "aeo",
  "websites",
  "chatbots",
  "voice",
  "localization",
  "unsure",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(200),
  phone: z.string().trim().max(40).optional().default(""),
  company: z.string().trim().max(150).optional().default(""),
  companyUrl: z
    .union([z.url().max(300), z.literal("")])
    .optional()
    .default(""),
  companySize: z.string().trim().max(80).optional().default(""),
  service: z.enum(serviceOptions),
  challenge: z.string().trim().min(20).max(2_000),
  locale: z.enum(["sv", "en"]),
  privacyAccepted: z.literal(true),
  turnstileToken: z.string().max(2_048).optional().default(""),
  website: z.string().max(200).optional().default(""),
});

export type ContactPayload = z.infer<typeof contactSchema>;
