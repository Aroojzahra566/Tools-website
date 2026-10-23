"use client";

import { useId, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, QrCode, RotateCcw } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import { Notice } from "@/components/ui/notice";
import { contrastRatio, isLighter } from "@/lib/tools/color";
import { downloadBlob } from "@/lib/tools/download";

/** Byte capacity of a QR code (version 40) at error correction level M. */
const MAX_BYTES = 2331;
const DEFAULTS = { size: 512, fg: "#0b1a33", bg: "#ffffff" };

interface Settings {
  text: string;
  size: number;
  fg: string;
  bg: string;
}

const encoder = new TextEncoder();

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-lg border border-line-strong bg-paper p-1.5 pr-3 focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-600/20">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-10 cursor-pointer rounded-md border-0 bg-transparent p-0"
        />
        <span className="font-mono text-sm text-ink-700 uppercase">{value}</span>
      </div>
    </div>
  );
}

export function QrCodeGenerator() {
  const [settings, setSettings] = useState<Settings>({ text: "", ...DEFAULTS });
  const [generated, setGenerated] = useState<Settings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const id = useId();

  const bytes = encoder.encode(settings.text).length;
  const tooLong = bytes > MAX_BYTES;
  const ratio = contrastRatio(settings.fg, settings.bg);
  const lowContrast = ratio < 4;
  const inverted = isLighter(settings.fg, settings.bg);
  const stale =
    generated !== null &&
    (generated.text !== settings.text ||
      generated.size !== settings.size ||
      generated.fg !== settings.fg ||
      generated.bg !== settings.bg);

  function set<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  async function generate() {
    setError(null);
    if (!settings.text.trim()) {
      setError("Enter some text or a URL to encode.");
      return;
    }
    if (tooLong) {
      setError(`This text is ${bytes.toLocaleString()} bytes. A QR code can hold at most ${MAX_BYTES.toLocaleString()} bytes at this error-correction level.`);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      // The text is encoded exactly as entered. Nothing is added, shortened or redirected.
      await QRCode.toCanvas(canvas, settings.text, {
        width: settings.size,
        // Quiet zone of 4 modules, the width recommended by the QR code standard (ISO/IEC 18004).
        margin: 4,
        errorCorrectionLevel: "M",
        color: { dark: settings.fg, light: settings.bg },
      });
      setGenerated({ ...settings });
    } catch (e) {
      setGenerated(null);
      setError(e instanceof Error ? `Could not create the QR code: ${e.message}` : "Could not create the QR code.");
    }
  }

  function download() {
    canvasRef.current?.toBlob((blob) => {
      if (blob) downloadBlob(blob, "qr-code.png");
      else setError("Your browser could not export the image. Try another browser.");
    }, "image/png");
  }

  function reset() {
    setSettings({ text: "", ...DEFAULTS });
    setGenerated(null);
    setError(null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <form
        className="card space-y-5 p-5 sm:p-6"
        onSubmit={(e) => {
          e.preventDefault();
          void generate();
        }}
        noValidate
      >
        <div>
          <div className="flex items-end justify-between gap-2">
            <label htmlFor={`${id}-text`} className="field-label">
              Text or URL
            </label>
            <span className={`mb-1.5 text-xs tabular-nums ${tooLong ? "font-semibold text-danger-600" : "text-ink-600"}`}>
              {bytes.toLocaleString()} / {MAX_BYTES.toLocaleString()} bytes
            </span>
          </div>
          <textarea
            id={`${id}-text`}
            value={settings.text}
            onChange={(e) => set("text", e.target.value)}
            rows={4}
            placeholder="https://example.com or any text"
            aria-invalid={tooLong || (error !== null && !settings.text.trim()) || undefined}
            aria-describedby={`${id}-text-hint`}
            className="field-input resize-y leading-relaxed"
          />
          <p id={`${id}-text-hint`} className="field-hint">
            The QR code will contain exactly this text. Include <code className="font-mono">https://</code> so phones
            recognise a link.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor={`${id}-size`} className="field-label">
              Size
            </label>
            <span className="mb-1.5 text-sm font-medium text-ink-800 tabular-nums">
              {settings.size} × {settings.size} px
            </span>
          </div>
          <input
            id={`${id}-size`}
            type="range"
            min={128}
            max={1024}
            step={32}
            value={settings.size}
            onChange={(e) => set("size", e.target.valueAsNumber)}
            className="w-full accent-brand-600"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ColorField label="Foreground" value={settings.fg} onChange={(v) => set("fg", v)} />
          <ColorField label="Background" value={settings.bg} onChange={(v) => set("bg", v)} />
        </div>

        {(lowContrast || inverted) && (
          <Notice tone="warning">
            {lowContrast
              ? `The colors have low contrast (${ratio.toFixed(1)}:1), so some phones may not scan the code. Aim for a dark foreground on a light background.`
              : "A light foreground on a dark background (an inverted code) can't be read by some scanner apps."}
          </Notice>
        )}

        <div className="flex flex-wrap gap-2 border-t border-line pt-5">
          <button type="submit" className="btn btn-primary">
            <QrCode className="size-4" aria-hidden="true" />
            Generate QR code
          </button>
          <CopyButton text={settings.text} label="Copy text" />
          <button type="button" className="btn btn-ghost" onClick={reset}>
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset
          </button>
        </div>
      </form>

      <div className="card flex flex-col p-5 sm:p-6">
        <h2 className="text-sm font-semibold text-ink-900">Preview</h2>
        <div className="mt-4 flex aspect-square w-full items-center justify-center rounded-xl border border-dashed border-line-strong bg-surface p-4">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={generated ? `QR code containing: ${generated.text}` : "QR code preview"}
            className={`h-auto! max-h-full w-full! max-w-[300px] rounded-md [image-rendering:pixelated] ${generated ? "" : "hidden"}`}
          />
          {!generated && (
            <p className="max-w-[220px] text-center text-sm text-ink-600">
              Enter text or a URL and select <span className="font-medium text-ink-800">Generate QR code</span>.
            </p>
          )}
        </div>

        <div className="mt-4 space-y-3">
          {error && (
            <Notice tone="error" live>
              {error}
            </Notice>
          )}
          {stale && !error && (
            <Notice tone="info" live>
              Your settings have changed. Select Generate QR code to update the preview and download.
            </Notice>
          )}
          {generated && (
            <p className="text-xs text-ink-600">
              {generated.size} × {generated.size} px PNG. Test-scan it with your phone before printing.
            </p>
          )}
          <button type="button" className="btn btn-primary w-full" onClick={download} disabled={!generated}>
            <Download className="size-4" aria-hidden="true" />
            Download PNG
          </button>
        </div>
      </div>
    </div>
  );
}
