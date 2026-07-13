// Projects what happens to a balance over time if only the minimum due
// is paid each month, with no new spending. Educational estimate using
// monthly compounding — real bills vary by issuer.
export interface MinimumDueCalculatorInput {
  totalDueInr: number;
  minimumDuePercent: number; // e.g. 5 for 5%
  annualInterestRatePercent: number;
  monthsToProject: number;
}

export interface MinimumDueMonth {
  month: number;
  openingBalanceInr: number;
  minimumPaidInr: number;
  interestChargedInr: number;
  closingBalanceInr: number;
}

export interface MinimumDueCalculatorResult {
  schedule: MinimumDueMonth[];
  totalPaidInr: number;
  totalInterestPaidInr: number;
  balanceIsShrinking: boolean; // false means minimum due doesn't even cover interest
}

export function calculateMinimumDue(input: MinimumDueCalculatorInput): MinimumDueCalculatorResult {
  const { totalDueInr, minimumDuePercent, annualInterestRatePercent, monthsToProject } = input;
  const monthlyRate = annualInterestRatePercent / 12 / 100;

  let balance = Math.max(0, totalDueInr);
  const schedule: MinimumDueMonth[] = [];
  let totalPaid = 0;
  let totalInterest = 0;

  const months = Math.max(0, Math.round(monthsToProject));
  for (let m = 1; m <= months && balance > 0; m++) {
    const opening = balance;
    const minimumPaid = Math.min(opening, (opening * minimumDuePercent) / 100);
    const afterPayment = opening - minimumPaid;
    const interest = afterPayment * monthlyRate;
    const closing = afterPayment + interest;

    schedule.push({
      month: m,
      openingBalanceInr: opening,
      minimumPaidInr: minimumPaid,
      interestChargedInr: interest,
      closingBalanceInr: closing,
    });

    totalPaid += minimumPaid;
    totalInterest += interest;
    balance = closing;
  }

  const firstMinimum = schedule[0]?.minimumPaidInr ?? 0;
  const firstInterest = schedule[0]?.interestChargedInr ?? 0;
  const balanceIsShrinking = firstMinimum > firstInterest;

  return {
    schedule,
    totalPaidInr: totalPaid,
    totalInterestPaidInr: totalInterest,
    balanceIsShrinking,
  };
}
