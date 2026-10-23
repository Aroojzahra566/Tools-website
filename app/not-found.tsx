import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolLogo } from "@/components/tool-logo";
import { tools, toolPath } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for could not be found.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="container-page py-20 text-center sm:py-28">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-ink-600">
        The page you’re looking for doesn’t exist or may have moved. Try one of our tools instead.
      </p>
      <ul className="mx-auto mt-10 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
        {tools.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={toolPath(tool.slug)}
              className="card flex items-center gap-3 px-4 py-3 font-medium text-ink-900 transition-colors hover:border-brand-200"
            >
              <ToolLogo slug={tool.slug} className="size-8" />
              {tool.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/" className="btn btn-primary mt-10">
        Back to home
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
