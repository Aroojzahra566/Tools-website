import type { Metadata } from "next";
import { getPost, postPath } from "./blog";
import { pageMetadata } from "./metadata";
import { siteConfig } from "./site";

/** Title, description, canonical and article social tags for a blog post. */
export function postMetadata(slug: string): Metadata {
  const post = getPost(slug);
  // Article titles are already 45–60 characters, so they skip the "| Brand" suffix unless metaTitle includes it.
  return pageMetadata({
    title: post.metaTitle,
    description: post.description,
    path: postPath(slug),
    article: { publishedTime: post.published, modifiedTime: post.updated, author: siteConfig.author.name },
    absoluteTitle: true,
  });
}

/** Turns an article's `{ id: heading }` map into table-of-contents entries. */
export function toc(sections: Record<string, string>) {
  return Object.entries(sections).map(([id, title]) => ({ id, title }));
}
