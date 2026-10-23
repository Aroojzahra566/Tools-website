import Link from "next/link";
import { InfoPage } from "@/components/info-page";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { adsConfig } from "@/lib/ads";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles information: browser-based tools, contact form messages, technical logs, cookies and advertising.`,
  path: "/privacy-policy",
});

/*
 * Policy text supplied by the site owner. Two parts adapt to the actual configuration
 * so the page never describes something that isn't set up:
 *  - Brevo is named only when BREVO_API_KEY is configured (read at build time; only a
 *    true/false value reaches the page, never the key).
 *  - The advertising paragraph uses its "we use Google AdSense" version whenever the
 *    AdSense script is loaded (see lib/ads.ts).
 * Update privacyLastUpdated in lib/site.ts whenever this text changes.
 */

const ext = { rel: "noopener noreferrer", target: "_blank" } as const;

function Email() {
  return <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>;
}

function AdsSettingsLink() {
  return (
    <a href="https://adssettings.google.com/" {...ext}>
      Google Ads Settings
    </a>
  );
}

export default function PrivacyPolicyPage() {
  const ads = adsConfig.scriptLoaded;
  const brevo = Boolean(process.env.BREVO_API_KEY);

  return (
    <InfoPage title="Privacy Policy" path="/privacy-policy">
      <p>
        At QuickToolsWorld.com, your privacy matters. We keep things simple and collect as little personal information
        as possible.
      </p>

      <h2 id="tools">Your tools, your data</h2>
      <p>
        Our six tools run in your browser. The text, images, passwords, and calculations you use are processed on your
        device and are not uploaded to our servers, provided the tools operate as currently implemented. We do not
        require an account to use our website.
      </p>

      <h2 id="contacting-us">Contacting us</h2>
      <p>
        If you contact us through our <Link href="/contact">contact form</Link> or email us at <Email />, we receive the
        information you provide, such as your name, email address, subject, and message. We use it to respond to your
        inquiry and handle the issue you report. Contact-form emails may be processed by our email delivery provider
        {brevo ? (
          <>
            ,{" "}
            <a href="https://www.brevo.com/legal/privacypolicy/" {...ext}>
              Brevo
            </a>
            ,
          </>
        ) : (
          ""
        )}{" "}
        and stored by our email hosting provider. We do not use these messages to send marketing emails.
      </p>

      <h2 id="technical-information">Technical information</h2>
      <p>
        Our hosting provider may automatically collect information such as your IP address, browser type, and pages
        visited to operate, secure, and maintain the website.
      </p>

      <h2 id="cookies-advertising">Cookies and advertising</h2>
      {ads ? (
        <p>
          We use Google AdSense to display advertisements. Google and its partners use cookies or similar technologies
          to serve and measure ads, including personalized advertising where applicable, and some of these cookies are
          stored under this site’s domain. Where the law requires consent, it is requested through a consent message
          before personalized ads are shown. We do not use analytics cookies. You can manage Google’s advertising
          preferences at <AdsSettingsLink />, and read{" "}
          <a href="https://policies.google.com/technologies/partner-sites" {...ext}>
            how Google uses information from sites that use its services
          </a>
          .
        </p>
      ) : (
        <p>
          We do not currently use advertising or analytics cookies. We may introduce Google AdSense in the future to
          display advertisements. If we do, Google and its partners may use cookies or similar technologies to serve and
          measure ads, including personalized advertising where applicable. We will provide the required disclosures and
          consent controls where required by law. You can manage Google’s advertising preferences at <AdsSettingsLink />
          .
        </p>
      )}

      <h2 id="sharing-retention">Sharing and data retention</h2>
      <p>
        We do not sell your personal information. Information may be processed by our hosting, email, and other service
        providers when necessary to operate the website or respond to you. We retain contact messages only as long as
        reasonably necessary to handle your request and any follow-up, subject to applicable legal requirements.
      </p>

      <h2 id="choices">Your privacy choices</h2>
      <p>
        You can contact us to ask about, access, correct, or request deletion of your personal information, subject to
        applicable law. Email <Email /> with the subject “Privacy Request.”
      </p>

      <h2 id="children">Children’s privacy</h2>
      <p>
        Our website is intended for a general audience and is not directed at children under 13. If you believe a child
        has provided us with personal information, please contact us.
      </p>

      <h2 id="changes">Changes to this policy</h2>
      <p>
        We may update this Privacy Policy when our practices change. Any updates will be published on this page, along
        with a revised “Last updated” date.
      </p>

      <h2 id="contact">Contact us</h2>
      <p>
        If you have questions about this Privacy Policy or how we handle your information, email <Email />.
      </p>

      <p>
        <strong>Last updated:</strong> {siteConfig.privacyLastUpdated}
      </p>

      <p>
        Related pages: <Link href="/contact">Contact Us</Link>, <Link href="/about">About Us</Link>,{" "}
        <Link href="/terms">Terms of Use</Link> and <Link href="/disclaimer">Disclaimer</Link>.
      </p>
    </InfoPage>
  );
}
