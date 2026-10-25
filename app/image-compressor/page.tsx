import Link from "next/link";
import { ToolPage } from "@/components/tool-page";
import { ImageCompressor } from "@/components/tools/image-compressor";
import { toolMetadata } from "@/lib/metadata";
import { formatBytes, MAX_FILE_BYTES } from "@/lib/tools/image";

export const metadata = toolMetadata("image-compressor");

export default function Page() {
  return (
    <ToolPage
      slug="image-compressor"
      intro="Make JPEG, PNG and WebP images smaller for websites, email and messaging. Adjust the quality, compare the result with the original, and download it."
      tool={<ImageCompressor />}
      faqs={[
        {
          question: "How do I compress an image to 100 KB?",
          answer:
            "Choose your image, select JPEG output, and set Target size to “Under 100 KB”. The tool picks the highest quality that fits and, if necessary, reduces the dimensions. Check the result in the preview, then download it. The same steps work for 20 KB, 50 KB, 200 KB, 500 KB and 1 MB.",
        },
        {
          question: "Why does a file “under 100 KB” show as 97.7 KB?",
          answer:
            "Targets use 1 KB = 1,000 bytes, so “under 100 KB” means at most 100,000 bytes. The size display counts 1 KB as 1,024 bytes, so 100,000 bytes appears as 97.7 KB. This way the file is accepted by forms that use either definition.",
        },
        {
          question: "Does compressing an image reduce its quality?",
          answer:
            "JPEG and WebP compression removes some fine detail, but at quality settings around 70–85% the difference is usually hard to see. PNG output is lossless, so quality is unchanged and only resizing makes it smaller. After compressing, drag the before-and-after slider over the preview to check the result at full size before you download.",
        },
        {
          question: "Are my images uploaded to a server?",
          answer:
            "No. Your browser decodes and re-encodes the image on your device using the Canvas API. The file never leaves your computer or phone.",
        },
        {
          question: "Why did my compressed image get bigger?",
          answer:
            "Images that are already heavily compressed, very small, or simple graphics saved as PNG can grow when they are re-encoded. The tool tells you when this happens and lets you keep the original. Lowering the quality, resizing, or switching to WebP usually helps.",
        },
        {
          question: "Why doesn’t the quality slider work for PNG?",
          answer:
            "PNG is a lossless format: it keeps every pixel exactly, so there is no quality setting to lower. Browsers can only save PNGs at full quality. To make a PNG smaller, resize it or convert it to WebP, which supports transparency, or to JPEG if you don’t need transparency.",
        },
        {
          question: "Does compressing remove photo metadata?",
          answer:
            "Yes. Re-encoding through a canvas does not copy EXIF metadata such as camera details or GPS location into the new file. The image is rotated correctly before saving, so photos stay the right way up.",
        },
        {
          question: "Which image files can I compress?",
          answer: `JPEG, PNG and WebP files up to ${formatBytes(MAX_FILE_BYTES)}, on a computer or in your phone’s browser. Other formats, such as HEIC photos or GIFs, aren’t supported, so convert them to JPEG first. Images above about 16.7 megapixels are scaled down automatically to stay within browser memory limits, and the tool tells you when this happens.`,
        },
        {
          question: "Which output format should I choose?",
          answer:
            "Use JPEG for photos that need to work everywhere. Use WebP for the smallest files on the web; it also keeps transparency. Use PNG only when you need a lossless copy, such as for screenshots with sharp text.",
        },
      ]}
    >
      <h2>How to compress an image</h2>
      <ol>
        <li>Drag an image onto the upload area, or select <strong>Choose an image</strong>.</li>
        <li>Pick an output format and move the <strong>Quality</strong> slider. The preview and file size update automatically.</li>
        <li>Need the file under a limit, such as 100 KB for an online form? Choose it under <strong>Target size</strong> instead of setting the quality yourself.</li>
        <li>Optionally choose a maximum size under <strong>Resize</strong>. Reducing pixel dimensions often saves more space than lowering quality.</li>
        <li>Drag the comparison slider to check the result against the original, then select <strong>Download</strong>.</li>
      </ol>

      <h2>Compress an image to 100 KB, 200 KB or another size limit</h2>
      <p>
        Job applications, admission forms, exam registrations and government portals often reject images above a fixed
        size, commonly 20 KB, 50 KB, 100 KB or 200 KB. Choose the limit under <strong>Target size</strong> and the tool
        does the rest:
      </p>
      <ol>
        <li>It tries a high quality first. If the file is already small enough, you get the best-looking version.</li>
        <li>Otherwise, it searches for the highest JPEG or WebP quality that still fits under the limit.</li>
        <li>
          If even a low quality is too large, it reduces the image’s dimensions step by step until the file fits, and
          tells you the new size in pixels. Nothing is resized without a message.
        </li>
      </ol>
      <p>
        Targets use 1 KB = 1,000 bytes, so a file made “under 100 KB” is at most 100,000 bytes. That passes forms that
        count 1 KB as 1,000 bytes and those that count it as 1,024 bytes. The result shows the exact byte count. Very
        small targets, such as 20 KB, work best for small images like passport-style photos and signatures. For larger
        photos, start by choosing a smaller size under <strong>Resize</strong>, such as 800 px. Some forms also set
        required pixel dimensions or a file type (usually JPEG), so check the form’s instructions.
      </p>

      <h2>How the compression works</h2>
      <p>
        The tool draws your image onto an HTML canvas inside the browser and exports it again with the format and
        quality you choose. JPEG and WebP are <em>lossy</em> formats: at lower quality settings they discard fine detail
        that is hard to notice, which can shrink files dramatically. The size you see is the exact size of the file you
        will download.
      </p>
      <p>
        Because the image is re-encoded, metadata such as camera details and location is not carried over. Results vary
        between browsers, as each uses its own encoder.
      </p>

      <h2>Supported formats</h2>
      <ul>
        <li><strong>Input:</strong> JPEG (.jpg, .jpeg), PNG (.png) and WebP (.webp). Animated images are saved as a single still frame.</li>
        <li><strong>Output:</strong> JPEG and PNG in all modern browsers, and WebP where your browser supports saving it (the option is disabled if not).</li>
      </ul>

      <h2>Tips for smaller files</h2>
      <ul>
        <li>For photos on a website, a quality of 70–85% usually looks almost identical to the original at normal viewing size.</li>
        <li>Phone photos are often 4000 pixels wide or more. Resizing to 1920 or 1280 pixels is plenty for most web pages and email.</li>
        <li>Screenshots and logos with flat colors often compress better as WebP than as JPEG, without the blurry edges JPEG can create.</li>
      </ul>
      <p>
        Creating a QR code to share a link to your images? Try the{" "}
        <Link href="/qr-code-generator">QR Code Generator</Link>.
      </p>
    </ToolPage>
  );
}
