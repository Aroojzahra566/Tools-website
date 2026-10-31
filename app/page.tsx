import type { Metadata } from "next";
import Link from "next/link";
import { Gauge, LockKeyhole, MousePointerClick, UserRoundX, Wallet } from "lucide-react";
import { ToolFinder } from "@/components/tool-finder";
import { PostCard } from "@/components/blog/post-card";
import { latestPostPerTool } from "@/lib/blog";
import { ArrowRight } from "lucide-react";
import { ToolLogo } from "@/components/tool-logo";
import { Faq, type FaqItem } from "@/components/ui/faq";
import { JsonLd } from "@/components/ui/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { faqPageData } from "@/lib/structured-data";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { tools, toolPath } from "@/lib/tools";

// The homepage title already contains the brand, so it skips the "| Brand" suffix.
export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — Free Online Tools for Everyday Tasks`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

const benefits = [
  {
    icon: Wallet,
    title: "Free to use",
    text: "Every tool is free. There are no trials, usage limits or paid upgrades.",
  },
  {
    icon: UserRoundX,
    title: "No account required",
    text: "Open a tool and start working. You are never asked to sign up or log in.",
  },
  {
    icon: MousePointerClick,
    title: "Simple interfaces",
    text: "Each page does one job, with clear labels and the tool right at the top.",
  },
  {
    icon: Gauge,
    title: "Fast, in-browser processing",
    text: "Text, images and passwords are handled on your device, so there is no upload to wait for.",
  },
  {
    icon: LockKeyhole,
    title: "Privacy-conscious",
    text: "What you type or upload is not sent to our servers, stored or logged.",
  },
];

const steps = [
  { title: "Choose a tool", text: "Pick one of the six tools above, or search for it by name." },
  { title: "Add your input", text: "Enter text, upload an image, or select calculation options." },
  { title: "Get the result", text: "Results appear instantly, or as soon as your image is processed." },
  { title: "Copy or download", text: "Copy the result to your clipboard, or download the file where supported." },
];

const faqs: FaqItem[] = [
  {
    question: "Are the tools free?",
    answer: "Yes. All six tools are free to use, with no usage limits and no paid version.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No. There are no accounts on this site. Open any tool and use it straight away.",
  },
  {
    question: "Are my files uploaded to a server?",
    answer: (
      <>
        No. The tools run in your browser, so the text you type, the images you compress and the passwords you generate
        stay on your device and are not sent to our servers. See the{" "}
        <Link href="/privacy-policy" className="font-medium text-brand-600 underline underline-offset-2">
          Privacy Policy
        </Link>{" "}
        for details.
      </>
    ),
  },
  {
    question: "Can I use the tools on my phone?",
    answer:
      "Yes. Every page adapts to phones and tablets. The Image Compressor can open photos from your gallery or camera roll, and downloads are saved by your phone's browser.",
  },
  {
    question: "Which browsers are supported?",
    answer:
      "Current versions of Chrome, Edge, Firefox and Safari. Some options, such as WebP output in the Image Compressor, depend on your browser, and the tool tells you when one is unavailable.",
  },
  {
    question: "How do I report a problem or suggest a new tool?",
    answer: (
      <>
        Use the{" "}
        <Link href="/contact" className="font-medium text-brand-600 underline underline-offset-2">
          contact page
        </Link>{" "}
        to ask a question, report a problem or suggest a new tool.
      </>
    ),
  },
];

function HeroTiles() {
  return (
    <nav aria-label="Tool shortcuts" className="hidden lg:block">
      <ul className="grid grid-cols-3 gap-3">
        {tools.map((tool, i) => (
          <li key={tool.slug} className={i % 3 === 1 ? "translate-y-6" : ""}>
            <Link
              href={toolPath(tool.slug)}
              className="group flex aspect-square flex-col justify-between rounded-2xl border border-line bg-paper p-4 text-ink-900 shadow-(--shadow-card) transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-(--shadow-card-hover)"
            >
              <ToolLogo
                slug={tool.slug}
                className="size-12 transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105"
              />
              <span className="text-sm leading-snug font-semibold">{tool.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function HeroIntro() {
  return (
    <>
      <h1 className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm font-semibold text-ink-800 shadow-(--shadow-card) sm:text-base">
        <span className="size-1.5 rounded-full bg-lilac-400" aria-hidden="true" />
        Free Online Tools for Everyday Tasks
      </h1>
      <p className="mt-6 text-[2.75rem] leading-[1.02] font-bold tracking-tight text-ink-900 sm:text-6xl lg:text-7xl">
        Less hassle.
        <br />
        <span className="relative inline-block text-brand-600">
          More done.
          <svg
            aria-hidden="true"
            viewBox="0 0 300 12"
            preserveAspectRatio="none"
            className="absolute -bottom-2 left-0 h-2.5 w-full text-lilac-300 sm:-bottom-3 sm:h-3"
          >
            <path d="M2 9C60 3 140 1 298 6" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </span>
      </p>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-ink-600 sm:text-xl">
        Free, easy-to-use tools for the little tasks that make a big difference.
      </p>
      <p className="mt-3 max-w-xl leading-relaxed text-pretty text-ink-600">
        Count words, compress images, create QR codes, generate passwords, convert text, and calculate percentages — all
        in one place.
      </p>
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: absoluteUrl("/"),
          description: siteConfig.description,
          inLanguage: "en",
          publisher: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": absoluteUrl("/#organization"),
          name: siteConfig.name,
          url: absoluteUrl("/"),
          logo: absoluteUrl("/apple-icon"),
          email: siteConfig.contactEmail,
          contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: siteConfig.contactEmail },
        }}
      />
      <JsonLd data={faqPageData(faqs)} />

      <ToolFinder intro={<HeroIntro />} aside={<HeroTiles />} />

      <section aria-labelledby="why-heading" className="container-page py-20 sm:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Why us</p>
          <h2 id="why-heading" className="mt-2 text-3xl font-bold tracking-tight text-ink-900">
            Why {siteConfig.name}?
          </h2>
          <p className="mt-3 text-lg text-ink-600">
            Small tasks should take seconds. Each tool does one job well, without distractions or hidden catches.
          </p>
        </div>
        <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-ink-900 text-brand-400">
                <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-semibold text-ink-900">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-heading" className="border-y border-line bg-surface py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">How it works</p>
            <h2 id="how-heading" className="mt-2 text-3xl font-bold tracking-tight text-ink-900">
              Four steps, no setup
            </h2>
          </div>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="card p-6">
                <span className="flex size-8 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700 ring-1 ring-brand-100">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="guides-heading" className="container-page pt-20 sm:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">From the blog</p>
            <h2 id="guides-heading" className="mt-2 text-3xl font-bold tracking-tight text-ink-900">
              Guides for everyday tasks
            </h2>
            <p className="mt-3 text-lg text-ink-600">
              Step-by-step explanations, with worked examples and the mistakes to avoid.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-700"
          >
            Visit the blog
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latestPostPerTool().map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <div className="container-page grid gap-14 py-20 sm:py-24 lg:grid-cols-[1fr_1.6fr]">
        <section aria-labelledby="popular-heading">
          <p className="eyebrow">Quick links</p>
          <h2 id="popular-heading" className="mt-2 text-3xl font-bold tracking-tight text-ink-900">
            Jump straight in
          </h2>
          <ul className="mt-6 space-y-3">
            {tools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={toolPath(tool.slug)}
                  className="font-medium text-ink-800 underline decoration-line-strong underline-offset-4 hover:text-brand-600 hover:decoration-brand-600"
                >
                  {tool.h1}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <Faq items={faqs} />
      </div>
    </>
  );
}
