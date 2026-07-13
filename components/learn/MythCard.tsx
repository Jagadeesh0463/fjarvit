import { Myth } from "@/types/learn";
import { cn } from "@/lib/utils/cn";

const VERDICT_LABEL: Record<Myth["verdict"], string> = {
  true: "True",
  false: "Myth",
  "partly-true": "Partly True",
};

const VERDICT_STYLE: Record<Myth["verdict"], string> = {
  true: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  false: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
  "partly-true": "bg-accent-50 text-accent-700 ring-1 ring-inset ring-accent-100",
};

export function MythCard({ myth }: { myth: Myth }) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <p className="text-base font-semibold text-gray-900">&ldquo;{myth.statement}&rdquo;</p>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
            VERDICT_STYLE[myth.verdict]
          )}
        >
          {VERDICT_LABEL[myth.verdict]}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{myth.explanation}</p>
    </div>
  );
}
