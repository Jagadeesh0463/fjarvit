"use client";

import { useState } from "react";
import { calculateInterest } from "@/lib/calculators/interestCalculator";
import { formatInr } from "@/constants/fees";
import { Field, RupeeInput, PercentInput, PlainInput } from "./CalculatorInputs";

export function InterestCalculator() {
  const [outstanding, setOutstanding] = useState(20000);
  const [annualRate, setAnnualRate] = useState(42);
  const [months, setMonths] = useState(6);

  const result = calculateInterest({
    outstandingInr: outstanding,
    annualInterestRatePercent: annualRate,
    monthsCarried: months,
  });

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
      <div className="space-y-4">
        <Field label="Outstanding balance">
          <RupeeInput value={outstanding} onChange={setOutstanding} />
        </Field>
        <Field label="Annual interest rate">
          <PercentInput value={annualRate} onChange={setAnnualRate} />
        </Field>
        <Field label="Months carried (no new spending)">
          <PlainInput value={months} onChange={setMonths} suffix="months" />
        </Field>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-200">Total interest paid</p>
          <p className="mt-1 text-2xl font-extrabold text-cream">{formatInr(Math.round(result.totalInterestInr))}</p>
        </div>
        <div className="rounded-xl border border-brand-100 bg-brand-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-700">Balance after {months} months</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-900">{formatInr(Math.round(result.finalBalanceInr))}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Estimate only, using monthly compounding on a flat annual rate (≈{result.monthlyRatePercent.toFixed(2)}%
        per month) — real issuers typically compound daily and this doesn&apos;t include new spending, fees, or
        minimum-due mechanics. Use it to understand the shape of the cost, not as your actual bill.
      </p>
    </div>
  );
}
