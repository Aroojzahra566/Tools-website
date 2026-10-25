import Link from "next/link";
import { ToolPage } from "@/components/tool-page";
import { QrCodeGenerator } from "@/components/tools/qr-code-generator";
import { toolMetadata } from "@/lib/metadata";

export const metadata = toolMetadata("qr-code-generator");

export default function Page() {
  return (
    <ToolPage
      slug="qr-code-generator"
      intro="Create a QR code for a website link, a short message or any other text. Choose the size and colors, then download it as a PNG image."
      tool={<QrCodeGenerator />}
      faqs={[
        {
          question: "How do I create a QR code for a link?",
          answer:
            "Copy the full web address, including “https://”, and paste it into the box. Select Generate QR code, check the preview, then download it. Scan the downloaded image with your phone to confirm it opens the right page before you print or share it.",
        },
        {
          question: "What can I put in a QR code?",
          answer:
            "Any text up to 2,331 bytes: a website link, a short message, a reference number, an email link such as mailto:hello@example.com or a phone link such as tel:+15551234567. Most letters use one byte, while accented letters and emoji use two to four. Shorter content gives a simpler code that scans more easily.",
        },
        {
          question: "How do I download my QR code?",
          answer:
            "Select Download PNG. The image is saved as qr-code.png at the size you chose. If you change the text, size or colors afterwards, select Generate QR code again so the download matches your new settings.",
        },
        {
          question: "Can I change the size and colors?",
          answer:
            "Yes. Choose a size from 128 to 1,024 pixels and pick any foreground and background color. The tool warns you when the contrast is too low for reliable scanning. A dark code on a light background works best, and 768 pixels or more is a good size for print.",
        },
        {
          question: "Do these QR codes expire?",
          answer:
            "No. These are static QR codes: the text or URL is stored directly in the pattern, so the code keeps working for as long as the content it points to exists. There is no service in between that could be switched off. The trade-off is that you can’t change the destination after printing; you would need to generate a new code.",
        },
        {
          question: "Do you track scans of my QR code?",
          answer:
            "No. The code contains exactly what you typed, with no tracking link or redirect added, so scans go straight to your content and we never see them.",
        },
        {
          question: "Why won’t my QR code scan?",
          answer:
            "The most common causes are low contrast between the colors, an inverted code (light pattern on a dark background), printing it too small, or a missing “https://” at the start of a link. Keep a dark foreground on a light background and print the code at least 2 cm (about 0.8 inches) wide.",
        },
        {
          question: "Can I use the QR codes commercially?",
          answer:
            "Yes. The images you generate are yours to use on packaging, menus, flyers, business cards or anywhere else.",
        },
      ]}
    >
      <h2>How to create a QR code</h2>
      <ol>
        <li>Enter a URL (such as <code>https://example.com</code>) or any text in the box.</li>
        <li>Choose the image size and, optionally, the foreground and background colors.</li>
        <li>Select <strong>Generate QR code</strong> and check the preview.</li>
        <li>Select <strong>Download PNG</strong>, then scan the downloaded image with your phone before you share or print it.</li>
      </ol>

      <h2>How QR codes work</h2>
      <p>
        A QR code stores data as a grid of dark and light squares. The three large squares in the corners help a camera
        find and straighten the code, and extra error-correction data lets it be read even if part of it is dirty or
        damaged. This generator uses error-correction level M, which can recover from roughly 15% damage while keeping
        the pattern reasonably simple.
      </p>
      <p>
        The text is encoded exactly as you enter it. If it is a link, your phone’s camera will offer to open it. If it
        is plain text, the phone will simply show the text.
      </p>

      <h2>Examples</h2>
      <ul>
        <li><strong>Website link:</strong> <code>https://www.example.com/menu</code> for a restaurant table card.</li>
        <li><strong>Email address:</strong> <code>mailto:hello@example.com</code> opens a new email on most phones.</li>
        <li><strong>Phone number:</strong> <code>tel:+15551234567</code> offers to call the number.</li>
        <li><strong>Location:</strong> open the place in Google Maps or Apple Maps, use <strong>Share</strong> to copy its link, and paste that link to make a QR code that opens the map.</li>
        <li><strong>PDF or document:</strong> upload the file to a service that gives it a public link, such as your website or cloud storage, then encode that link. The QR code points to the file; it can’t contain the file itself.</li>
        <li><strong>Plain text:</strong> a Wi-Fi password, a reference number or a short note.</li>
      </ul>

      <h2>Printing tips</h2>
      <ul>
        <li>Download a larger size (768 px or more) for print so the edges stay sharp.</li>
        <li>Leave the plain margin around the code. Scanners need this “quiet zone” to find the edges, so the generator adds one four modules (squares) wide, as the QR code standard recommends.</li>
        <li>Dark colors on a light background scan most reliably. Avoid light-on-dark designs.</li>
      </ul>
      <p>
        Sharing a Wi-Fi network or account? Use the <Link href="/password-generator">Password Generator</Link> to
        create a strong password first.
      </p>
    </ToolPage>
  );
}
