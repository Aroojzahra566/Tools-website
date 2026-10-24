/**
 * Registry of blog posts. The blog listing, sitemap, homepage guides section
 * and the "guide" links on tool pages all read from this list. The article
 * text itself lives in app/blog/<slug>/page.tsx.
 */
import type { ToolSlug } from "./tools";

export interface Post {
  slug: string;
  /** Visible headline (H1). */
  title: string;
  /** <title> tag, used exactly as written (no automatic brand suffix). Keep it under about 60 characters. */
  metaTitle: string;
  /** Meta description and listing summary. Aim for 120–160 characters. */
  description: string;
  /** ISO dates (YYYY-MM-DD). Change `updated` only when the article meaningfully changes. */
  published: string;
  updated: string;
  /** Rounded estimate at 238 words per minute. */
  readingMinutes: number;
  /** The tool this article explains. */
  tool: ToolSlug;
}

export const posts: readonly Post[] = [
  {
    slug: "how-to-compress-images-online",
    title: "How to Compress Images Online Without Losing Too Much Quality",
    metaTitle: "How to Compress Images Online Without Losing Quality",
    description:
      "Learn how to compress images online, choose JPEG, PNG or WebP, adjust dimensions, and reduce photo file sizes step by step.",
    published: "2026-10-22",
    updated: "2026-10-22",
    readingMinutes: 9,
    tool: "image-compressor",
  },
  {
    slug: "how-to-create-a-qr-code",
    title: "How to Create a QR Code from a Link or Text",
    metaTitle: "How to Create a QR Code from a Link or Text | QuickToolsWorld",
    description:
      "A practical guide to making a QR code for a website link or a short message: choosing the size and colors, testing it, and avoiding common mistakes.",
    published: "2026-10-22",
    updated: "2026-10-22",
    readingMinutes: 8,
    tool: "qr-code-generator",
  },
  {
    slug: "how-to-create-strong-passwords",
    title: "How to Create Strong Passwords and Keep Them Secure",
    metaTitle: "How to Create Strong Passwords and Keep Them Secure",
    description:
      "What actually makes a password strong, why length and randomness matter, and how to generate, store and protect unique passwords for every account.",
    published: "2026-10-22",
    updated: "2026-10-22",
    readingMinutes: 7,
    tool: "password-generator",
  },
  {
    slug: "how-to-calculate-percentages",
    title: "How to Calculate Percentages: Simple Formulas and Examples",
    metaTitle: "How to Calculate Percentages: Formulas and Examples",
    description:
      "Learn simple formulas for a percentage of a number, marks, increases, decreases and differences, with step-by-step worked examples.",
    published: "2026-10-22",
    updated: "2026-10-22",
    readingMinutes: 8,
    tool: "percentage-calculator",
  },
];

export function getPost(slug: string): Post {
  const post = posts.find((p) => p.slug === slug);
  if (!post) throw new Error(`Unknown post: ${slug}`);
  return post;
}

export function postPath(slug: string): string {
  return `/blog/${slug}`;
}

/** Guides that explain a given tool (used for links from tool pages). */
export function postsForTool(tool: ToolSlug): Post[] {
  return posts.filter((p) => p.tool === tool);
}

/** Formats an ISO date as e.g. "October 22, 2026" without depending on the server clock. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(
    Date.UTC(y, m - 1, d),
  );
}
