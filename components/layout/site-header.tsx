"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { tools, toolPath } from "@/lib/tools";
import { ToolLogo } from "@/components/tool-logo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "All Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur supports-backdrop-filter:bg-canvas/80">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active ? "text-ink-900" : "text-ink-600 hover:bg-surface hover:text-ink-900"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-500" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="btn btn-ghost -mr-2 px-2 md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {open && (
        <div id={menuId} className="animate-fade-in border-t border-line bg-paper md:hidden">
          <nav aria-label="Mobile" className="container-page py-3">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-ink-800 hover:bg-surface aria-[current=page]:bg-brand-50 aria-[current=page]:text-brand-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 px-3 text-xs font-semibold tracking-wide text-ink-500 uppercase">Tools</p>
            <ul className="mt-1 grid grid-cols-1 gap-1 pb-2 min-[420px]:grid-cols-2">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={toolPath(tool.slug)}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-surface hover:text-ink-900"
                  >
                    <ToolLogo slug={tool.slug} className="size-6" />
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
