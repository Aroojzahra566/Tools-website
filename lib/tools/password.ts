/**
 * Password generation with the Web Crypto API.
 *
 * Randomness comes only from crypto.getRandomValues(). Indexes are chosen with
 * rejection sampling, so every character in the pool is equally likely
 * (no modulo bias). Math.random() is never used.
 */

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export const CHARACTER_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/~",
} as const;

export type CharacterGroup = keyof typeof CHARACTER_SETS;

export const MIN_LENGTH = 4;
export const MAX_LENGTH = 128;

/** True when the browser offers cryptographically secure randomness. */
export function hasSecureRandom(): boolean {
  return typeof globalThis.crypto !== "undefined" && typeof globalThis.crypto.getRandomValues === "function";
}

/** Returns a uniformly distributed integer in [0, max). */
export function secureRandomInt(max: number): number {
  if (!Number.isInteger(max) || max <= 0 || max > 2 ** 32) throw new RangeError("Invalid range");
  const limit = Math.floor(2 ** 32 / max) * max; // largest multiple of max that fits in 32 bits
  const buf = new Uint32Array(1);
  for (;;) {
    crypto.getRandomValues(buf);
    if (buf[0] < limit) return buf[0] % max;
  }
}

function pick(chars: string): string {
  return chars[secureRandomInt(chars.length)];
}

/** Fisher–Yates shuffle using secure randomness. */
function shuffle<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

export function selectedGroups(options: PasswordOptions): CharacterGroup[] {
  return (Object.keys(CHARACTER_SETS) as CharacterGroup[]).filter((g) => options[g]);
}

/**
 * Generates a password containing at least one character from every selected
 * group. Returns null when no group is selected.
 */
export function generatePassword(options: PasswordOptions): string | null {
  const groups = selectedGroups(options);
  if (groups.length === 0) return null;
  const length = Math.min(MAX_LENGTH, Math.max(MIN_LENGTH, Math.round(options.length), groups.length));
  const pool = groups.map((g) => CHARACTER_SETS[g]).join("");

  const chars = groups.map((g) => pick(CHARACTER_SETS[g]));
  while (chars.length < length) chars.push(pick(pool));
  return shuffle(chars).join("");
}

export type Strength = "Very weak" | "Weak" | "Fair" | "Strong" | "Very strong";

export interface StrengthEstimate {
  /** Approximate entropy in bits: length × log2(pool size). */
  bits: number;
  label: Strength;
  /** 0–4, used for the meter. */
  score: 0 | 1 | 2 | 3 | 4;
}

/**
 * Estimates strength from the size of the character pool and the length.
 * This describes randomly generated passwords only. It does not apply to
 * passwords people choose themselves.
 */
export function estimateStrength(options: PasswordOptions): StrengthEstimate | null {
  const groups = selectedGroups(options);
  if (groups.length === 0) return null;
  const poolSize = groups.reduce((sum, g) => sum + CHARACTER_SETS[g].length, 0);
  const bits = Math.round(options.length * Math.log2(poolSize));
  if (bits < 36) return { bits, label: "Very weak", score: 0 };
  if (bits < 60) return { bits, label: "Weak", score: 1 };
  if (bits < 80) return { bits, label: "Fair", score: 2 };
  if (bits < 112) return { bits, label: "Strong", score: 3 };
  return { bits, label: "Very strong", score: 4 };
}
