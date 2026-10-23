import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

export interface FaqItem {
  question: string;
  answer: ReactNode;
}

/** Accessible FAQ list built on native <details>, so it works without JavaScript. */
export function Faq({ items, headingId = "faq" }: { items: FaqItem[]; headingId?: string }) {
  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="text-2xl font-semibold tracking-tight text-ink-900">
        Frequently asked questions
      </h2>
      <div className="mt-6 divide-y divide-line rounded-2xl border border-line bg-paper">
        {items.map((item) => (
          <details key={item.question} className="group px-5 py-1 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-4 text-left font-medium text-ink-900">
              {item.question}
              <ChevronDown
                className="size-5 shrink-0 text-ink-500 transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="pb-5 leading-relaxed text-ink-700">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
