/**
 * Percentage calculations. Every function returns either a finite number or
 * an error message, so the UI never shows NaN or Infinity.
 */

export type CalcResult = { ok: true; value: number } | { ok: false; error: string };

/**
 * Parses a user-entered number. Accepts an optional sign, digits, a single
 * "." decimal separator and thousands separators written as commas or spaces
 * (for example "1,250.5"). Returns null for empty input and NaN for invalid input.
 */
export function parseNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const cleaned = trimmed.replace(/[\s,](?=\d{3}(?:\D|$))/g, "");
  if (!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(cleaned)) return NaN;
  return Number(cleaned);
}

/** Removes floating point noise such as 0.30000000000000004. */
function clean(n: number): number {
  return Number.parseFloat(n.toPrecision(12));
}

function finite(value: number): CalcResult {
  if (!Number.isFinite(value)) return { ok: false, error: "The result is too large to display." };
  return { ok: true, value: clean(value) === 0 ? 0 : clean(value) };
}

/** What is X% of Y?  →  (X / 100) × Y */
export function percentOf(percent: number, total: number): CalcResult {
  return finite((percent / 100) * total);
}

/** X is what percentage of Y?  →  (X / Y) × 100 */
export function whatPercent(part: number, total: number): CalcResult {
  if (total === 0) return { ok: false, error: "Y cannot be 0, because you cannot divide by zero." };
  return finite((part / total) * 100);
}

/** Percentage change from X to Y  →  (Y − X) / |X| × 100. Positive means an increase. */
export function percentChange(from: number, to: number): CalcResult {
  if (from === 0) {
    return {
      ok: false,
      error: "The starting value cannot be 0. A change from zero cannot be expressed as a percentage.",
    };
  }
  return finite(((to - from) / Math.abs(from)) * 100);
}

/**
 * Percentage difference between two values with no clear starting point:
 * |X − Y| ÷ ((|X| + |Y|) ÷ 2) × 100. The result is always zero or positive.
 */
export function percentDifference(a: number, b: number): CalcResult {
  const mean = (Math.abs(a) + Math.abs(b)) / 2;
  if (mean === 0) return { ok: false, error: "Both values are 0, so there is no difference to compare." };
  return finite((Math.abs(a - b) / mean) * 100);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 6 }).format(n);
}
