import Link from "next/link";
import { InfoPage } from "@/components/info-page";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description: `How accurate the ${siteConfig.name} tools and guides are, what they are and aren’t intended for, and why you should check important results before relying on them.`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <InfoPage title="Disclaimer" path="/disclaimer" updated={siteConfig.legalLastUpdated}>
      <p>
        The tools on {siteConfig.name} are provided for general informational and convenience purposes. We aim to make
        them accurate, and each tool page explains how its results are produced. Please keep the following in mind.
      </p>

      <h2>Calculations and counts</h2>
      <p>
        The Percentage Calculator and Word Counter apply standard formulas and rules, which are described on their pages.
        Results are rounded for display, and other software may count words or sentences slightly differently. The
        calculator is not a substitute for professional financial, tax, legal or academic advice. Check important
        figures independently before relying on them.
      </p>

      <h2>Passwords</h2>
      <p>
        The Password Generator produces random passwords using your browser’s cryptographically secure random number
        generator. The strength estimate is an approximation based on length and character variety. No password is
        unbreakable, and overall account security also depends on how passwords are stored and whether two-factor
        authentication is used.
      </p>

      <h2>Images and QR codes</h2>
      <p>
        Compression results depend on the image and on your browser’s built-in encoder, and a compressed file is not
        always smaller than the original. Keep a copy of your original images. Always test-scan QR codes before printing
        or distributing them. Generated QR codes are static and cannot be edited after they are created.
      </p>

      <h2>Text conversion</h2>
      <p>
        The Case Converter follows general rules and cannot reliably recognise names, brands and abbreviations. Review
        converted text before publishing it.
      </p>

      <h2>External links</h2>
      <p>
        Links to other websites are provided for convenience. We do not endorse and are not responsible for their content.
      </p>

      <p>
        For the full terms that apply to your use of the site, see our <Link href="/terms">Terms of Use</Link>.
      </p>
    </InfoPage>
  );
}
