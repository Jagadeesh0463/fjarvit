import { ChangeHistoryEntry } from "@/types/card";

export function ChangeTimeline({ history }: { history: ChangeHistoryEntry[] }) {
  if (history.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-brand-100 bg-white/60 p-4 text-sm text-gray-500">
        No changes recorded yet.
      </div>
    );
  }

  const sorted = [...history].sort(
    (a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime()
  );

  return (
    <ol className="space-y-3">
      {sorted.map((entry, i) => (
        <li
          key={i}
          className="relative rounded-2xl border border-brand-100 bg-white p-4 pl-6 shadow-card"
        >
          <span className="absolute left-2.5 top-5 h-2 w-2 rounded-full bg-accent-500" />
          <p className="text-xs font-medium text-brand-500">{entry.effectiveDate}</p>
          <p className="mt-0.5 text-sm font-semibold text-gray-900">{entry.attribute}</p>
          <p className="mt-1 text-sm text-gray-600">
            <span className="text-change-down line-through">{entry.oldValue}</span>{" "}
            → <span className="font-medium text-change-up">{entry.newValue}</span>
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Source: {entry.source.name} — {entry.source.document}
            {entry.source.page ? `, p.${entry.source.page}` : ""}
          </p>
        </li>
      ))}
    </ol>
  );
}
