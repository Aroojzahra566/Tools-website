"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { Eye, EyeOff, KeyRound, RefreshCw } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import { Notice } from "@/components/ui/notice";
import {
  CHARACTER_SETS,
  MAX_LENGTH,
  MIN_LENGTH,
  estimateStrength,
  generatePassword,
  hasSecureRandom,
  selectedGroups,
  type CharacterGroup,
  type PasswordOptions,
} from "@/lib/tools/password";

const groupLabels: Record<CharacterGroup, { label: string; example: string }> = {
  uppercase: { label: "Uppercase letters", example: "A–Z" },
  lowercase: { label: "Lowercase letters", example: "a–z" },
  numbers: { label: "Numbers", example: "0–9" },
  symbols: { label: "Symbols", example: CHARACTER_SETS.symbols.slice(0, 8) + "…" },
};

const noopSubscribe = () => () => {};

const meterColors = ["bg-danger-600", "bg-danger-600", "bg-warning-500", "bg-brand-500", "bg-brand-600"];

export function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);
  // Assume support during prerender; the real check runs in the browser.
  const secure = useSyncExternalStore(noopSubscribe, hasSecureRandom, () => true);
  // Text in the length box while typing, so partial values like "1" (on the way to "16") aren't clamped.
  const [lengthDraft, setLengthDraft] = useState<string | null>(null);
  const id = useId();

  const noGroups = selectedGroups(options).length === 0;
  const cannotGenerate = noGroups || !secure;
  const draftInvalid = lengthDraft !== null && Number(lengthDraft) !== options.length;
  const strength = estimateStrength(options);

  function generate(next: PasswordOptions = options) {
    if (!hasSecureRandom()) return;
    setPassword(generatePassword(next) ?? "");
  }

  /** Updates options and, if a password is showing, regenerates it so it always matches the settings. */
  function update(patch: Partial<PasswordOptions>) {
    const next = { ...options, ...patch };
    setOptions(next);
    if (password) generate(next);
  }

  function setLength(raw: number) {
    if (Number.isNaN(raw)) return;
    update({ length: Math.min(MAX_LENGTH, Math.max(MIN_LENGTH, Math.round(raw))) });
  }

  function onLengthTyped(value: string) {
    setLengthDraft(value);
    const n = Number(value);
    if (value !== "" && Number.isInteger(n) && n >= MIN_LENGTH && n <= MAX_LENGTH) update({ length: n });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
      <div className="card flex flex-col p-5 sm:p-6">
        <label htmlFor={`${id}-out`} className="text-sm font-semibold text-ink-900">
          Your password
        </label>
        <div className="mt-3 flex min-h-[72px] items-center gap-2 rounded-xl border border-line-strong bg-surface py-3 pr-2 pl-4">
          <input
            id={`${id}-out`}
            type={visible ? "text" : "password"}
            readOnly
            value={password}
            placeholder="Select Generate password"
            spellCheck={false}
            autoComplete="off"
            className="w-full min-w-0 bg-transparent font-mono text-base tracking-wide break-all text-ink-900 placeholder:font-sans placeholder:text-sm placeholder:tracking-normal placeholder:text-ink-500 focus:outline-none min-[400px]:text-lg sm:text-xl"
            onFocus={(e) => e.currentTarget.select()}
          />
          {password && (
            <button
              type="button"
              className="btn btn-ghost shrink-0 px-2.5"
              onClick={() => setVisible((v) => !v)}
            >
              {visible ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
              <span className="sr-only">{visible ? "Hide password" : "Show password"}</span>
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {password ? (
            <>
              <CopyButton text={password} label="Copy password" variant="primary" />
              <button type="button" className="btn btn-secondary" onClick={() => generate()} disabled={cannotGenerate}>
                <RefreshCw className="size-4" aria-hidden="true" />
                Regenerate
              </button>
            </>
          ) : (
            <button type="button" className="btn btn-primary" onClick={() => generate()} disabled={cannotGenerate}>
              <KeyRound className="size-4" aria-hidden="true" />
              Generate password
            </button>
          )}
        </div>

        {!secure && (
          <Notice tone="error" className="mt-4">
            Your browser does not provide secure random numbers (the Web Crypto API), so this tool cannot create a
            safe password here. Try an up-to-date version of Chrome, Edge, Firefox or Safari.
          </Notice>
        )}

        {strength && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-600">Estimated strength</span>
              <span className="font-semibold text-ink-900">
                {strength.label} <span className="font-normal text-ink-600">· about {strength.bits} bits</span>
              </span>
            </div>
            <div
              className="mt-2 grid grid-cols-5 gap-1.5"
              role="meter"
              aria-label="Estimated password strength"
              aria-valuemin={0}
              aria-valuemax={4}
              aria-valuenow={strength.score}
              aria-valuetext={`${strength.label}, about ${strength.bits} bits of entropy`}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full ${i <= strength.score ? meterColors[strength.score] : "bg-line"}`}
                />
              ))}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink-600">
              Based on the length and the characters allowed. No password is unbreakable, but longer random
              passwords take far more guesses to crack.
            </p>
          </div>
        )}
      </div>

      <fieldset className="card p-5 sm:p-6">
        <legend className="sr-only">Password options</legend>
        <div className="flex items-center justify-between gap-4">
          <label htmlFor={`${id}-len`} className="text-sm font-semibold text-ink-900">
            Length
          </label>
          <input
            type="number"
            min={MIN_LENGTH}
            max={MAX_LENGTH}
            value={lengthDraft ?? options.length}
            onChange={(e) => onLengthTyped(e.target.value)}
            onBlur={() => setLengthDraft(null)}
            aria-invalid={draftInvalid || undefined}
            aria-describedby={`${id}-len-hint`}
            aria-label="Password length (number)"
            className="field-input w-20 text-center tabular-nums"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Common lengths">
          {[8, 12, 16, 20, 32].map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={options.length === n}
              onClick={() => {
                setLengthDraft(null);
                setLength(n);
              }}
              className="min-h-9 min-w-11 rounded-lg border border-line-strong px-2.5 text-sm font-medium text-ink-800 tabular-nums transition-colors hover:bg-surface aria-pressed:border-brand-600 aria-pressed:bg-brand-50 aria-pressed:text-brand-700"
            >
              {n}
            </button>
          ))}
        </div>
        <input
          id={`${id}-len`}
          type="range"
          min={MIN_LENGTH}
          max={64}
          value={Math.min(options.length, 64)}
          onChange={(e) => {
            setLengthDraft(null);
            setLength(e.target.valueAsNumber);
          }}
          className="mt-4 w-full accent-brand-600"
          aria-describedby={`${id}-len-hint`}
        />
        <p id={`${id}-len-hint`} className={`field-hint ${draftInvalid ? "font-medium text-danger-600" : ""}`}>
          {draftInvalid ? `Enter a whole number from ${MIN_LENGTH} to ${MAX_LENGTH}. ` : ""}
          {MIN_LENGTH}–64 with the slider, up to {MAX_LENGTH} in the number box. 16 or more is recommended.
        </p>

        <div className="mt-6 space-y-2">
          {(Object.keys(groupLabels) as CharacterGroup[]).map((group) => (
            <label
              key={group}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-line px-3 py-2.5 transition-colors hover:bg-surface has-checked:border-brand-200 has-checked:bg-brand-50/50"
            >
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={options[group]}
                  onChange={(e) => update({ [group]: e.target.checked })}
                  className="size-4 accent-brand-600"
                />
                <span className="text-sm font-medium text-ink-900">{groupLabels[group].label}</span>
              </span>
              <span className="font-mono text-xs text-ink-600">{groupLabels[group].example}</span>
            </label>
          ))}
        </div>

        {noGroups && (
          <Notice tone="error" live className="mt-4">
            Select at least one character type to generate a password.
          </Notice>
        )}
      </fieldset>
    </div>
  );
}
