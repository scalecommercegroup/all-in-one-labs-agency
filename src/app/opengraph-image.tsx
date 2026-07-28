import { ImageResponse } from "next/og";

export const alt =
  "All-in-One Labs — visibility, websites, and AI agents for Swedish companies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f1e9",
          color: "#101223",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          <span>ALL-IN-ONE LABS</span>
          <span
            style={{
              width: 54,
              height: 54,
              border: "3px solid #101223",
              borderRadius: "50%",
            }}
          />
        </div>
        <div
          style={{
            maxWidth: 1020,
            fontSize: 92,
            lineHeight: 0.94,
            letterSpacing: "-0.06em",
            fontWeight: 800,
            textTransform: "uppercase",
          }}
        >
          Visibility. Systems. Growth.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #101223",
            paddingTop: "24px",
            fontSize: 24,
          }}
        >
          <span>SEO · AEO · WEB · CHAT · VOICE</span>
          <span>SWEDEN</span>
        </div>
      </div>
    ),
    size,
  );
}
