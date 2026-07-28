import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact";

const WINDOW_MS = 10 * 60 * 1_000;
const MAX_ATTEMPTS = 5;

interface RateEntry {
  count: number;
  resetAt: number;
}

const globalRateLimit = globalThis as typeof globalThis & {
  labsContactRateLimit?: Map<string, RateEntry>;
};

const rateLimit =
  globalRateLimit.labsContactRateLimit ?? new Map<string, RateEntry>();
globalRateLimit.labsContactRateLimit = rateLimit;

function isRateLimited(ip: string) {
  const now = Date.now();
  const existing = rateLimit.get(ip);

  if (!existing || existing.resetAt <= now) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  existing.count += 1;
  rateLimit.set(ip, existing);
  return existing.count > MAX_ATTEMPTS;
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: ip,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        message:
          "Too many submissions. Please wait before trying again.",
      },
      { status: 429 },
    );
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const requestedLocale =
    typeof input === "object" &&
    input !== null &&
    "locale" in input &&
    input.locale === "sv"
      ? "sv"
      : "en";

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message:
          requestedLocale === "sv"
            ? "Kontrollera att alla obligatoriska fält är korrekt ifyllda."
            : "Check that all required fields are completed correctly.",
      },
      { status: 400 },
    );
  }

  const submission = parsed.data;

  if (submission.website) {
    return NextResponse.json({ ok: true });
  }

  const turnstileOk = await verifyTurnstile(
    submission.turnstileToken,
    ip,
  );
  if (!turnstileOk) {
    return NextResponse.json(
      {
        message:
          submission.locale === "sv"
            ? "Spamkontrollen kunde inte verifieras. Ladda om sidan och försök igen."
            : "Spam protection could not be verified. Reload the page and try again.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "All-in-One Labs <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        message:
          submission.locale === "sv"
            ? "Formuläret är inte anslutet ännu. Mejla oss direkt."
            : "The form is not connected yet. Please email us directly.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const text = [
    "New All-in-One Labs enquiry",
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone || "Not provided"}`,
    `Company: ${submission.company || "Not provided"}`,
    `Company URL: ${submission.companyUrl || "Not provided"}`,
    `Company size: ${submission.companySize || "Not provided"}`,
    `Service: ${submission.service}`,
    `Locale: ${submission.locale}`,
    "",
    "Challenge:",
    submission.challenge,
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: submission.email,
    subject: `Labs enquiry · ${submission.service} · ${submission.company || submission.name}`,
    text,
  });

  if (error) {
    return NextResponse.json(
      {
        message:
          submission.locale === "sv"
            ? "Meddelandet kunde inte levereras. Mejla oss direkt."
            : "The message could not be delivered. Please email us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
