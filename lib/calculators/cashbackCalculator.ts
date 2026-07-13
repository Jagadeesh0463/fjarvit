// Simple cashback estimator for a single spend category with an optional cap.
export interface CashbackCalculatorInput {
  monthlySpendInr: number;
  cashbackRatePercent: number;
  monthlyCapInr?: number; // 0 or undefined = no cap
}

export interface CashbackCalculatorResult {
  rawMonthlyCashbackInr: number;
  effectiveMonthlyCashbackInr: number; // after cap
  isCapped: boolean;
  annualCashbackInr: number;
}

export function calculateCashback(input: CashbackCalculatorInput): CashbackCalculatorResult {
  const { monthlySpendInr, cashbackRatePercent, monthlyCapInr } = input;
  const raw = (Math.max(0, monthlySpendInr) * cashbackRatePercent) / 100;
  const capped = monthlyCapInr && monthlyCapInr > 0 ? Math.min(raw, monthlyCapInr) : raw;

  return {
    rawMonthlyCashbackInr: raw,
    effectiveMonthlyCashbackInr: capped,
    isCapped: Boolean(monthlyCapInr && monthlyCapInr > 0 && raw > monthlyCapInr),
    annualCashbackInr: capped * 12,
  };
}
