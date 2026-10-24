/**
 * Registry of every tool on the site. The homepage, the All Tools page,
 * the sitemap, navigation and related-tool links all read from this list,
 * so adding a tool here is the first step to publishing a new one.
 */

export type ToolSlug =
  | "word-counter"
  | "image-compressor"
  | "qr-code-generator"
  | "password-generator"
  | "case-converter"
  | "percentage-calculator";

export interface Tool {
  slug: ToolSlug;
  name: string;
  /** One-line description used on cards. */
  summary: string;
  /** <title> for the tool page (the brand name is appended automatically). */
  metaTitle: string;
  /** Descriptive H1 shown on the tool page. `name` stays the short label used in navigation. */
  h1: string;
  metaDescription: string;
  /** Extra words that help the homepage search match this tool. */
  keywords: string[];
  related: ToolSlug[];
}

export const tools: readonly Tool[] = [
  {
    slug: "word-counter",
    name: "Word Counter",
    summary:
      "Count words, characters, sentences, and paragraphs instantly.",
    metaTitle: "Word Counter – Words & Characters With or Without Spaces",
    h1: "Free Online Word and Character Counter",
    metaDescription:
      "Count words, characters with or without spaces, sentences, paragraphs and reading time. Works with English, Urdu, Hindi, Arabic and more.",
    keywords: ["word count", "character count", "characters", "letters", "length", "essay", "reading time", "text", "writing", "words"],
    related: ["case-converter", "password-generator", "percentage-calculator"],
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    summary:
      "Reduce image file size and download an optimized image.",
    metaTitle: "Image Compressor – Compress JPG & PNG to 100KB or 200KB",
    h1: "Compress Images Online for Smaller File Sizes",
    metaDescription:
      "Compress JPG, PNG and WebP images with a quality slider or a target size like 100 KB. Images are processed in your browser, not uploaded.",
    keywords: ["compress", "shrink", "optimize", "reduce", "smaller", "jpg", "jpeg", "png", "webp", "photo", "picture", "resize", "image size", "file size", "kb", "mb", "100kb", "200kb", "50kb", "20kb", "target size", "form upload"],
    related: ["qr-code-generator", "word-counter", "case-converter"],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    summary:
      "Create downloadable QR codes from text or URLs.",
    metaTitle: "Free QR Code Generator – No Sign-Up, Codes Never Expire",
    h1: "Create and Download QR Codes Online",
    metaDescription:
      "Create a free QR code from a link or text, choose its size and colors, and download it as a PNG. Static codes never expire and have no tracking.",
    keywords: ["qr", "qr code", "barcode", "code", "link", "url", "website", "scan", "wifi", "menu"],
    related: ["image-compressor", "password-generator", "word-counter"],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    summary:
      "Generate strong random passwords securely in your browser.",
    metaTitle: "Random Password Generator – Strong & Secure Passwords",
    h1: "Generate Strong Random Passwords",
    metaDescription:
      "Generate strong random passwords up to 128 characters with letters, numbers and symbols. Passwords are created in your browser, never sent.",
    keywords: ["password", "passcode", "secure", "strong", "random", "security", "login", "pin", "generator"],
    related: ["qr-code-generator", "word-counter", "case-converter"],
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    summary:
      "Transform text between uppercase, lowercase, and other common case styles.",
    metaTitle: "Case Converter – Upper, Lower, Title & Sentence Case",
    h1: "Convert Text to Uppercase, Lowercase and More",
    metaDescription:
      "Convert text to UPPERCASE, lowercase, Title Case or Sentence case in one click, then copy the result. A free case converter in your browser.",
    keywords: ["uppercase", "lowercase", "upper", "lower", "caps", "capital", "capitalize", "title case", "sentence case", "text", "convert"],
    related: ["word-counter", "password-generator", "percentage-calculator"],
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    summary:
      "Calculate percentages, increases, and decreases in seconds.",
    metaTitle: "Percentage Calculator – Increase, Decrease & Difference",
    h1: "Calculate Percentages Online",
    metaDescription:
      "Calculate X% of Y, percentage of marks, percentage increase or decrease, and percentage difference between two numbers. Each answer shows its formula.",
    keywords: ["percent", "percentage", "%", "math", "calculator", "calculate", "increase", "decrease", "discount", "change", "growth", "sale", "tax", "tip", "grade", "marks", "difference", "between two numbers"],
    related: ["word-counter", "case-converter", "image-compressor"],
  },
];

export function getTool(slug: ToolSlug): Tool {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  return tool;
}

export function toolPath(slug: ToolSlug): `/${ToolSlug}` {
  return `/${slug}`;
}
