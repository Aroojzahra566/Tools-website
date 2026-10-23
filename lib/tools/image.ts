/**
 * Browser-side image compression using the Canvas API.
 * Images are decoded and re-encoded locally and are never uploaded.
 */

export type OutputFormat = "image/jpeg" | "image/webp" | "image/png";

export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const ACCEPTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
export const MAX_FILE_BYTES = 25 * 1024 * 1024;
/**
 * Largest canvas area that works reliably across browsers
 * (iOS Safari limits canvases to about 16.7 million pixels).
 */
export const MAX_CANVAS_PIXELS = 16_777_216;

export const FORMAT_INFO: Record<OutputFormat, { label: string; ext: string; lossy: boolean }> = {
  "image/jpeg": { label: "JPEG", ext: "jpg", lossy: true },
  "image/webp": { label: "WebP", ext: "webp", lossy: true },
  "image/png": { label: "PNG", ext: "png", lossy: false },
};

export interface DecodedImage {
  source: ImageBitmap | HTMLImageElement;
  width: number;
  height: number;
}

export interface CompressOptions {
  format: OutputFormat;
  /** 0.1–1. Ignored for PNG. */
  quality: number;
  /** Longest edge in pixels, or null to keep the original size. */
  maxDimension: number | null;
  /**
   * Maximum output size in bytes, or null for none. When set, the quality is
   * chosen automatically and, if needed, the image is scaled down to fit.
   */
  targetBytes: number | null;
}

export interface CompressResult {
  blob: Blob;
  width: number;
  height: number;
  /** True when the image was scaled down to stay within the browser's canvas limit. */
  limitedByCanvas: boolean;
  /** Quality used for lossy formats (0–1). */
  quality?: number;
  /** Set when a target size was requested. */
  target?: { bytes: number; met: boolean; resized: boolean };
}

/** Target-size presets. Sizes use 1 KB = 1,000 bytes, so the file also passes forms that count 1 KB as 1,024 bytes. */
export const TARGET_SIZES: { bytes: number; label: string }[] = [
  { bytes: 20_000, label: "Under 20 KB" },
  { bytes: 50_000, label: "Under 50 KB" },
  { bytes: 100_000, label: "Under 100 KB" },
  { bytes: 200_000, label: "Under 200 KB" },
  { bytes: 500_000, label: "Under 500 KB" },
  { bytes: 1_000_000, label: "Under 1 MB" },
];

/** Returns an error message, or null if the file can be processed. */
export function validateFile(file: File): string | null {
  const name = file.name.toLowerCase();
  const typeOk =
    (ACCEPTED_TYPES as readonly string[]).includes(file.type) ||
    (file.type === "" && ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext)));
  if (!typeOk) {
    return `“${file.name}” is not a supported image. Choose a JPEG, PNG or WebP file.`;
  }
  if (file.size === 0) return "This file is empty.";
  if (file.size > MAX_FILE_BYTES) {
    return `This file is ${formatBytes(file.size)}. The maximum size is ${formatBytes(MAX_FILE_BYTES)}.`;
  }
  return null;
}

export async function decodeImage(file: File): Promise<DecodedImage> {
  try {
    if (typeof createImageBitmap === "function") {
      // Applies EXIF orientation so phone photos are not rotated.
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
      return { source: bitmap, width: bitmap.width, height: bitmap.height };
    }
  } catch {
    // Fall back to an <img> element below.
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    await img.decode();
    return { source: img, width: img.naturalWidth, height: img.naturalHeight };
  } catch {
    throw new Error("This image could not be read. The file may be damaged or use an unsupported variant of the format.");
  } finally {
    URL.revokeObjectURL(url);
  }
}

function targetSize(width: number, height: number, maxDimension: number | null) {
  let scale = 1;
  if (maxDimension && Math.max(width, height) > maxDimension) {
    scale = maxDimension / Math.max(width, height);
  }
  let limitedByCanvas = false;
  if (width * height * scale * scale > MAX_CANVAS_PIXELS) {
    scale = Math.sqrt(MAX_CANVAS_PIXELS / (width * height));
    limitedByCanvas = true;
  }
  return {
    width: Math.max(1, Math.floor(width * scale)),
    height: Math.max(1, Math.floor(height * scale)),
    limitedByCanvas,
  };
}

/** Draws the image onto a canvas of the given size. Call `release` when finished. */
function drawToCanvas(image: DecodedImage, width: number, height: number, format: OutputFormat) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser could not create a drawing surface for this image.");
  if (format === "image/jpeg") {
    // JPEG has no transparency, so transparent areas become white instead of black.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image.source, 0, 0, width, height);
  return {
    canvas,
    // Free the canvas memory right away (important on mobile).
    release() {
      canvas.width = 0;
      canvas.height = 0;
    },
  };
}

async function encode(canvas: HTMLCanvasElement, format: OutputFormat, quality: number | undefined): Promise<Blob> {
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, format, quality));
  if (!blob) throw new Error("Your browser could not encode the image in this format. Try another output format.");
  // Some browsers silently fall back to PNG when a format is unsupported.
  if (blob.type !== format) {
    throw new Error(`Your browser does not support saving ${FORMAT_INFO[format].label} images. Try another output format.`);
  }
  return blob;
}

export async function compressImage(
  image: DecodedImage,
  options: CompressOptions,
  isCancelled: () => boolean = () => false,
): Promise<CompressResult> {
  if (options.targetBytes) return compressToTarget(image, options, options.targetBytes, isCancelled);
  const { width, height, limitedByCanvas } = targetSize(image.width, image.height, options.maxDimension);
  const quality = FORMAT_INFO[options.format].lossy ? options.quality : undefined;
  const { canvas, release } = drawToCanvas(image, width, height, options.format);
  try {
    const blob = await encode(canvas, options.format, quality);
    return { blob, width, height, limitedByCanvas, quality };
  } finally {
    release();
  }
}

/** Highest quality tried for target sizes, and the lowest before the image is scaled down instead. */
const TARGET_MAX_QUALITY = 0.92;
const TARGET_MIN_QUALITY = 0.4;

/**
 * Finds the highest quality that fits under `targetBytes` (binary search).
 * If even the minimum quality is too large, the image is scaled down step by
 * step and the search repeats. PNG has no quality setting, so it is only scaled.
 */
async function compressToTarget(
  image: DecodedImage,
  options: CompressOptions,
  targetBytes: number,
  isCancelled: () => boolean,
): Promise<CompressResult> {
  const lossy = FORMAT_INFO[options.format].lossy;
  const start = targetSize(image.width, image.height, options.maxDimension);
  let { width, height } = start;
  let resized = false;
  let smallest: { blob: Blob; width: number; height: number; quality?: number } | null = null;

  for (let round = 0; round < 12; round++) {
    const { canvas, release } = drawToCanvas(image, width, height, options.format);
    try {
      let best: { blob: Blob; quality?: number } | null = null;
      let floor: Blob;
      if (!lossy) {
        floor = await encode(canvas, options.format, undefined);
        if (floor.size <= targetBytes) best = { blob: floor };
      } else {
        const top = await encode(canvas, options.format, TARGET_MAX_QUALITY);
        if (top.size <= targetBytes) {
          best = { blob: top, quality: TARGET_MAX_QUALITY };
          floor = top;
        } else {
          floor = await encode(canvas, options.format, TARGET_MIN_QUALITY);
          if (floor.size <= targetBytes) {
            let lo = TARGET_MIN_QUALITY;
            let hi = TARGET_MAX_QUALITY;
            best = { blob: floor, quality: lo };
            for (let i = 0; i < 6; i++) {
              if (isCancelled()) throw new CancelledError();
              const mid = (lo + hi) / 2;
              const blob = await encode(canvas, options.format, mid);
              if (blob.size <= targetBytes) {
                best = { blob, quality: mid };
                lo = mid;
              } else {
                hi = mid;
              }
            }
          }
        }
      }
      if (best) {
        return {
          ...best,
          width,
          height,
          limitedByCanvas: start.limitedByCanvas,
          target: { bytes: targetBytes, met: true, resized },
        };
      }
      if (!smallest || floor.size < smallest.blob.size) {
        smallest = { blob: floor, width, height, quality: lossy ? TARGET_MIN_QUALITY : undefined };
      }
      // Too big even at the lowest quality: scale down so the pixel count shrinks roughly in proportion.
      const ratio = Math.sqrt(targetBytes / floor.size) * 0.95;
      const nextW = Math.max(1, Math.floor(width * Math.min(ratio, 0.9)));
      const nextH = Math.max(1, Math.floor(height * Math.min(ratio, 0.9)));
      if (Math.max(nextW, nextH) < 32) break;
      width = nextW;
      height = nextH;
      resized = true;
      if (isCancelled()) throw new CancelledError();
    } finally {
      release();
    }
  }
  // Could not reach the target: return the smallest version produced.
  return {
    blob: smallest!.blob,
    width: smallest!.width,
    height: smallest!.height,
    quality: smallest!.quality,
    limitedByCanvas: start.limitedByCanvas,
    target: { bytes: targetBytes, met: false, resized },
  };
}

/** Thrown when a newer compression job replaces the current one. */
export class CancelledError extends Error {
  constructor() {
    super("Cancelled");
  }
}

/** Formats a target size in decimal kilobytes, matching the preset labels. */
export function formatTarget(bytes: number): string {
  return bytes >= 1_000_000 ? `${bytes / 1_000_000} MB` : `${bytes / 1000} KB`;
}

let webpSupport: boolean | undefined;
export function supportsWebPEncoding(): boolean {
  if (webpSupport === undefined) {
    try {
      const c = document.createElement("canvas");
      c.width = c.height = 1;
      webpSupport = c.toDataURL("image/webp").startsWith("data:image/webp");
    } catch {
      webpSupport = false;
    }
  }
  return webpSupport;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function outputFileName(original: string, format: OutputFormat): string {
  const base = original.replace(/\.[^.]+$/, "") || "image";
  return `${base}-compressed.${FORMAT_INFO[format].ext}`;
}
