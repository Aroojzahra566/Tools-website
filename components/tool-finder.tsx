"use client";

import { useId, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { ToolCard } from "@/components/ui/tool-card";
import { tools, toolPath, type Tool } from "@/lib/tools";

function matches(tool: Tool, query: string): boolean {
  const haystack = [tool.name, tool.summary, ...tool.keywords].join(" ").toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

/**
 * Homepage hero (server-rendered `intro` and `aside`) with the search field,
 * followed by the tools grid the search filters.
 */
export function ToolFinder({ intro, aside }: { intro: ReactNode; aside?: ReactNode }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputId = useId();
  const results = useMemo(() => (query.trim() ? tools.filter((t) => matches(t, query)) : tools), [query]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (query.trim() && results.length > 0) router.push(toolPath(results[0].slug));
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-linear-to-b from-surface to-canvas pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-line-strong)_1px,transparent_0)] mask-[radial-gradient(ellipse_at_top_left,black_20%,transparent_65%)] bg-size-[22px_22px]"
        />
        <div className="relative container-page grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            {intro}
            <form role="search" onSubmit={onSubmit} className="mt-8 max-w-xl">
              <label htmlFor={inputId} className="sr-only">
                Search tools
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-500"
                  aria-hidden="true"
                />
                <input
                  id={inputId}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find a tool..."
                  autoComplete="off"
                  aria-describedby={`${inputId}-status`}
                  className="h-14 w-full rounded-2xl transition-shadow border border-line-strong bg-paper pr-12 pl-12 text-base text-ink-900 shadow-(--shadow-card) placeholder:text-ink-500 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/15 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-ink-500 hover:bg-surface hover:text-ink-900"
                  >
                    <X className="size-4" aria-hidden="true" />
                    <span className="sr-only">Clear search</span>
                  </button>
                )}
              </div>
              <p id={`${inputId}-status`} className="sr-only" aria-live="polite">
                {query.trim() ? `${results.length} ${results.length === 1 ? "tool" : "tools"} found` : ""}
              </p>
              <p className="mt-3 text-sm text-ink-600">
                Try “shrink photo”, “caps” or “discount”. Press Enter to open the top match.
              </p>
            </form>
          </div>
          {aside}
        </div>
      </section>

      <section id="tools" aria-labelledby="tools-heading" className="container-page mt-16 scroll-mt-24 sm:mt-20">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 id="tools-heading" className="text-2xl font-semibold tracking-tight text-ink-900">
            {query.trim() ? "Search results" : "All tools"}
          </h2>
          {query.trim() && (
            <p className="text-sm text-ink-600">
              {results.length} of {tools.length} tools
            </p>
          )}
        </div>
        {results.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-12 text-center">
            <p className="font-medium text-ink-900">No tools match “{query.trim()}”.</p>
            <p className="mt-1 text-sm text-ink-600">Try a shorter word, such as “text”, “image” or “percent”.</p>
            <button type="button" onClick={() => setQuery("")} className="btn btn-secondary mt-5">
              Show all tools
            </button>
          </div>
        )}
      </section>
    </>
  );
}
