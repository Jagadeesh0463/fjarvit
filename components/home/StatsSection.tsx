import { HomeStats } from "@/lib/content/getCards";

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

const STAT_ITEMS = (stats: HomeStats) => [
  { label: "Cards tracked", value: String(stats.cardsTracked) },
  { label: "Banks covered", value: String(stats.banksCovered) },
  { label: "Recorded changes", value: String(stats.changesRecorded) },
  { label: "Last verified", value: formatDate(stats.lastVerified) },
];

export function StatsSection({ stats }: { stats: HomeStats }) {
  const items = STAT_ITEMS(stats);
  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-brand-100 bg-white p-5 text-center shadow-card"
        >
          <p className="text-2xl font-extrabold text-brand-900 sm:text-3xl">{item.value}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">{item.label}</p>
        </div>
      ))}
    </section>
  );
}
