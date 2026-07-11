import { ChangeHistoryEntry } from "@/types/card";

export function ChangeTimeline({ history }: { history: ChangeHistoryEntry[] }) {
  if (history.length === 0) {
    return <p className="text-sm text-gray-500">No changes recorded yet.</p>;
  }

  const sorted = [...history].sort(
    (a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime()
  );

  return (
    <ol className="space-y-4 border-l border-gray-200 pl-4">
      {sorted.map((entry, i) => (
        <li key={i}>
          <p className="text-xs text-gray-500">{entry.effectiveDate}</p>
          <p className="text-sm font-medium text-gray-900">{entry.attribute}</p>
          <p className="text-sm text-gray-600">
            <span className="text-change-down line-through">{entry.oldValue}</span>{" "}
            → <span className="text-change-up">{entry.newValue}</span>
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Source: {entry.source.name} — {entry.source.document}
            {entry.source.page ? `, p.${entry.source.page}` : ""}
          </p>
        </li>
      ))}
    </ol>
  );
}
