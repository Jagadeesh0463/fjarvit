"use client";

import { useState } from "react";
import { calculateMinimumDue } from "@/lib/calculators/minimumDueCalculator";
import { formatInr } from "@/constants/fees";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { Field, RupeeInput, PercentInput, PlainInput } from "./CalculatorInputs";

export function MinimumDueCalculator() {
  const [totalDue, setTotalDue] = useState(20000);
  const [minPercent, setMinPercent] = useState(5);
  const [annualRate, setAnnualRate] = useState(42);
  const [monthsToProject, setMonthsToProject] = useState(12);

  const result = calculateMinimumDue({
    totalDueInr: totalDue,
    minimumDuePercent: minPercent,
    annualInterestRatePercent: annualRate,
    monthsToProject,
  });

  const finalBalance = result.schedule.length > 0 ? result.schedule[result.schedule.length - 1].closingBalanceInr : 0;

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
      <div className="space-y-4">
        <Field label="Total due">
          <RupeeInput value={totalDue} onChange={setTotalDue} />
        </Field>
        <Field label="Minimum due">
          <PercentInput value={minPercent} onChange={setMinPercent} />
        </Field>
        <Field label="Annual interest rate">
          <PercentInput value={annualRate} onChange={setAnnualRate} />
        </Field>
        <Field label="Project over">
          <PlainInput value={monthsToProject} onChange={setMonthsToProject} suffix="months" />
        </Field>
      </div>

      {!result.balanceIsShrinking && (
        <div className="mt-4">
          <AlertBanner variant="danger">
            At this rate, the minimum due doesn&apos;t even cover the interest — the balance will keep growing
            every month if only the minimum is paid, even with no new spending.
          </AlertBanner>
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-200">Total interest paid</p>
          <p className="mt-1 text-2xl font-extrabold text-cream">
            {formatInr(Math.round(result.totalInterestPaidInr))}
          </p>
        </div>
        <div className="rounded-xl border border-brand-100 bg-brand-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-700">
            Balance after {monthsToProject} months
          </p>
          <p className="mt-1 text-2xl font-extrabold text-brand-900">{formatInr(Math.round(finalBalance))}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Assumes no new spending during this period, which is rarely realistic — this shows the pure cost of
        paying only the minimum due, to make the trade-off visible.
      </p>
    </div>
  );
}
