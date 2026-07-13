// Centralized route builders so no component ever hand-writes a URL string.

export const routes = {
  home: () => "/",
  cards: () => "/cards",
  card: (slug: string) => `/cards/${slug}`,
  bank: (slug: string) => `/banks/${slug}`,
  category: (slug: string) => `/best/${slug}`,
  compare: (slugA: string, slugB: string) => {
    const [a, b] = [slugA, slugB].sort();
    return `/compare/${a}-vs-${b}`;
  },
  change: (slug: string) => `/changes/${slug}`,

  // Learning Center
  learn: () => "/learn",
  learnTopic: (slug: string) => `/learn/${slug}`,
  personas: () => "/learn/who-should-get-a-card",
  persona: (slug: string) => `/learn/who-should-get-a-card/${slug}`,
  benefits: () => "/learn/benefits",
  risks: () => "/learn/risks",
  responsibleUsage: () => "/learn/responsible-usage",
  myths: () => "/learn/myths",
  learnFaq: () => "/learn/faq",

  // Tools
  tools: () => "/tools",
  interestCalculator: () => "/tools/interest-calculator",
  minimumDueCalculator: () => "/tools/minimum-due-calculator",
  cashbackCalculator: () => "/tools/cashback-calculator",
  rewardPointsCalculator: () => "/tools/reward-points-calculator",
  creditUtilizationCalculator: () => "/tools/credit-utilization-calculator",
  emiCalculator: () => "/tools/emi-calculator",
};
