import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Faq, type FaqItem } from "@/components/ui/faq";
import { ToolCard } from "@/components/ui/tool-card";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolLogo } from "@/components/tool-logo";
import { getTool, toolPath, type ToolSlug } from "@/lib/tools";
import { postPath, postsForTool } from "@/lib/blog";
import { JsonLd } from "@/components/ui/json-ld";
import { faqPageData } from "@/lib/structured-data";
import { absoluteUrl, siteConfig } from "@/lib/site";

/**
 * Shared layout for every tool page: breadcrumb, a single H1, a short intro,
 * the working tool near the top, explanatory content, FAQs and related tools.
 */
export function ToolPage({
  slug,
  intro,
  tool,
  children,
  faqs,
}: {
  slug: ToolSlug;
  intro: ReactNode;
  /** The interactive tool. */
  tool: ReactNode;
  /** Guide content (how to use, how it works, examples). */
  children: ReactNode;
  faqs: FaqItem[];
}) {
  const meta = getTool(slug);
  const related = meta.related.map(getTool);
  const guides = postsForTool(slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: meta.name,
          url: absoluteUrl(toolPath(slug)),
          description: meta.metaDescription,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any (runs in a web browser)",
          browserRequirements: "Requires JavaScript",
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          publisher: { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
        }}
      />
      <JsonLd data={faqPageData(faqs)} />
      <div className="border-b border-line bg-surface">
        <div className="container-page pt-6 pb-8 sm:pt-8 sm:pb-10">
          <Breadcrumbs
            items={[
              { name: "All Tools", path: "/tools" },
              { name: meta.name, path: toolPath(slug) },
            ]}
          />
          <div className="mt-6 flex items-start gap-4">
            <ToolLogo slug={slug} className="mt-0.5 size-11 rounded-xl shadow-(--shadow-card) sm:size-14" />
            <div className="min-w-0">
              <h1 className="text-3xl font-bold tracking-tight text-balance text-ink-900 sm:text-4xl">{meta.h1}</h1>
              <div className="mt-2 max-w-3xl text-base leading-relaxed text-ink-600 sm:text-lg">{intro}</div>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink-700">
                <ShieldCheck className="size-4 text-brand-600" aria-hidden="true" />
                Runs entirely in your browser. Nothing you enter is uploaded.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page">
        <section aria-label={`${meta.name} tool`} className="-mt-px pt-8">
          {tool}
        </section>

        <AdSlot placement="toolBelow" />

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="prose-content">{children}</div>
          {guides.length > 0 && (
            <aside className="mt-10 flex gap-4 rounded-2xl border border-lilac-100 bg-lilac-50/60 p-5 sm:p-6">
              <BookOpen className="mt-0.5 size-5 shrink-0 text-lilac-600" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-wide text-lilac-600 uppercase">
                  {guides.length === 1 ? "Read the guide" : "Read the guides"}
                </p>
                <ul className={guides.length === 1 ? "" : "mt-1 divide-y divide-lilac-100"}>
                  {guides.map((guide) => (
                    <li key={guide.slug} className={guides.length === 1 ? "" : "py-3 last:pb-0"}>
                      <p className="mt-1 font-semibold text-ink-900">
                        <Link
                          href={postPath(guide.slug)}
                          className="underline decoration-lilac-300 underline-offset-4 hover:text-brand-600"
                        >
                          {guide.title}
                        </Link>
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-700">{guide.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
          <div className="mt-14">
            <Faq items={faqs} />
          </div>
        </div>

        <AdSlot placement="toolFooter" />

        <section aria-labelledby="related-tools" className="mt-16 mb-20">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="related-tools" className="text-2xl font-semibold tracking-tight text-ink-900">
              Related tools
            </h2>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Browse all tools
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
