import { ImageResponse } from "next/og";
import { LogoTiles, logoColors } from "@/components/layout/logo";
import { siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools";

export const alt = `${siteConfig.name} – ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const [first, second] = siteConfig.wordmark;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fcfbf8",
          padding: 72,
          fontFamily: "sans-serif",
          borderTop: "12px solid #2f6bff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg viewBox="0 0 32 32" width="72" height="72">
            <rect width="32" height="32" rx="8" fill={logoColors.bg} />
            <LogoTiles />
          </svg>
          <span style={{ display: "flex", fontSize: 44, fontWeight: 700, color: "#0b1a33" }}>
            {first}
            <span style={{ color: "#1f4fd6" }}>{second}</span>
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 84, fontWeight: 700, color: "#0b1a33", lineHeight: 1.05 }}>Less hassle.</span>
          <span style={{ fontSize: 84, fontWeight: 700, color: "#1f4fd6", lineHeight: 1.05 }}>More done.</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {tools.map((t) => (
            <span
              key={t.slug}
              style={{
                fontSize: 24,
                color: "#33425e",
                background: "#ffffff",
                border: "2px solid #e7e3da",
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {t.name}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
