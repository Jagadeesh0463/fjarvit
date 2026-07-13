import { notFound } from "next/navigation";
import Link from "next/link";
import { getGlossaryGuides, getGlossaryGuideBySlug } from "@/lib/content/getLearnContent";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { EducationalDisclaimer } from "@/components/learn/EducationalDisclaimer";
import { routes } from "@/constants/routes";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/buildMetadata";

export function generateStaticParams() {
  return getGlossaryGuides().map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const guide = getGlossaryGuideBySlug(params.slug);
  if (!guide) return {};
  return {
    title: guide.term,
    description: guide.shortDefinition,
    alternates: { canonical: `/learn/${guide.slug}` },
  };
}

export default function GlossaryDetailPage({ params }: { params: { slug: string } }) {
  const guide = getGlossaryGuideBySlug(params.slug);
  if (!guide) notFound();

  const allGuides = getGlossaryGuides();
  const related = (guide.relatedTerms ?? [])
    .map((slug) => allGuides.find((g) => g.slug === slug))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: routes.home() },
    { name: "Learn", url: routes.learn() },
    { name: guide.term, url: routes.learnTopic(guide.slug) },
  ]);
  const faqSchema = guide.faqs && guide.faqs.length > 0 ? buildFaqSchema(guide.faqs) : null;

  return (
    <article className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">
          {guide.category}
        </p>
        <h1 className="mt-1 text-2xl font-extrabold text-brand-900 sm:text-3xl">{guide.term}</h1>
      </header>

      <EducationalDisclaimer />

      <section className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
        <p className="leading-relaxed text-gray-700">{guide.definition}</p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-brand-900">Why it matters</h2>
        <p className="mt-3 leading-relaxed text-gray-700">{guide.whyItMatters}</p>
      </section>

      {guide.realLifeExamples && guide.realLifeExamples.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-brand-900">Real-life examples</h2>
          <ul className="mt-3 space-y-2">
            {guide.realLifeExamples.map((ex, i) => (
              <li key={i} className="rounded-2xl border border-brand-100 bg-white p-4 text-sm text-gray-700 shadow-card">
                {ex}
              </li>
            ))}
          </ul>
        </section>
      )}

      {guide.commonMistakes && guide.commonMistakes.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-brand-900">Common mistakes</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
            {guide.commonMistakes.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </section>
      )}

      {guide.tips && guide.tips.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-brand-900">Tips</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
            {guide.tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </section>
      )}

      {guide.faqs && guide.faqs.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-brand-900">FAQs</h2>
          <div className="mt-3">
            <FaqAccordion overrides={guide.faqs} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-brand-900">Related terms</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={routes.learnTopic(r.slug)}
                className="rounded-full border border-brand-100 bg-white px-3 py-1.5 text-sm font-medium text-brand-700 shadow-card transition-colors hover:border-brand-300"
              >
                {r.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="text-sm">
        <Link href={routes.learn()} className="font-medium text-brand-600 hover:text-brand-700 hover:underline">
          ← Back to Learning Center
        </Link>
      </p>
    </article>
  );
}
