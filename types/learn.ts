// Canonical content contract for the Learning Center — mirrors the card
// data contract's philosophy (types/card.ts): structured JSON content,
// not prose blobs, so pages render consistently and content stays easy
// to audit. This is educational content, not personalized financial
// advice — see the disclaimer rendered on every /learn page.

import { FAQItem } from "./card";

export type GlossaryDepth = "flagship" | "standard";

export interface GlossaryGuide {
  slug: string;
  term: string; // display title, e.g. "Credit Utilization Ratio"
  category: string; // groups related terms on the /learn index, e.g. "Billing & Payments"
  depth: GlossaryDepth; // "flagship" guides have every section filled in
  shortDefinition: string; // 1-2 sentences, shown on index cards
  definition: string; // full paragraph(s)
  whyItMatters: string;
  realLifeExamples?: string[];
  commonMistakes?: string[];
  tips?: string[];
  faqs?: FAQItem[];
  relatedTerms?: string[]; // other glossary slugs
}

export interface PersonaGuide {
  slug: string; // e.g. "student"
  title: string; // e.g. "Student"
  summary: string;
  shouldYouGetOne: string;
  benefits: string[];
  risks: string[];
  cardCategoryRecommendations?: { category: string; reason: string }[]; // links to /best/[category] — no named "best card" claims without a disclosed scoring methodology (see docs/scoring-methodology.md)
  whenToAvoid?: string;
  faqs?: FAQItem[];
}

export interface Benefit {
  slug: string;
  title: string;
  description: string;
  whoBenefitsMost: string;
  thingsToRemember: string;
}

export interface Risk {
  slug: string;
  title: string;
  whatCanGoWrong: string;
  realLifeExample: string;
  howToAvoid: string;
}

export interface ResponsibleHabit {
  title: string;
  description: string;
}

export type MythVerdict = "true" | "false" | "partly-true";

export interface Myth {
  statement: string;
  verdict: MythVerdict;
  explanation: string;
}
