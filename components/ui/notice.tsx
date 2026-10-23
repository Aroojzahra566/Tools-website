import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

type Tone = "info" | "success" | "warning" | "error";

const styles: Record<Tone, { box: string; icon: typeof Info; label: string }> = {
  info: { box: "border-brand-200 bg-brand-50 text-ink-800", icon: Info, label: "Note" },
  success: { box: "border-success-700/20 bg-success-50 text-success-700", icon: CircleCheck, label: "Success" },
  warning: { box: "border-warning-700/20 bg-warning-50 text-warning-700", icon: TriangleAlert, label: "Warning" },
  error: { box: "border-danger-600/25 bg-danger-50 text-danger-600", icon: CircleAlert, label: "Error" },
};

/** Status message with an icon and a hidden text label, so meaning never relies on color alone. */
export function Notice({
  tone = "info",
  children,
  className = "",
  live = false,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
  /** Announce to screen readers when it appears. */
  live?: boolean;
}) {
  const { box, icon: Icon, label } = styles[tone];
  return (
    <div
      role={live ? (tone === "error" ? "alert" : "status") : undefined}
      className={`flex gap-2.5 rounded-xl border px-4 py-3 text-sm leading-relaxed ${box} ${className}`}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div>
        <span className="sr-only">{label}: </span>
        {children}
      </div>
    </div>
  );
}
