import Link from "next/link";
import { Mail } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Contact ${siteConfig.name} | Help & Feedback`,
  description: `Get help with ${siteConfig.name}'s free online tools, report a bug or technical issue, or send feedback and ideas by form or email.`,
  path: "/contact",
  absoluteTitle: true,
});

export default function ContactPage() {
  const email = siteConfig.contactEmail;
  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="container-page pt-6 pb-10 sm:pt-8 sm:pb-12">
          <Breadcrumbs items={[{ name: "Contact Us", path: "/contact" }]} />
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-600">
            Have a question, found a problem with one of our tools, or want to share feedback? Send us a message using
            the form below.
          </p>
        </div>
      </div>

      <div className="container-page py-10 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <section aria-labelledby="contact-form-heading" className="card p-5 sm:p-8">
            <h2 id="contact-form-heading" className="text-xl font-semibold tracking-tight text-ink-900">
              Send us a message
            </h2>
            <div className="mt-5">
              <ContactForm email={email} />
            </div>
          </section>

          <section
            aria-labelledby="contact-email-heading"
            className="mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-paper p-5 sm:flex-row sm:items-center sm:gap-4 sm:p-6"
          >
            <span className="hidden size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 sm:flex">
              <Mail className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h2 id="contact-email-heading" className="text-sm font-medium text-ink-600">
                Prefer email? Write to our support team
              </h2>
              <a
                href={`mailto:${email}`}
                className="mt-0.5 inline-block text-lg font-semibold break-words text-brand-600 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600"
              >
                {email}
              </a>
            </div>
          </section>

          <div className="mt-8 space-y-3 text-sm leading-relaxed text-ink-600">
            <p>
              For a bug or technical issue, please tell us which tool you were using, your browser and device, and what
              happened. Please don’t include passwords, private documents or other sensitive information.
            </p>
            <p>
              We use the details you send only to reply to you. See our{" "}
              <Link href="/privacy-policy" className="font-medium text-brand-600 underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              for how messages are handled, or{" "}
              <Link href="/" className="font-medium text-brand-600 underline underline-offset-2">
                return to the homepage
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
