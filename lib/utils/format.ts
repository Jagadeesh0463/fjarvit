// Convention: a lounge visit count of 99+ means "unlimited" (some premium
// cards genuinely have no cap). Real per-quarter counts never reach this
// high, so it's a safe sentinel rather than a separate boolean field.
// Shared between BenefitTable and ComparisonTable so both render it the
// same way — see types/card.ts LoungeBenefit.
export function formatVisits(n: number): string {
  return n >= 99 ? "Unlimited" : `${n}`;
}
