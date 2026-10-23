"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { LoaderCircle, Send } from "lucide-react";
import { Notice } from "@/components/ui/notice";
import {
  LIMITS,
  SUBJECTS,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactInput,
} from "@/lib/contact";

const EMPTY: ContactInput = { name: "", email: "", subject: "", message: "" };

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "failed"; message: string };

/**
 * Contact form. Messages are sent to /api/contact, which delivers them by email.
 * Success is shown only after the server confirms the email was accepted.
 */
export function ContactForm({ email }: { email: string }) {
  const id = useId();
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const openedAt = useRef(0);
  const submissionId = useRef<string | null>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  function update(field: ContactField, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors((e) => ({ ...e, [field]: validateContact(next)[field] }));
    if (status.kind === "sent" || status.kind === "failed") setStatus({ kind: "idle" });
  }

  function blur(field: ContactField) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validateContact(values)[field] }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status.kind === "sending") return; // prevents double submission

    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    const firstInvalid = (["name", "email", "subject", "message"] as ContactField[]).find((f) => found[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // One ID per message, reused if the visitor retries, so the server can drop duplicates.
    submissionId.current ??= crypto.randomUUID();
    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypot.current?.value ?? "",
          elapsedMs: Date.now() - openedAt.current,
          submissionId: submissionId.current,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: ContactErrors };
      if (res.ok && data.ok) {
        setStatus({ kind: "sent" });
        setValues(EMPTY);
        setTouched({});
        setErrors({});
        submissionId.current = null;
      } else {
        if (data.errors) setErrors(data.errors);
        setStatus({
          kind: "failed",
          message: data.error ?? `Your message could not be sent. Please email us at ${email}.`,
        });
      }
    } catch {
      setStatus({
        kind: "failed",
        message: `We couldn’t reach the server. Check your connection and try again, or email us at ${email}.`,
      });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const sending = status.kind === "sending";
  const fieldProps = (field: ContactField) => ({
    id: `${id}-${field}`,
    name: field,
    value: values[field],
    onBlur: () => blur(field),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${id}-${field}-error` : undefined,
    disabled: sending,
  });
  const errorText = (field: ContactField) =>
    errors[field] ? (
      <p id={`${id}-${field}-error`} className="mt-1.5 text-sm font-medium text-danger-600">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${id}-required`} className="space-y-5">
      <p id={`${id}-required`} className="text-sm text-ink-600">
        All fields are required.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="field-label">
            Full Name
          </label>
          <input
            {...fieldProps("name")}
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            onChange={(e) => update("name", e.target.value)}
            className="field-input"
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="field-label">
            Email Address
          </label>
          <input
            {...fieldProps("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            required
            maxLength={LIMITS.email}
            onChange={(e) => update("email", e.target.value)}
            className="field-input"
          />
          {errorText("email")}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-subject`} className="field-label">
          Subject
        </label>
        <select
          {...fieldProps("subject")}
          required
          onChange={(e) => update("subject", e.target.value)}
          className="field-input"
        >
          <option value="" disabled>
            Choose a subject
          </option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errorText("subject")}
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor={`${id}-message`} className="field-label">
            Message
          </label>
          <span className="mb-1.5 text-xs text-ink-600 tabular-nums" aria-hidden="true">
            {values.message.length.toLocaleString("en-US")} / {LIMITS.message.toLocaleString("en-US")}
          </span>
        </div>
        <textarea
          {...fieldProps("message")}
          rows={6}
          required
          maxLength={LIMITS.message}
          onChange={(e) => update("message", e.target.value)}
          className="field-input min-h-36 resize-y leading-relaxed"
        />
        {errorText("message")}
      </div>

      {/* Spam trap: hidden from people and screen readers; bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input ref={honeypot} id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div ref={statusRef} tabIndex={-1} className="outline-none" aria-live="polite">
        {status.kind === "sent" && (
          <Notice tone="success">
            Thank you, your message has been sent. We’ll reply to the email address you provided as soon as we can.
          </Notice>
        )}
        {status.kind === "failed" && <Notice tone="error">{status.message}</Notice>}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full sm:w-auto"
        disabled={sending}
        // Keep focus in the field while pressing: otherwise its blur validation can show an error,
        // shift the button down mid-click, and the click would miss.
        onMouseDown={(e) => e.preventDefault()}
      >
        {sending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
