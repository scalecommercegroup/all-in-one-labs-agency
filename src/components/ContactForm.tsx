"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useState, type FormEvent } from "react";
import { getRoute } from "@/content/routes";
import type { Locale } from "@/content/site";

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, string> },
    ) => void;
  }
}

const serviceLabels = {
  sv: {
    seo: "SEO",
    aeo: "AEO",
    websites: "Webbplats",
    chatbots: "AI-chattbot",
    voice: "AI-telefonist",
    unsure: "Osäker — hjälp mig prioritera",
  },
  en: {
    seo: "SEO",
    aeo: "AEO",
    websites: "Website",
    chatbots: "AI chatbot",
    voice: "AI voice agent",
    unsure: "Not sure — help me prioritise",
  },
};

export function ContactForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const isSv = locale === "sv";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      companyUrl: formData.get("companyUrl"),
      companySize: formData.get("companySize"),
      service: formData.get("service"),
      challenge: formData.get("challenge"),
      privacyAccepted: formData.get("privacyAccepted") === "on",
      website: formData.get("website"),
      locale,
      turnstileToken,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Submission failed");
      }

      setStatus("success");
      setMessage(
        isSv
          ? "Tack. Vi har fått din förfrågan och återkommer normalt inom en arbetsdag."
          : "Thank you. We have received your enquiry and normally respond within one business day.",
      );
      form.reset();
      setTurnstileToken("");
      window.plausible?.("Contact Form Success", {
        props: { locale, service: String(payload.service) },
      });
    } catch {
      setStatus("error");
      setMessage(
        isSv
          ? "Något gick fel. Försök igen eller mejla oss direkt på elliot@theaioecom.com."
          : "Something went wrong. Try again or email us directly at elliot@theaioecom.com.",
      );
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row form-row--two">
        <label>
          <span>{isSv ? "Namn" : "Name"} *</span>
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
          />
        </label>
        <label>
          <span>{isSv ? "E-post" : "Email"} *</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
          />
        </label>
      </div>

      <div className="form-row form-row--two">
        <label>
          <span>{isSv ? "Företag" : "Company"}</span>
          <input name="company" autoComplete="organization" maxLength={150} />
        </label>
        <label>
          <span>{isSv ? "Telefon" : "Phone"}</span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </label>
      </div>

      <div className="form-row form-row--two">
        <label>
          <span>{isSv ? "Webbplats" : "Website"}</span>
          <input
            name="companyUrl"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://"
            maxLength={300}
          />
        </label>
        <label>
          <span>{isSv ? "Företagsstorlek" : "Company size"}</span>
          <select name="companySize" defaultValue="">
            <option value="" disabled>
              {isSv ? "Välj intervall" : "Select range"}
            </option>
            <option value="1-9">1–9</option>
            <option value="10-49">10–49</option>
            <option value="50-99">50–99</option>
            <option value="100-249">100–249</option>
            <option value="250+">250+</option>
          </select>
        </label>
      </div>

      <label>
        <span>{isSv ? "Vad vill du förbättra?" : "What do you want to improve?"} *</span>
        <select name="service" defaultValue="unsure" required>
          {Object.entries(serviceLabels[locale]).map(([value, label]) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>{isSv ? "Beskriv nuläget och glappet" : "Describe the current situation and gap"} *</span>
        <textarea
          name="challenge"
          required
          minLength={20}
          maxLength={2_000}
          rows={6}
          placeholder={
            isSv
              ? "Vad fungerar inte, vad har ni testat och vad behöver förändras?"
              : "What is not working, what have you tried, and what needs to change?"
          }
        />
      </label>

      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {siteKey ? (
        <Turnstile
          siteKey={siteKey}
          onSuccess={setTurnstileToken}
          onExpire={() => setTurnstileToken("")}
          options={{ theme: "light", size: "flexible" }}
        />
      ) : null}

      <label className="form-consent">
        <input name="privacyAccepted" type="checkbox" required />
        <span>
          {isSv ? "Jag har läst " : "I have read the "}
          <a href={getRoute("privacy", locale)}>
            {isSv ? "integritetspolicyn" : "privacy policy"}
          </a>
          {isSv
            ? " och godkänner att uppgifterna används för att besvara min förfrågan."
            : " and understand that my information is used to respond to this enquiry."}
        </span>
      </label>

      <div className="form-submit">
        <button
          className="button button--dark"
          type="submit"
          disabled={status === "loading" || Boolean(siteKey && !turnstileToken)}
        >
          {status === "loading"
            ? isSv
              ? "Skickar…"
              : "Sending…"
            : isSv
              ? "Skicka förfrågan"
              : "Send enquiry"}
          <span aria-hidden="true">→</span>
        </button>
        <p>
          {isSv
            ? "Vi återkommer normalt inom en arbetsdag."
            : "We normally respond within one business day."}
        </p>
      </div>

      <div
        className={`form-status form-status--${status}`}
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {message}
      </div>
    </form>
  );
}
