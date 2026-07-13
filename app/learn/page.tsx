import Link from "next/link";
import { getGlossaryGuides } from "@/lib/content/getLearnContent";
import { GLOSSARY_CATEGORIES } from "@/constants/learnCategories";
import { GlossaryCard } from "@/components/learn/GlossaryCard";
import { EducationalDisclaimer } from "@/components/learn/EducationalDisclaimer";
import { routes } from "@/constants/routes";

export const metadata = {
  title: "Learn Credit Cards",
  description:
    "Plain-language guides to how credit cards actually work — billing cycles, interest, rewards, credit scores, and more.",
};

const SECTION_LINKS = [
  { href: routes.personas(), title: "Who Should Get a Card?", description: "Student, salaried, self-employed, business owner, frequent traveler." },
  { href: routes.benefits(), title: "Benefits", description: "What credit cards actually offer, and who benefits most from each." },
  { href: routes.risks(), title: "Risks & Dangers", description: "Where credit cards go wrong, and how to avoid it." },
  { href: routes.responsibleUsage(), title: "Responsible Usage", description: "Habits that keep a credit card working for you, not against you." },
  { href: routes.myths(), title: "Common Myths", description: "Popular credit card claims, fact-checked." },
  { href: routes.learnFaq(), title: "FAQ", description: "Quick answers to the questions people ask most." },
  { href: routes.tools(), title: "Calculators", description: "Interest, EMI, minimum due, cashback, and more — see the real numbers." },
];

export default function LearnIndexPage() {
  const guides = getGlossaryGuides();
  const byCategory = GLOSSARY_CATEGORIES.map((category) => ({
    category,
    guides: guides.filter((g) => g.category === category),
  })).filter((c) => c.guides.length > 0);

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">Learn Credit Cards</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Plain-language guides to how credit cards actually work, so you can decide what&apos;s right
          for you before you apply for one.
        </p>
        <div className="mt-4">
          <EducationalDisclaimer />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-brand-900">Explore</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTION_LINKS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group block rounded-2xl border border-brand-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover"
            >
              <h3 className="text-base font-bold text-gray-900 transition-colors group-hover:text-brand-700">
                {s.title}
              </h3>
              <p className="mt-1.5 text-sm text-gray-600">{s.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {byCategory.map(({ category, guides: categoryGuides }) => (
        <section key={category}>
          <h2 className="text-lg font-bold text-brand-900">{category}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryGuides.map((guide) => (
              <GlossaryCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
