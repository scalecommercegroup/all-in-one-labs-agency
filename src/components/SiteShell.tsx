"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
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

function isCurrentNavItem(pathname: string, href: string, locale: Locale) {
  const normalizedPath =
    pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
  const normalizedHref = href === "/" ? href : href.replace(/\/+$/, "");
  const servicesHref = getRoute("services", locale);

  if (normalizedHref === servicesHref) {
    return (
      normalizedPath === servicesHref ||
      normalizedPath.startsWith(`${servicesHref}/`)
    );
  }

  return normalizedPath === normalizedHref;
}

export function SiteHeader() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const copy = commonCopy[locale];
  const items = navItems(locale);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    if (detailsRef.current) detailsRef.current.open = false;
  }

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;

    const isolationTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main, .site-footer, .brand-link, .desktop-nav, .language-link, .button--header",
      ),
    );

    const syncOpenState = () => {
      document.documentElement.classList.toggle("menu-open", details.open);
      for (const target of isolationTargets) {
        if (details.open) target.setAttribute("inert", "");
        else target.removeAttribute("inert");
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!details.open) return;

      if (event.key === "Escape") {
        event.preventDefault();
        details.open = false;
        details.querySelector<HTMLElement>("summary")?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        details.querySelectorAll<HTMLElement>(
          "summary, .mobile-menu__panel a[href]",
        ),
      ).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    details.addEventListener("toggle", syncOpenState);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      details.removeEventListener("toggle", syncOpenState);
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.classList.remove("menu-open");
      for (const target of isolationTargets) target.removeAttribute("inert");
    };
  }, []);

  return (
    <header className="site-header">
      <a
        className="brand-link"
        href={getRoute("home", locale)}
        aria-label={siteConfig.name}
      >
        <BrandMark />
      </a>

      <nav className="desktop-nav" aria-label={locale === "sv" ? "Huvudmeny" : "Main navigation"}>
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-current={
              isCurrentNavItem(pathname, item.href, locale) ? "page" : undefined
            }
          >
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
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={
                    isCurrentNavItem(pathname, item.href, locale)
                      ? "page"
                      : undefined
                  }
                >
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

function FooterDisclosure({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 39.999rem)");
    const syncViewport = () => {
      if (detailsRef.current) detailsRef.current.open = !mobileViewport.matches;
    };

    syncViewport();
    mobileViewport.addEventListener("change", syncViewport);
    return () => mobileViewport.removeEventListener("change", syncViewport);
  }, []);

  return (
    <details
      className="footer-group footer-group--collapsible"
      ref={detailsRef}
    >
      <summary className="footer-label">
        {label}
        <span aria-hidden="true">+</span>
      </summary>
      <div className="footer-group__links">{children}</div>
    </details>
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
        <div className="footer-group">
          <p className="footer-label">
            {locale === "sv" ? "Affärskontakt" : "Business contact"}
          </p>
          <a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phoneDisplay}</a>
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noreferrer"
            data-track="booking-footer"
          >
            {locale === "sv" ? "Boka ett möte" : "Book a meeting"} ↗
          </a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
        <FooterDisclosure label={locale === "sv" ? "Företag" : "Company"}>
          {items.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href={getRoute("privacy", locale)}>
            {locale === "sv" ? "Integritet" : "Privacy"}
          </a>
        </FooterDisclosure>
        <FooterDisclosure label={locale === "sv" ? "Tjänster" : "Services"}>
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
        </FooterDisclosure>
        <div className="footer-group footer-group--legal">
          <p className="footer-label">ScaleCommerce Group AB</p>
          <p>{siteConfig.organizationNumber}</p>
          <p>{locale === "sv" ? siteConfig.addressSv : siteConfig.address}</p>
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
