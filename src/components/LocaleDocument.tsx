import Script from "next/script";
import { fontVariables } from "@/lib/fonts";
import type { Locale } from "@/content/site";

export function LocaleDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang={locale} className={fontVariables}>
      <body>
        {children}
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.tagged-events.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
