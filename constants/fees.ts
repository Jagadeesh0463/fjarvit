// Shared fee-related constants and formatting helpers, so "₹", locale, and
// rounding rules live in exactly one place.

export const CURRENCY_SYMBOL = "₹";

export function formatInr(amount: number): string {
  return `${CURRENCY_SYMBOL}${amount.toLocaleString("en-IN")}`;
}

export const FEE_BANDS = {
  LIFETIME_FREE: 0,
  LOW: 1000,
  MID: 5000,
  PREMIUM: 10000,
} as const;
