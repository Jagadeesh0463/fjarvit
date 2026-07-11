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
      className="group block rounded-2xl border border-brand-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-brand-600">{bank?.name ?? card.bank}</span>
        <NetworkBadge network={card.network} />
      </div>
      <h3 className="mt-2 text-base font-bold capitalize text-gray-900 transition-colors group-hover:text-brand-700">
        {card.slug.replace(/-/g, " ")}
      </h3>
      {headline && (
        <p className="mt-1 text-sm text-gray-600">
          <span className="font-semibold text-accent-600">{headline.rate}% cashback</span> on{" "}
          {headline.category.toLowerCase()}
        </p>
      )}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
        <span className="text-xs font-medium text-gray-500">
          {card.lifetimeFree ? "Lifetime free" : `${formatInr(card.annualFee)}/year`}
        </span>
        <StatusBadge status={card.status} />
      </div>
    </Link>
  );
}
