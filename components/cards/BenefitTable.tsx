import { CurrentBenefits } from "@/types/card";
import { formatInr } from "@/constants/fees";
import { formatVisits } from "@/lib/utils/format";

export function BenefitTable({ benefits }: { benefits: CurrentBenefits }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-brand-100 bg-brand-50/60 text-left text-brand-700">
            <th className="py-3 pl-4 pr-4 font-semibold">Category</th>
            <th className="py-3 pr-4 font-semibold">Rate</th>
            <th className="py-3 pr-4 font-semibold">Cap</th>
          </tr>
        </thead>
        <tbody>
          {benefits.cashback.map((b) => (
            <tr key={b.category} className="border-b border-gray-100 last:border-0">
              <td className="py-3 pl-4 pr-4 text-gray-700">{b.category}</td>
              <td className="py-3 pr-4 font-semibold text-accent-700">{b.rate}%</td>
              <td className="py-3 pr-4 text-gray-600">{b.cap ? formatInr(b.cap) : "Uncapped"}</td>
            </tr>
          ))}
          {benefits.loungeAccess && (
            <tr className="border-b border-gray-100 last:border-0">
              <td className="py-3 pl-4 pr-4 text-gray-700">Lounge access</td>
              <td className="py-3 pr-4 font-medium text-gray-900" colSpan={2}>
                {formatVisits(benefits.loungeAccess.domesticVisitsPerQuarter)} domestic /{" "}
                {formatVisits(benefits.loungeAccess.internationalVisitsPerQuarter)} international
                visits per quarter
              </td>
            </tr>
          )}
          {benefits.fuelBenefit && (
            <tr>
              <td className="py-3 pl-4 pr-4 text-gray-700">Fuel surcharge waiver</td>
              <td className="py-3 pr-4 font-medium text-gray-900" colSpan={2}>
                {benefits.fuelBenefit.surchargeWaiverPercent}%
                {benefits.fuelBenefit.capInr ? `, capped at ${formatInr(benefits.fuelBenefit.capInr)}/month` : ""}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
