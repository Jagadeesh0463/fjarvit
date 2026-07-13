import fs from "fs";
import path from "path";
import { CreditCard } from "@/types/card";

const CARDS_DIR = path.join(process.cwd(), "content", "cards");

export function getAllCards(): CreditCard[] {
  const files = fs.readdirSync(CARDS_DIR).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(CARDS_DIR, file), "utf-8");
    return JSON.parse(raw) as CreditCard;
  });
}

export function getCardBySlug(slug: string): CreditCard | undefined {
  const filePath = path.join(CARDS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as CreditCard;
}

export function getCardsByBank(bankSlug: string): CreditCard[] {
  return getAllCards().filter((c) => c.bank === bankSlug);
}

export function getCardsByCategory(categorySlug: string): CreditCard[] {
  return getAllCards().filter((c) => c.category === categorySlug);
}

// Rule-based related cards (same bank or same category), explicitly not
// framed as "users also viewed" since there is no behavioral data behind it
// yet. Swap the implementation, not the label, once real analytics exist.
export function getRelatedCards(card: CreditCard, limit = 4): CreditCard[] {
  const all = getAllCards().filter((c) => c.slug !== card.slug);
  const sameCategory = all.filter((c) => c.category === card.category);
  const sameBank = all.filter((c) => c.bank === card.bank && c.category !== card.category);
  return [...sameCategory, ...sameBank].slice(0, limit);
}

export interface HomeStats {
  cardsTracked: number;
  banksCovered: number;
  changesRecorded: number;
  lastVerified: string; // ISO 8601 date — most recent lastVerified across all cards
}

// Real numbers computed from content, not hardcoded — so the homepage
// trust indicators can't silently drift out of date as cards are added.
export function getHomeStats(): HomeStats {
  const cards = getAllCards();
  const banks = new Set(cards.map((c) => c.bank));
  const changesRecorded = cards.reduce((sum, c) => sum + c.history.length, 0);
  const lastVerified = cards.reduce(
    (latest, c) => (c.lastVerified > latest ? c.lastVerified : latest),
    cards[0]?.lastVerified ?? ""
  );

  return {
    cardsTracked: cards.length,
    banksCovered: banks.size,
    changesRecorded,
    lastVerified,
  };
}
