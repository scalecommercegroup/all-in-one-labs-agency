"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { BrandMark } from "@/components/BrandMark";
import {
  getAlternateRoute,
  getLocaleFromPath,
  getRoute,
} from "@/content/routes";
import { commonCopy, siteConfig, type Locale } from "@/content/site";

function navItems(locale: Locale) {
  const copy = commonCopy[locale];
  return [
    { label: copy.navServices, href: getRoute("services", locale) },
    { label: copy.navCases, href: getRoute("cases", locale) },
    { label: copy.navAbout, href: getRoute("about", locale) },
    { label: copy.navContact, href: getRoute("contact", locale) },
  ];
}

export function SiteHeader() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const copy = commonCopy[locale];
  const items = navItems(locale);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    detailsRef.current?.removeAttribute("open");
  }

  return (
    <header className="site-header">
      <a
        className="brand-link"
        href={getRoute("home", locale)}
        aria-label={`${siteConfig.name} — ${locale === "sv" ? "startsida" : "home"}`}
      >
        <BrandMark />
      </a>

      <nav className="desktop-nav" aria-label={locale === "sv" ? "Huvudmeny" : "Main navigation"}>
        {items.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a className="language-link" href={getAlternateRoute(pathname)}>
          {copy.language}
        </a>
        <a
          className="button button--dark button--header"
          href={siteConfig.bookingUrl}
          target="_blank"
          rel="noreferrer"
          data-track="booking-header"
        >
          {copy.booking}
          <span aria-hidden="true">↗</span>
        </a>

        <details className="mobile-menu" ref={detailsRef}>
          <summary>
            <span>{copy.menu}</span>
            <span className="mobile-menu__disc" aria-hidden="true">
              <i />
            </span>
          </summary>
          <div className="mobile-menu__panel">
            <nav aria-label={locale === "sv" ? "Mobilmeny" : "Mobile navigation"}>
              {items.map((item, index) => (
                <a key={item.href} href={item.href} onClick={closeMenu}>
                  <span>0{index + 1}</span>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mobile-menu__footer">
              <a href={getAlternateRoute(pathname)}>{copy.language}</a>
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noreferrer"
              >
                {copy.booking} ↗
              </a>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const items = navItems(locale);

  return (
    <footer className="site-footer">
      <div className="site-footer__lead">
        <BrandMark inverse />
        <p>
          {locale === "sv"
            ? "Synlighet, webbplatser och AI-agenter för svenska tillväxtföretag."
            : "Visibility, websites, and AI agents for Swedish growth companies."}
        </p>
      </div>
      <div className="site-footer__grid">
        <div>
          <p className="footer-label">{locale === "sv" ? "Kontakt" : "Contact"}</p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phoneDisplay}</a>
        </div>
        <div>
          <p className="footer-label">{locale === "sv" ? "Företag" : "Company"}</p>
          {items.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href={getRoute("privacy", locale)}>
            {locale === "sv" ? "Integritet" : "Privacy"}
          </a>
        </div>
        <div>
          <p className="footer-label">{locale === "sv" ? "Tjänster" : "Services"}</p>
          <a href={getRoute("service:seo", locale)}>SEO</a>
          <a href={getRoute("service:aeo", locale)}>AEO</a>
          <a href={getRoute("service:websites", locale)}>
            {locale === "sv" ? "Webbplatser" : "Websites"}
          </a>
          <a href={getRoute("service:chatbots", locale)}>
            {locale === "sv" ? "AI-chattbotar" : "AI chatbots"}
          </a>
          <a href={getRoute("service:voice", locale)}>
            {locale === "sv" ? "AI-telefonister" : "AI voice agents"}
          </a>
        </div>
        <div>
          <p className="footer-label">ScaleCommerce Group AB</p>
          <p>{siteConfig.organizationNumber}</p>
          <p>{siteConfig.address}</p>
          <div className="footer-socials">
            <a href={siteConfig.linkedIn} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <span>{locale === "sv" ? "Byggt i Sverige." : "Built in Sweden."}</span>
      </div>
    </footer>
  );
}

export function PageShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        {locale === "sv" ? "Hoppa till innehållet" : "Skip to content"}
      </a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter locale={locale} />
    </>
  );
}
