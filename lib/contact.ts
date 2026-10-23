/**
 * Contact form rules shared by the browser (instant feedback) and the server
 * (the source of truth). Keep both sides in sync by changing them only here.
 */

export const SUBJECTS = [
  "General Inquiry",
  "Technical Issue",
  "Bug Report",
  "Feedback",
  "Tool Suggestion",
  "Other",
] as const;
export type Subject = (typeof SUBJECTS)[number];

export const LIMITS = { name: 100, email: 254, message: 5000, messageMin: 10 } as const;

/** Submissions faster than this are almost always bots. */
export const MIN_FILL_MS = 3000;

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

// Practical email check: something@something.tld, no spaces, no angle brackets.
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

export function isValidEmail(email: string): boolean {
  return email.length <= LIMITS.email && EMAIL_RE.test(email);
}

/** Returns an error message per invalid field (empty object when valid). */
export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name) errors.name = "Enter your full name.";
  else if (name.length > LIMITS.name) errors.name = `Your name must be ${LIMITS.name} characters or fewer.`;

  if (!email) errors.email = "Enter your email address.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address, like name@example.com.";

  if (!(SUBJECTS as readonly string[]).includes(input.subject)) errors.subject = "Choose a subject.";

  if (!message) errors.message = "Enter your message.";
  else if (message.length < LIMITS.messageMin)
    errors.message = `Your message is too short. Please write at least ${LIMITS.messageMin} characters.`;
  else if (message.length > LIMITS.message)
    errors.message = `Your message must be ${LIMITS.message.toLocaleString("en-US")} characters or fewer.`;

  return errors;
}
