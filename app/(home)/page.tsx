import Link from "next/link";
import { getAllCards } from "@/lib/content/getCards";
import { CardTile } from "@/components/cards/CardTile";
import { routes } from "@/constants/routes";

// Deliberately simple for Phase 1A — most organic traffic lands on
// /cards, /banks, /best, and /compare, not here. See plan v4, Section 10.
export default function HomePage() {
  const cards = getAllCards();
  const featured = cards.slice(0, 4);
  const recentChanges = cards
    .flatMap((c) => c.history.map((h) => ({ card: c, entry: h })))
    .sort((a, b) => new Date(b.entry.effectiveDate).getTime() - new Date(a.entry.effectiveDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold text-gray-900">Know before your card changes</h1>
        <p className="mt-2 max-w-xl text-gray-600">
          Track cashback, reward, and lounge benefit changes on Indian credit cards — with real
          before/after numbers, not just headlines.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900">Featured cards</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featured.map((card) => (
            <CardTile key={card.slug} card={card} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900">Latest credit card changes</h2>
        <ul className="mt-4 divide-y divide-gray-100">
          {recentChanges.map(({ card, entry }, i) => (
            <li key={i} className="py-3">
              <Link href={routes.change(card.slug)} className="text-sm font-medium text-brand hover:underline">
                {card.slug.replace(/-/g, " ")}
              </Link>
              <p className="text-sm text-gray-600">
                {entry.attribute} — {entry.effectiveDate}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
