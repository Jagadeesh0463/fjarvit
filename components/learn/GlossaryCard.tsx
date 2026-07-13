import Link from "next/link";
import { GlossaryGuide } from "@/types/learn";
import { routes } from "@/constants/routes";

export function GlossaryCard({ guide }: { guide: GlossaryGuide }) {
  return (
    <Link
      href={routes.learnTopic(guide.slug)}
      className="group block rounded-2xl border border-brand-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover"
    >
      <h3 className="text-base font-bold text-gray-900 transition-colors group-hover:text-brand-700">
        {guide.term}
      </h3>
      <p className="mt-1.5 text-sm text-gray-600">{guide.shortDefinition}</p>
    </Link>
  );
}
