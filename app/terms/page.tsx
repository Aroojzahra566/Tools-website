import Link from "next/link";
import { InfoPage } from "@/components/info-page";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: `The terms for using ${siteConfig.name}: acceptable use of the free tools, ownership of your content, accuracy, liability and how to contact us.`,
  path: "/terms",
});

export default function TermsPage() {
  const name = siteConfig.name;
  return (
    <InfoPage title="Terms of Use" path="/terms" updated={siteConfig.legalLastUpdated}>
      <p>
        These terms apply to your use of {name} and its tools (the “site”). By using the site you agree to them. If you
        do not agree, please do not use the site.
      </p>

      <h2>Using the tools</h2>
      <p>
        You may use the tools free of charge for personal and commercial purposes. No account is needed. You agree not
        to:
      </p>
      <ul>
        <li>use the site for anything unlawful, or to create content that infringes other people’s rights;</li>
        <li>attempt to disrupt, overload or gain unauthorized access to the site or its infrastructure;</li>
        <li>use automated means to access the site in a way that places an unreasonable load on it;</li>
        <li>copy or republish the site’s design, text or code as your own service without permission.</li>
      </ul>

      <h2>Your content</h2>
      <p>
        Text, images and other material you use with the tools stay yours. Because the tools run in your browser, we do
        not receive or store that material. You are responsible for making sure you have the right to use any content
        you process, and for the results you create, such as QR codes and compressed images.
      </p>

      <h2>Accuracy and availability</h2>
      <p>
        We work to make every tool accurate and explain how each one works on its page. However, the tools are provided
        “as is” and “as available”, without warranties of any kind, express or implied, including fitness for a
        particular purpose. We do not guarantee that the site will always be available, error-free or that results will
        meet your needs. Please check important results, such as calculations used for financial decisions, before
        relying on them. See our <Link href="/disclaimer">Disclaimer</Link> for more detail.
      </p>

      <h2>Passwords and security</h2>
      <p>
        The Password Generator uses your browser’s cryptographically secure random number generator. You are responsible
        for storing and using generated passwords safely. We never see the passwords you generate and cannot recover
        them.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {name} and its operators will not be liable for any indirect,
        incidental, special or consequential loss, or for any loss of data, profits or business, arising from your use
        of, or inability to use, the site. Nothing in these terms limits liability that cannot be limited by law.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The site’s design, text, logo and code are owned by {name} or its licensors. Output you create with the tools
        belongs to you.
      </p>

      <h2>Third-party links and advertising</h2>
      <p>
        The site may contain links to other websites and, in the future, advertisements from third parties. We are not
        responsible for third-party content, products or services.
      </p>

      <h2>Privacy</h2>
      <p>
        Our <Link href="/privacy-policy">Privacy Policy</Link> explains how we handle information.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. The “Last updated” date shows when they last changed. Continuing to
        use the site after a change means you accept the updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> or through our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </InfoPage>
  );
}
