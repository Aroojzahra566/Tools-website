import Link from "next/link";
import { siteConfig } from "@/lib/site";

/**
 * Brand mark: a 2×2 grid of tool tiles, with the accent tile nudged forward
 * to suggest a shortcut. Colors are fixed so the mark looks the same everywhere,
 * including app/icon.svg, app/apple-icon.tsx and app/opengraph-image.tsx.
 */
export const logoColors = { bg: "#0b1a33", tile: "#ffffff", lilac: "#c3b6f7", accent: "#2f6bff" };

export function LogoTiles() {
  return (
    <>
      <rect x="6.5" y="6.5" width="8.5" height="8.5" rx="2.25" fill={logoColors.tile} />
      <rect x="17" y="6.5" width="8.5" height="8.5" rx="2.25" fill={logoColors.lilac} />
      <rect x="6.5" y="17" width="8.5" height="8.5" rx="2.25" fill={logoColors.tile} />
      <rect x="18.5" y="18.5" width="8.5" height="8.5" rx="2.25" fill={logoColors.accent} />
    </>
  );
}

export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill={logoColors.bg} />
      <LogoTiles />
    </svg>
  );
}

export function Wordmark({ className = "text-lg" }: { className?: string }) {
  const [first, second] = siteConfig.wordmark;
  return (
    <span className={`font-bold tracking-tight text-ink-900 ${className}`}>
      {first}
      <span className="text-brand-600">{second}</span>
    </span>
  );
}

export function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5 rounded-lg" aria-label={`${siteConfig.name} home`}>
      <LogoMark className="size-8 transition-transform duration-200 group-hover:-rotate-6" />
      <Wordmark />
    </Link>
  );
}
