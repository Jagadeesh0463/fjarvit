import { Bank } from "@/types/bank";

export const BANKS: Bank[] = [
  { slug: "hdfc", name: "HDFC Bank", website: "https://www.hdfcbank.com" },
  { slug: "sbi", name: "SBI Card", website: "https://www.sbicard.com" },
  { slug: "icici", name: "ICICI Bank", website: "https://www.icicibank.com" },
  { slug: "axis", name: "Axis Bank", website: "https://www.axisbank.com" },
  { slug: "kotak", name: "Kotak Mahindra Bank", website: "https://www.kotak.com" },
  { slug: "idfc-first", name: "IDFC FIRST Bank", website: "https://www.idfcfirstbank.com" },
  { slug: "indusind", name: "IndusInd Bank", website: "https://www.indusind.com" },
  { slug: "au-sfb", name: "AU Small Finance Bank", website: "https://www.aubank.in" },
];

export function getBankBySlug(slug: string): Bank | undefined {
  return BANKS.find((b) => b.slug === slug);
}
