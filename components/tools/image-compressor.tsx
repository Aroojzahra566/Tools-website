"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type DragEvent } from "react";
import { Download, ImageUp, LoaderCircle, RotateCcw } from "lucide-react";
import { Notice } from "@/components/ui/notice";
import { downloadBlob } from "@/lib/tools/download";
import {
  ACCEPTED_EXTENSIONS,
  ACCEPTED_TYPES,
  CancelledError,
  FORMAT_INFO,
  TARGET_SIZES,
  MAX_FILE_BYTES,
  compressImage,
  decodeImage,
  formatBytes,
  formatTarget,
  outputFileName,
  supportsWebPEncoding,
  validateFile,
  type CompressOptions,
  type CompressResult,
  type DecodedImage,
  type OutputFormat,
} from "@/lib/tools/image";

const RESIZE_OPTIONS: { value: number | null; label: string }[] = [
  { value: null, label: "Keep original size" },
  { value: 3840, label: "Longest side 3840 px (4K)" },
  { value: 2560, label: "Longest side 2560 px" },
  { value: 1920, label: "Longest side 1920 px (Full HD)" },
  { value: 1280, label: "Longest side 1280 px" },
  { value: 800, label: "Longest side 800 px" },
];

interface Source {
  file: File;
  image: DecodedImage;
}

/**
 * Shows a Blob as an image. The object URL is created when the image is shown
 * and revoked when the Blob changes or the component is hidden or unmounted.
 */
function BlobImage({ blob, alt, className, style }: { blob: Blob; alt: string; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    const url = URL.createObjectURL(blob);
    img.src = url;
    return () => {
      img.removeAttribute("src");
      URL.revokeObjectURL(url);
    };
  }, [blob]);
  // eslint-disable-next-line @next/next/no-img-element -- local blob preview, not an optimisable asset
  return <img ref={ref} alt={alt} className={className} style={style} />;
}

function releaseImage(image: DecodedImage | undefined) {
  if (image && "close" in image.source) image.source.close();
}

export function ImageCompressor() {
  const [source, setSource] = useState<Source | null>(null);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [options, setOptions] = useState<CompressOptions>({
    format: "image/jpeg",
    quality: 0.75,
    maxDimension: null,
    targetBytes: null,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "compressing" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [webp, setWebp] = useState(true);
  const [compare, setCompare] = useState(50);

  const inputRef = useRef<HTMLInputElement>(null);
  const jobId = useRef(0);
  const debounce = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const id = useId();

  useEffect(() => () => clearTimeout(debounce.current), []);

  async function run(src: Source, opts: CompressOptions) {
    const job = ++jobId.current;
    setStatus("compressing");
    setError(null);
    try {
      const out = await compressImage(src.image, opts, () => job !== jobId.current);
      if (job !== jobId.current) return; // a newer job has started
      setResult(out);
      setStatus("done");
    } catch (e) {
      if (job !== jobId.current || e instanceof CancelledError) return;
      setResult(null);
      setStatus("idle");
      setError(e instanceof Error ? e.message : "Compression failed.");
    }
  }

  function changeOptions(patch: Partial<CompressOptions>, delay = 200) {
    const next = { ...options, ...patch };
    setOptions(next);
    if (!source) return;
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => void run(source, next), delay);
  }

  async function handleFile(file: File | undefined) {
    if (!file) return;
    const invalid = validateFile(file);
    if (invalid) {
      setError(invalid);
      return;
    }
    const webpOk = supportsWebPEncoding();
    setWebp(webpOk);
    setError(null);
    setStatus("loading");
    jobId.current++;
    try {
      const image = await decodeImage(file);
      releaseImage(source?.image);
      const src = { file, image };
      // Keep the input format when it's lossy; otherwise use WebP (keeps transparency) or JPEG.
      const format: OutputFormat =
        file.type === "image/webp" && webpOk
          ? "image/webp"
          : file.type === "image/png"
            ? webpOk
              ? "image/webp"
              : "image/jpeg"
            : "image/jpeg";
      const next = { ...options, format };
      setSource(src);
      setResult(null);
      setOptions(next);
      setCompare(50);
      await run(src, next);
    } catch (e) {
      setStatus(source ? "done" : "idle");
      setError(e instanceof Error ? e.message : "This image could not be read.");
    }
  }

  function reset() {
    jobId.current++;
    clearTimeout(debounce.current);
    releaseImage(source?.image);
    setSource(null);
    setResult(null);
    setError(null);
    setStatus("idle");
    if (inputRef.current) inputRef.current.value = "";
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    void handleFile(e.dataTransfer.files[0]);
  }

  const busy = status === "loading" || status === "compressing";
  const saved = source && result ? 1 - result.blob.size / source.file.size : 0;
  const larger = source && result ? result.blob.size >= source.file.size : false;
  const lossy = FORMAT_INFO[options.format].lossy;
  const auto = options.targetBytes !== null;
  const fileInput = (
    <input
      ref={inputRef}
      id={`${id}-file`}
      type="file"
      accept={[...ACCEPTED_TYPES, ...ACCEPTED_EXTENSIONS].join(",")}
      className="sr-only"
      onChange={(e) => void handleFile(e.target.files?.[0])}
    />
  );

  if (!source) {
    return (
      <div className="space-y-4">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`card flex flex-col items-center justify-center border-2 border-dashed px-6 py-14 text-center transition-colors sm:py-20 ${
            dragging ? "border-brand-500 bg-brand-50" : "border-line-strong"
          }`}
        >
          <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
            {status === "loading" ? (
              <LoaderCircle className="size-7 animate-spin" aria-hidden="true" />
            ) : (
              <ImageUp className="size-7" aria-hidden="true" strokeWidth={1.75} />
            )}
          </span>
          <p className="mt-5 text-lg font-semibold text-ink-900">
            {status === "loading" ? "Reading image…" : "Drag and drop an image here"}
          </p>
          <p className="mt-1 text-sm text-ink-600">or</p>
          {fileInput}
          <label htmlFor={`${id}-file`} className="btn btn-primary mt-3 cursor-pointer has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600">
            Choose an image
          </label>
          <p className="mt-5 text-sm text-ink-600">
            Supported formats: <strong className="font-medium text-ink-800">JPEG, PNG and WebP</strong> · Up to{" "}
            {formatBytes(MAX_FILE_BYTES)}
          </p>
        </div>
        {error && (
          <Notice tone="error" live>
            {error}
          </Notice>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      {/* Comparison */}
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
          <h2 className="truncate text-sm font-semibold text-ink-900" title={source.file.name}>
            {source.file.name}
          </h2>
          <span className="text-xs text-ink-600 tabular-nums">
            {source.image.width} × {source.image.height} px
          </span>
        </div>

        <div className="relative bg-[repeating-conic-gradient(var(--color-line)_0_25%,white_0_50%)] bg-size-[20px_20px]">
          <div className="relative mx-auto" style={{
              aspectRatio: `${source.image.width} / ${source.image.height}`,
              width: `min(100%, ${Math.round((520 * source.image.width) / source.image.height)}px)`,
            }}>
            <BlobImage blob={source.file} alt="Original image" className="absolute inset-0 size-full object-contain" />
            {result && (
              <BlobImage
                blob={result.blob}
                alt="Compressed image"
                className="absolute inset-0 size-full object-contain"
                style={{ clipPath: `inset(0 0 0 ${compare}%)` }}
              />
            )}
            {result && (
              <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-paper shadow-[0_0_0_1px_rgb(11_26_51/0.3)]" style={{ left: `${compare}%` }} aria-hidden="true" />
            )}
            <span className="absolute top-3 left-3 rounded-md bg-ink-900/80 px-2 py-1 text-xs font-medium text-white">Original</span>
            {result && (
              <span className="absolute top-3 right-3 rounded-md bg-brand-700/90 px-2 py-1 text-xs font-medium text-white">Compressed</span>
            )}
            {status === "compressing" && (
              <div className="absolute inset-0 flex items-center justify-center bg-paper/50">
                <LoaderCircle className="size-8 animate-spin text-brand-600" aria-hidden="true" />
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-line px-4 py-3">
          <label htmlFor={`${id}-compare`} className="text-xs font-medium text-ink-700">
            Before / after comparison: drag to reveal the original (left) or compressed (right) image
          </label>
          <input
            id={`${id}-compare`}
            type="range"
            min={0}
            max={100}
            value={compare}
            onChange={(e) => setCompare(e.target.valueAsNumber)}
            disabled={!result}
            className="mt-2 w-full accent-brand-600"
          />
        </div>
      </div>

      {/* Settings and result */}
      <div className="space-y-4">
        <div className="card space-y-5 p-5">
          <fieldset>
            <legend className="field-label">Output format</legend>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(FORMAT_INFO) as OutputFormat[]).map((fmt) => {
                const unavailable = fmt === "image/webp" && !webp;
                return (
                  <label
                    key={fmt}
                    className={`flex cursor-pointer items-center justify-center rounded-lg border px-2 py-2 text-sm font-medium transition-colors has-checked:border-brand-600 has-checked:bg-brand-50 has-checked:text-brand-700 has-focus-visible:outline-2 has-focus-visible:outline-brand-600 ${
                      unavailable ? "cursor-not-allowed opacity-50" : "border-line-strong text-ink-800 hover:bg-surface"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${id}-format`}
                      value={fmt}
                      checked={options.format === fmt}
                      disabled={unavailable}
                      onChange={() => changeOptions({ format: fmt }, 0)}
                      className="sr-only"
                    />
                    {FORMAT_INFO[fmt].label}
                  </label>
                );
              })}
            </div>
            {!webp && <p className="field-hint">Your browser can’t save WebP images, so that option is unavailable.</p>}
          </fieldset>

          <div>
            <label htmlFor={`${id}-target`} className="field-label">
              Target size
            </label>
            <select
              id={`${id}-target`}
              value={options.targetBytes ?? ""}
              onChange={(e) => changeOptions({ targetBytes: e.target.value ? Number(e.target.value) : null }, 0)}
              aria-describedby={`${id}-target-hint`}
              className="field-input"
            >
              <option value="">No limit (set the quality yourself)</option>
              {TARGET_SIZES.map((t) => (
                <option key={t.bytes} value={t.bytes}>
                  {t.label}
                </option>
              ))}
            </select>
            <p id={`${id}-target-hint`} className="field-hint">
              {!auto
                ? "Need a file under a size limit, such as 100 KB for a form? Choose it here."
                : lossy
                  ? "The highest quality that fits is chosen automatically. If that isn’t enough, the image is made smaller."
                  : "PNG has no quality setting, so the image is made smaller until it fits. JPEG or WebP keep more detail."}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor={`${id}-quality`} className="field-label">
                Quality
              </label>
              <span className="mb-1.5 text-sm font-semibold text-ink-900 tabular-nums">
                {!lossy
                  ? "Lossless"
                  : auto
                    ? result?.quality !== undefined && status === "done"
                      ? `Auto (${Math.round(result.quality * 100)}%)`
                      : "Auto"
                    : `${Math.round(options.quality * 100)}%`}
              </span>
            </div>
            <input
              id={`${id}-quality`}
              type="range"
              min={10}
              max={100}
              step={1}
              value={Math.round(options.quality * 100)}
              disabled={!lossy || auto}
              onChange={(e) => changeOptions({ quality: e.target.valueAsNumber / 100 })}
              aria-describedby={`${id}-quality-hint`}
              className="w-full accent-brand-600 disabled:opacity-40"
            />
            <p id={`${id}-quality-hint`} className="field-hint">
              {!lossy
                ? "PNG is lossless, so the quality slider does not apply. Resize the image to make it smaller."
                : auto
                  ? "Set automatically to meet the target size."
                  : "Lower quality gives smaller files. 70–85% is a good balance for photos."}
            </p>
          </div>

          <div>
            <label htmlFor={`${id}-resize`} className="field-label">
              Resize
            </label>
            <select
              id={`${id}-resize`}
              value={options.maxDimension ?? ""}
              onChange={(e) => changeOptions({ maxDimension: e.target.value ? Number(e.target.value) : null }, 0)}
              className="field-input"
            >
              {RESIZE_OPTIONS.map((o) => (
                <option key={o.label} value={o.value ?? ""}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {options.format === "image/jpeg" && source.file.type !== "image/jpeg" && (
            <p className="text-xs leading-relaxed text-ink-600">
              JPEG does not support transparency. Any transparent areas will become white.
            </p>
          )}
        </div>

        <div className="card p-5" aria-live="polite">
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-xs font-medium text-ink-600">Original</dt>
              <dd className="mt-0.5 text-lg font-bold text-ink-900 tabular-nums">{formatBytes(source.file.size)}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-ink-600">Compressed</dt>
              <dd className="mt-0.5 text-lg font-bold text-ink-900 tabular-nums">
                {result ? formatBytes(result.blob.size) : "…"}
              </dd>
            </div>
            <div className="col-span-2 rounded-lg bg-surface px-3 py-2.5">
              <dt className="text-xs font-medium text-ink-600">Size change</dt>
              <dd className={`mt-0.5 text-base font-semibold tabular-nums ${larger ? "text-warning-700" : "text-success-700"}`}>
                {result
                  ? larger
                    ? `${Math.abs(saved * 100).toFixed(1)}% larger`
                    : `${(saved * 100).toFixed(1)}% smaller`
                  : status === "compressing"
                    ? "Compressing…"
                    : "—"}
                {result && (
                  <span className="ml-1 text-xs font-normal text-ink-600">
                    · {result.width} × {result.height} px
                  </span>
                )}
              </dd>
            </div>
          </dl>

          <div className="mt-4 space-y-3">
            {result?.limitedByCanvas && (
              <Notice tone="info">
                This image is very large, so it was scaled to {result.width} × {result.height} px to stay within your
                browser’s limits.
              </Notice>
            )}
            {result?.target?.met && status === "done" && (
              <Notice tone="success">
                Under {formatTarget(result.target.bytes)}: {formatBytes(result.blob.size)} ({result.blob.size.toLocaleString("en-US")}{" "}
                bytes).
                {result.target.resized &&
                  ` To fit, the image was resized to ${result.width} × ${result.height} px. Choose a larger target to keep more pixels.`}
              </Notice>
            )}
            {result?.target && !result.target.met && status === "done" && (
              <Notice tone="warning">
                This image can’t be made smaller than {formatTarget(result.target.bytes)} without becoming unusably small.
                The smallest version is {formatBytes(result.blob.size)} at {result.width} × {result.height} px. Try a
                larger target or JPEG output.
              </Notice>
            )}
            {larger && (
              <Notice tone="warning">
                The compressed file is not smaller than the original, which can happen with images that are already
                well optimized. Try a lower quality or a smaller size, or keep the original.
              </Notice>
            )}
            {error && (
              <Notice tone="error" live>
                {error}
              </Notice>
            )}

            <button
              type="button"
              className="btn btn-primary w-full"
              disabled={!result || busy}
              onClick={() =>
                result && downloadBlob(result.blob, outputFileName(source.file.name, result.blob.type as OutputFormat))
              }
            >
              <Download className="size-4" aria-hidden="true" />
              Download compressed {FORMAT_INFO[options.format].label}
            </button>
            {larger && (
              <button type="button" className="btn btn-secondary w-full" onClick={() => downloadBlob(source.file, source.file.name)}>
                Keep original (download {formatBytes(source.file.size)})
              </button>
            )}
            <div className="flex gap-2">
              {fileInput}
              <label htmlFor={`${id}-file`} className="btn btn-secondary flex-1 cursor-pointer has-focus-visible:outline-2 has-focus-visible:outline-brand-600">
                <ImageUp className="size-4" aria-hidden="true" />
                New image
              </label>
              <button type="button" className="btn btn-ghost flex-1" onClick={reset}>
                <RotateCcw className="size-4" aria-hidden="true" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
