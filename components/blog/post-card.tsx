import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolLogo } from "@/components/tool-logo";
import { formatDate, postPath, type Post } from "@/lib/blog";

/** Article card used on the blog listing, the homepage and related-article lists. */
export function PostCard({ post, headingLevel = "h3" }: { post: Post; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="group card relative flex h-full flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-(--shadow-card-hover) has-focus-visible:border-brand-600">
      <div
        aria-hidden="true"
        className="flex h-28 items-center justify-center border-b border-line bg-linear-to-br from-brand-50 via-paper to-lilac-50"
      >
        <ToolLogo slug={post.tool} className="size-14 transition-transform duration-200 group-hover:-rotate-6" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm text-ink-600">
          <time dateTime={post.published}>{formatDate(post.published)}</time> · {post.readingMinutes} min read
        </p>
        <Heading className="mt-2 text-lg leading-snug font-semibold text-ink-900">
          <Link
            href={postPath(post.slug)}
            className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </Heading>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{post.description}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600" aria-hidden="true">
          Read article
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
