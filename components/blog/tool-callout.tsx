import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolLogo } from "@/components/tool-logo";
import { getTool, toolPath, type ToolSlug } from "@/lib/tools";

/** A clear, contextual link from an article to the tool it explains. */
export function ToolCallout({ tool, children }: { tool: ToolSlug; children?: React.ReactNode }) {
  const t = getTool(tool);
  return (
    <aside className="my-8 flex flex-col gap-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 sm:flex-row sm:items-center sm:p-6">
      <ToolLogo slug={tool} className="size-12" />
      <div className="min-w-0 flex-1">
        <p className="m-0! font-semibold text-ink-900">Try the free {t.name}</p>
        <p className="mt-1! mb-0! text-sm leading-relaxed text-ink-700">{children ?? t.summary}</p>
      </div>
      <Link href={toolPath(tool)} className="btn btn-primary shrink-0 self-start sm:self-center">
        Open the {t.name}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </aside>
  );
}
