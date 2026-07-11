import { CurrentBenefits } from "@/types/card";
import { formatInr } from "@/constants/fees";

// Convention: a lounge visit count of 99+ means "unlimited" (some premium
// cards genuinely have no cap). Real per-quarter counts never reach this
// high, so it's a safe sentinel rather than a separate boolean field.
function formatVisits(n: number): string {
  return n >= 99 ? "Unlimited" : `${n}`;
}

export function BenefitTable({ benefits }: { benefits: CurrentBenefits }) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-gray-200 text-left text-gray-500">
          <th className="py-2 pr-4 font-medium">Category</th>
          <th className="py-2 pr-4 font-medium">Rate</th>
          <th className="py-2 font-medium">Cap</th>
        </tr>
      </thead>
      <tbody>
        {benefits.cashback.map((b) => (
          <tr key={b.category} className="border-b border-gray-100">
            <td className="py-2 pr-4">{b.category}</td>
            <td className="py-2 pr-4">{b.rate}%</td>
            <td className="py-2">{b.cap ? formatInr(b.cap) : "Uncapped"}</td>
          </tr>
        ))}
        {benefits.loungeAccess && (
          <tr className="border-b border-gray-100">
            <td className="py-2 pr-4">Lounge access</td>
            <td className="py-2 pr-4" colSpan={2}>
              {formatVisits(benefits.loungeAccess.domesticVisitsPerQuarter)} domestic /{" "}
              {formatVisits(benefits.loungeAccess.internationalVisitsPerQuarter)} international visits per quarter
            </td>
          </tr>
        )}
        {benefits.fuelBenefit && (
          <tr>
            <td className="py-2 pr-4">Fuel surcharge waiver</td>
            <td className="py-2 pr-4" colSpan={2}>
              {benefits.fuelBenefit.surchargeWaiverPercent}%
              {benefits.fuelBenefit.capInr ? `, capped at ${formatInr(benefits.fuelBenefit.capInr)}/month` : ""}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
