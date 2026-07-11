import Link from "next/link";
import { routes } from "@/constants/routes";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-brand-100/60 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href={routes.home()}
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-brand-700"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-cream shadow-card">
            F
          </span>
          Fjarvit
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-brand-700/80">
          <Link href={routes.cards()} className="transition-colors hover:text-accent-600">
            Cards
          </Link>
          <Link href="/changes" className="transition-colors hover:text-accent-600">
            Recent Changes
          </Link>
        </nav>
      </div>
    </header>
  );
}
