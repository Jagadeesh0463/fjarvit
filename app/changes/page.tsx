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
      <h1 className="text-2xl font-bold text-gray-900">Recent Changes</h1>
      <ul className="mt-6 divide-y divide-gray-100">
        {changes.map(({ card, entry }, i) => (
          <li key={i} className="py-4">
            <Link href={routes.card(card.slug)} className="text-sm font-medium text-brand hover:underline">
              {card.slug.replace(/-/g, " ")}
            </Link>
            <p className="text-sm text-gray-900">{entry.attribute}</p>
            <p className="text-sm text-gray-600">
              <span className="text-change-down line-through">{entry.oldValue}</span> →{" "}
              <span className="text-change-up">{entry.newValue}</span>
            </p>
            <p className="text-xs text-gray-400">
              {entry.effectiveDate} · Source: {entry.source.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
