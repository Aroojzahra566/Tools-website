import Link from "next/link";
import { PostCard } from "@/components/blog/post-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { postPath, posts } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Blog: Guides for Everyday Online Tasks",
  description:
    "Clear, practical guides to compressing images, creating QR codes, making strong passwords and calculating percentages, with step-by-step examples.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${siteConfig.name} Blog`,
          url: absoluteUrl("/blog"),
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: absoluteUrl(postPath(p.slug)),
            datePublished: p.published,
            dateModified: p.updated,
          })),
        }}
      />
      <div className="border-b border-line bg-surface">
        <div className="container-page pt-6 pb-10 sm:pt-8 sm:pb-12">
          <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">Guides and how-tos</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-600">
            Practical explanations of the everyday tasks our tools help with: what to do, why it works and the mistakes
            to avoid. Each guide links to the matching{" "}
            <Link href="/tools" className="font-medium text-brand-600 underline underline-offset-2">
              free tool
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} headingLevel="h2" />
          ))}
        </div>
      </div>
    </>
  );
}
