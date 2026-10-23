import { postPath, posts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { tools, toolPath } from "@/lib/tools";

/**
 * /llms.txt: a plain-text summary of the site for AI assistants and answer
 * engines (an emerging convention, see llmstxt.org). Generated from the tool
 * and blog registries, so it stays in sync with the site.
 */
export function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description} All tools are free, need no account, and process input in the browser, so text, images and passwords are not uploaded.`,
    "",
    "## Tools",
    ...tools.map((t) => `- [${t.name}](${absoluteUrl(toolPath(t.slug))}): ${t.metaDescription}`),
    "",
    "## Guides",
    ...posts.map((p) => `- [${p.title}](${absoluteUrl(postPath(p.slug))}): ${p.description}`),
    "",
    "## About",
    `- [About ${siteConfig.name}](${absoluteUrl("/about")})`,
    `- [Contact](${absoluteUrl("/contact")}): ${siteConfig.contactEmail}`,
    `- [Privacy Policy](${absoluteUrl("/privacy-policy")})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
