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
    <div className="space-y-4">
      {card.calculator.categories.map((c) => (
        <div key={c.label} className="flex items-center justify-between gap-4">
          <label className="text-sm text-gray-700">{c.label}</label>
          <input
            type="number"
            className="w-32 rounded border border-gray-300 px-2 py-1 text-right text-sm"
            value={spends[c.label] ?? 0}
            onChange={(e) => setSpends({ ...spends, [c.label]: Number(e.target.value) })}
          />
        </div>
      ))}
      <div className="rounded-md bg-brand-light p-3">
        <p className="text-sm font-medium text-brand">
          Estimated monthly cashback: {formatInr(Math.round(result.totalCashbackInr))}
        </p>
      </div>
    </div>
  );
}
