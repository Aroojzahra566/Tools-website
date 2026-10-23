/**
 * Google AdSense configuration.
 *
 * The AdSense script (adsbygoogle.js) loads on every page for this publisher ID,
 * as Google requires for site review. NEXT_PUBLIC_ADSENSE_CLIENT can override the ID.
 *
 * Ad UNITS are still off: none are rendered until NEXT_PUBLIC_ADSENSE_ENABLED is
 * "true" and a slot ID exists for the placement.
 *
 * Ad unit (slot) IDs are created in AdSense under Ads > By ad unit after your
 * site is approved. Add them to the matching NEXT_PUBLIC_ADSENSE_SLOT_* variables.
 * A placement without a slot ID renders nothing.
 *
 * See README.md ("Enabling Google AdSense") for the full checklist, including
 * consent requirements for visitors in the EEA, the UK and Switzerland.
 */

const PUBLISHER_ID_PATTERN = /^ca-pub-\d{16}$/;

/** QuickToolsWorld's AdSense publisher ID. It is public (it appears in every page's HTML), not a secret. */
const DEFAULT_CLIENT = "ca-pub-1544968719280843";

const rawClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || DEFAULT_CLIENT;
const client = PUBLISHER_ID_PATTERN.test(rawClient) ? rawClient : "";

export const adsConfig = {
  /** Publisher ID. Adds the AdSense script, the verification meta tag and ads.txt. */
  client,
  /** True whenever the AdSense script is loaded (a valid publisher ID exists). */
  scriptLoaded: client !== "",
  /** Renders ad units. Turn on after approval. */
  enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true" && client !== "",
  slots: {
    /** Below the tool, before the explanatory content. */
    toolBelow: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BELOW?.trim() ?? "",
    /** Near the end of tool pages, before related tools. */
    toolFooter: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_FOOTER?.trim() ?? "",
  },
} as const;

export type AdPlacement = keyof typeof adsConfig.slots;

/** Publisher ID without the "ca-" prefix, as used in ads.txt. */
export function adsTxtPublisherId(): string | null {
  return adsConfig.client ? adsConfig.client.replace(/^ca-/, "") : null;
}
