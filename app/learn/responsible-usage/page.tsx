import { getResponsibleHabits } from "@/lib/content/getLearnContent";
import { EducationalDisclaimer } from "@/components/learn/EducationalDisclaimer";

export const metadata = {
  title: "Responsible Credit Card Usage",
  description: "Habits that keep a credit card working for you, not against you.",
};

export default function ResponsibleUsagePage() {
  const habits = getResponsibleHabits();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">
          Responsible Credit Card Usage
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Every benefit on this site — cashback, rewards, lounge access — only pays off if the
          card is used like this.
        </p>
      </header>
      <EducationalDisclaimer />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {habits.map((h, i) => (
          <div key={i} className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
            <h2 className="text-base font-bold text-gray-900">{h.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">{h.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
