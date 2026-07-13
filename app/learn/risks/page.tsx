import { getRisks } from "@/lib/content/getLearnContent";
import { EducationalDisclaimer } from "@/components/learn/EducationalDisclaimer";
import { AlertBanner } from "@/components/ui/AlertBanner";

export const metadata = {
  title: "Credit Card Risks & Dangers",
  description: "Where credit cards go wrong — interest, minimum-due traps, overspending, debt, fraud — and how to avoid each one.",
};

export default function RisksPage() {
  const risks = getRisks();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">Risks & Dangers</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          A credit card is not free money. This is the most important page on this site — read it
          before you read anything about rewards.
        </p>
      </header>
      <EducationalDisclaimer />
      <div className="space-y-4">
        {risks.map((r) => (
          <section key={r.slug} className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
            <h2 className="text-base font-bold text-gray-900">{r.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">{r.whatCanGoWrong}</p>
            <div className="mt-3">
              <AlertBanner variant="warning">{r.realLifeExample}</AlertBanner>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              <span className="font-semibold text-brand-700">How to avoid it: </span>
              {r.howToAvoid}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
