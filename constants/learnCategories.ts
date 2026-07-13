// Canonical ordering + labels for grouping glossary guides on /learn.
// A guide's `category` field (types/learn.ts) must match one of these
// exactly, or it won't be grouped (it will still render at its own
// /learn/[slug] URL — this only affects index-page organization).

export const GLOSSARY_CATEGORIES = [
  "The Basics",
  "Billing & Payments",
  "Credit & Limits",
  "Costs & Charges",
  "Rewards & Perks",
] as const;

export type GlossaryCategory = (typeof GLOSSARY_CATEGORIES)[number];
