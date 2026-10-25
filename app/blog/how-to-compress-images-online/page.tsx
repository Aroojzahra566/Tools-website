import Link from "next/link";
import { ArticleFaq, ArticleLayout } from "@/components/blog/article-layout";
import { ToolCallout } from "@/components/blog/tool-callout";
import { postMetadata, toc } from "@/lib/blog-page";

const SLUG = "how-to-compress-images-online";
export const metadata = postMetadata(SLUG);

const s = {
  what: "What image compression is",
  why: "Why image file size matters",
  formats: "JPEG, PNG and WebP compared",
  lossy: "Lossy versus lossless compression",
  dimensions: "How image dimensions affect file size",
  steps: "How to compress an image step by step",
  byFormat: "How to compress JPG, PNG and WebP files",
  target: "How to compress an image to 100 KB or another size limit",
  phone: "How to reduce photo size on a phone",
  vary: "Why results vary between images",
  compare: "How to check the file size and quality of the result",
  png: "When PNG is the better choice",
  web: "Image sizes and optimization for websites",
  mistakes: "Common image compression mistakes",
  faq: "Frequently asked questions",
  summary: "Summary",
};

export default function Page() {
  return (
    <ArticleLayout slug={SLUG} toc={toc(s)}>
      <p>
        <strong>The short answer:</strong> to compress images online without an obvious drop in quality, first
        resize them to the dimensions you actually need, then save photos as JPEG or WebP at a quality setting of about
        70–85%. Compare the result with the original at full size before you use it. Graphics with sharp edges, text
        or transparency usually belong in PNG or WebP instead.
      </p>
      <p>
        This guide explains why those steps work, so you can make good choices for any image, whether it’s a photo
        for an email, a picture for a website or a scan for an upload form with a size limit.
      </p>

      <ToolCallout tool="image-compressor">
        Shrink JPEG, PNG and WebP images in your browser, compare before and after, and download the result. Your
        images are never uploaded.
      </ToolCallout>

      <h2 id="what">{s.what}</h2>
      <p>
        A digital image is a grid of pixels, and each pixel stores a color. Saved without any compression, a
        12-megapixel photo (4000 × 3000 pixels) would need about 36 MB: three bytes of color for each of its 12
        million pixels. Image formats use compression to store the same picture in far less space.
      </p>
      <p>
        Compression works by finding patterns and redundancy. A clear blue sky contains thousands of nearly identical
        pixels, so a format can describe that area much more efficiently than by listing every pixel. Some formats also
        discard detail that people are unlikely to notice, which saves even more space.
      </p>

      <h2 id="why">{s.why}</h2>
      <ul>
        <li>
          <strong>Upload limits.</strong> Job applications, government forms and support tickets often reject files
          above a fixed size.
        </li>
        <li>
          <strong>Email attachments.</strong> Many email services cap the total size of a message, and large
          attachments are slow to send and receive.
        </li>
        <li>
          <strong>Website speed.</strong> Images are often the largest files on a web page. Smaller images load faster,
          especially on mobile connections, and use less of your visitors’ data.
        </li>
        <li>
          <strong>Storage.</strong> Smaller files take up less space on your phone, computer or cloud storage.
        </li>
      </ul>

      <h2 id="formats">{s.formats}</h2>
      <p>
        The format you choose often matters more than any other setting. These three are the most common for everyday
        use, and all modern browsers can display them.
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Format</th>
              <th scope="col">Compression</th>
              <th scope="col">Transparency</th>
              <th scope="col">Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>JPEG</td>
              <td>Lossy</td>
              <td>No</td>
              <td>Photos, where it is supported almost everywhere</td>
            </tr>
            <tr>
              <td>PNG</td>
              <td>Lossless</td>
              <td>Yes</td>
              <td>Screenshots, logos, diagrams and images with text</td>
            </tr>
            <tr>
              <td>WebP</td>
              <td>Lossy or lossless</td>
              <td>Yes</td>
              <td>Photos and graphics on the web, usually smaller than JPEG or PNG</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        WebP often produces a smaller file than JPEG at similar visual quality, and it supports transparency. The
        catch is compatibility outside the browser: some older software and some upload forms still only accept JPEG
        or PNG. If you are not sure what the recipient accepts, JPEG is the safest choice for photos.
      </p>
      <p>
        For a deeper technical comparison, see the{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types" rel="noopener">
          image file type guide on MDN
        </a>{" "}
        and web.dev’s article on{" "}
        <a href="https://web.dev/articles/choose-the-right-image-format" rel="noopener">
          choosing the right image format
        </a>
        .
      </p>

      <h2 id="lossy">{s.lossy}</h2>
      <p>
        <strong>Lossless compression</strong> shrinks a file without changing a single pixel. When you open the image
        again, it is identical to the original. PNG works this way. The savings are limited, especially for photos,
        because natural images contain a lot of fine, unpredictable detail.
      </p>
      <p>
        <strong>Lossy compression</strong> permanently throws away some information to save much more space. JPEG and
        lossy WebP simplify fine detail and subtle color changes in ways the eye tends not to notice. A quality setting
        controls the trade-off: lower quality means a smaller file and more visible artifacts, such as blockiness,
        smudged textures or halos around sharp edges.
      </p>
      <p>
        There is no setting that guarantees “no quality loss” for lossy formats. The realistic goal is a file where
        the difference is too small to matter for how you will use the image. For most photos, a quality between 70%
        and 85% is a good starting point.
      </p>

      <h2 id="dimensions">{s.dimensions}</h2>
      <p>
        File size grows with the number of pixels. Halving an image’s width and height leaves a quarter of the pixels,
        so a 4000 × 3000 photo resized to 2000 × 1500 has 25% of the original pixel count. That alone often makes a
        bigger difference than any quality setting.
      </p>
      <p>
        Think about where the image will be shown. A photo in an email or on a blog rarely needs to be more than about
        1920 pixels wide, and a profile picture needs far less. Phone cameras routinely produce images of 4000 pixels or
        more, which is far larger than most screens can display.
      </p>
      <blockquote>
        Resize first, then compress. Reducing the dimensions to what you need is usually the single biggest saving.
      </blockquote>

      <h2 id="steps">{s.steps}</h2>
      <p>
        Here is how to do it with the free <Link href="/image-compressor">Image Compressor</Link>. Everything happens
        inside your browser, so the image is never sent to a server.
      </p>
      <ol>
        <li>
          Open the <Link href="/image-compressor">Image Compressor</Link> and drag your image onto the upload area, or
          select <strong>Choose an image</strong>. JPEG, PNG and WebP files up to 25 MB are supported.
        </li>
        <li>
          Choose an <strong>output format</strong>. Use JPEG for photos that must work everywhere, WebP for the
          smallest files, or PNG when you need lossless quality.
        </li>
        <li>
          Adjust the <strong>Quality</strong> slider for JPEG or WebP. The default of 75% suits most photos. PNG output
          is always lossless, so the slider is disabled for it.
        </li>
        <li>
          If the image is larger than you need, pick a size under <strong>Resize</strong>, such as “Longest side 1920 px
          (Full HD)”. Choose “Keep original size” to leave the dimensions unchanged.
        </li>
        <li>
          Check the original size, compressed size and percentage change, and use the before-and-after slider to
          inspect the result.
        </li>
        <li>
          Select the download button to save the compressed file. If the new file is not smaller, the tool tells you and
          offers to keep the original instead.
        </li>
      </ol>
      <p>
        The tool re-encodes your image, so camera metadata such as the date taken, camera model and GPS location is not
        copied into the new file. Photos are rotated the right way up before they are saved, so they look the same as
        the original.
      </p>

      <h2 id="byFormat">{s.byFormat}</h2>
      <p>
        Each format compresses differently, so the best approach depends on what you start with and where the file is
        going.
      </p>
      <h3>Compress a JPG (JPEG) image</h3>
      <p>
        JPEG is the easiest format to shrink. Keep the output as JPEG, lower the quality to around 70–85%, and resize if
        the photo is larger than you need. Start from the original camera photo rather than a copy that has already
        been compressed, because every lossy save removes a little more detail.
      </p>
      <h3>Compress a PNG image</h3>
      <p>
        PNG is lossless, so there is no quality setting to lower. Saving a PNG again as PNG keeps every pixel, which
        means the file often shrinks only a little and can even grow. You have three practical options:
      </p>
      <ul>
        <li>
          <strong>Convert it to WebP</strong> to keep transparency with a much smaller file. When you open a PNG in the
          Image Compressor, it chooses WebP output automatically if your browser can save WebP.
        </li>
        <li>
          <strong>Convert it to JPEG</strong> if it is a photo without transparency. Any transparent areas become white,
          and the tool warns you about this.
        </li>
        <li>
          <strong>Keep PNG but reduce the dimensions</strong> when you need a PNG file, for example for a logo or a
          screenshot with sharp text.
        </li>
      </ul>
      <h3>Compress a WebP image</h3>
      <p>
        WebP files are often compressed already, so expect smaller savings. Lower the quality a little or reduce the
        dimensions. If a website or form doesn’t accept WebP, convert it to JPEG instead. Saving WebP depends on your
        browser: if yours can’t create WebP files, the option is shown as unavailable.
      </p>

      <h2 id="target">{s.target}</h2>
      <p>
        Online forms for jobs, admissions, exams and government services often set a hard limit, such as 20 KB, 50 KB,
        100 KB or 200 KB. Guessing a quality setting and trying again is slow. Instead, set{" "}
        <strong>Target size</strong> in the <Link href="/image-compressor">Image Compressor</Link> to the limit you
        need:
      </p>
      <ol>
        <li>Choose your image and select JPEG output, the format most forms accept.</li>
        <li>
          Set <strong>Target size</strong> to the limit, for example “Under 100 KB”.
        </li>
        <li>
          The tool searches for the highest quality that fits. If even a low quality is too large, it reduces the
          dimensions and tells you the new size in pixels.
        </li>
        <li>Check the preview, then download. The result shows the exact size in bytes.</li>
      </ol>
      <p>
        Two details help avoid rejected uploads. First, targets use 1 KB = 1,000 bytes, so a file “under 100 KB” also
        passes forms that count 1 KB as 1,024 bytes. Second, many forms also require specific pixel dimensions, such as
        a passport-style photo, so resize to those first, then apply the target size. The smaller the target, the
        smaller the image needs to be: 20 KB suits a small photo or signature, but not a detailed full-size picture.
      </p>

      <h2 id="phone">{s.phone}</h2>
      <p>
        Phone cameras save large, detailed photos that are often several megabytes each. You don’t need an app to
        shrink them:
      </p>
      <ol>
        <li>
          Open the <Link href="/image-compressor">Image Compressor</Link> in your phone’s browser.
        </li>
        <li>
          Tap <strong>Choose an image</strong> and pick the photo from your gallery or camera roll.
        </li>
        <li>
          Choose JPEG output, and select a resize option such as “Longest side 1920 px (Full HD)” or a{" "}
          <strong>Target size</strong> if you have a limit.
        </li>
        <li>Check the new size, then download. Your browser saves the file to its usual downloads location.</li>
      </ol>
      <p>
        iPhones often save photos in the HEIC format, which the tool can’t read directly. Because the tool asks for
        JPEG, PNG or WebP files, iOS usually converts a HEIC photo to JPEG automatically when you choose it. If you
        still see an unsupported-file message, you can make future photos JPEG by choosing Settings → Camera → Formats
        → Most Compatible.
      </p>

      <h2 id="vary">{s.vary}</h2>
      <p>
        Two images with the same dimensions can compress very differently. A photo of a calm sky or a plain wall has
        large smooth areas that compress well. A photo of grass, gravel or a busy crowd is full of fine detail, so it
        stays larger at the same quality. Digital noise from low-light photos also takes up space, because the encoder
        tries to preserve it.
      </p>
      <p>
        The starting point matters too. A JPEG that has already been heavily compressed has little left to remove, so
        saving it again may barely shrink it, or may even make it larger. Different browsers also use different
        encoders, so the same settings can produce slightly different sizes in Chrome, Firefox and Safari.
      </p>

      <h2 id="compare">{s.compare}</h2>
      <p>
        First, check the numbers. The Image Compressor shows the original size, the compressed size and the percentage
        saved, and when you use a target size it also shows the exact size in bytes. After downloading, you can confirm
        the size in your file manager: Get Info on a Mac, Properties on Windows, or the file details on your phone.
      </p>
      <p>
        Then check the quality. Use the before-and-after slider, and don’t judge from a small thumbnail. Look at the
        image at the size it will actually be used, and zoom in on areas that reveal problems:
      </p>
      <ul>
        <li>Faces and skin, where blotchy patches are easy to spot.</li>
        <li>Sharp edges and text, which can develop fuzzy halos.</li>
        <li>Smooth gradients such as skies, where banding (visible steps between shades) can appear.</li>
        <li>Fine textures such as hair, fabric or foliage, which can look smeared.</li>
      </ul>
      <p>
        If you see artifacts, raise the quality a little and compare again. Small increases near the top of the scale
        can add a lot of file size, so look for the lowest setting that still looks right to you.
      </p>

      <h2 id="png">{s.png}</h2>
      <p>PNG is often the right choice even though its files can be larger:</p>
      <ul>
        <li>Screenshots of apps, documents or websites, where text must stay crisp.</li>
        <li>Logos, icons, charts and diagrams with flat colors and hard edges.</li>
        <li>Images that need a transparent background (WebP can also do this).</li>
        <li>Images you plan to edit again, where repeated lossy saves would add damage each time.</li>
      </ul>
      <p>
        For a photograph, however, PNG usually produces a much larger file than JPEG or WebP with no visible benefit. If
        you have a photo saved as PNG, converting it to JPEG or WebP is often the easiest saving you can make.
      </p>

      <h2 id="web">{s.web}</h2>
      <p>
        Images are often the largest files on a web page, so they have a big effect on how fast it loads. The goal is to
        send each visitor an image no larger than it will be displayed, in an efficient format.
      </p>
      <h3>How wide should website images be?</h3>
      <p>
        A useful rule is to make an image about twice as wide as the largest space it fills on the page, so it stays
        sharp on high-resolution phone and laptop screens, and no wider. These widths are common starting points, not
        fixed rules. Your website theme or platform may recommend its own sizes.
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Image type</th>
              <th scope="col">Typical width</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Full-width hero or banner</td>
              <td>1920–2560 px</td>
            </tr>
            <tr>
              <td>Image inside a blog post or article</td>
              <td>1200–1600 px</td>
            </tr>
            <tr>
              <td>Product photo that visitors can zoom</td>
              <td>1500–2000 px</td>
            </tr>
            <tr>
              <td>Thumbnail or card image</td>
              <td>400–800 px</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>Website image checklist</h3>
      <ul>
        <li>
          <strong>Resize and compress before uploading.</strong> Some platforms resize images for you, but starting from
          a sensibly sized file saves storage and upload time either way.
        </li>
        <li>
          <strong>Use WebP or a well-compressed JPEG for photos</strong>, and PNG or WebP for graphics with text or
          transparency.
        </li>
        <li>
          <strong>Set the width and height</strong> on images in your HTML, or let your platform do it, so the page
          doesn’t jump around as images load.
        </li>
        <li>
          <strong>Serve smaller versions to smaller screens</strong> with responsive images (<code>srcset</code> and{" "}
          <code>sizes</code>), which many content management systems create automatically.
        </li>
        <li>
          <strong>Lazy-load images further down the page</strong>, but not the main image at the top. Google’s web.dev
          guide to{" "}
          <a href="https://web.dev/articles/optimize-lcp" rel="noopener">
            optimizing Largest Contentful Paint
          </a>{" "}
          explains why the most important image should load as early as possible.
        </li>
        <li>
          <strong>Write useful alt text</strong> describing each meaningful image, for people using screen readers and
          for search engines.
        </li>
      </ul>

      <h2 id="mistakes">{s.mistakes}</h2>
      <ul>
        <li>
          <strong>Compressing the only copy.</strong> Keep your original file. Lossy compression cannot be undone.
        </li>
        <li>
          <strong>Compressing the same JPEG again and again.</strong> Each save loses a little more detail. Start from
          the original whenever you can.
        </li>
        <li>
          <strong>Ignoring dimensions.</strong> A huge image at low quality often looks worse, and is larger, than a
          properly resized image at good quality.
        </li>
        <li>
          <strong>Using JPEG for screenshots and text.</strong> JPEG blurs sharp edges. Use PNG or WebP instead.
        </li>
        <li>
          <strong>Turning quality right down.</strong> Very low settings save a little more space but can make photos
          look obviously damaged.
        </li>
        <li>
          <strong>Forgetting where the file is going.</strong> Check that the destination accepts the format, especially
          before sending WebP.
        </li>
      </ul>

      <ArticleFaq
        items={[
          {
            q: "Can I compress an image without losing any quality?",
            a: "Yes, with lossless compression such as PNG, but the savings are usually modest, especially for photos. Lossy formats like JPEG and WebP save far more space and always remove some detail, although at sensible settings the change is often hard to see.",
          },
          {
            q: "What size should images be for a website?",
            a: "Make each image about twice as wide as the largest space it fills on the page, and no wider. As a starting point, that is roughly 1920–2560 pixels for a full-width banner, 1200–1600 pixels for an image inside an article, and 400–800 pixels for thumbnails. Then compress it as JPEG or WebP.",
          },
          {
            q: "How do I reduce the file size of a photo on my phone?",
            a: (
              <>
                Open the <Link href="/image-compressor">Image Compressor</Link> in your phone’s browser, choose the
                photo from your gallery, pick JPEG output and a smaller size such as “Longest side 1920 px”, then
                download the result. No app is needed, and the photo is processed on your phone.
              </>
            ),
          },
          {
            q: "Does resizing an image reduce its file size?",
            a: "Yes, often more than lowering the quality does. Halving both the width and the height leaves a quarter of the pixels, so the file usually shrinks a lot. Resize to the largest size the image will actually be shown at, then adjust the quality if the file is still too big.",
          },
          {
            q: "Is WebP better than JPEG or PNG?",
            a: "For websites, usually. WebP files are typically smaller than JPEGs at similar visual quality, and unlike JPEG it supports transparency. All current major browsers display WebP, but some older programs and upload forms still don’t accept it, so use JPEG when you’re not sure a WebP file will be accepted.",
          },
          {
            q: "Is it safe to compress private photos online?",
            a: (
              <>
                It depends on the tool. Many online compressors upload your file to their servers. The{" "}
                <Link href="/image-compressor">QuickToolsWorld Image Compressor</Link> processes images inside your
                browser, so the file is not sent anywhere.
              </>
            ),
          },
        ]}
      />

      <h2 id="summary">{s.summary}</h2>
      <p>
        Good image compression comes down to three decisions: the right dimensions, the right format and a sensible
        quality setting. Resize to the size you need, use JPEG or WebP for photos and PNG for graphics with text or
        transparency, and always compare the result with the original. When you are ready, open the{" "}
        <Link href="/image-compressor">Image Compressor</Link> to try it with your own image. Making a QR code for a
        flyer or menu as well? Our guide to{" "}
        <Link href="/blog/how-to-create-a-qr-code">creating a QR code</Link> covers the right size and format for
        print.
      </p>
    </ArticleLayout>
  );
}
