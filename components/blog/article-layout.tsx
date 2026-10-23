import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { PostCard } from "./post-card";
import { ToolCallout } from "./tool-callout";
import { formatDate, getPost, postPath, posts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { faqPageData } from "@/lib/structured-data";

export interface TocItem {
  id: string;
  title: string;
}

/**
 * Shared template for blog articles: breadcrumb, headline, byline and dates,
 * a table of contents, the article body, a closing tool link and related
 * articles. Also outputs BlogPosting structured data that matches the page.
 */
export function ArticleLayout({ slug, toc, children }: { slug: string; toc: TocItem[]; children: ReactNode }) {
  const post = getPost(slug);
  const url = absoluteUrl(postPath(slug));
  const related = posts.filter((p) => p.slug !== slug);
  const updated = post.updated !== post.published;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.published,
          dateModified: post.updated,
          author: { "@type": siteConfig.author.type, name: siteConfig.author.name, url: absoluteUrl("/about") },
          publisher: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          url,
          image: absoluteUrl("/opengraph-image"),
          inLanguage: "en",
        }}
      />

      <div className="border-b border-line bg-surface">
        <div className="container-page pt-6 pb-10 sm:pt-8 sm:pb-12">
          <Breadcrumbs
            items={[
              { name: "Blog", path: "/blog" },
              { name: post.title, path: postPath(slug) },
            ]}
          />
          <p className="eyebrow mt-6">Guide</p>
          <h1 className="mt-2 max-w-4xl text-3xl leading-tight font-bold tracking-tight text-balance text-ink-900 sm:text-4xl lg:text-[2.75rem]">
            {post.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-600">{post.description}</p>
          <p className="mt-5 flex flex-wrap gap-x-2 gap-y-1 text-sm text-ink-600">
            <span>
              By{" "}
              <Link href="/about" className="font-medium text-ink-800 hover:text-brand-600">
                {siteConfig.author.name}
              </Link>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Published <time dateTime={post.published}>{formatDate(post.published)}</time>
            </span>
            {updated && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </p>
        </div>
      </div>

      <div className="container-page grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
        <aside className="lg:order-2">
          <nav
            aria-label="Table of contents"
            className="rounded-2xl border border-line bg-paper p-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto"
          >
            <p className="text-sm font-semibold text-ink-900">On this page</p>
            <ol className="mt-3 space-y-1 text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="block rounded-md py-1 leading-snug text-ink-600 hover:text-brand-600"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="prose-content min-w-0 lg:order-1">{children}</article>
      </div>

      <div className="container-page pb-20">
        <div className="mx-auto max-w-3xl lg:mx-0">
          <ToolCallout tool={post.tool} />
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All articles
          </Link>
        </div>

        <section aria-labelledby="related-articles" className="mt-16">
          <h2 id="related-articles" className="text-2xl font-semibold tracking-tight text-ink-900">
            More guides
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

/** FAQ block for articles: plain headings and paragraphs, so every answer is visible. */
export function ArticleFaq({ id = "faq", items }: { id?: string; items: { q: string; a: ReactNode }[] }) {
  return (
    <section aria-labelledby={id}>
      <JsonLd data={faqPageData(items.map((i) => ({ question: i.q, answer: i.a })))} />
      <h2 id={id}>Frequently asked questions</h2>
      {items.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
    </section>
  );
}
