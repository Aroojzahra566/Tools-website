import { adsTxtPublisherId } from "@/lib/ads";

/**
 * Serves /ads.txt once a valid AdSense publisher ID is configured
 * (NEXT_PUBLIC_ADSENSE_CLIENT). Returns 404 until then.
 * f08c47fec0942fa0 is Google's published certification authority ID.
 */
export function GET() {
  const pub = adsTxtPublisherId();
  if (!pub) return new Response("Not found", { status: 404 });
  return new Response(`google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
