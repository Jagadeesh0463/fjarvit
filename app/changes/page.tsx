import Link from "next/link";
import { getAllCards } from "@/lib/content/getCards";
import { routes } from "@/constants/routes";

export const metadata = {
  title: "Recent Credit Card Changes",
  description: "A chronological feed of detected benefit changes across tracked credit cards.",
};

export default function ChangesPage() {
  const changes = getAllCards()
    .flatMap((card) => card.history.map((entry) => ({ card, entry })))
    .sort((a, b) => new Date(b.entry.effectiveDate).getTime() - new Date(a.entry.effectiveDate).getTime());

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">Recent Changes</h1>
      <p className="mt-1 text-sm text-gray-600">
        {changes.length} recorded changes across all tracked cards.
      </p>
      <div className="mt-6 space-y-3">
        {changes.map(({ card, entry }, i) => (
          <Link
            key={i}
            href={routes.change(card.slug)}
            className="block rounded-2xl border border-brand-100 bg-white p-4 shadow-card transition-colors hover:border-brand-300"
          >
            <p className="text-sm font-semibold capitalize text-brand-700">
              {card.slug.replace(/-/g, " ")}
            </p>
            <p className="mt-0.5 text-sm text-gray-900">{entry.attribute}</p>
            <p className="text-sm text-gray-600">
              <span className="text-change-down line-through">{entry.oldValue}</span> →{" "}
              <span className="font-medium text-change-up">{entry.newValue}</span>
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {entry.effectiveDate} · Source: {entry.source.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
