import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolLogo } from "@/components/tool-logo";
import { toolPath, type Tool } from "@/lib/tools";

/**
 * Tool card. The whole card is clickable (via a stretched link on the title),
 * and it always navigates to the tool page.
 */
export function ToolCard({ tool, headingLevel = "h3" }: { tool: Tool; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="group card relative flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-(--shadow-card-hover) has-focus-visible:border-brand-600">
      <span
        aria-hidden="true"
        className="absolute inset-x-6 -top-px h-0.5 origin-left scale-x-0 rounded-full bg-linear-to-r from-brand-500 to-lilac-400 transition-transform duration-300 group-hover:scale-x-100 group-has-focus-visible:scale-x-100"
      />
      <ToolLogo
        slug={tool.slug}
        className="size-12 rounded-xl transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105"
      />
      <Heading className="mt-5 text-lg font-semibold text-ink-900">
        <Link href={toolPath(tool.slug)} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
          {tool.name}
        </Link>
      </Heading>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{tool.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600" aria-hidden="true">
        Open tool
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}
