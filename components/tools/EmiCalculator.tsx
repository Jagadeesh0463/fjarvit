"use client";

import { useState } from "react";
import { calculateEmi } from "@/lib/calculators/emiCalculator";
import { formatInr } from "@/constants/fees";
import { Field, RupeeInput, PercentInput, PlainInput } from "./CalculatorInputs";

export function EmiCalculator() {
  const [principal, setPrincipal] = useState(30000);
  const [annualRate, setAnnualRate] = useState(15);
  const [tenure, setTenure] = useState(6);

  const result = calculateEmi({
    principalInr: principal,
    annualInterestRatePercent: annualRate,
    tenureMonths: tenure,
  });

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
      <div className="space-y-4">
        <Field label="Purchase / loan amount">
          <RupeeInput value={principal} onChange={setPrincipal} />
        </Field>
        <Field label="Annual interest rate (0 for no-cost EMI)">
          <PercentInput value={annualRate} onChange={setAnnualRate} />
        </Field>
        <Field label="Tenure">
          <PlainInput value={tenure} onChange={setTenure} suffix="months" />
        </Field>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-200">Monthly EMI</p>
          <p className="mt-1 text-2xl font-extrabold text-cream">{formatInr(Math.round(result.emiInr))}</p>
        </div>
        <div className="rounded-xl border border-brand-100 bg-brand-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-700">Total interest over tenure</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-900">{formatInr(Math.round(result.totalInterestInr))}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        &quot;No-cost EMI&quot; usually means the interest is waived here but often built into the product
        price upfront, or a processing fee applies separately — check the actual terms before assuming 0%
        means zero added cost.
      </p>
    </div>
  );
}
