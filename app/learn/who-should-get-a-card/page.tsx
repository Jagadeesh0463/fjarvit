import { getPersonas } from "@/lib/content/getLearnContent";
import { PersonaCard } from "@/components/learn/PersonaCard";
import { EducationalDisclaimer } from "@/components/learn/EducationalDisclaimer";

export const metadata = {
  title: "Who Should Get a Credit Card?",
  description:
    "Whether a credit card makes sense depends on who you are — student, salaried employee, self-employed professional, business owner, or frequent traveler.",
};

export default function PersonasIndexPage() {
  const personas = getPersonas();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">
          Who Should Get a Credit Card?
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          The right answer depends on your situation. Pick the one closest to yours.
        </p>
      </header>
      <EducationalDisclaimer />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {personas.map((p) => (
          <PersonaCard key={p.slug} persona={p} />
        ))}
      </div>
    </div>
  );
}
