import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

/** Layout for informational and legal pages. */
export function InfoPage({
  title,
  path,
  breadcrumb,
  lead,
  updated,
  children,
}: {
  title: string;
  path: string;
  /** Shorter breadcrumb label, if different from the title. */
  breadcrumb?: string;
  lead?: ReactNode;
  /** "Last updated" date for legal pages. */
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="container-page pt-6 pb-10 sm:pt-8 sm:pb-12">
          <Breadcrumbs items={[{ name: breadcrumb ?? title, path }]} />
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">{title}</h1>
          {lead && <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-600">{lead}</p>}
          {updated && <p className="mt-3 text-sm text-ink-600">Last updated: {updated}</p>}
        </div>
      </div>
      <div className="container-page py-12 sm:py-16">
        <div className="prose-content mx-auto max-w-3xl">{children}</div>
      </div>
    </>
  );
}
