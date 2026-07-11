// Canonical card contract. This is the single source of truth for the shape
// of a card, both while data lives in /content JSON and later when it comes
// from a live API (Phase 2). Keep this file and the data dictionary in sync.

export type NetworkType = "Visa" | "Mastercard" | "Amex" | "RuPay";

export type CardStatus = "active" | "discontinued" | "invite_only";

export interface CreditCard {
  id: number;
  slug: string;
  bank: string; // bank slug, see constants/banks.ts
  network: NetworkType;
  category: string; // category slug, see constants/categories.ts
  status: CardStatus;
  annualFee: number; // INR, 0 if lifetime free
  joiningFee: number; // INR
  lifetimeFree: boolean;
  lastVerified: string; // ISO 8601 date
  currentBenefits: CurrentBenefits;
  history: ChangeHistoryEntry[];
  // Answers for constants/faqTemplate.ts questions, keyed by question text.
  // A question with no answer here is simply omitted from the rendered page.
  faqTemplateAnswers?: Record<string, string>;
  faqOverrides?: FAQItem[]; // card-specific Q&A, appended after the template
  calculator: CalculatorConfig;
}

export interface CurrentBenefits {
  cashback: CashbackBenefit[];
  rewardPoints?: RewardBenefit;
  loungeAccess?: LoungeBenefit;
  fuelBenefit?: FuelBenefit;
  movieBenefit?: MovieBenefit;
  insuranceBenefit?: InsuranceBenefit;
  milestoneBenefits?: MilestoneBenefit[];
}

export interface CashbackBenefit {
  category: string; // e.g. "Airtel bill", "Online spends", "All spends"
  rate: number; // percentage
  cap?: number; // INR per statement cycle, undefined = uncapped
  notes?: string;
}

export interface RewardBenefit {
  pointsPer: number; // e.g. 1 point per `pointsPerAmount`
  pointsPerAmount: number; // INR
  pointValueInr?: number; // redemption value of 1 point, if fixed
}

export interface LoungeBenefit {
  domesticVisitsPerQuarter: number;
  internationalVisitsPerQuarter: number;
  conditions?: string; // e.g. "requires ₹1L spend in preceding quarter"
}

export interface FuelBenefit {
  surchargeWaiverPercent: number;
  capInr?: number;
  minTransactionInr?: number;
  maxTransactionInr?: number;
}

export interface MovieBenefit {
  description: string;
  capInr?: number;
  frequency?: string; // e.g. "monthly"
}

export interface InsuranceBenefit {
  type: string; // e.g. "Air accident cover"
  coverageInr: number;
}

export interface MilestoneBenefit {
  spendThresholdInr: number;
  period: string; // e.g. "annual", "quarterly"
  reward: string;
}

export interface ChangeHistoryEntry {
  attribute: string;
  oldValue: string;
  newValue: string;
  effectiveDate: string; // ISO 8601
  source: SourceEvidence;
}

export interface SourceEvidence {
  name: string; // e.g. "Axis Bank"
  document: string; // e.g. "Terms & Conditions", "Official Notice"
  url?: string;
  page?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculatorConfig {
  categories: CalculatorCategory[];
}

export interface CalculatorCategory {
  label: string; // e.g. "Groceries", "Airtel bill"
  matchesCashbackCategory: string; // links to CashbackBenefit.category
  defaultSpendInr: number;
}

// Phase 1B only — do not render in the UI until a scoring methodology
// (see plan v4, Section 9) is defined and published. Left here so the type
// exists ahead of time without being wired into any component yet.
export interface ScoreBreakdown {
  overall: number; // 1-5
  cashback?: number;
  travel?: number;
  shopping?: number;
  lounge?: number;
  fuel?: number;
  methodologyUrl: string; // required — no score without a disclosed formula
}
