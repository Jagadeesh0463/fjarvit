import { routes } from "@/constants/routes";
import { buildBreadcrumbSchema } from "@/lib/seo/buildMetadata";
import { EducationalDisclaimer } from "@/components/learn/EducationalDisclaimer";
import { InterestCalculator } from "@/components/tools/InterestCalculator";
import Link from "next/link";

export const metadata = {
  title: "Interest Calculator",
  description: "See how much interest a carried credit card balance actually costs over time.",
  alternates: { canonical: routes.interestCalculator() },
};

export default function InterestCalculatorPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: routes.home() },
    { name: "Learn", url: routes.learn() },
    { name: "Calculators", url: routes.tools() },
    { name: "Interest Calculator", url: routes.interestCalculator() },
  ]);

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">Interest Calculator</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Enter an outstanding balance to see how much interest it accrues if it isn&apos;t paid off. See the{" "}
          <Link href={routes.learnTopic("interest-charges")} className="font-medium text-brand-600 hover:underline">
            Interest Charges guide
          </Link>{" "}
          for how this works.
        </p>
      </header>
      <EducationalDisclaimer />
      <InterestCalculator />
      <p className="text-sm">
        <Link href={routes.tools()} className="font-medium text-brand-600 hover:text-brand-700 hover:underline">
          ← Back to Calculators
        </Link>
      </p>
    </div>
  );
}
