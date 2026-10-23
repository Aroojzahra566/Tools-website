"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { Eraser } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import { analyzeText, formatDuration } from "@/lib/tools/word-count";

const fmt = new Intl.NumberFormat("en-US");

export function WordCounter() {
  const [text, setText] = useState("");
  // Keeps typing responsive when very large documents are pasted.
  const deferred = useDeferredValue(text);
  const stats = useMemo(() => analyzeText(deferred), [deferred]);
  const id = useId();

  const primary = [
    { label: "Words", value: fmt.format(stats.words) },
    { label: "Characters", value: fmt.format(stats.characters) },
    { label: "Characters (no spaces)", value: fmt.format(stats.charactersNoSpaces) },
  ];
  const secondary = [
    { label: "Sentences", value: fmt.format(stats.sentences) },
    { label: "Paragraphs", value: fmt.format(stats.paragraphs) },
    { label: "Reading time", value: formatDuration(stats.readingMinutes) },
    { label: "Speaking time", value: formatDuration(stats.speakingMinutes) },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="card flex flex-col overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
          <label htmlFor={id} className="text-sm font-semibold text-ink-900">
            Your text
          </label>
          <div className="flex gap-2">
            <CopyButton text={text} label="Copy text" />
            <button type="button" className="btn btn-secondary" onClick={() => setText("")} disabled={!text}>
              <Eraser className="size-4" aria-hidden="true" />
              Clear
            </button>
          </div>
        </div>
        <textarea
          id={id}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here. Counts update instantly."
          spellCheck
          aria-describedby={`${id}-help`}
          className="min-h-[320px] w-full flex-1 resize-y bg-paper px-4 py-4 text-base leading-relaxed text-ink-900 placeholder:text-ink-500 focus:outline-none sm:min-h-[420px]"
        />
        <p id={`${id}-help`} className="border-t border-line bg-surface px-4 py-2.5 text-xs text-ink-600">
          {text
            ? "Your text stays in this browser tab. Nothing is saved or uploaded."
            : "Tip: paste an essay, article or social post to see its length and reading time."}
        </p>
      </div>

      <div className="space-y-4">
        <dl className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-3 lg:grid-cols-1">
          {primary.map((s) => (
            <div
              key={s.label}
              className="card flex min-w-0 items-baseline justify-between gap-3 px-4 py-3 min-[400px]:block min-[400px]:py-4"
            >
              <dt className="text-sm font-medium text-ink-600 min-[400px]:text-xs sm:text-sm">{s.label}</dt>
              <dd className="text-2xl font-bold tracking-tight break-all text-ink-900 tabular-nums min-[400px]:mt-1 sm:text-3xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
        <dl className="card divide-y divide-line">
          {secondary.map((s) => (
            <div key={s.label} className="flex items-center justify-between gap-4 px-4 py-3">
              <dt className="text-sm text-ink-600">{s.label}</dt>
              <dd className="font-semibold text-ink-900 tabular-nums">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
