import { getBenefits } from "@/lib/content/getLearnContent";
import { EducationalDisclaimer } from "@/components/learn/EducationalDisclaimer";

export const metadata = {
  title: "Benefits of Credit Cards",
  description: "What credit cards actually offer, who benefits most from each, and what to remember.",
};

export default function BenefitsPage() {
  const benefits = getBenefits();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">Benefits of Credit Cards</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Used well, a credit card is more than a payment method. Here&apos;s what it can actually do
          for you.
        </p>
      </header>
      <EducationalDisclaimer />
      <div className="space-y-4">
        {benefits.map((b) => (
          <section key={b.slug} className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
            <h2 className="text-base font-bold text-gray-900">{b.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">{b.description}</p>
            <p className="mt-3 text-sm text-gray-600">
              <span className="font-semibold text-brand-700">Who benefits most: </span>
              {b.whoBenefitsMost}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              <span className="font-semibold text-brand-700">Remember: </span>
              {b.thingsToRemember}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
