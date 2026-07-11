import Link from "next/link";
import { routes } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="rounded-3xl border border-brand-100 bg-white py-16 text-center shadow-card">
      <h1 className="text-2xl font-extrabold text-brand-900">Card or page not found</h1>
      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600">
        We couldn&apos;t find what you were looking for. It may have been renamed or the card isn&apos;t
        tracked yet.
      </p>
      <Link
        href={routes.cards()}
        className="mt-5 inline-flex items-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-brand-700"
      >
        Browse all cards
      </Link>
    </div>
  );
}
