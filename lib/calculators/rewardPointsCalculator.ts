// Estimates reward points earned and their redemption value. Point value
// varies a lot by redemption method (vouchers, flights, statement credit) —
// this asks the user to enter their own assumed value per point for an
// honest, non-inflated estimate rather than assuming a "best case" rate.
export interface RewardPointsCalculatorInput {
  monthlySpendInr: number;
  pointsPer100Inr: number; // e.g. 2 points per ₹100 spent
  pointValueInr: number; // assumed ₹ value per point on redemption
}

export interface RewardPointsCalculatorResult {
  monthlyPointsEarned: number;
  annualPointsEarned: number;
  monthlyRedemptionValueInr: number;
  annualRedemptionValueInr: number;
  effectiveRewardRatePercent: number; // redemption value as % of spend
}

export function calculateRewardPoints(input: RewardPointsCalculatorInput): RewardPointsCalculatorResult {
  const { monthlySpendInr, pointsPer100Inr, pointValueInr } = input;
  const spend = Math.max(0, monthlySpendInr);
  const monthlyPoints = (spend / 100) * pointsPer100Inr;
  const annualPoints = monthlyPoints * 12;
  const monthlyValue = monthlyPoints * pointValueInr;
  const annualValue = annualPoints * pointValueInr;
  const effectiveRate = spend > 0 ? (monthlyValue / spend) * 100 : 0;

  return {
    monthlyPointsEarned: monthlyPoints,
    annualPointsEarned: annualPoints,
    monthlyRedemptionValueInr: monthlyValue,
    annualRedemptionValueInr: annualValue,
    effectiveRewardRatePercent: effectiveRate,
  };
}
