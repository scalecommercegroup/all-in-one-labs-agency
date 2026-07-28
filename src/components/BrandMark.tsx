import type { SVGProps } from "react";

export function GlobeMark({
  className,
  title,
  ...props
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M20 40C29 23 44 14 64 13C55 19 47 29 41 39C34 51 27 59 18 64C16 56 16 48 20 40Z"
        fill="currentColor"
      />
      <path
        d="M31 69C41 60 48 48 55 37C62 26 69 20 76 19C82 24 86 30 89 38C79 37 71 43 64 54C57 65 48 74 37 81C33 78 30 74 27 70L31 69Z"
        fill="currentColor"
      />
      <path
        d="M49 84C59 75 67 64 73 54C79 45 85 43 91 45C92 55 89 65 84 73C75 80 64 85 52 86L49 84Z"
        fill="currentColor"
      />
      <ellipse
        cx="25"
        cy="28"
        rx="9"
        ry="4"
        transform="rotate(-28 25 28)"
        fill="currentColor"
      />
      <rect
        x="73"
        y="24"
        width="8"
        height="8"
        rx="1"
        transform="rotate(8 73 24)"
        fill="var(--surface, #f5f3ec)"
      />
      <rect
        x="82"
        y="37"
        width="7"
        height="7"
        rx="1"
        transform="rotate(15 82 37)"
        fill="var(--surface, #f5f3ec)"
      />
    </svg>
  );
}

export function BrandMark({
  compact = false,
  inverse = false,
}: {
  compact?: boolean;
  inverse?: boolean;
}) {
  return (
    <span
      className={`brand-mark${compact ? " brand-mark--compact" : ""}${inverse ? " brand-mark--inverse" : ""}`}
    >
      <GlobeMark className="brand-mark__globe" />
      {compact ? null : (
        <span className="brand-mark__type">
          <strong>All-in-One</strong>
          <span>Labs</span>
        </span>
      )}
    </span>
  );
}
