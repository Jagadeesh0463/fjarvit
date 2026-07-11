import { CreditCard } from "@/types/card";
import { formatInr } from "@/constants/fees";
import { formatVisits } from "@/lib/utils/format";

// Data-only comparison table — deliberately has no "Winner" row. That field
// is added in Phase 1B once a disclosed scoring formula exists (plan v4,
// Section 9). Until then this shows raw figures side by side only.
export function ComparisonTable({ cardA, cardB }: { cardA: CreditCard; cardB: CreditCard }) {
  const rows: { label: string; a: string; b: string }[] = [
    { label: "Annual Fee", a: formatInr(cardA.annualFee), b: formatInr(cardB.annualFee) },
    { label: "Joining Fee", a: formatInr(cardA.joiningFee), b: formatInr(cardB.joiningFee) },
    {
      label: "Best Cashback Rate",
      a: `${Math.max(...cardA.currentBenefits.cashback.map((c) => c.rate))}%`,
      b: `${Math.max(...cardB.currentBenefits.cashback.map((c) => c.rate))}%`,
    },
    {
      label: "Lounge Access",
      a: cardA.currentBenefits.loungeAccess
        ? `${formatVisits(cardA.currentBenefits.loungeAccess.domesticVisitsPerQuarter)}/quarter`
        : "None",
      b: cardB.currentBenefits.loungeAccess
        ? `${formatVisits(cardB.currentBenefits.loungeAccess.domesticVisitsPerQuarter)}/quarter`
        : "None",
    },
    {
      label: "Fuel Surcharge Waiver",
      a: cardA.currentBenefits.fuelBenefit ? `${cardA.currentBenefits.fuelBenefit.surchargeWaiverPercent}%` : "None",
      b: cardB.currentBenefits.fuelBenefit ? `${cardB.currentBenefits.fuelBenefit.surchargeWaiverPercent}%` : "None",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-brand-100 bg-brand-50/60 text-left">
            <th className="py-3 pl-4 pr-4 font-medium text-brand-700"> </th>
            <th className="py-3 pr-4 font-semibold capitalize text-brand-900">
              {cardA.slug.replace(/-/g, " ")}
            </th>
            <th className="py-3 pr-4 font-semibold capitalize text-brand-900">
              {cardB.slug.replace(/-/g, " ")}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-gray-100 last:border-0">
              <td className="py-3 pl-4 pr-4 text-gray-500">{row.label}</td>
              <td className="py-3 pr-4 font-medium text-gray-900">{row.a}</td>
              <td className="py-3 pr-4 font-medium text-gray-900">{row.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
