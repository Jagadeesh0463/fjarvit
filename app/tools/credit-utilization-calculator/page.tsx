import { routes } from "@/constants/routes";
import { buildBreadcrumbSchema } from "@/lib/seo/buildMetadata";
import { EducationalDisclaimer } from "@/components/learn/EducationalDisclaimer";
import { CreditUtilizationCalculator } from "@/components/tools/CreditUtilizationCalculator";
import Link from "next/link";

export const metadata = {
  title: "Credit Utilization Calculator",
  description: "Check your credit utilization ratio across all your cards and what band it falls in.",
  alternates: { canonical: routes.creditUtilizationCalculator() },
};

export default function CreditUtilizationCalculatorPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: routes.home() },
    { name: "Learn", url: routes.learn() },
    { name: "Calculators", url: routes.tools() },
    { name: "Credit Utilization Calculator", url: routes.creditUtilizationCalculator() },
  ]);

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">Credit Utilization Calculator</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Add up your outstanding balances and credit limits across all cards to see your utilization ratio. See
          the{" "}
          <Link
            href={routes.learnTopic("credit-utilization-ratio")}
            className="font-medium text-brand-600 hover:underline"
          >
            Credit Utilization Ratio guide
          </Link>{" "}
          for why this matters.
        </p>
      </header>
      <EducationalDisclaimer />
      <CreditUtilizationCalculator />
      <p className="text-sm">
        <Link href={routes.tools()} className="font-medium text-brand-600 hover:text-brand-700 hover:underline">
          ← Back to Calculators
        </Link>
      </p>
    </div>
  );
}
