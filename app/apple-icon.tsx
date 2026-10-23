import { ImageResponse } from "next/og";
import { LogoTiles, logoColors } from "@/components/layout/logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  // iOS rounds the corners itself, so the background fills the whole square.
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: logoColors.bg }}>
        <svg viewBox="0 0 32 32" width="180" height="180">
          <LogoTiles />
        </svg>
      </div>
    ),
    size,
  );
}
