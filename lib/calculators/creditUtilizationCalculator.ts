// Computes credit utilization ratio and gives a plain-language classification.
// Thresholds reflect commonly cited guidance (see the Credit Utilization
// Ratio glossary guide) — not a guarantee of any specific score outcome.
export type UtilizationBand = "excellent" | "good" | "high" | "risky";

export interface CreditUtilizationCalculatorInput {
  totalOutstandingInr: number;
  totalCreditLimitInr: number;
}

export interface CreditUtilizationCalculatorResult {
  utilizationPercent: number;
  band: UtilizationBand;
  bandLabel: string;
  availableCreditInr: number;
}

export function calculateCreditUtilization(
  input: CreditUtilizationCalculatorInput
): CreditUtilizationCalculatorResult {
  const { totalOutstandingInr, totalCreditLimitInr } = input;
  const limit = Math.max(0, totalCreditLimitInr);
  const outstanding = Math.max(0, totalOutstandingInr);
  const utilizationPercent = limit > 0 ? (outstanding / limit) * 100 : 0;

  let band: UtilizationBand;
  let bandLabel: string;
  if (utilizationPercent <= 10) {
    band = "excellent";
    bandLabel = "Excellent — well within a healthy range";
  } else if (utilizationPercent <= 30) {
    band = "good";
    bandLabel = "Good — generally considered a healthy range";
  } else if (utilizationPercent <= 50) {
    band = "high";
    bandLabel = "High — may start to affect your credit score";
  } else {
    band = "risky";
    bandLabel = "Risky — commonly associated with lower credit scores";
  }

  return {
    utilizationPercent,
    band,
    bandLabel,
    availableCreditInr: Math.max(0, limit - outstanding),
  };
}
