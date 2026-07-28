import type { Metadata } from "next";
import Link from "next/link";
import "@/app/globals.css";
import { BrandMark } from "@/components/BrandMark";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Sidan hittades inte | All-in-One Labs",
  description:
    "Sidan finns inte. Gå tillbaka till All-in-One Labs eller öppna den engelska webbplatsen.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function GlobalNotFound() {
  return (
    <html lang="sv" className={fontVariables}>
      <body>
        <main className="not-found-page">
          <Link className="brand-link" href="/" aria-label="All-in-One Labs">
            <BrandMark />
          </Link>
          <div className="not-found-page__content">
            <p className="eyebrow">404 · Sidan hittades inte</p>
            <h1>Fel väg. Tydlig väg tillbaka.</h1>
            <p>
              Adressen leder inte till en publicerad sida. Gå till startsidan
              eller fortsätt på engelska.
            </p>
            <div className="not-found-page__actions">
              <Link className="button button--dark" href="/">
                Till startsidan <span aria-hidden="true">→</span>
              </Link>
              <Link className="text-link" href="/en">
                Continue in English <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <p className="not-found-page__legal">
            ScaleCommerce Group AB · Sverige
          </p>
        </main>
      </body>
    </html>
  );
}
