import { getGeneralFaqs } from "@/lib/content/getLearnContent";
import { EducationalDisclaimer } from "@/components/learn/EducationalDisclaimer";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { buildFaqSchema } from "@/lib/seo/buildMetadata";

export const metadata = {
  title: "Credit Card FAQ",
  description: "Quick answers to the questions people ask most about credit cards.",
};

export default function LearnFaqPage() {
  const faqs = getGeneralFaqs();
  const faqSchema = buildFaqSchema(faqs);

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <header>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          The questions people ask most before getting — or after already having — a credit card.
        </p>
      </header>
      <EducationalDisclaimer />
      <FaqAccordion overrides={faqs} />
    </div>
  );
}
