# Fjarvit

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Fjarvit tracks how credit card benefits in India actually change over time —
cashback caps that get tightened, lounge access that gets cut, fees that
change — with dated, sourced before/after evidence instead of just a
snapshot of current terms.

**Fjarvit is not affiliated with, endorsed by, or sponsored by any bank,
card network, or financial regulator.** Card details are manually curated
from official bank publications and other publicly available sources.
Always confirm current terms and eligibility with the issuing bank before
applying.

## 🌐 Live Demo

https://fjarvit.vercel.app

## Features

- Card directory, individual card pages, bank pages, and category pages
- Same-category comparison pages
- A spend calculator that estimates cashback and rewards based on the
  currently curated card data for a given monthly spend
- A dated change-history timeline per card, each entry backed by a named
  source
- A "Last Verified" date on every card, showing when its terms were most
  recently reviewed — not a one-time snapshot that goes stale silently
- Per-card FAQ, built from a shared question template plus card-specific
  overrides
- Full schema.org structured data (FAQ, Breadcrumb, Article, WebSite,
  Organization) for search visibility
- Automated daily monitoring of every cited source (PDF or webpage,
  including JS-rendered bank pages) that flags — but never
  auto-applies — a detected change for manual review. See
  [docs/source-monitoring.md](./docs/source-monitoring.md).

## Tech stack

Next.js 14 (App Router), TypeScript, Tailwind CSS. Static JSON content,
statically generated pages, no backend yet — see
[docs/architecture.md](./docs/architecture.md) for why and
[docs/roadmap.md](./docs/roadmap.md) for what's next.

## Screenshots

_Coming soon._

## Installation

```bash
npm install
npm run dev
```

Then visit `http://localhost:3000`.

## Project structure

```
app/            Routes (App Router)
components/     Reusable UI, grouped by feature
constants/      Banks, categories, networks, fees, colors, routes
content/cards/  Static card data (JSON), one file per card
data/           Source-monitoring baseline (data/source-snapshots.json)
lib/            Data access, calculator math, SEO/schema builders
scripts/        Source-monitoring script (see docs/source-monitoring.md)
types/          Canonical TypeScript data contract
```

See [docs/architecture.md](./docs/architecture.md) for the full breakdown
and [docs/data-model.md](./docs/data-model.md) for how to add a new card.

## Roadmap

20 manually curated card profiles across 8 banks are live (Phase 1A
content pass). Full history, current status, and what's next:
[docs/roadmap.md](./docs/roadmap.md).

## License

MIT — see [LICENSE](./LICENSE).
