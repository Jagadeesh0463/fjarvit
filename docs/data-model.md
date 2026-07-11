# Data Model

The canonical contract lives in `types/card.ts` — this doc is a guide to it,
not a duplicate source of truth. If the two ever disagree, `types/card.ts`
wins.

## Card content

Each file in `content/cards/` is one `CreditCard` object: identity (slug,
bank, network, category, status), fees (annual, joining, lifetime-free
flag), `currentBenefits` (cashback, reward points, lounge access, fuel
surcharge waiver, movie/insurance/milestone benefits — only the ones that
actually apply to that card), `history` (dated change entries with source
evidence), FAQ answers, and a spend-calculator config.

## Adding a new card

1. Create `content/cards/<slug>.json` matching `types/card.ts`.
2. `bank` must be a slug from `constants/banks.ts`; `category` must be a
   slug from `constants/categories.ts`.
3. Give it a unique `id` and `slug`.
4. Leave `history: []` if you can't find a verifiable, dated, sourced change
   — don't guess one.
5. `lastVerified` should be the date you last manually checked the card's
   terms, not a claim that the figures are officially certified.

## What's deliberately not in the schema yet

Ratings, a numeric "Change Score," and a comparison "Winner" verdict are
intentionally absent. See [scoring-methodology.md](./scoring-methodology.md)
for why, and [roadmap.md](./roadmap.md) for when they're planned.
