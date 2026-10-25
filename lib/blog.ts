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
      "Learn how to compress JPG, PNG and WebP images online, reduce photo file size, choose the right dimensions for websites, and check quality.",
    published: "2026-10-22",
    updated: "2026-10-25",
    readingMinutes: 12,
    tool: "image-compressor",
  },
  {
    slug: "how-to-create-a-qr-code",
    title: "How to Create a QR Code from a Link or Text",
    metaTitle: "How to Create a QR Code from a Link or Text | QuickToolsWorld",
    description:
      "Create a QR code from a link, text or Wi-Fi details, choose the size and colors, test it before printing, and learn when you need a dynamic code.",
    published: "2026-10-22",
    updated: "2026-10-25",
    readingMinutes: 10,
    tool: "qr-code-generator",
  },
  {
    slug: "how-to-create-strong-passwords",
    title: "How to Create a Strong Password and Keep It Secure",
    metaTitle: "How to Create a Strong Password and Keep It Secure",
    description:
      "Learn how to create a strong, complex password, how random generators and browser suggestions work, and how to store and protect every password.",
    published: "2026-10-22",
    updated: "2026-10-25",
    readingMinutes: 9,
    tool: "password-generator",
  },
  {
    slug: "how-to-calculate-percentages",
    title: "How to Calculate Percentages: Simple Formulas and Examples",
    metaTitle: "How to Calculate Percentages: Formulas and Examples",
    description:
      "Learn how to calculate a percentage of a number, exam marks, increases, decreases and percentage points, with simple formulas and worked examples.",
    published: "2026-10-22",
    updated: "2026-10-25",
    readingMinutes: 8,
    tool: "percentage-calculator",
  },
  {
    slug: "how-to-count-words-and-characters",
    title: "How to Count Words and Characters, With and Without Spaces",
    metaTitle: "How to Count Words and Characters, With and Without Spaces",
    description:
      "How word, character, sentence and paragraph counts work, when spaces count, common word and character limits, and how to check your text online.",
    published: "2026-10-25",
    updated: "2026-10-25",
    readingMinutes: 8,
    tool: "word-counter",
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
