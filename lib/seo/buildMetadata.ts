import { Metadata } from "next";
import { CreditCard } from "@/types/card";
import { getBankBySlug } from "@/constants/banks";

const SITE_NAME = "Fjarvit";

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
