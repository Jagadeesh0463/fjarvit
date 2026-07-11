import Link from "next/link";
import { CreditCard } from "@/types/card";
import { getBankBySlug } from "@/constants/banks";
import { routes } from "@/constants/routes";
import { formatInr } from "@/constants/fees";
import { NetworkBadge } from "./NetworkBadge";
import { StatusBadge } from "./StatusBadge";

export function CardTile({ card }: { card: CreditCard }) {
  const bank = getBankBySlug(card.bank);
  const headline = card.currentBenefits.cashback[0];

  return (
    <Link
      href={routes.card(card.slug)}
      className="block rounded-lg border border-gray-200 p-4 transition hover:border-brand hover:shadow-sm"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-gray-500">{bank?.name ?? card.bank}</span>
        <NetworkBadge network={card.network} />
      </div>
      <h3 className="mt-1 text-base font-semibold capitalize text-gray-900">
        {card.slug.replace(/-/g, " ")}
      </h3>
      {headline && (
        <p className="mt-1 text-sm text-gray-600">
          {headline.rate}% cashback on {headline.category.toLowerCase()}
        </p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {card.lifetimeFree ? "Lifetime free" : `${formatInr(card.annualFee)}/year`}
        </span>
        <StatusBadge status={card.status} />
      </div>
    </Link>
  );
}
