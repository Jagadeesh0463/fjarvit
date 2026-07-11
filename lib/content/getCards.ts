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
