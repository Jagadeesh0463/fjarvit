#!/usr/bin/env node
// scripts/monitor-sources.mjs
//
// Fetches every source URL cited in content/cards/*.json change-history
// entries, extracts stable text content, hashes it, and compares against
// the last known hash in data/source-snapshots.json.
//
// PDFs are fetched directly and parsed with pdf-parse — fast, no browser
// needed. HTML pages are rendered with a real headless browser (Playwright)
// rather than a raw fetch + HTML parse, because several bank "current
// terms" / "upcoming changes" pages are client-side rendered — a plain
// fetch would only see an empty shell and either report a false "changed"
// (empty vs. real content) or silently miss real changes. Rendering with
// an actual browser means the page executes its JS first, same as what a
// human visitor sees.
//
// This does NOT auto-update card data — it only detects that a cited
// source has changed and reports it, so a human can review and manually
// update the curated JSON. See docs/source-monitoring.md.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import pdfParse from "pdf-parse";
import { chromium } from "playwright";

const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..");
const CARDS_DIR = path.join(ROOT, "content", "cards");
const SNAPSHOT_PATH = path.join(ROOT, "data", "source-snapshots.json");
const RESULT_PATH = path.join(ROOT, "data", "monitor-result.json");
const USER_AGENT = "FjarvitSourceMonitor/1.0 (+https://github.com/Jagadeesh0463/fjarvit)";
const NAV_TIMEOUT_MS = 30000;
const FETCH_TIMEOUT_MS = 20000;

function collectSourceUrls() {
  const files = fs.readdirSync(CARDS_DIR).filter((f) => f.endsWith(".json"));
  const urls = new Map(); // url -> [{cardSlug, sourceName, document, attribute}]
  for (const file of files) {
    const card = JSON.parse(fs.readFileSync(path.join(CARDS_DIR, file), "utf-8"));
    for (const entry of card.history ?? []) {
      const url = entry.source?.url;
      if (!url) continue;
      if (!urls.has(url)) urls.set(url, []);
      urls.get(url).push({
        cardSlug: card.slug,
        sourceName: entry.source.name,
        document: entry.source.document,
        attribute: entry.attribute,
      });
    }
  }
  return urls;
}

function loadSnapshots() {
  if (!fs.existsSync(SNAPSHOT_PATH)) return {};
  return JSON.parse(fs.readFileSync(SNAPSHOT_PATH, "utf-8"));
}

function saveSnapshots(snapshots) {
  fs.mkdirSync(path.dirname(SNAPSHOT_PATH), { recursive: true });
  fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(snapshots, null, 2) + "\n");
}

function normalizeText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function hashText(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function isPdfUrl(url, contentType = "") {
  return url.toLowerCase().split("?")[0].endsWith(".pdf") || contentType.includes("application/pdf");
}

async function checkPdf(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: controller.signal,
      redirect: "follow",
    });
    if (!res.ok) return { status: "error", error: `HTTP ${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    const parsed = await pdfParse(buf);
    const text = normalizeText(parsed.text);
    if (!text || text.length < 50) {
      return { status: "error", error: "PDF text extraction too short — likely scanned/blocked" };
    }
    return { status: "ok", hash: hashText(text), textLength: text.length };
  } catch (err) {
    return { status: "error", error: err.message || String(err) };
  } finally {
    clearTimeout(timer);
  }
}

async function checkHtml(browser, url) {
  const page = await browser.newPage({ userAgent: USER_AGENT });
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: NAV_TIMEOUT_MS });
    const text = await page.evaluate(() => {
      const clone = document.body.cloneNode(true);
      clone
        .querySelectorAll("script, style, noscript, nav, footer, header, iframe")
        .forEach((el) => el.remove());
      return clone.innerText;
    });
    const normalized = normalizeText(text);
    if (!normalized || normalized.length < 50) {
      return { status: "error", error: "Rendered text too short — likely blocked or empty" };
    }
    return { status: "ok", hash: hashText(normalized), textLength: normalized.length };
  } catch (err) {
    return { status: "error", error: err.message || String(err) };
  } finally {
    await page.close();
  }
}

async function main() {
  const urlMap = collectSourceUrls();
  const snapshots = loadSnapshots();
  const now = new Date().toISOString();

  const changed = [];
  const failed = [];
  let unchangedCount = 0;
  const newlyTracked = [];

  console.log(`Checking ${urlMap.size} unique source URLs...\n`);

  const browser = await chromium.launch();

  try {
    for (const [url, refs] of urlMap) {
      process.stdout.write(`Checking ${url} ... `);

      const result = isPdfUrl(url) ? await checkPdf(url) : await checkHtml(browser, url);

      if (result.status === "error") {
        console.log(`FAILED (${result.error})`);
        failed.push({ url, refs, error: result.error });
        // Keep prior snapshot untouched on failure — don't overwrite good
        // data with a failed check.
        continue;
      }

      const prior = snapshots[url];
      if (!prior) {
        console.log("OK (new, baseline recorded)");
        newlyTracked.push({ url, refs });
      } else if (prior.hash !== result.hash) {
        console.log("CHANGED");
        changed.push({ url, refs, lastChangedPrevious: prior.lastChanged });
      } else {
        console.log("unchanged");
        unchangedCount += 1;
      }

      snapshots[url] = {
        hash: result.hash,
        textLength: result.textLength,
        lastChecked: now,
        lastChanged: prior && prior.hash !== result.hash ? now : prior?.lastChanged ?? now,
      };
    }
  } finally {
    await browser.close();
  }

  saveSnapshots(snapshots);

  console.log("\n--- Summary ---");
  console.log(`Unchanged: ${unchangedCount}`);
  console.log(`Newly tracked (baseline only, not a change): ${newlyTracked.length}`);
  console.log(`Changed: ${changed.length}`);
  console.log(`Failed to check: ${failed.length}`);

  fs.writeFileSync(
    RESULT_PATH,
    JSON.stringify(
      { checkedAt: now, changed, failed, unchanged: unchangedCount, newlyTracked },
      null,
      2
    ) + "\n"
  );

  if (changed.length > 0) {
    console.log("\nSources with detected changes:");
    for (const c of changed) {
      for (const ref of c.refs) {
        console.log(` - ${ref.cardSlug}: "${ref.attribute}" cites ${ref.sourceName} (${c.url})`);
      }
    }
  }

  if (failed.length > 0) {
    console.log("\nSources that failed to check (site may block bots, be JS-broken, or link may be stale):");
    for (const f of failed) {
      console.log(` - ${f.url}: ${f.error}`);
    }
  }
}

main().catch((err) => {
  console.error("Fatal error in monitor-sources:", err);
  process.exit(1);
});
