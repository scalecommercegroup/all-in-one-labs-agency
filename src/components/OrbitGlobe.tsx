import { GlobeMark } from "@/components/BrandMark";
import type { Locale } from "@/content/site";

const labels = {
  sv: ["SEO", "AEO", "WEBB", "CHATT", "RÖST"],
  en: ["SEO", "AEO", "WEB", "CHAT", "VOICE"],
};

export function OrbitGlobe({ locale }: { locale: Locale }) {
  return (
    <div className="orbit-globe" aria-hidden="true">
      <div className="orbit-globe__line orbit-globe__line--one" />
      <div className="orbit-globe__line orbit-globe__line--two" />
      <div className="orbit-globe__sphere">
        <GlobeMark />
      </div>
      {labels[locale].map((label, index) => (
        <span
          className={`orbit-label orbit-label--${index + 1}`}
          key={label}
          style={{ "--orbit-index": index } as React.CSSProperties}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
