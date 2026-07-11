import { CreditCard } from "@/types/card";

export interface SpendInput {
  category: string; // matches CashbackBenefit.category
  amountInr: number;
}

export interface CashbackResult {
  category: string;
  amountInr: number;
  rate: number;
  cashbackInr: number;
  cappedAt?: number;
}

export function calculateCashback(card: CreditCard, spends: SpendInput[]): {
  breakdown: CashbackResult[];
  totalCashbackInr: number;
} {
  const breakdown: CashbackResult[] = spends.map((spend) => {
    const benefit = card.currentBenefits.cashback.find((c) => c.category === spend.category);
    if (!benefit) {
      return { category: spend.category, amountInr: spend.amountInr, rate: 0, cashbackInr: 0 };
    }
    const raw = (spend.amountInr * benefit.rate) / 100;
    const cashbackInr = benefit.cap ? Math.min(raw, benefit.cap) : raw;
    return {
      category: spend.category,
      amountInr: spend.amountInr,
      rate: benefit.rate,
      cashbackInr,
      cappedAt: benefit.cap,
    };
  });

  const totalCashbackInr = breakdown.reduce((sum, b) => sum + b.cashbackInr, 0);
  return { breakdown, totalCashbackInr };
}

// Convenience helper for the before/after view on a change-history entry.
// Not a full recompute — just formats the two numbers side by side, since
// the "before" figure has to be sourced from the change record itself.
export function formatCashbackDelta(oldCashbackInr: number, newCashbackInr: number) {
  const deltaInr = newCashbackInr - oldCashbackInr;
  return {
    oldCashbackInr,
    newCashbackInr,
    deltaInr,
    direction: deltaInr > 0 ? "improved" : deltaInr < 0 ? "reduced" : "neutral",
  } as const;
}
