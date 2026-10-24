import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InfoPage } from "@/components/info-page";
import { ToolLogo } from "@/components/tool-logo";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { tools, toolPath, type ToolSlug } from "@/lib/tools";

export const metadata = pageMetadata({
  title: `About ${siteConfig.name} | Free Browser-Based Online Tools`,
  description: `Why ${siteConfig.name} exists, who it’s for, and how its six free browser-based tools help with everyday writing, image, security and math tasks.`,
  path: "/about",
  absoluteTitle: true,
});

/** How each tool helps, in plain terms. */
const toolHelp: Record<ToolSlug, string> = {
  "word-counter":
    "Counts words, characters, sentences and paragraphs as you type, so you can check an essay, a cover letter or a social post against a length limit.",
  "image-compressor":
    "Reduces image file sizes so photos fit upload limits, send faster by email and load quicker on websites. You can compare the result before you download it.",
  "qr-code-generator":
    "Turns a link or any text into a QR code you can download as a PNG, ready for a flyer, menu, slide or business card.",
  "password-generator":
    "Creates long, random passwords using your browser’s secure random number generator, with the length and character types you choose.",
  "case-converter":
    "Changes text to UPPERCASE, lowercase, Title Case or Sentence case, which saves retyping when text arrives in the wrong format.",
  "percentage-calculator":
    "Works out percentages of numbers, what percent one number is of another, and percentage increases and decreases, showing the formula each time.",
};

export default function AboutPage() {
  const email = siteConfig.contactEmail;
  return (
    <InfoPage
      title={`About ${siteConfig.name}`}
      path="/about"
      breadcrumb="About Us"
      lead={`${siteConfig.name} brings six useful online tools together in one fast, simple place. ${siteConfig.tagline}`}
    >
      <h2>What {siteConfig.name} is</h2>
      <p>
        {siteConfig.name} is a free website of small, focused tools for everyday tasks: counting words, shrinking
        images, making QR codes, creating passwords, changing text case and working out percentages. Each tool opens
        instantly in your browser, with no app to install and no account to create.
      </p>

      <h2>Why we built it</h2>
      <p>
        Small jobs often take longer than they should. Checking whether an application essay is under its word limit,
        getting a photo below an upload form’s size limit, or calculating a discount shouldn’t involve signing up for a
        service, sitting through pop-ups or wondering where your files are being sent.
      </p>
      <p>
        {siteConfig.name} was created to make those tasks quick and straightforward: open the tool, do the job and get
        on with your day. Because the tools run on your own device, what you type or upload stays with you.
      </p>

      <h2>Who the tools are for</h2>
      <p>The tools are designed for anyone with a quick task to finish, including:</p>
      <ul>
        <li>
          <strong>Students</strong> checking essay lengths, formatting headings or working through percentage problems.
        </li>
        <li>
          <strong>Professionals and freelancers</strong> preparing documents, proposals, invoices and presentations.
        </li>
        <li>
          <strong>Creators and small businesses</strong> optimizing images and adding QR codes to printed materials.
        </li>
        <li>
          <strong>Developers</strong> who need a quick password, a QR code or a reformatted piece of text.
        </li>
        <li>
          <strong>Everyday internet users</strong> who simply want a task done without a learning curve.
        </li>
      </ul>

      <h2>Our six tools</h2>
      <ul className="mt-6! space-y-3! pl-0!">
        {tools.map((tool) => (
          <li key={tool.slug} className="flex list-none gap-4 rounded-2xl border border-line bg-paper p-4 sm:p-5">
            <ToolLogo slug={tool.slug} className="size-10 sm:size-11" />
            <div className="min-w-0">
              <Link href={toolPath(tool.slug)} className="font-semibold">
                {tool.name}
              </Link>
              <p className="mt-1! mb-0! text-base">{toolHelp[tool.slug]}</p>
            </div>
          </li>
        ))}
      </ul>
      <p>
        Want to learn more about the tasks behind the tools? Our <Link href="/blog">guides</Link> explain how to{" "}
        <Link href="/blog/how-to-compress-images-online">compress images</Link>,{" "}
        <Link href="/blog/how-to-create-a-qr-code">create a QR code</Link>,{" "}
        <Link href="/blog/how-to-create-strong-passwords">make strong passwords</Link> and{" "}
        <Link href="/blog/how-to-calculate-percentages">calculate percentages</Link>.
      </p>

      <h2>What we care about</h2>
      <h3>Simplicity</h3>
      <p>
        Every tool does one job, with the tool itself at the top of the page and clear labels on every control. There
        are no sign-ups, no usage limits and no premium tiers.
      </p>
      <h3>Usability and accessibility</h3>
      <p>
        The tools adapt to phones, tablets and computers. Controls can be used with a keyboard, have visible focus
        indicators and screen reader labels, and the site respects your device’s reduced-motion setting. If something is
        hard to use with your setup, please <Link href="/contact">tell us</Link>.
      </p>
      <h3>Privacy</h3>
      <p>
        All six tools process your input in your browser. Your text, images and passwords are not uploaded to our
        servers. Our <Link href="/privacy-policy">Privacy Policy</Link> explains exactly what information the site does
        and doesn’t handle.
      </p>
      <h3>Helpful, reliable results</h3>
      <p>
        We aim for tools that give correct, predictable results. Each tool page explains how its results are worked out
        and where its limits are, for example that title-case conversion can’t recognize every proper noun, or that
        sentence counts are estimates. If you spot a mistake, we want to fix it.
      </p>

      <h2>Get in touch</h2>
      <p>
        Questions, bug reports and ideas for new tools are always welcome. Email us at{" "}
        <a href={`mailto:${email}`}>{email}</a> or visit the <Link href="/contact">contact page</Link>.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/tools" className="btn btn-primary">
          Browse all tools
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <Link href="/" className="btn btn-secondary">
          Back to the homepage
        </Link>
      </div>
    </InfoPage>
  );
}
