# Source Monitoring

`scripts/monitor-sources.mjs` runs daily (GitHub Actions, `.github/workflows/monitor-sources.yml`)
and rechecks every source URL cited in `content/cards/*.json`. This doc is
an honest description of what it does and doesn't do — written after
earlier review feedback flagged the risk of overclaiming automated
accuracy on this project, and that lesson applies here too.

## What it actually does

1. Collects every `history[].source.url` across all cards (see
   [sources.md](./sources.md) for the current list).
2. For each URL: PDFs are fetched and parsed with `pdf-parse`. HTML pages
   are rendered with a real headless browser (Playwright/Chromium) rather
   than a raw fetch — several cited pages are client-side rendered, and a
   plain fetch would only see an empty shell.
3. Extracts the visible text, hashes it, and compares against the last
   known hash in `data/source-snapshots.json` (committed to the repo, so
   the baseline persists between runs).
4. If a hash changed since last check: opens (or comments on, if one's
   already open) a GitHub Issue labeled `source-change`, listing which
   card and which change-history entry cites that source.

## What it deliberately does NOT do

- **It does not edit `content/cards/*.json`.** A text hash changing tells
  you *something* on the page changed — not what, and not whether it's
  actually relevant to the specific figure cited (a page could change its
  ad copy, a "last updated" date, or unrelated content and still trip the
  hash). Converting a raw diff into an accurate structured update needs a
  human to actually read the page and judge what changed. Same principle
  as why there's no auto-generated Change Score or comparison Winner —
  see [scoring-methodology.md](./scoring-methodology.md).
- **It is not proof a source is currently accurate.** A source that
  hasn't triggered a "changed" alert has merely not changed since the
  last successful check — it was not independently re-verified against
  the bank's actual current position.
- **It is not exhaustive.** Sources cited by document name only (no URL —
  see the two entries without links in [sources.md](./sources.md)) can't
  be monitored at all. Sources whose site blocks bots, requires a login,
  or is simply down on a given day are logged as "failed to check," not
  silently treated as unchanged.

## Failure modes (by design, not bugs)

- A site blocking the monitor's user agent, a stale/broken link, a
  redesigned page that no longer has 50+ characters of extractable text —
  all of these are reported as `failed`, not conflated with a genuine
  content change. Check `data/monitor-result.json` (per-run, not
  committed) or the workflow's Action log for the reason.
- On any failed check, the prior snapshot is left untouched rather than
  overwritten with a bad read — so a temporary outage on the bank's side
  doesn't erase a good baseline.

## Running it manually

```bash
npm run monitor:sources
```

Requires Playwright's Chromium binary and its system dependencies
installed first (`npx playwright install --with-deps chromium`) — the
`--with-deps` flag needs root, which is why local development sandboxes
without sudo access can't run this, but GitHub Actions runners can.
