// Standard reducing-balance EMI formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
export interface EmiCalculatorInput {
  principalInr: number;
  annualInterestRatePercent: number;
  tenureMonths: number;
}

export interface EmiCalculatorResult {
  emiInr: number;
  totalPaymentInr: number;
  totalInterestInr: number;
}

export function calculateEmi(input: EmiCalculatorInput): EmiCalculatorResult {
  const { principalInr, annualInterestRatePercent, tenureMonths } = input;
  const principal = Math.max(0, principalInr);
  const months = Math.max(1, Math.round(tenureMonths));
  const monthlyRate = annualInterestRatePercent / 12 / 100;

  let emi: number;
  if (monthlyRate === 0) {
    emi = principal / months;
  } else {
    const factor = Math.pow(1 + monthlyRate, months);
    emi = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  return {
    emiInr: emi,
    totalPaymentInr: totalPayment,
    totalInterestInr: totalInterest,
  };
}
