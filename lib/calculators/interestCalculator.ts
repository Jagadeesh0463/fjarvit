// Estimates interest on a credit card balance that isn't paid in full.
// Simplification note: real issuers compound daily on the outstanding
// balance; this uses monthly compounding on the flat annual rate as a
// close, explainable estimate for educational purposes — not a bill.
export interface InterestCalculatorInput {
  outstandingInr: number;
  annualInterestRatePercent: number; // e.g. 42 for ~3.5%/month
  monthsCarried: number;
}

export interface InterestCalculatorResult {
  monthlyRatePercent: number;
  totalInterestInr: number;
  finalBalanceInr: number;
  monthlyBreakdown: { month: number; interestInr: number; balanceInr: number }[];
}

export function calculateInterest(input: InterestCalculatorInput): InterestCalculatorResult {
  const { outstandingInr, annualInterestRatePercent, monthsCarried } = input;
  const monthlyRatePercent = annualInterestRatePercent / 12;
  const monthlyRate = monthlyRatePercent / 100;

  let balance = Math.max(0, outstandingInr);
  let totalInterest = 0;
  const monthlyBreakdown: { month: number; interestInr: number; balanceInr: number }[] = [];

  const months = Math.max(0, Math.round(monthsCarried));
  for (let m = 1; m <= months; m++) {
    const interest = balance * monthlyRate;
    balance += interest;
    totalInterest += interest;
    monthlyBreakdown.push({ month: m, interestInr: interest, balanceInr: balance });
  }

  return {
    monthlyRatePercent,
    totalInterestInr: totalInterest,
    finalBalanceInr: balance,
    monthlyBreakdown,
  };
}
