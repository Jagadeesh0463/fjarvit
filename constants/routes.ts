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
};
