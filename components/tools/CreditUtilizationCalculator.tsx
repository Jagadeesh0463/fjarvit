"use client";

import { useState } from "react";
import { calculateCreditUtilization, UtilizationBand } from "@/lib/calculators/creditUtilizationCalculator";
import { formatInr } from "@/constants/fees";
import { Field, RupeeInput } from "./CalculatorInputs";
import { cn } from "@/lib/utils/cn";

const BAND_STYLES: Record<UtilizationBand, string> = {
  excellent: "bg-emerald-50 text-emerald-700 border-emerald-200",
  good: "bg-blue-50 text-blue-700 border-blue-200",
  high: "bg-accent-50 text-accent-700 border-accent-100",
  risky: "bg-red-50 text-red-700 border-red-200",
};

export function CreditUtilizationCalculator() {
  const [outstanding, setOutstanding] = useState(15000);
  const [limit, setLimit] = useState(100000);

  const result = calculateCreditUtilization({
    totalOutstandingInr: outstanding,
    totalCreditLimitInr: limit,
  });

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
      <div className="space-y-4">
        <Field label="Total outstanding (across all cards)">
          <RupeeInput value={outstanding} onChange={setOutstanding} />
        </Field>
        <Field label="Total credit limit (across all cards)">
          <RupeeInput value={limit} onChange={setLimit} />
        </Field>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-200">Utilization</p>
          <p className="mt-1 text-2xl font-extrabold text-cream">{result.utilizationPercent.toFixed(1)}%</p>
        </div>
        <div className="rounded-xl border border-brand-100 bg-brand-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-700">Available credit</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-900">{formatInr(Math.round(result.availableCreditInr))}</p>
        </div>
      </div>

      <div className={cn("mt-4 rounded-xl border px-4 py-3 text-sm font-medium", BAND_STYLES[result.band])}>
        {result.bandLabel}
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Most guidance suggests keeping utilization under ~30% for a healthy credit score, and under ~10% is
        often considered excellent — but exact thresholds and impact vary by credit bureau and individual
        credit history.
      </p>
    </div>
  );
}
