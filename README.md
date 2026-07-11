# Fjarvit — Phase 1A

Front-end-only MVP for tracking Indian credit card benefit changes. Static
JSON content today, designed to become a live API in Phase 2 without a UI
rewrite. See the plan documents (v1–v4) for full product context.

## Getting started

```bash
npm install
npm run dev
```

Then visit `http://localhost:3000`.

## What's built (Phase 1A)

- Next.js 14 (App Router) + TypeScript + Tailwind, configured, ESLint wired
  in (`next/core-web-vitals`)
- Full type contract in `types/card.ts`, matching the canonical data
  dictionary from the plan
- `constants/` — banks, categories, networks, fees, colors, routes, and the
  shared FAQ question template, so nothing is a magic string
- `content/cards/` — **20 verified cards** across all 8 tracked banks (HDFC,
  SBI, ICICI, Axis, Kotak, IDFC FIRST, IndusInd, AU SFB), hitting the Phase
  1A launch target. Each card has sourced fees, current benefits, and —
  where a verifiable change was found — dated change history with source
  evidence. See each file's data for the specific sources used.
- `lib/content/getCards.ts` — data access layer; swapping this for API calls
  in Phase 2 is a one-file change
- `lib/calculator/calculateCashback.ts` — the spend calculator's math,
  separated from the UI
- `lib/seo/buildMetadata.ts` — per-page metadata plus all 5 schema.org
  JSON-LD builders (FAQ, Breadcrumb, Article, WebSite, Organization), wired
  into pages as they're built, not a separate SEO pass at the end
- Reusable components: `CardTile`, `NetworkBadge`, `StatusBadge`,
  `BenefitTable`, `ChangeTimeline`, `FaqAccordion`, `ComparisonTable`,
  `SpendCalculator`, `AlertBanner` (status warnings for discontinued /
  invite-only cards)
- Working routes: `/`, `/cards`, `/cards/[slug]`, `/banks/[bank]`,
  `/best/[category]`, `/compare/[pair]` (same-category pairs only),
  `/changes`, `/changes/[slug]` (per-card changelog), plus `not-found` and
  `error` boundaries

## Known content gaps

- `rupay`, `upi`, and `student` categories have no cards yet (0 of the 20
  fit those tags cleanly within the current 8 banks) — `/best/[category]`
  handles this gracefully with an empty-state message rather than breaking.
- A few fields were single-sourced or hedged during research (e.g. SBI
  Prime's income eligibility, Kotak 811's reward rate) — flagged inline in
  each card's `faqTemplateAnswers` where relevant. Worth a manual pass
  before treating the content as fully final.

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

- `v0.1` — Project setup, types, content, components
- `v0.2` — Card pages content pass (backfilled to 20 verified cards) — done
- Schema.org coverage (Article/WebSite/Organization), Alert Banner,
  `/changes/[slug]` route — done
- `v0.3` — Comparison + category pages content pass (next)
- Phase 1B — Backfill to 30 cards, scoring methodology, ratings/Change
  Score/comparison Winner, command-palette search
