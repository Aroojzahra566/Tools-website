"use client";

import { useId, useMemo, useState } from "react";
import { ArrowLeftRight, Eraser } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import { convertCase, type CaseMode } from "@/lib/tools/case-convert";
import { analyzeText } from "@/lib/tools/word-count";

const modes: { mode: CaseMode; label: string }[] = [
  { mode: "upper", label: "UPPERCASE" },
  { mode: "lower", label: "lowercase" },
  { mode: "title", label: "Title Case" },
  { mode: "sentence", label: "Sentence case" },
];

const fmt = new Intl.NumberFormat("en-US");

export function CaseConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<CaseMode>("title");
  const id = useId();

  const output = useMemo(() => convertCase(input, mode), [input, mode]);
  const stats = useMemo(() => analyzeText(input), [input]);

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-line px-4 py-4 sm:px-6">
        <p id={`${id}-modes`} className="text-sm font-semibold text-ink-900">
          Convert to
        </p>
        <div role="group" aria-labelledby={`${id}-modes`} className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {modes.map((m) => (
            <button
              key={m.mode}
              type="button"
              aria-pressed={mode === m.mode}
              onClick={() => setMode(m.mode)}
              className={`btn ${mode === m.mode ? "btn-primary" : "btn-secondary"}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col border-b border-line lg:border-r lg:border-b-0">
          <div className="flex min-h-14 items-center justify-between gap-2 px-4 py-2 sm:px-6">
            <label htmlFor={`${id}-in`} className="text-sm font-semibold text-ink-900">
              Original text
            </label>
            <button type="button" className="btn btn-ghost" onClick={() => setInput("")} disabled={!input}>
              <Eraser className="size-4" aria-hidden="true" />
              Clear
            </button>
          </div>
          <textarea
            id={`${id}-in`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste the text you want to convert."
            className="min-h-[260px] flex-1 resize-y border-y border-line bg-paper px-4 py-3 text-base leading-relaxed text-ink-900 placeholder:text-ink-500 focus:bg-brand-50/30 focus:outline-none sm:px-6"
          />
          <p className="px-4 py-2.5 text-xs text-ink-600 sm:px-6">
            {fmt.format(stats.words)} {stats.words === 1 ? "word" : "words"} · {fmt.format(stats.characters)}{" "}
            {stats.characters === 1 ? "character" : "characters"}
          </p>
        </div>

        <div className="flex flex-col bg-surface/60">
          <div className="flex min-h-14 flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
            <label htmlFor={`${id}-out`} className="text-sm font-semibold text-ink-900">
              Result
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setInput(output)}
                disabled={!output || output === input}
                title="Use the result as the new original text"
              >
                <ArrowLeftRight className="size-4" aria-hidden="true" />
                Use as input
              </button>
              <CopyButton text={output} label="Copy result" variant="primary" />
            </div>
          </div>
          <textarea
            id={`${id}-out`}
            value={output}
            readOnly
            placeholder="Your converted text will appear here."
            className="min-h-[260px] flex-1 resize-y border-y border-line bg-paper/60 px-4 py-3 text-base leading-relaxed text-ink-900 placeholder:text-ink-500 focus:outline-none sm:px-6"
          />
          <p className="px-4 py-2.5 text-xs text-ink-600 sm:px-6">
            Showing {modes.find((m) => m.mode === mode)?.label}. Changing the style never alters your original text.
          </p>
        </div>
      </div>
    </div>
  );
}
