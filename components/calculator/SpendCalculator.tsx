"use client";

import { useState } from "react";
import { CreditCard } from "@/types/card";
import { calculateCashback } from "@/lib/calculator/calculateCashback";
import { formatInr } from "@/constants/fees";

export function SpendCalculator({ card }: { card: CreditCard }) {
  const [spends, setSpends] = useState<Record<string, number>>(
    Object.fromEntries(card.calculator.categories.map((c) => [c.label, c.defaultSpendInr]))
  );

  const result = calculateCashback(
    card,
    card.calculator.categories.map((c) => ({
      category: c.matchesCashbackCategory,
      amountInr: spends[c.label] ?? 0,
    }))
  );

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
      <div className="space-y-4">
        {card.calculator.categories.map((c) => (
          <div key={c.label} className="flex items-center justify-between gap-4">
            <label className="text-sm text-gray-700">{c.label}</label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-sm text-gray-400">
                ₹
              </span>
              <input
                type="number"
                className="w-32 rounded-lg border border-gray-200 py-1.5 pl-6 pr-2 text-right text-sm text-gray-900 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                value={spends[c.label] ?? 0}
                onChange={(e) => setSpends({ ...spends, [c.label]: Number(e.target.value) })}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-200">
          Estimated monthly cashback
        </p>
        <p className="mt-1 text-2xl font-extrabold text-cream">
          {formatInr(Math.round(result.totalCashbackInr))}
        </p>
      </div>
    </div>
  );
}
