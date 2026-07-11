import { Metadata } from "next";
import { CreditCard } from "@/types/card";
import { getBankBySlug } from "@/constants/banks";

const SITE_NAME = "Fjarvit";
// placeholder — swap once the production domain is live
const SITE_URL = "https://fjarvit.com";

// Called from each page's generateMetadata() so every route ships title,
// description, and Open Graph tags as it's built — not as a separate SEO
// pass at the end. Structured data (schema.org) is emitted separately via
// JSON-LD <script> tags in each page component.
export function buildCardMetadata(card: CreditCard): Metadata {
  const bank = getBankBySlug(card.bank);
  const title = `${card.slug.replace(/-/g, " ")} — Benefits, Changes & Calculator | ${SITE_NAME}`;
  const description = `Current benefits, full change history, and a spend calculator for the ${bank?.name ?? card.bank} card. Last verified ${card.lastVerified}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    alternates: {
      canonical: `/cards/${card.slug}`,
    },
  };
}

export function buildFaqSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Site-wide schema — emitted once from the root layout, not per-page.
export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/cards?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    // Not a financial institution — informational tracker only. Kept plain
    // (no logo/sameAs) until brand assets and social profiles exist.
  };
}

// Card detail pages are the site's "article" content — current benefits,
// change history, and sourced evidence, updated as changes are verified.
export function buildArticleSchema(card: CreditCard) {
  const bank = getBankBySlug(card.bank);
  const title = `${card.slug.replace(/-/g, " ")} — Benefits, Changes & Calculator`;
  const mostRecentChange = [...card.history].sort(
    (a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime()
  )[0];

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    about: bank?.name ?? card.bank,
    dateModified: mostRecentChange?.effectiveDate ?? card.lastVerified,
    datePublished: card.lastVerified,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: `${SITE_URL}/cards/${card.slug}`,
  };
}
