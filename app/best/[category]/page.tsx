import { notFound } from "next/navigation";
import { CATEGORIES, getCategoryBySlug } from "@/constants/categories";
import { getCardsByCategory } from "@/lib/content/getCards";
import { CardTile } from "@/components/cards/CardTile";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category);
  if (!category) return {};
  return { title: category.label, description: category.description };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category);
  if (!category) notFound();
  const cards = getCardsByCategory(category.slug);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{category.label}</h1>
      <p className="mt-1 text-sm text-gray-600">{category.description}</p>
      {cards.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">No cards in this category are tracked yet.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <CardTile key={card.slug} card={card} />
          ))}
        </div>
      )}
    </div>
  );
}
