"use client";

import { useState } from "react";
import { calculateRewardPoints } from "@/lib/calculators/rewardPointsCalculator";
import { formatInr } from "@/constants/fees";
import { Field, RupeeInput, RupeeDecimalInput, PlainInput } from "./CalculatorInputs";

export function RewardPointsCalculator() {
  const [monthlySpend, setMonthlySpend] = useState(20000);
  const [pointsPer100, setPointsPer100] = useState(2);
  const [pointValue, setPointValue] = useState(0.25);

  const result = calculateRewardPoints({
    monthlySpendInr: monthlySpend,
    pointsPer100Inr: pointsPer100,
    pointValueInr: pointValue,
  });

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
      <div className="space-y-4">
        <Field label="Monthly spend">
          <RupeeInput value={monthlySpend} onChange={setMonthlySpend} />
        </Field>
        <Field label="Points earned per ₹100 spent">
          <PlainInput value={pointsPer100} onChange={setPointsPer100} suffix="pts" />
        </Field>
        <Field label="Your assumed value per point">
          <RupeeDecimalInput value={pointValue} onChange={setPointValue} />
        </Field>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-200">Annual points earned</p>
          <p className="mt-1 text-2xl font-extrabold text-cream">{Math.round(result.annualPointsEarned).toLocaleString("en-IN")}</p>
        </div>
        <div className="rounded-xl border border-brand-100 bg-brand-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-700">Estimated annual value</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-900">
            {formatInr(Math.round(result.annualRedemptionValueInr))}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Effective reward rate at this point value: ~{result.effectiveRewardRatePercent.toFixed(2)}% of spend.
        Point value varies hugely by redemption method (vouchers are usually worth less than flights or
        transfers) — check your card&apos;s actual redemption catalog rather than assuming a best-case rate.
      </p>
    </div>
  );
}
