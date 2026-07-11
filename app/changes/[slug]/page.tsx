import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllCards, getCardBySlug } from "@/lib/content/getCards";
import { getBankBySlug } from "@/constants/banks";
import { buildBreadcrumbSchema, buildArticleSchema } from "@/lib/seo/buildMetadata";
import { ChangeTimeline } from "@/components/cards/ChangeTimeline";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { routes } from "@/constants/routes";

// One focused changelog page per card — separate from the full product
// page at /cards/[slug], which also covers benefits, the calculator, and
// FAQs. This page exists so "<card> benefit changes" style searches land
// somewhere that's just the change history, sourced and dated.
export function generateStaticParams() {
  return getAllCards()
    .filter((card) => card.history.length > 0)
    .map((card) => ({ slug: card.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const card = getCardBySlug(params.slug);
  if (!card) return {};
  const bank = getBankBySlug(card.bank);
  const title = `${card.slug.replace(/-/g, " ")} — Benefit Change History`;
  const description = `Every recorded benefit change for the ${bank?.name ?? card.bank} card, with dates and official sources.`;
  return {
    title,
    description,
    alternates: { canonical: `/changes/${card.slug}` },
  };
}

export default function CardChangesPage({ params }: { params: { slug: string } }) {
  const card = getCardBySlug(params.slug);
  if (!card) notFound();

  const bank = getBankBySlug(card.bank);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: routes.home() },
    { name: "Recent Changes", url: "/changes" },
    { name: card.slug.replace(/-/g, " "), url: routes.change(card.slug) },
  ]);
  const articleSchema = buildArticleSchema(card);

  return (
    <article className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <header>
        <h1 className="text-2xl font-extrabold capitalize text-brand-900 sm:text-3xl">
          {card.slug.replace(/-/g, " ")} — Benefit Change History
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {bank?.name ?? card.bank} · Last verified {card.lastVerified}
        </p>
      </header>

      {card.history.length === 0 ? (
        <AlertBanner variant="info">No changes have been recorded for this card yet.</AlertBanner>
      ) : (
        <ChangeTimeline history={card.history} />
      )}

      <p className="text-sm">
        <Link href={routes.card(card.slug)} className="font-medium text-brand-600 hover:text-brand-700 hover:underline">
          View full card details, current benefits, and spend calculator →
        </Link>
      </p>
    </article>
  );
}
