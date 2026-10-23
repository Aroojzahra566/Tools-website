"use client";

import { useId, useState } from "react";
import { CircleAlert, RotateCcw } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import {
  formatNumber,
  parseNumber,
  percentChange,
  percentDifference,
  percentOf,
  whatPercent,
  type CalcResult,
} from "@/lib/tools/percentage";

interface Calculator {
  key: string;
  title: string;
  inputLabels: [string, string];
  placeholders: [string, string];
  compute: (a: number, b: number) => CalcResult;
  /** Human-readable sentence for a successful result. */
  describe: (a: number, b: number, result: number) => string;
  formula: string;
}

const pct = (n: number) => `${formatNumber(n)}%`;

const calculators: Calculator[] = [
  {
    key: "of",
    title: "What is X% of Y?",
    inputLabels: ["Percentage (X)", "Number (Y)"],
    placeholders: ["20", "150"],
    compute: percentOf,
    describe: (a, b, r) => `${pct(a)} of ${formatNumber(b)} is ${formatNumber(r)}`,
    formula: "Result = (X ÷ 100) × Y",
  },
  {
    key: "is-what",
    title: "X is what percent of Y?",
    inputLabels: ["Part (X)", "Whole (Y)"],
    placeholders: ["30", "150"],
    compute: whatPercent,
    describe: (a, b, r) => `${formatNumber(a)} is ${pct(r)} of ${formatNumber(b)}`,
    formula: "Percentage = (X ÷ Y) × 100",
  },
  {
    key: "increase",
    title: "Percentage increase from X to Y",
    inputLabels: ["Starting value (X)", "New value (Y)"],
    placeholders: ["80", "100"],
    compute: percentChange,
    describe: (a, b, r) =>
      r >= 0
        ? `Going from ${formatNumber(a)} to ${formatNumber(b)} is an increase of ${pct(r)}`
        : `Going from ${formatNumber(a)} to ${formatNumber(b)} is a decrease of ${pct(-r)}, not an increase (a change of ${pct(r)})`,
    formula: "Increase = (Y − X) ÷ |X| × 100",
  },
  {
    key: "decrease",
    title: "Percentage decrease from X to Y",
    inputLabels: ["Starting value (X)", "New value (Y)"],
    placeholders: ["100", "80"],
    compute: (a, b) => {
      const r = percentChange(a, b);
      return r.ok ? { ok: true, value: r.value === 0 ? 0 : -r.value } : r;
    },
    describe: (a, b, r) =>
      r >= 0
        ? `Going from ${formatNumber(a)} to ${formatNumber(b)} is a decrease of ${pct(r)}`
        : `Going from ${formatNumber(a)} to ${formatNumber(b)} is an increase of ${pct(-r)}, not a decrease`,
    formula: "Decrease = (X − Y) ÷ |X| × 100",
  },
  {
    key: "difference",
    title: "Percentage difference between X and Y",
    inputLabels: ["First value (X)", "Second value (Y)"],
    placeholders: ["40", "60"],
    compute: percentDifference,
    describe: (a, b, r) =>
      `The percentage difference between ${formatNumber(a)} and ${formatNumber(b)} is ${pct(r)}`,
    formula: "Difference = |X − Y| ÷ ((|X| + |Y|) ÷ 2) × 100",
  },
];

type Outcome =
  | { kind: "empty" }
  | { kind: "invalid"; message: string }
  | { kind: "error"; message: string }
  | { kind: "ok"; value: number; sentence: string };

function evaluate(calc: Calculator, rawA: string, rawB: string): Outcome {
  const a = parseNumber(rawA);
  const b = parseNumber(rawB);
  if (a === null || b === null) return { kind: "empty" };
  const bad = [Number.isNaN(a) && calc.inputLabels[0], Number.isNaN(b) && calc.inputLabels[1]].filter(Boolean);
  if (bad.length) return { kind: "invalid", message: `Enter a valid number for ${bad.join(" and ")}.` };
  const r = calc.compute(a as number, b as number);
  if (!r.ok) return { kind: "error", message: r.error };
  return { kind: "ok", value: r.value, sentence: calc.describe(a as number, b as number, r.value) };
}

function CalculatorCard({ calc }: { calc: Calculator }) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const id = useId();
  const outcome = evaluate(calc, a, b);
  const isPercentResult = calc.key !== "of";
  const display =
    outcome.kind === "ok" ? (isPercentResult ? pct(outcome.value) : formatNumber(outcome.value)) : "";
  const invalidA = a.trim() !== "" && Number.isNaN(parseNumber(a));
  const invalidB = b.trim() !== "" && Number.isNaN(parseNumber(b));

  const input = (which: 0 | 1, value: string, set: (v: string) => void, invalid: boolean) => (
    <div className="min-w-0 flex-1">
      <label htmlFor={`${id}-${which}`} className="field-label">
        {calc.inputLabels[which]}
      </label>
      <input
        id={`${id}-${which}`}
        inputMode="decimal"
        autoComplete="off"
        value={value}
        onChange={(e) => set(e.target.value)}
        placeholder={`e.g. ${calc.placeholders[which]}`}
        aria-invalid={invalid || undefined}
        aria-describedby={`${id}-result`}
        className="field-input tabular-nums"
      />
    </div>
  );

  return (
    <section aria-labelledby={`${id}-title`} className="card flex flex-col p-5 sm:p-6">
      <h2 id={`${id}-title`} className="text-lg font-semibold text-ink-900">
        {calc.title}
      </h2>
      <div className="mt-4 flex flex-col gap-3 min-[420px]:flex-row">
        {input(0, a, setA, invalidA)}
        {input(1, b, setB, invalidB)}
      </div>

      <div
        id={`${id}-result`}
        aria-live="polite"
        className={`mt-4 min-h-[88px] rounded-xl border px-4 py-3 ${
          outcome.kind === "ok"
            ? "border-brand-200 bg-brand-50"
            : outcome.kind === "empty"
              ? "border-dashed border-line-strong bg-surface"
              : "border-danger-600/25 bg-danger-50"
        }`}
      >
        {outcome.kind === "ok" && (
          <>
            <p className="text-xs font-medium tracking-wide text-brand-700 uppercase">Result</p>
            <p className="mt-0.5 text-2xl font-bold break-all text-ink-900 tabular-nums">{display}</p>
            <p className="mt-1 text-sm text-ink-700">{outcome.sentence}.</p>
          </>
        )}
        {outcome.kind === "empty" && <p className="py-4 text-sm text-ink-600">Enter both values to see the result.</p>}
        {(outcome.kind === "invalid" || outcome.kind === "error") && (
          <p className="flex gap-2 py-2 text-sm font-medium text-danger-600">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              <span className="sr-only">Error: </span>
              {outcome.message}
            </span>
          </p>
        )}
      </div>

      <p className="mt-3 text-xs text-ink-600">
          <span className="font-medium text-ink-700">Formula:</span> <code className="font-mono">{calc.formula}</code>
      </p>
      <div className="mt-4 flex flex-wrap justify-end gap-2 border-t border-line pt-4">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            setA("");
            setB("");
          }}
          disabled={!a && !b}
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Clear
        </button>
        <CopyButton text={outcome.kind === "ok" ? display : ""} label="Copy result" />
      </div>
    </section>
  );
}

export function PercentageCalculator() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {calculators.map((calc) => (
        <CalculatorCard key={calc.key} calc={calc} />
      ))}
    </div>
  );
}
