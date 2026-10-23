import { siteConfig } from "@/lib/site";
import { MIN_FILL_MS, validateContact, type ContactInput } from "@/lib/contact";

/**
 * POST /api/contact
 *
 * Validates a contact-form submission and delivers it to the support inbox
 * through Brevo's transactional email API. Runs only on the server: the Brevo
 * API key is read from the environment and never sent to the browser.
 *
 * Environment variables (see .env.example and the README):
 *   BREVO_API_KEY       required, Brevo API v3 key
 *   CONTACT_TO_EMAIL    inbox that receives messages (default: siteConfig.contactEmail)
 *   CONTACT_FROM_EMAIL  sender address verified in Brevo (default: siteConfig.contactEmail)
 *   CONTACT_FROM_NAME   sender name (default: "QuickToolsWorld Contact Form")
 *
 * Nothing is stored by this route, and message contents are never logged.
 */

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";
const MAX_BODY_BYTES = 20_000;

// Basic abuse protection. These live in memory, so on serverless hosting each
// instance keeps its own counts: good against casual spam, not a hard guarantee.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const recentByIp = new Map<string, number[]>();
const recentIds = new Map<string, number>();

/**
 * Brevo accepts API requests from unverified senders and only rejects them
 * afterwards, which would make the form report success for an email that is
 * never delivered. So before sending, confirm the sender is either an active
 * verified sender or on an authenticated domain. Positive results are cached
 * for 10 minutes; failures are rechecked on the next attempt.
 */
let senderVerifiedAt = 0;
async function senderIsVerified(apiKey: string, from: string): Promise<boolean> {
  if (Date.now() - senderVerifiedAt < 10 * 60 * 1000) return true;
  const headers = { "api-key": apiKey, accept: "application/json" };
  const domain = from.split("@")[1]?.toLowerCase();
  try {
    const [sendersRes, domainsRes] = await Promise.all([
      fetch("https://api.brevo.com/v3/senders", { headers, signal: AbortSignal.timeout(10_000) }),
      fetch("https://api.brevo.com/v3/senders/domains", { headers, signal: AbortSignal.timeout(10_000) }),
    ]);
    const senders = sendersRes.ok
      ? (((await sendersRes.json()) as { senders?: { email?: string; active?: boolean }[] }).senders ?? [])
      : [];
    const domains = domainsRes.ok
      ? (((await domainsRes.json()) as { domains?: { domain_name?: string; authenticated?: boolean }[] }).domains ?? [])
      : [];
    const ok =
      senders.some((x) => x.active && x.email?.toLowerCase() === from.toLowerCase()) ||
      domains.some((d) => d.authenticated && d.domain_name?.toLowerCase() === domain);
    if (ok) senderVerifiedAt = Date.now();
    return ok;
  } catch {
    return false;
  }
}

function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Deletes every IP address and submission ID older than the rate-limit window.
 * This is what the Privacy Policy promises: IP addresses are held only in
 * memory and deleted after about ten minutes.
 */
function sweep(now: number) {
  for (const [ip, hits] of recentByIp) {
    const fresh = hits.filter((t) => now - t < RATE_LIMIT.windowMs);
    if (fresh.length === 0) recentByIp.delete(ip);
    else if (fresh.length !== hits.length) recentByIp.set(ip, fresh);
  }
  for (const [key, t] of recentIds) if (now - t >= RATE_LIMIT.windowMs) recentIds.delete(key);
}
// Sweep once a minute even when no one is using the form. unref() lets the process exit normally.
setInterval(() => sweep(Date.now()), 60_000).unref?.();

function rateLimited(ip: string, now: number): boolean {
  const hits = recentByIp.get(ip) ?? [];
  if (hits.length >= RATE_LIMIT.max) return true;
  hits.push(now);
  recentByIp.set(ip, hits);
  return false;
}

/** True when the request comes from a page on this site (blocks cross-site form posting). */
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Removes line breaks and control characters from single-line values. */
function oneLine(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();
}

export async function POST(request: Request) {
  const fallback = `Please email us directly at ${siteConfig.contactEmail}.`;

  if (!sameOrigin(request)) return json(403, { ok: false, error: "This form can only be submitted from our website." });

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { ok: false, error: "Your message is too long." });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: "The form data could not be read. Please try again." });
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string) : "");
  const input: ContactInput = {
    name: oneLine(str("name")),
    email: oneLine(str("email")),
    subject: str("subject"),
    message: str("message").trim(),
  };

  // Spam checks: a hidden "website" field that people never see (bots fill it in),
  // and a minimum time between opening the form and sending it. No email is sent.
  const honeypot = str("website");
  const elapsed = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
  if (honeypot || elapsed < MIN_FILL_MS) {
    return json(400, { ok: false, error: "Your message could not be sent. Please wait a moment and try again." });
  }

  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) return json(422, { ok: false, error: "Please correct the highlighted fields.", errors });

  const now = Date.now();
  sweep(now);
  const id = str("submissionId").slice(0, 100);
  if (id && recentIds.has(id)) {
    // The same submission arrived twice (for example a double click or a retry after a slow response).
    return json(200, { ok: true, duplicate: true });
  }

  if (rateLimited(clientIp(request), now)) {
    return json(429, { ok: false, error: `You’ve sent several messages in a short time. Please try again later. ${fallback}` });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("[contact] BREVO_API_KEY is not set; the contact form cannot send email.");
    return json(503, { ok: false, error: `The contact form isn’t available right now. ${fallback}` });
  }

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contactEmail;
  const from = process.env.CONTACT_FROM_EMAIL || siteConfig.contactEmail;
  const fromName = process.env.CONTACT_FROM_NAME || `${siteConfig.name} Contact Form`;

  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    "",
    "Message:",
    input.message,
    "",
    "---",
    `Sent from the contact form at ${siteConfig.url}/contact. Reply to this email to answer the sender.`,
  ].join("\n");

  if (!(await senderIsVerified(apiKey, from))) {
    console.error(
      `[contact] Sender ${from} is not a verified Brevo sender or authenticated domain; not sending. Verify it in Brevo (Senders, domains & dedicated IPs).`,
    );
    return json(503, { ok: false, error: `The contact form isn’t available right now. ${fallback}` });
  }

  try {
    const res = await fetch(BREVO_URL, {
      method: "POST",
      headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        sender: { name: fromName, email: from },
        to: [{ email: to, name: `${siteConfig.name} Support` }],
        replyTo: { email: input.email, name: input.name },
        subject: `[Contact] ${input.subject} from ${input.name}`.slice(0, 200),
        textContent: text,
        tags: ["contact-form"],
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      // Log Brevo's error code only, never the visitor's details.
      let code = "";
      try {
        code = ((await res.json()) as { code?: string }).code ?? "";
      } catch {}
      console.error(`[contact] Brevo rejected the email: HTTP ${res.status} ${code}`);
      return json(502, { ok: false, error: `Your message could not be sent right now. ${fallback}` });
    }

    if (id) recentIds.set(id, now);
    return json(200, { ok: true });
  } catch (e) {
    console.error(`[contact] Could not reach Brevo: ${e instanceof Error ? e.name : "unknown error"}`);
    return json(502, { ok: false, error: `Your message could not be sent right now. ${fallback}` });
  }
}
