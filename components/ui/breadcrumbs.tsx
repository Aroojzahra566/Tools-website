import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./json-ld";
import { absoluteUrl } from "@/lib/site";

export interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-ink-600">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((crumb, i) => {
            const last = i === all.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-medium text-ink-800">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.path} className="hover:text-brand-600">
                      {crumb.name}
                    </Link>
                    <ChevronRight className="size-3.5 text-ink-300" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: crumb.name,
            item: absoluteUrl(crumb.path),
          })),
        }}
      />
    </>
  );
}
