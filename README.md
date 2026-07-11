# Fjarvit — v0.1 Project Setup

Front-end-only MVP for tracking Indian credit card benefit changes. Static
JSON content today, designed to become a live API in Phase 2 without a UI
rewrite. See the plan documents (v1–v4) for full product context.

## Getting started

```bash
npm install
npm run dev
```

Then visit `http://localhost:3000`.

## What's in this milestone (v0.1)

- Next.js 14 (App Router) + TypeScript + Tailwind, configured
- Full type contract in `types/card.ts`, matching the canonical data
  dictionary from the plan
- `constants/` — banks, categories, networks, fees, colors, routes, and the
  shared FAQ question template, so nothing is a magic string
- `content/cards/` — two sample cards (Airtel Axis, SBI Cashback) that
  validate the schema end to end
- `lib/content/getCards.ts` — data access layer; swapping this for API calls
  in Phase 2 is a one-file change
- `lib/calculator/calculateCashback.ts` — the spend calculator's math,
  separated from the UI
- `lib/seo/buildMetadata.ts` — per-page metadata + FAQ/Breadcrumb schema.org
  JSON-LD builders, wired into pages as they're built (not a separate SEO
  pass at the end)
- Reusable components: `CardTile`, `NetworkBadge`, `StatusBadge`,
  `BenefitTable`, `ChangeTimeline`, `FaqAccordion`, `ComparisonTable`,
  `SpendCalculator`
- Working routes: `/`, `/cards`, `/cards/[slug]`, `/banks/[bank]`,
  `/best/[category]`, `/compare/[pair]`, `/changes`, plus `not-found` and
  `error` boundaries

## Deliberately not in this milestone

- Ratings, Change Score, and comparison "Winner" — all three require a
  disclosed, calculable scoring formula before they ship (Phase 1B). Shipping
  them without one is the same risk as an unexplained star rating on a
  financial-information site.
- Command-palette search — a plain search/filter is enough for MVP.
- Any backend, scraping, or admin panel — Phase 2.

## Adding a new card

Add a JSON file to `content/cards/` matching `types/card.ts`. Bank and
category slugs must exist in `constants/banks.ts` / `constants/categories.ts`
first.

## Milestones

- `v0.1` — Project setup, types, content, components (this commit)
- `v0.2` — Card pages content pass (backfill toward 20 verified cards)
- `v0.3` — Comparison + category pages content pass
