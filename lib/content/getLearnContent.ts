import fs from "fs";
import path from "path";
import { Benefit, GlossaryGuide, Myth, PersonaGuide, ResponsibleHabit, Risk } from "@/types/learn";
import { FAQItem } from "@/types/card";

const LEARN_DIR = path.join(process.cwd(), "content", "learn");
const GLOSSARY_DIR = path.join(LEARN_DIR, "glossary");
const PERSONAS_DIR = path.join(LEARN_DIR, "personas");

function readJsonDir<T>(dir: string): T[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")) as T);
}

function readJsonFile<T>(file: string, fallback: T): T {
  const filePath = path.join(LEARN_DIR, file);
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

export function getGlossaryGuides(): GlossaryGuide[] {
  return readJsonDir<GlossaryGuide>(GLOSSARY_DIR);
}

export function getGlossaryGuideBySlug(slug: string): GlossaryGuide | undefined {
  const filePath = path.join(GLOSSARY_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as GlossaryGuide;
}

export function getPersonas(): PersonaGuide[] {
  return readJsonDir<PersonaGuide>(PERSONAS_DIR);
}

export function getPersonaBySlug(slug: string): PersonaGuide | undefined {
  const filePath = path.join(PERSONAS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as PersonaGuide;
}

export function getBenefits(): Benefit[] {
  return readJsonFile<Benefit[]>("benefits.json", []);
}

export function getRisks(): Risk[] {
  return readJsonFile<Risk[]>("risks.json", []);
}

export function getResponsibleHabits(): ResponsibleHabit[] {
  return readJsonFile<ResponsibleHabit[]>("responsible-usage.json", []);
}

export function getMyths(): Myth[] {
  return readJsonFile<Myth[]>("myths.json", []);
}

export function getGeneralFaqs(): FAQItem[] {
  return readJsonFile<FAQItem[]>("faq.json", []);
}
