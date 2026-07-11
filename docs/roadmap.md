# Roadmap

## Done

- **v0.1** — Project setup: Next.js, TypeScript, Tailwind, type contract,
  folder structure, reusable component library, all route types built.
- **v0.2** — Content pass: 20 manually curated credit card profiles across
  all 8 tracked banks, based on official publicly available product
  information (see [data-model.md](./data-model.md) for what "curated"
  means here — these are not officially certified figures).
- Full schema.org coverage (FAQ, Breadcrumb, Article, WebSite,
  Organization), an Alert Banner for discontinued/invite-only cards, and a
  per-card `/changes/[slug]` changelog page.

## Known gaps

- `rupay`, `upi`, and `student` categories have no cards yet — none of the
  20 cards fit those tags cleanly within the current 8 banks. The category
  pages handle this gracefully (empty state, not broken), but it's a real
  content gap.
- A few fields were single-sourced or had conflicting figures across
  sources during research (for example, one card's income eligibility
  threshold, another's reward rate). These are flagged inline in the
  relevant card's FAQ answers rather than hidden — worth a manual pass
  before treating the content as fully final.

## Next

- **v0.3** — Comparison and category page content pass, backfilling
  `rupay`/`upi`/`student` coverage.
- **Phase 1B** — Backfill to 30 cards; define and publish a scoring
  formula (see [scoring-methodology.md](./scoring-methodology.md)); ship
  ratings, Change Score, and comparison "Winner" together, not separately;
  command-palette search; a "Most Impactful Changes" homepage module.
- **Phase 2** — Live backend: admin panel, database, scrapers, AI-assisted
  summaries, diff detection, email alerts. This is where the data access
  layer isolation in `lib/content/getCards.ts` pays off — see
  [architecture.md](./architecture.md).
- **Phase 3** — User accounts, saved cards, push notifications, a
  personalized dashboard, mobile app, browser extension.

Scope discipline: build what's committed for the current phase and get it
in front of real users before adding more. Real usage — which pages get
traffic, whether the calculator gets used, what people search for — should
decide Phase 2 priorities, not speculation now.
