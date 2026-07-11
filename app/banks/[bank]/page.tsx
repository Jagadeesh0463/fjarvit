import { notFound } from "next/navigation";
import { BANKS, getBankBySlug } from "@/constants/banks";
import { getCardsByBank } from "@/lib/content/getCards";
import { CardTile } from "@/components/cards/CardTile";

export function generateStaticParams() {
  return BANKS.map((b) => ({ bank: b.slug }));
}

export function generateMetadata({ params }: { params: { bank: string } }) {
  const bank = getBankBySlug(params.bank);
  if (!bank) return {};
  return {
    title: `${bank.name} Credit Cards`,
    description: `All ${bank.name} credit cards tracked, with current benefits and change history.`,
  };
}

export default function BankPage({ params }: { params: { bank: string } }) {
  const bank = getBankBySlug(params.bank);
  if (!bank) notFound();
  const cards = getCardsByBank(bank.slug);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">{bank.name} Credit Cards</h1>
      {cards.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">No cards from {bank.name} are tracked yet.</p>
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
