import Link from "next/link";
import { routes } from "@/constants/routes";

export function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href={routes.home()} className="text-lg font-semibold text-brand">
          Fjarvit
        </Link>
        <nav className="flex gap-4 text-sm text-gray-600">
          <Link href={routes.cards()}>Cards</Link>
          <Link href="/changes">Recent Changes</Link>
        </nav>
      </div>
    </header>
  );
}
