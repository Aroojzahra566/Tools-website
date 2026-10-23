import Link from "next/link";
import { LogoMark, Wordmark } from "./logo";
import { CurrentYear } from "./current-year";
import { siteConfig } from "@/lib/site";
import { tools, toolPath } from "@/lib/tools";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/tools", label: "All Tools" },
  { href: "/blog", label: "Blog" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/disclaimer", label: "Disclaimer" },
];

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-ink-900">{title}</h2>
      <ul className="mt-3 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-ink-600 transition-colors hover:text-brand-600">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg">
            <LogoMark className="size-7" />
            <Wordmark className="text-base" />
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">
            {siteConfig.tagline} Every tool runs in your browser, so your text, images and passwords
            stay on your device.
          </p>
          {siteConfig.socialLinks.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {siteConfig.socialLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} rel="me noopener" className="text-sm font-medium text-ink-700 hover:text-brand-600">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <FooterColumn
          title="Tools"
          links={tools.map((t) => ({ href: toolPath(t.slug), label: t.name }))}
        />
        <FooterColumn title="Company" links={companyLinks} />
        <FooterColumn title="Legal" links={legalLinks} />
      </div>
      <div className="border-t border-line">
        <div className="container-page py-5 text-sm text-ink-600">
          © <CurrentYear /> {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
