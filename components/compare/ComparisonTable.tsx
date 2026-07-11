import { CreditCard } from "@/types/card";
import { formatInr } from "@/constants/fees";

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
        ? `${cardA.currentBenefits.loungeAccess.domesticVisitsPerQuarter}/quarter`
        : "None",
      b: cardB.currentBenefits.loungeAccess
        ? `${cardB.currentBenefits.loungeAccess.domesticVisitsPerQuarter}/quarter`
        : "None",
    },
    {
      label: "Fuel Surcharge Waiver",
      a: cardA.currentBenefits.fuelBenefit ? `${cardA.currentBenefits.fuelBenefit.surchargeWaiverPercent}%` : "None",
      b: cardB.currentBenefits.fuelBenefit ? `${cardB.currentBenefits.fuelBenefit.surchargeWaiverPercent}%` : "None",
    },
  ];

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-gray-200 text-left">
          <th className="py-2 pr-4 font-medium text-gray-500"> </th>
          <th className="py-2 pr-4 font-semibold capitalize text-gray-900">{cardA.slug.replace(/-/g, " ")}</th>
          <th className="py-2 font-semibold capitalize text-gray-900">{cardB.slug.replace(/-/g, " ")}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-b border-gray-100">
            <td className="py-2 pr-4 text-gray-500">{row.label}</td>
            <td className="py-2 pr-4">{row.a}</td>
            <td className="py-2">{row.b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
