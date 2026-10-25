import Link from "next/link";
import { ArticleFaq, ArticleLayout } from "@/components/blog/article-layout";
import { ToolCallout } from "@/components/blog/tool-callout";
import { postMetadata, toc } from "@/lib/blog-page";

const SLUG = "how-to-create-a-qr-code";
export const metadata = postMetadata(SLUG);

const s = {
  what: "What a QR code is",
  how: "How QR codes store information",
  url: "How to create a QR code from a link",
  text: "How to create a QR code from plain text",
  wifi: "How to create a QR code for Wi-Fi",
  download: "Downloading your QR code",
  size: "Choosing the right size",
  contrast: "Why contrast and the quiet zone matter",
  test: "How to test a QR code before sharing it",
  features: "What our QR code generator can and can’t do",
  static: "Static versus dynamic QR codes",
  uses: "Where to use QR codes",
  safety: "Privacy and safety",
  mistakes: "Common mistakes",
  faq: "Frequently asked questions",
  summary: "Summary",
};

export default function Page() {
  return (
    <ArticleLayout slug={SLUG} toc={toc(s)}>
      <p>
        <strong>The short answer:</strong> paste your link or text into a QR code generator, generate the code, check
        that it scans with your phone, and download it as an image. For printing, choose a large image size, keep dark
        modules on a light background, and leave the blank margin around the code untouched.
      </p>
      <p>
        That takes less than a minute. The rest of this guide covers the details that decide whether a code scans
        reliably in the real world: size, contrast, the quiet zone, and the difference between static and dynamic
        codes.
      </p>

      <ToolCallout tool="qr-code-generator">
        Turn a URL or any text into a QR code, choose its size and colors, and download a PNG. No sign-up, no
        tracking and no redirects.
      </ToolCallout>

      <h2 id="what">{s.what}</h2>
      <p>
        A QR code (short for “Quick Response” code) is a square, two-dimensional barcode that a phone camera can read.
        It was invented in 1994 by Denso Wave, a Japanese company, to track car parts, and is now used everywhere from
        restaurant menus to event tickets. QR Code is a registered trademark of DENSO WAVE INCORPORATED.
      </p>
      <p>
        Unlike a traditional barcode, which stores data in one direction, a QR code stores it both horizontally and
        vertically, so it can hold much more information in a small space.
      </p>

      <h2 id="how">{s.how}</h2>
      <p>
        A QR code is made of small black and white squares called <strong>modules</strong>. Three large squares in the
        corners, called finder patterns, let a scanner locate the code and work out its angle. The remaining modules
        encode your data, plus extra error-correction data.
      </p>
      <p>
        Error correction lets a scanner rebuild the content even if part of the code is dirty, scratched or covered.
        There are four levels, which can recover roughly 7%, 15%, 25% or 30% of the code. The QuickToolsWorld generator
        uses the 15% level (called “M”), a common balance between reliability and size.
      </p>
      <p>
        The more you encode, the more modules the code needs, and the denser it looks. A short URL makes a simple code
        with large modules. A long paragraph makes a dense code that needs to be printed bigger to scan well.
      </p>

      <h2 id="url">{s.url}</h2>
      <ol>
        <li>
          Copy the full address of the page from your browser’s address bar, including <code>https://</code>.
        </li>
        <li>
          Open the <Link href="/qr-code-generator">QR Code Generator</Link> and paste the address into the{" "}
          <strong>Text or URL</strong> box.
        </li>
        <li>
          Set the <strong>Size</strong> slider. The default of 512 × 512 pixels suits screens and small prints; move it
          up to 1024 for larger prints.
        </li>
        <li>
          Optionally, choose <strong>Foreground</strong> and <strong>Background</strong> colors. Keep the foreground
          dark and the background light.
        </li>
        <li>
          Select <strong>Generate QR code</strong>. The preview appears on the right, or below on a phone.
        </li>
        <li>Scan the preview with your phone camera and make sure it opens the right page.</li>
        <li>
          Select <strong>Download PNG</strong> to save the image.
        </li>
      </ol>
      <p>
        Including <code>https://</code> matters. Without it, some scanners treat the content as plain text instead of a
        link, so people see the address but can’t tap to open it. The generator encodes exactly what you type and never
        rewrites or shortens your link.
      </p>

      <h2 id="text">{s.text}</h2>
      <p>
        A QR code doesn’t have to contain a link. You can encode any text, such as a short message, a product serial
        number or instructions. When someone scans it, their phone shows the text on screen.
      </p>
      <p>
        To share a <strong>location</strong>, open the place in Google Maps or Apple Maps, use Share to copy its link,
        and turn that link into a QR code. For a <strong>PDF or other document</strong>, put the file somewhere with a
        public link, such as your website or a cloud storage share link, and encode the link. A QR code can’t hold the
        file itself.
      </p>
      <p>
        Some special formats trigger actions on most phones. For example, <code>mailto:hello@example.com</code> starts a
        new email to that address, and <code>tel:+15551234567</code> offers to call the number. Test these on the
        phones your audience is likely to use, because support varies.
      </p>
      <p>
        The generator accepts up to 2,331 bytes, the most a QR code can hold at this error-correction level. Most
        letters take one byte, but accented letters, other alphabets and emoji take two to four bytes each. A live
        counter shows how much space you have used.
      </p>

      <h2 id="wifi">{s.wifi}</h2>
      <p>
        Phones recognise a special text format for Wi-Fi details. Scanning a code that contains it offers to join the
        network without typing the password. Type the details into the generator in this form, replacing the network
        name and password with your own:
      </p>
      <pre>
        <code>WIFI:T:WPA;S:MyNetwork;P:MyPassword;;</code>
      </pre>
      <ul>
        <li>
          <code>T</code> is the security type: <code>WPA</code> for WPA, WPA2 and most WPA3 home networks, or{" "}
          <code>nopass</code> for an open network.
        </li>
        <li>
          <code>S</code> is the network name exactly as it appears, including capital letters.
        </li>
        <li>
          <code>P</code> is the Wi-Fi password.
        </li>
        <li>
          If the name or password contains <code>;</code>, <code>,</code>, <code>:</code>, <code>\</code> or{" "}
          <code>&quot;</code>, put a backslash before that character, for example <code>Cafe\;Guest</code>.
        </li>
      </ul>
      <p>
        Most current iPhone and Android camera apps recognise this format, but test the code on the phones your guests
        are likely to use. Remember that anyone who can see the code can join the network, so only print codes for a
        guest network you are happy to share.
      </p>

      <h2 id="download">{s.download}</h2>
      <p>
        When the code is ready, select <strong>Download PNG</strong>. The image is saved as <code>qr-code.png</code>.
        PNG is lossless, so the edges of every module stay sharp, which is exactly what scanners need. Avoid converting
        a QR code to JPEG, because JPEG compression can blur those edges. Our guide to{" "}
        <Link href="/blog/how-to-compress-images-online">choosing between JPEG, PNG and WebP</Link> explains why.
      </p>
      <p>
        If you change the text, size or colors after generating, the tool tells you the preview is out of date. Select{" "}
        <strong>Generate QR code</strong> again before downloading, so the file matches your settings.
      </p>

      <h2 id="size">{s.size}</h2>
      <p>
        The generator lets you choose an image size from 128 to 1024 pixels square. For screens, such as a slide or a
        web page, 256–512 pixels is usually enough. For print, choose a larger size so the code stays sharp when
        enlarged.
      </p>
      <p>
        To estimate printed size, divide the pixel size by your printer’s resolution. At 300 dots per inch, a 512-pixel
        image prints sharply at about 4.3 cm (1.7 in) wide, and a 1024-pixel image at about 8.7 cm (3.4 in).
      </p>
      <p>
        Scanning distance matters too. A widely used rule of thumb is that a code can be scanned from up to about ten
        times its width, so a 3 cm code works at arm’s length while a code on a poster across a room must be much
        larger. Treat this as a starting point, then test in the actual location.
      </p>

      <h2 id="contrast">{s.contrast}</h2>
      <p>
        Scanners look for a clear difference between dark and light modules. Black on white is the most reliable
        combination. You can use brand colors, but keep the foreground dark and the background light. Many scanners fail
        on light codes on a dark background, and on pairs of colors with similar brightness, such as red on green. The
        generator warns you when your colors have low contrast or are inverted.
      </p>
      <p>
        The <strong>quiet zone</strong> is the plain margin around the code. It separates the code from surrounding
        text and images, so the scanner can find its edges. The QR code standard recommends a quiet zone four modules
        wide, and the generator includes one automatically. When you place the code in a design, don’t crop this margin
        or put other graphics right up against it.
      </p>

      <h2 id="test">{s.test}</h2>
      <ul>
        <li>Scan it with at least two different phones, ideally one iPhone and one Android device.</li>
        <li>Check that the link opens the right page and that the page works well on a phone.</li>
        <li>Print a test copy at the final size and scan it from the distance people will actually use.</li>
        <li>Try it in the real lighting. Glossy surfaces and dim rooms can cause problems.</li>
        <li>Recheck the code after any design changes, such as new colors or a different size.</li>
      </ul>

      <h2 id="features">{s.features}</h2>
      <p>
        Our <Link href="/qr-code-generator">QR Code Generator</Link> is deliberately simple. Here is exactly what it
        offers, so you can decide whether it suits your project:
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              <th scope="col">Supported?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Links, plain text and special formats such as Wi-Fi, email and phone</td>
              <td>Yes, up to 2,331 bytes</td>
            </tr>
            <tr>
              <td>Image size</td>
              <td>Yes, 128 to 1024 pixels square</td>
            </tr>
            <tr>
              <td>Custom foreground and background colors</td>
              <td>Yes, with a warning for low contrast</td>
            </tr>
            <tr>
              <td>PNG download</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>SVG or PDF download</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Logo in the middle of the code</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Dynamic codes (change the destination later)</td>
              <td>No, codes are static</td>
            </tr>
            <tr>
              <td>Scan tracking or analytics</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Expiry date</td>
              <td>None. The codes keep working as long as the content they point to does</td>
            </tr>
            <tr>
              <td>Account or sign-up</td>
              <td>Not needed</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="static">{s.static}</h2>
      <p>
        A <strong>static</strong> QR code stores your content directly in its pattern. It works without any service in
        between, never expires, and can’t be changed after it’s printed. The QuickToolsWorld generator creates static
        codes only.
      </p>
      <p>
        A <strong>dynamic</strong> QR code stores a short link to a redirect service. The service sends people on to
        the real destination, which you can change later, and it can count scans. The trade-off is dependence: if the
        service shuts down or the subscription lapses, every printed code may stop working.
      </p>
      <p>
        If you might need to change the destination later, a simple alternative is to encode a page on your own
        website. You can then update that page, or redirect it, whenever you like.
      </p>

      <h2 id="uses">{s.uses}</h2>
      <p>
        QR codes work best when someone has a phone in hand and a reason to act straight away. Some common uses, with a
        tip for each:
      </p>
      <ul>
        <li>
          <strong>Restaurant menus and table cards:</strong> link to a mobile-friendly menu page, not a large PDF that
          is hard to read on a phone.
        </li>
        <li>
          <strong>Business cards:</strong> link to your website or a contact page. Keep the code at least about 2 cm
          wide, and test it on the printed card.
        </li>
        <li>
          <strong>Posters and flyers:</strong> add a short line telling people what they will get, such as “Scan to book
          a place”. Size the code for the distance people will scan from.
        </li>
        <li>
          <strong>Product packaging and labels:</strong> link to instructions, ingredients or a warranty page. Plain-text
          codes work for serial numbers.
        </li>
        <li>
          <strong>Events:</strong> link to a schedule, map or registration form.
        </li>
        <li>
          <strong>Presentations and documents:</strong> let people open a link on their phone instead of typing it from
          a slide. See the FAQ below for adding a code to Word, Canva or PowerPoint.
        </li>
        <li>
          <strong>Guest Wi-Fi:</strong> use the Wi-Fi format above so visitors can join without typing a password.
        </li>
      </ul>

      <h2 id="safety">{s.safety}</h2>
      <p>
        Anyone who scans a QR code can read its content, so never put private passwords, notes or other secrets in one.
        A guest Wi-Fi code is the exception, because sharing that password is the point.
        A static code also has no expiry, so anything you print stays readable for as long as the paper survives.
      </p>
      <p>
        QR codes are also used in phishing scams, sometimes called “quishing”. Criminals stick fake codes over real ones
        on parking meters or posters, or send them in emails. Before opening a scanned link, check the address your
        phone shows, and be cautious of any page that asks for passwords or payment details. To learn more about
        recognizing phishing, see{" "}
        <a href="https://www.cisa.gov/secure-our-world/recognize-and-report-phishing" rel="noopener">
          CISA’s guide to phishing
        </a>
        .
      </p>
      <p>
        On the creation side, the QuickToolsWorld generator runs in your browser. The text you enter isn’t uploaded,
        and the codes contain no tracking.
      </p>

      <h2 id="mistakes">{s.mistakes}</h2>
      <ul>
        <li>
          <strong>Not testing before printing.</strong> A single typo in a URL means hundreds of useless flyers.
        </li>
        <li>
          <strong>Printing too small.</strong> Dense codes need more space. Shorten the content or print larger.
        </li>
        <li>
          <strong>Low contrast or inverted colors.</strong> Pale codes, or light codes on dark backgrounds, often fail.
        </li>
        <li>
          <strong>Cropping the margin.</strong> Without its quiet zone, a code can be hard for scanners to detect.
        </li>
        <li>
          <strong>Linking to a page that may move.</strong> If the page is deleted or renamed, a static code breaks.
        </li>
        <li>
          <strong>Saving as JPEG or stretching the image.</strong> Keep the PNG and scale it evenly, without distortion.
        </li>
      </ul>

      <ArticleFaq
        items={[
          {
            q: "How do I create a dynamic QR code?",
            a: "You need a dynamic QR code service. It encodes a short link that it controls, so you can change the destination and count scans later, usually with an account or subscription. The code stops working if that service closes or your plan ends. QuickToolsWorld makes static codes only. For a free alternative you can still edit, encode a link on your own website and redirect it wherever you need.",
          },
          {
            q: "How do I scan a QR code?",
            a: "Open your phone’s camera app, point it at the code and tap the link or text that appears. Most iPhones and Android phones support this without an extra app. To scan a QR code in a saved photo or screenshot, use Google Lens on Android or the Photos app on iPhone.",
          },
          {
            q: "Can I make a QR code for plain text instead of a link?",
            a: "Yes. Type any text and the code will contain it exactly. When scanned, the phone simply shows the text, which is useful for reference numbers, short instructions or a note on a label. Don’t put passwords or other secrets in a QR code, because anyone who scans it can read it.",
          },
          {
            q: "How do I add a QR code to Word, Canva or PowerPoint?",
            a: (
              <>
                Download the code as a PNG from the <Link href="/qr-code-generator">QR Code Generator</Link>, then
                insert it like any other picture: Insert → Pictures in Word or PowerPoint, or Uploads in Canva. Resize it
                by dragging a corner so it stays square, keep the white margin around it, and scan the final document or
                printout before you share it.
              </>
            ),
          },
          {
            q: "How do I make a QR code for Wi-Fi?",
            a: (
              <>
                Type your network details in the Wi-Fi format, for example WIFI:T:WPA;S:MyNetwork;P:MyPassword;;
                (replacing the network name and password), into the{" "}
                <Link href="/qr-code-generator">QR Code Generator</Link>, then generate and download the code. Most
                current phone cameras offer to join the network when they scan it. Test it first, and only share codes
                for a network you are happy for anyone who sees the code to use.
              </>
            ),
          },
          {
            q: "Can I track how many people scan my QR code?",
            a: "Not with a static code, because no server is involved when it is scanned. You can still measure visits to the linked page with your own website analytics, for example by adding campaign parameters to the URL before generating the code.",
          },
        ]}
      />

      <h2 id="summary">{s.summary}</h2>
      <p>
        Creating a QR code is quick. Making one that works every time takes a little care: encode the exact URL with{" "}
        <code>https://</code>, choose a size suited to where it will appear, keep dark modules on a light background
        with an intact quiet zone, and test it on real phones. Ready to make yours? Open the{" "}
        <Link href="/qr-code-generator">QR Code Generator</Link>. If the code will appear next to a photo on a website
        or flyer, our guide to <Link href="/blog/how-to-compress-images-online">compressing images</Link> helps keep
        the page fast.
      </p>
    </ArticleLayout>
  );
}
