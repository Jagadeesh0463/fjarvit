import { routes } from "@/constants/routes";
import { buildBreadcrumbSchema } from "@/lib/seo/buildMetadata";
import { EducationalDisclaimer } from "@/components/learn/EducationalDisclaimer";
import { RewardPointsCalculator } from "@/components/tools/RewardPointsCalculator";
import Link from "next/link";

export const metadata = {
  title: "Reward Points Calculator",
  description: "Estimate reward points earned and their redemption value, based on your own assumed point value.",
  alternates: { canonical: routes.rewardPointsCalculator() },
};

export default function RewardPointsCalculatorPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: routes.home() },
    { name: "Learn", url: routes.learn() },
    { name: "Calculators", url: routes.tools() },
    { name: "Reward Points Calculator", url: routes.rewardPointsCalculator() },
  ]);

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">Reward Points Calculator</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Estimate the points you&apos;d earn and roughly what they&apos;re worth. See the{" "}
          <Link href={routes.learnTopic("reward-points")} className="font-medium text-brand-600 hover:underline">
            Reward Points guide
          </Link>{" "}
          for why point value varies so much by redemption method.
        </p>
      </header>
      <EducationalDisclaimer />
      <RewardPointsCalculator />
      <p className="text-sm">
        <Link href={routes.tools()} className="font-medium text-brand-600 hover:text-brand-700 hover:underline">
          ← Back to Calculators
        </Link>
      </p>
    </div>
  );
}
