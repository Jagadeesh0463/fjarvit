import { routes } from "@/constants/routes";
import { buildBreadcrumbSchema } from "@/lib/seo/buildMetadata";
import { EducationalDisclaimer } from "@/components/learn/EducationalDisclaimer";
import { CashbackCalculator } from "@/components/tools/CashbackCalculator";
import Link from "next/link";

export const metadata = {
  title: "Cashback Calculator",
  description: "Estimate monthly and yearly cashback for a spend category, including any monthly cap.",
  alternates: { canonical: routes.cashbackCalculator() },
};

export default function CashbackCalculatorPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: routes.home() },
    { name: "Learn", url: routes.learn() },
    { name: "Calculators", url: routes.tools() },
    { name: "Cashback Calculator", url: routes.cashbackCalculator() },
  ]);

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">Cashback Calculator</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Estimate cashback for a single spend category, including any monthly cap. See the{" "}
          <Link href={routes.learnTopic("cashback")} className="font-medium text-brand-600 hover:underline">
            Cashback guide
          </Link>{" "}
          for how it usually works. For a specific card&apos;s actual categories, use that card&apos;s own
          calculator on its{" "}
          <Link href={routes.cards()} className="font-medium text-brand-600 hover:underline">
            card page
          </Link>
          .
        </p>
      </header>
      <EducationalDisclaimer />
      <CashbackCalculator />
      <p className="text-sm">
        <Link href={routes.tools()} className="font-medium text-brand-600 hover:text-brand-700 hover:underline">
          ← Back to Calculators
        </Link>
      </p>
    </div>
  );
}
