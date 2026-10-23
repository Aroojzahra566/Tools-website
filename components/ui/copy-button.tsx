"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

async function writeClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy approach (e.g. non-secure contexts).
  }
  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

/** Copies `text` and confirms with a visible and screen-reader-announced message. */
export function CopyButton({
  text,
  label = "Copy",
  variant = "secondary",
  className = "",
  disabled,
}: {
  text: string;
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function onClick() {
    const ok = await writeClipboard(text);
    setState(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || !text}
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className}`}
    >
      {state === "copied" ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
      <span>{state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : label}</span>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? "Copied to clipboard" : state === "failed" ? "Could not copy. Select the text and copy it manually." : ""}
      </span>
    </button>
  );
}
