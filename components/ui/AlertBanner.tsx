import { cn } from "@/lib/utils/cn";

type AlertVariant = "info" | "warning" | "danger";

const VARIANT_STYLES: Record<AlertVariant, string> = {
  info: "bg-blue-50 text-blue-800 border-blue-200",
  warning: "bg-accent-50 text-accent-700 border-accent-100",
  danger: "bg-red-50 text-red-800 border-red-200",
};

// Generic banner for page-level notices — card status warnings today
// (discontinued / invite-only), stale-data notices later if needed.
// Kept variant-based rather than one-off styling so every notice on the
// site reads consistently.
export function AlertBanner({
  variant = "info",
  children,
}: {
  variant?: AlertVariant;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("rounded-2xl border px-4 py-3.5 text-sm shadow-card", VARIANT_STYLES[variant])}
      role="status"
    >
      {children}
    </div>
  );
}
