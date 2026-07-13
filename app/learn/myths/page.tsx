import { getMyths } from "@/lib/content/getLearnContent";
import { EducationalDisclaimer } from "@/components/learn/EducationalDisclaimer";
import { MythCard } from "@/components/learn/MythCard";

export const metadata = {
  title: "Common Credit Card Myths",
  description: "Popular credit card claims, fact-checked — true, false, or somewhere in between.",
};

export default function MythsPage() {
  const myths = getMyths();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">Common Myths</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Credit card advice travels fast and isn&apos;t always accurate. Here&apos;s what&apos;s actually true.
        </p>
      </header>
      <EducationalDisclaimer />
      <div className="space-y-4">
        {myths.map((m, i) => (
          <MythCard key={i} myth={m} />
        ))}
      </div>
    </div>
  );
}
