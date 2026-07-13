"use client";

import { useState } from "react";
import { calculateCashback } from "@/lib/calculators/cashbackCalculator";
import { formatInr } from "@/constants/fees";
import { Field, RupeeInput, PercentInput } from "./CalculatorInputs";

export function CashbackCalculator() {
  const [monthlySpend, setMonthlySpend] = useState(15000);
  const [rate, setRate] = useState(2);
  const [cap, setCap] = useState(500);

  const result = calculateCashback({
    monthlySpendInr: monthlySpend,
    cashbackRatePercent: rate,
    monthlyCapInr: cap,
  });

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
      <div className="space-y-4">
        <Field label="Monthly spend in this category">
          <RupeeInput value={monthlySpend} onChange={setMonthlySpend} />
        </Field>
        <Field label="Cashback rate">
          <PercentInput value={rate} onChange={setRate} />
        </Field>
        <Field label="Monthly cap (0 = no cap)">
          <RupeeInput value={cap} onChange={setCap} />
        </Field>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-200">Monthly cashback</p>
          <p className="mt-1 text-2xl font-extrabold text-cream">
            {formatInr(Math.round(result.effectiveMonthlyCashbackInr))}
          </p>
        </div>
        <div className="rounded-xl border border-brand-100 bg-brand-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-700">Estimated annual cashback</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-900">
            {formatInr(Math.round(result.annualCashbackInr))}
          </p>
        </div>
      </div>

      {result.isCapped && (
        <p className="mt-4 text-xs text-accent-700">
          Your monthly cap is limiting this cashback — uncapped, it would be{" "}
          {formatInr(Math.round(result.rawMonthlyCashbackInr))} a month.
        </p>
      )}

      <p className="mt-4 text-xs text-gray-500">
        This only helps if you were spending this money anyway and pay your bill in full — cashback is never
        worth more than the interest you&apos;d pay by carrying a balance.
      </p>
    </div>
  );
}
