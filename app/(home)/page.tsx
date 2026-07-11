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
    <div className="space-y-16">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-6 py-14 sm:px-10 sm:py-16">
        <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-300">
          {cards.length} cards tracked
        </span>
        <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight text-cream sm:text-4xl">
          Know before your card changes
        </h1>
        <p className="mt-4 max-w-xl text-brand-100">
          Track cashback, reward, and lounge benefit changes on Indian credit cards — with real
          before/after numbers, not just headlines.
        </p>
        <Link
          href={routes.cards()}
          className="mt-7 inline-flex items-center rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-brand-900 shadow-card transition-colors hover:bg-accent-400"
        >
          Browse all cards →
        </Link>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-500">Featured</h2>
        <p className="mt-1 text-lg font-bold text-gray-900">Popular cards worth a look</p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featured.map((card) => (
            <CardTile key={card.slug} card={card} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-500">Tracking</h2>
        <p className="mt-1 text-lg font-bold text-gray-900">Latest credit card changes</p>
        <div className="mt-5 space-y-3">
          {recentChanges.map(({ card, entry }, i) => (
            <Link
              key={i}
              href={routes.change(card.slug)}
              className="block rounded-2xl border border-brand-100 bg-white p-4 shadow-card transition-colors hover:border-brand-300"
            >
              <p className="text-sm font-semibold capitalize text-brand-700">
                {card.slug.replace(/-/g, " ")}
              </p>
              <p className="mt-0.5 text-sm text-gray-600">
                {entry.attribute} — {entry.effectiveDate}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
