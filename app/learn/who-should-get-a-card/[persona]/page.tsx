import { notFound } from "next/navigation";
import Link from "next/link";
import { getPersonas, getPersonaBySlug } from "@/lib/content/getLearnContent";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { EducationalDisclaimer } from "@/components/learn/EducationalDisclaimer";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { routes } from "@/constants/routes";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/buildMetadata";

export function generateStaticParams() {
  return getPersonas().map((p) => ({ persona: p.slug }));
}

export function generateMetadata({ params }: { params: { persona: string } }) {
  const persona = getPersonaBySlug(params.persona);
  if (!persona) return {};
  return {
    title: `Credit Cards for ${persona.title}s`,
    description: persona.summary,
    alternates: { canonical: `/learn/who-should-get-a-card/${persona.slug}` },
  };
}

export default function PersonaDetailPage({ params }: { params: { persona: string } }) {
  const persona = getPersonaBySlug(params.persona);
  if (!persona) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: routes.home() },
    { name: "Learn", url: routes.learn() },
    { name: "Who Should Get a Card?", url: routes.personas() },
    { name: persona.title, url: routes.persona(persona.slug) },
  ]);
  const faqSchema = persona.faqs && persona.faqs.length > 0 ? buildFaqSchema(persona.faqs) : null;

  return (
    <article className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">
          Who Should Get a Card?
        </p>
        <h1 className="mt-1 text-2xl font-extrabold text-brand-900 sm:text-3xl">{persona.title}</h1>
        <p className="mt-2 text-gray-600">{persona.summary}</p>
      </header>

      <EducationalDisclaimer />

      <section>
        <h2 className="text-lg font-bold text-brand-900">Should you get one?</h2>
        <p className="mt-3 leading-relaxed text-gray-700">{persona.shouldYouGetOne}</p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-brand-900">Benefits</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
          {persona.benefits.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-brand-900">Risks</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
          {persona.risks.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>

      {persona.cardCategoryRecommendations && persona.cardCategoryRecommendations.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-brand-900">Card categories worth looking at</h2>
          <p className="mt-2 text-sm text-gray-500">
            These are categories, not named &quot;best&quot; cards — Fjarvit doesn&apos;t declare a
            winner without a published scoring method. Browse the actual cards in each category.
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {persona.cardCategoryRecommendations.map((rec, i) => (
              <Link
                key={i}
                href={routes.category(rec.category)}
                className="block rounded-2xl border border-brand-100 bg-white p-4 shadow-card transition-colors hover:border-brand-300"
              >
                <p className="text-sm font-semibold capitalize text-brand-700">
                  {rec.category.replace(/-/g, " ")} cards →
                </p>
                <p className="mt-1 text-sm text-gray-600">{rec.reason}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {persona.whenToAvoid && (
        <section>
          <h2 className="text-lg font-bold text-brand-900">When to avoid one</h2>
          <div className="mt-3">
            <AlertBanner variant="warning">{persona.whenToAvoid}</AlertBanner>
          </div>
        </section>
      )}

      {persona.faqs && persona.faqs.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-brand-900">FAQs</h2>
          <div className="mt-3">
            <FaqAccordion overrides={persona.faqs} />
          </div>
        </section>
      )}

      <p className="text-sm">
        <Link href={routes.personas()} className="font-medium text-brand-600 hover:text-brand-700 hover:underline">
          ← Back to all personas
        </Link>
      </p>
    </article>
  );
}
