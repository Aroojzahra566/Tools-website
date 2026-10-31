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
    title: "How to Create a Strong Password: A Step-by-Step Guide",
    metaTitle: "How to Create a Strong Password: A Step-by-Step Guide",
    description:
      "Create a strong password step by step, by hand or with a generator: random passphrases, length, site password rules and a unique password for each account.",
    published: "2026-10-22",
    updated: "2026-10-31",
    readingMinutes: 7,
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
  {
    slug: "how-to-generate-a-strong-password",
    title: "How to Generate a Strong Password, and Which Settings to Use",
    metaTitle: "How to Generate a Strong Password: Length and Settings",
    description:
      "Generate a strong random password in seconds: which length and character types to choose, how generators work, and how to copy and store the result safely.",
    published: "2026-10-31",
    updated: "2026-10-31",
    readingMinutes: 7,
    tool: "password-generator",
  },
  {
    slug: "how-to-create-a-secure-password",
    title: "How to Create a Secure Password and Protect Your Accounts",
    metaTitle: "How to Create a Secure Password and Protect Your Accounts",
    description:
      "A secure password is strong, unique and well protected. Learn how passwords get stolen and how password managers, MFA and breach checks keep accounts safe.",
    published: "2026-10-31",
    updated: "2026-10-31",
    readingMinutes: 8,
    tool: "password-generator",
  },
  {
    slug: "strong-password-examples-and-suggestions",
    title: "Strong Password Examples and Suggestions: What a Good Password Looks Like",
    metaTitle: "Strong Password Suggestions and Examples to Learn From",
    description:
      "See what strong and weak passwords look like, why predictable patterns fail, and how to get a strong password suggestion from Chrome, iPhone or a generator.",
    published: "2026-10-31",
    updated: "2026-10-31",
    readingMinutes: 6,
    tool: "password-generator",
  },
  {
    slug: "what-is-a-capitalization-converter",
    title: "What Is a Capitalization Converter? Uppercase, Lowercase, Title and Sentence Case",
    metaTitle: "Capitalization Converter: Uppercase, Lowercase, Title Case",
    description:
      "What a capitalization converter does, how to convert uppercase to lowercase and back, and when to use title case or sentence case, with real examples.",
    published: "2026-10-31",
    updated: "2026-10-31",
    readingMinutes: 7,
    tool: "case-converter",
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

/** Newest first, for listings. Posts published on the same day keep their registry order. */
export function postsByDate(): Post[] {
  return [...posts].sort((a, b) => b.published.localeCompare(a.published));
}

/** The newest guide for each tool, for compact listings such as the homepage. */
export function latestPostPerTool(): Post[] {
  const seen = new Set<ToolSlug>();
  return postsByDate().filter((p) => !seen.has(p.tool) && (seen.add(p.tool), true));
}

/**
 * Related articles: other guides for the same tool first, then the newest
 * guides for other tools, up to `limit`.
 */
export function relatedPosts(slug: string, limit = 6): Post[] {
  const post = getPost(slug);
  const others = postsByDate().filter((p) => p.slug !== slug);
  const sameTool = others.filter((p) => p.tool === post.tool);
  const rest = others.filter((p) => p.tool !== post.tool);
  return [...sameTool, ...rest].slice(0, limit);
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
