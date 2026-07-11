import { getAllCards } from "@/lib/content/getCards";
import { CardTile } from "@/components/cards/CardTile";

export const metadata = {
  title: "All Credit Cards",
  description: "Browse every credit card tracked, with current benefits and recent changes.",
};

export default function CardsDirectoryPage() {
  const cards = getAllCards();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">All Cards</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <CardTile key={card.slug} card={card} />
        ))}
      </div>
    </div>
  );
}
