import Link from "next/link";
import { routes } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Card or page not found</h1>
      <p className="mt-2 text-sm text-gray-600">
        We couldn&apos;t find what you were looking for. It may have been renamed or the card isn&apos;t
        tracked yet.
      </p>
      <Link href={routes.cards()} className="mt-4 inline-block text-sm font-medium text-brand hover:underline">
        Browse all cards
      </Link>
    </div>
  );
}
