// Convention: a lounge visit count of 99+ means "unlimited" (some premium
// cards genuinely have no cap). Real per-quarter counts never reach this
// high, so it's a safe sentinel rather than a separate boolean field.
// Shared between BenefitTable and ComparisonTable so both render it the
// same way — see types/card.ts LoungeBenefit.
export function formatVisits(n: number): string {
  return n >= 99 ? "Unlimited" : `${n}`;
}

// Cards are stored/displayed with kebab-case slugs (e.g. "hdfc-millennia")
// and rendered as "Hdfc Millennia" via a CSS `capitalize` class in most
// places. Search results render as plain text in a dropdown, so this does
// the same transform in JS instead of relying on CSS.
export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
