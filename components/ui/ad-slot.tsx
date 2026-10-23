"use client";

import { useEffect, useRef } from "react";
import { adsConfig, type AdPlacement } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * A single AdSense display unit. Renders nothing unless ads are enabled in
 * lib/ads.ts and a slot ID exists for this placement. It is always placed
 * outside tool controls and clearly labelled as an advertisement.
 */
export function AdSlot({ placement, className = "" }: { placement: AdPlacement; className?: string }) {
  const slot = adsConfig.slots[placement];
  const pushed = useRef(false);
  const active = adsConfig.enabled && Boolean(slot);

  useEffect(() => {
    if (!active || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers or consent choices can prevent loading. The page works without ads.
    }
  }, [active]);

  if (!active) return null;

  return (
    <aside aria-label="Advertisement" className={`my-12 border-y border-line py-6 ${className}`}>
      <p className="mb-2 text-center text-xs tracking-wide text-ink-500 uppercase">Advertisement</p>
      <ins
        className="adsbygoogle block min-h-[100px]"
        data-ad-client={adsConfig.client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
