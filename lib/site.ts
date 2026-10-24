/**
 * Central site configuration.
 *
 * Change the brand name, domain and contact details here. Values that differ
 * between environments are read from environment variables (see .env.example).
 */

function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  /** Brand name shown in the header, titles and legal pages. */
  name: "QuickToolsWorld",
  /**
   * The wordmark splits the name into two parts so the second can be styled
   * in the accent color. Keep these joined equal to `name`.
   */
  wordmark: ["QuickTools", "World"],
  tagline: "Your everyday tools. One quick stop.",
  description:
    "Use free online tools to count words, compress images, create QR codes, generate passwords, convert text case, and calculate percentages.",

  /**
   * Production URL used for canonical links, the sitemap and Open Graph tags.
   * Defaults to the primary production domain. The www address is primary on Vercel
   * (quicktoolsworld.com redirects to it), so canonical URLs must use www too.
   * Override with NEXT_PUBLIC_SITE_URL only if the primary domain changes.
   */
  url: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL || "https://www.quicktoolsworld.com"),

  /** Public support email, shown on the Contact, About and Privacy pages. Override with NEXT_PUBLIC_CONTACT_EMAIL. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@quicktoolsworld.com",

  /** Shown on legal pages. Update when you change a policy. */
  legalLastUpdated: "October 21, 2026",
  /** "Last updated" date shown on the Privacy Policy. Change it whenever the policy changes. */
  privacyLastUpdated: "October 24, 2026",
  /**
   * ISO date used as sitemap lastModified for the homepage, tools and info pages.
   * Change it only when the content of those pages meaningfully changes.
   * Blog posts have their own dates in lib/blog.ts.
   */
  contentLastModified: "2026-10-22",
  /** Fallback copyright year; the footer shows the visitor's current year once loaded. */
  copyrightYear: 2026,

  /**
   * Social profiles shown in the footer. Leave empty until real profiles exist.
   * Example: { label: "X (Twitter)", href: "https://x.com/yourhandle" }
   */
  socialLinks: [] as readonly { label: string; href: string }[],

  locale: "en_US",

  /**
   * Byline used on blog posts and in their structured data. Articles are
   * attributed to the site itself. If a real person writes or reviews an
   * article, you can change this to their name (type "Person").
   */
  author: { type: "Organization", name: "QuickToolsWorld" } as { type: "Organization" | "Person"; name: string },
} as const;

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}
