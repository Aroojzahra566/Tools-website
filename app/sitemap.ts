import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { tools, toolPath } from "@/lib/tools";
import { postPath, posts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = siteConfig.contentLastModified;
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/tools", priority: 0.8 },
    ...tools.map((t) => ({ path: toolPath(t.slug), priority: 0.9 })),
    { path: "/blog", priority: 0.7 },
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.4 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/disclaimer", priority: 0.3 },
  ];
  return [
    ...pages.map(({ path, priority }) => ({ url: absoluteUrl(path), lastModified, priority })),
    // Each article uses its own "updated" date, so lastmod only changes when the article does.
    ...posts.map((p) => ({ url: absoluteUrl(postPath(p.slug)), lastModified: p.updated, priority: 0.7 })),
  ];
}
