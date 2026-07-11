import { notFound } from "next/navigation";
import { getAllCards, getCardBySlug } from "@/lib/content/getCards";
import { ComparisonTable } from "@/components/compare/ComparisonTable";

// Pair slug format: "<a>-vs-<b>", built from routes.compare() which
// alphabetically sorts the two slugs so a given pair always has one URL.
function parsePair(pair: string): [string, string] | null {
  const match = pair.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  return [match[1], match[2]];
}

export function generateStaticParams() {
  const cards = getAllCards();
  const pairs: { pair: string }[] = [];
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      if (cards[i].category !== cards[j].category) continue; // only same-category comparisons
      const [a, b] = [cards[i].slug, cards[j].slug].sort();
      pairs.push({ pair: `${a}-vs-${b}` });
    }
  }
  return pairs;
}

export function generateMetadata({ params }: { params: { pair: string } }) {
  const parsed = parsePair(params.pair);
  if (!parsed) return {};
  return {
    title: `${parsed[0].replace(/-/g, " ")} vs ${parsed[1].replace(/-/g, " ")}`,
    description: `Side-by-side comparison of fees, cashback, lounge access, and fuel benefits.`,
  };
}

export default function ComparePage({ params }: { params: { pair: string } }) {
  const parsed = parsePair(params.pair);
  if (!parsed) notFound();
  const [slugA, slugB] = parsed;
  const cardA = getCardBySlug(slugA);
  const cardB = getCardBySlug(slugB);
  if (!cardA || !cardB) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold capitalize text-gray-900">
        {cardA.slug.replace(/-/g, " ")} vs {cardB.slug.replace(/-/g, " ")}
      </h1>
      <div className="mt-6">
        <ComparisonTable cardA={cardA} cardB={cardB} />
      </div>
    </div>
  );
}
