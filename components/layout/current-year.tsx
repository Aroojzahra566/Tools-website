"use client";

import { useSyncExternalStore } from "react";
import { siteConfig } from "@/lib/site";

const subscribe = () => () => {};

/**
 * The current year. Pages are prerendered at build time, so the HTML contains
 * the fallback year from config, and the browser replaces it with the real
 * current year after loading.
 */
export function CurrentYear() {
  return useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => siteConfig.copyrightYear,
  );
}
