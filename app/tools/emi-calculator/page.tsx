import { routes } from "@/constants/routes";
import { buildBreadcrumbSchema } from "@/lib/seo/buildMetadata";
import { EducationalDisclaimer } from "@/components/learn/EducationalDisclaimer";
import { EmiCalculator } from "@/components/tools/EmiCalculator";
import Link from "next/link";

export const metadata = {
  title: "EMI Calculator",
  description: "Work out the monthly installment and total interest for converting a purchase to EMI.",
  alternates: { canonical: routes.emiCalculator() },
};

export default function EmiCalculatorPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: routes.home() },
    { name: "Learn", url: routes.learn() },
    { name: "Calculators", url: routes.tools() },
    { name: "EMI Calculator", url: routes.emiCalculator() },
  ]);

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">EMI Calculator</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          See the monthly installment and total interest before converting a purchase to EMI. See the{" "}
          <Link href={routes.learnTopic("emi-conversion")} className="font-medium text-brand-600 hover:underline">
            EMI Conversion guide
          </Link>{" "}
          for the fine print on &quot;no-cost&quot; EMI.
        </p>
      </header>
      <EducationalDisclaimer />
      <EmiCalculator />
      <p className="text-sm">
        <Link href={routes.tools()} className="font-medium text-brand-600 hover:text-brand-700 hover:underline">
          ← Back to Calculators
        </Link>
      </p>
    </div>
  );
}
