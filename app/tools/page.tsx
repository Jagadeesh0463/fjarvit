import Link from "next/link";
import { routes } from "@/constants/routes";
import { EducationalDisclaimer } from "@/components/learn/EducationalDisclaimer";

export const metadata = {
  title: "Credit Card Calculators",
  description:
    "Simple calculators for interest, minimum due, cashback, reward points, credit utilization, and EMI — see the real numbers before you decide.",
};

const TOOLS = [
  {
    href: routes.interestCalculator(),
    title: "Interest Calculator",
    description: "See how much interest a carried balance actually costs over time.",
  },
  {
    href: routes.minimumDueCalculator(),
    title: "Minimum Due Calculator",
    description: "Understand what paying only the minimum due really does to your balance.",
  },
  {
    href: routes.cashbackCalculator(),
    title: "Cashback Calculator",
    description: "Estimate monthly and yearly cashback for a spend category, with caps.",
  },
  {
    href: routes.rewardPointsCalculator(),
    title: "Reward Points Calculator",
    description: "Estimate points earned and their redemption value, at your own assumed rate.",
  },
  {
    href: routes.creditUtilizationCalculator(),
    title: "Credit Utilization Calculator",
    description: "Check your utilization ratio across all cards and what band it falls in.",
  },
  {
    href: routes.emiCalculator(),
    title: "EMI Calculator",
    description: "Work out the monthly installment and total interest for an EMI plan.",
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">Calculators</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          These tools help you see the real financial impact of a decision before you make it — not just the
          headline number a card or offer advertises.
        </p>
        <div className="mt-4">
          <EducationalDisclaimer />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block rounded-2xl border border-brand-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover"
          >
            <h2 className="text-base font-bold text-gray-900 transition-colors group-hover:text-brand-700">
              {tool.title}
            </h2>
            <p className="mt-1.5 text-sm text-gray-600">{tool.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
