import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ToolCard } from "@/components/ui/tool-card";
import { pageMetadata } from "@/lib/metadata";
import { tools } from "@/lib/tools";

export const metadata = pageMetadata({
  title: "All Free Online Tools for Text, Images, QR Codes & More",
  description:
    "Browse all six free tools: word counter, image compressor, QR code generator, password generator, case converter and percentage calculator. No sign-up.",
  path: "/tools",
  absoluteTitle: true,
});

export default function ToolsPage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="container-page pt-6 pb-10 sm:pt-8 sm:pb-12">
          <Breadcrumbs items={[{ name: "All Tools", path: "/tools" }]} />
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">All Free Online Tools</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-600">
            {tools.length} free tools for writing, images, security and everyday math. Each one runs in your browser,
            with no account and no uploads. For step-by-step help, read our{" "}
            <Link href="/blog" className="font-medium text-brand-600 underline underline-offset-2">
              guides
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} headingLevel="h2" />
          ))}
        </div>
      </div>
    </>
  );
}
