import type { ReactNode } from "react";
import type { ToolSlug } from "@/lib/tools";

/**
 * Small app-style logo for each tool: a rounded tile with a simple drawn glyph.
 * Drawn in a 32×32 box, so it stays sharp from 16px up to large sizes.
 * Colors come from the brand palette (navy, electric blue, lavender).
 */

const W = "#ffffff";
const NAVY = "#0b1a33";
const BLUE = "#2f6bff";
const BLUE_DARK = "#1f4fd6";
const BLUE_TINT = "#dce6ff";
const LILAC = "#c3b6f7";
const LILAC_DARK = "#5b45c8";
const LILAC_TINT = "#e7e1fd";

const round = { strokeLinecap: "round", strokeLinejoin: "round", fill: "none" } as const;

const logos: Record<ToolSlug, { bg: string; glyph: ReactNode }> = {
  // Lines of text, with a lavender "count" dot at the end of the last line.
  "word-counter": {
    bg: BLUE_DARK,
    glyph: (
      <>
        <path d="M8 10.5h16M8 16h16M8 21.5h8.5" stroke={W} strokeWidth="2.6" {...round} />
        <circle cx="22.5" cy="21.5" r="2.6" fill={LILAC} />
      </>
    ),
  },
  // A photo inside corner brackets: an image being made to fit.
  "image-compressor": {
    bg: LILAC_DARK,
    glyph: (
      <>
        <path d="M6.5 11.5v-5h5M25.5 11.5v-5h-5M6.5 20.5v5h5M25.5 20.5v5h-5" stroke={W} strokeWidth="2.2" {...round} />
        <rect x="10.5" y="10.5" width="11" height="11" rx="2" fill={LILAC} />
        <path d="M10.5 19.5l3.5-3.5 3 3 2-2 2.5 2.5v.5a1.5 1.5 0 0 1-1.5 1.5h-8a1.5 1.5 0 0 1-1.5-1.5z" fill={W} />
        <circle cx="18.6" cy="13.6" r="1.3" fill={W} />
      </>
    ),
  },
  // Three finder squares and a few data modules.
  "qr-code-generator": {
    bg: NAVY,
    glyph: (
      <>
        <rect x="7" y="7" width="7" height="7" rx="1.6" stroke={W} strokeWidth="2" fill="none" />
        <rect x="18" y="7" width="7" height="7" rx="1.6" stroke={W} strokeWidth="2" fill="none" />
        <rect x="7" y="18" width="7" height="7" rx="1.6" stroke={W} strokeWidth="2" fill="none" />
        <rect x="9.6" y="9.6" width="1.8" height="1.8" fill={BLUE} />
        <rect x="20.6" y="9.6" width="1.8" height="1.8" fill={BLUE} />
        <rect x="9.6" y="20.6" width="1.8" height="1.8" fill={BLUE} />
        <rect x="18" y="18" width="2.6" height="2.6" rx=".6" fill={W} />
        <rect x="22.4" y="18" width="2.6" height="2.6" rx=".6" fill={LILAC} />
        <rect x="20.2" y="22.4" width="2.6" height="2.6" rx=".6" fill={W} />
      </>
    ),
  },
  // A lock shackle over a masked password field.
  "password-generator": {
    bg: BLUE,
    glyph: (
      <>
        <path d="M11.5 13v-2.5a4.5 4.5 0 0 1 9 0V13" stroke={W} strokeWidth="2.4" {...round} />
        <rect x="5.5" y="13" width="21" height="11" rx="3.5" fill={W} />
        <circle cx="11" cy="18.5" r="1.7" fill={BLUE_DARK} />
        <circle cx="16" cy="18.5" r="1.7" fill={BLUE_DARK} />
        <circle cx="21" cy="18.5" r="1.7" fill={BLUE_DARK} />
      </>
    ),
  },
  // "Aa": a capital and a lowercase letter.
  "case-converter": {
    bg: LILAC_TINT,
    glyph: (
      <>
        <path d="M6.5 23.5 11.5 8.5l5 15M8.4 18.5h6.2" stroke={LILAC_DARK} strokeWidth="2.4" {...round} />
        <circle cx="22" cy="19.5" r="3.6" stroke={LILAC_DARK} strokeWidth="2.4" fill="none" />
        <path d="M25.6 15.8v7.7" stroke={LILAC_DARK} strokeWidth="2.4" {...round} />
      </>
    ),
  },
  // A percent sign.
  "percentage-calculator": {
    bg: BLUE_TINT,
    glyph: (
      <>
        <path d="M22.5 8.5 9.5 23.5" stroke={BLUE_DARK} strokeWidth="2.6" {...round} />
        <circle cx="10.5" cy="10.5" r="3" stroke={BLUE_DARK} strokeWidth="2.4" fill="none" />
        <circle cx="21.5" cy="21.5" r="3" fill={BLUE} />
      </>
    ),
  },
};

export function ToolLogo({ slug, className = "size-10" }: { slug: ToolSlug; className?: string }) {
  const { bg, glyph } = logos[slug];
  return (
    <svg viewBox="0 0 32 32" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" fill={bg} />
      {glyph}
    </svg>
  );
}
