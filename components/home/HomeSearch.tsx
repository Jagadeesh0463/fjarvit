"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { routes } from "@/constants/routes";

export interface SearchableCard {
  slug: string;
  label: string; // display name, e.g. "HDFC Millennia"
  bankName: string;
  categoryLabel: string;
}

// Simple client-side search over a small pre-built index (20-ish cards) —
// no need for a search API at this scale. Matches against card name, bank,
// and category so "cashback" or "lounge" surfaces relevant cards, per the
// placeholder text.
export function HomeSearch({ index }: { index: SearchableCard[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return index
      .filter(
        (c) =>
          c.label.toLowerCase().includes(q) ||
          c.bankName.toLowerCase().includes(q) ||
          c.categoryLabel.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query, index]);

  const showDropdown = query.trim().length >= 2;

  return (
    <div className="relative mx-auto max-w-xl">
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by card, bank, cashback, lounge..."
          className="w-full rounded-full border border-brand-100 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 shadow-card outline-none transition-colors placeholder:text-gray-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {showDropdown && (
        <div className="absolute inset-x-0 top-full z-10 mt-2 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card-hover">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500">No cards match &quot;{query}&quot;.</p>
          ) : (
            <ul>
              {results.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={routes.card(r.slug)}
                    className="flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors hover:bg-brand-50"
                  >
                    <span className="font-medium text-gray-900">{r.label}</span>
                    <span className="text-xs text-gray-500">
                      {r.bankName} · {r.categoryLabel}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={routes.cards()}
                  className="block border-t border-gray-100 px-4 py-2.5 text-center text-xs font-semibold text-brand-600 hover:bg-brand-50"
                >
                  View all cards →
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
