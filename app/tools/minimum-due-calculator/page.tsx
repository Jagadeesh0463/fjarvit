import { routes } from "@/constants/routes";
import { buildBreadcrumbSchema } from "@/lib/seo/buildMetadata";
import { EducationalDisclaimer } from "@/components/learn/EducationalDisclaimer";
import { MinimumDueCalculator } from "@/components/tools/MinimumDueCalculator";
import Link from "next/link";

export const metadata = {
  title: "Minimum Due Calculator",
  description: "See what paying only the minimum due really does to your credit card balance over time.",
  alternates: { canonical: routes.minimumDueCalculator() },
};

export default function MinimumDueCalculatorPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: routes.home() },
    { name: "Learn", url: routes.learn() },
    { name: "Calculators", url: routes.tools() },
    { name: "Minimum Due Calculator", url: routes.minimumDueCalculator() },
  ]);

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">Minimum Due Calculator</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          See how a balance evolves if you only ever pay the minimum due. See the{" "}
          <Link href={routes.learnTopic("minimum-due")} className="font-medium text-brand-600 hover:underline">
            Minimum Due guide
          </Link>{" "}
          for the full explanation.
        </p>
      </header>
      <EducationalDisclaimer />
      <MinimumDueCalculator />
      <p className="text-sm">
        <Link href={routes.tools()} className="font-medium text-brand-600 hover:text-brand-700 hover:underline">
          ← Back to Calculators
        </Link>
      </p>
    </div>
  );
}
