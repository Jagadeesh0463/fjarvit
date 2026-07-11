# Architecture

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Static content, static
generation (SSG) for every route. No backend, no database, no scraping in
Phase 1A — that's intentional (see [roadmap.md](./roadmap.md)).

## Project structure

```
app/            Routes (App Router) — one folder per URL segment
  (home)/
  cards/[slug]/
  banks/[bank]/
  compare/[pair]/
  best/[category]/
  changes/, changes/[slug]/
components/     Reusable UI, grouped by feature area
  cards/, compare/, calculator/, faq/, layout/, ui/
constants/      Single source of truth for banks, categories, networks,
                fees, colors, routes, FAQ question template — nothing in
                the app hand-writes these as magic strings
content/cards/  Static JSON, one file per card, matching types/card.ts
lib/
  content/      Data access layer (getCards.ts) — reads content/cards/
  calculator/   Spend calculator math, kept separate from UI
  seo/          Metadata + schema.org JSON-LD builders
types/          Canonical TypeScript contract for the data model
```

## Why static JSON instead of a database

Phase 1A's goal is validating demand with real visitors before investing in
backend infrastructure. Static JSON keeps the stack simple and free to host,
while still being validated against a real TypeScript contract
(`types/card.ts`) so the eventual move to a live API is a data-layer change,
not a UI rewrite. See [data-model.md](./data-model.md) for the full schema
and [roadmap.md](./roadmap.md) for what Phase 2 looks like.

## Data access layer

All reads go through `lib/content/getCards.ts`. Nothing else in the app
touches the filesystem or parses JSON directly. The data access layer is
isolated specifically so that migrating to an API in Phase 2 means changing
this file's implementation, not every component that displays card data —
though a real migration will still need to add things this file doesn't
handle today, like loading states, caching, and error handling.

## SEO

Every page ships title, description, and Open Graph tags via its own
`generateMetadata()` — not as a separate pass at the end. Structured data
(schema.org JSON-LD) covers FAQ, Breadcrumb, Article, WebSite, and
Organization types, built in `lib/seo/buildMetadata.ts`.
