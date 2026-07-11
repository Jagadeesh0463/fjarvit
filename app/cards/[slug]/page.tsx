import { notFound } from "next/navigation";
import { getAllCards, getCardBySlug, getRelatedCards } from "@/lib/content/getCards";
import { getBankBySlug } from "@/constants/banks";
import {
  buildCardMetadata,
  buildFaqSchema,
  buildBreadcrumbSchema,
  buildArticleSchema,
} from "@/lib/seo/buildMetadata";
import { BenefitTable } from "@/components/cards/BenefitTable";
import { ChangeTimeline } from "@/components/cards/ChangeTimeline";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { SpendCalculator } from "@/components/calculator/SpendCalculator";
import { StatusBadge } from "@/components/cards/StatusBadge";
import { NetworkBadge } from "@/components/cards/NetworkBadge";
import { CardTile } from "@/components/cards/CardTile";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { routes } from "@/constants/routes";

export function generateStaticParams() {
  return getAllCards().map((card) => ({ slug: card.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const card = getCardBySlug(params.slug);
  if (!card) return {};
  return buildCardMetadata(card);
}

export default function CardDetailPage({ params }: { params: { slug: string } }) {
  const card = getCardBySlug(params.slug);
  if (!card) notFound();

  const bank = getBankBySlug(card.bank);
  const related = getRelatedCards(card);

  const faqForSchema = Object.entries(card.faqTemplateAnswers ?? {}).map(([question, answer]) => ({
    question,
    answer,
  }));
  const faqSchema = buildFaqSchema([...faqForSchema, ...(card.faqOverrides ?? [])]);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: routes.home() },
    { name: bank?.name ?? card.bank, url: routes.bank(card.bank) },
    { name: card.slug.replace(/-/g, " "), url: routes.card(card.slug) },
  ]);
  const articleSchema = buildArticleSchema(card);

  return (
    <article className="space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {card.status === "discontinued" && (
        <AlertBanner variant="danger">
          This card has been discontinued and is no longer accepting new applications. Benefit
          details below reflect the last verified terms for existing cardholders.
        </AlertBanner>
      )}
      {card.status === "invite_only" && (
        <AlertBanner variant="warning">
          This card is currently invite-only. You cannot apply directly — the issuing bank selects
          eligible customers.
        </AlertBanner>
      )}

      <header>
        <div className="flex items-center gap-2">
          <NetworkBadge network={card.network} />
          <StatusBadge status={card.status} />
        </div>
        <h1 className="mt-3 text-2xl font-extrabold capitalize text-brand-900 sm:text-3xl">
          {card.slug.replace(/-/g, " ")}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {bank?.name ?? card.bank} · Last verified {card.lastVerified}
        </p>
      </header>

      <section>
        <h2 className="text-lg font-bold text-brand-900">Current Benefits</h2>
        <div className="mt-3">
          <BenefitTable benefits={card.currentBenefits} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-brand-900">Spend Calculator</h2>
        <div className="mt-3 max-w-md">
          <SpendCalculator card={card} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-brand-900">Change History</h2>
        <div className="mt-3">
          <ChangeTimeline history={card.history} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-brand-900">Frequently Asked Questions</h2>
        <div className="mt-3">
          <FaqAccordion templateAnswers={card.faqTemplateAnswers} overrides={card.faqOverrides} />
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-brand-900">Related Cards</h2>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <CardTile key={r.slug} card={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
