import { Category } from "@/types/category";

export const CATEGORIES: Category[] = [
  { slug: "cashback", label: "Best Cashback Cards", description: "Cards that maximize cashback on everyday spends." },
  { slug: "fuel", label: "Best Fuel Cards", description: "Cards with strong fuel surcharge waivers and fuel rewards." },
  { slug: "travel", label: "Best Travel Cards", description: "Cards built around travel rewards and forex savings." },
  { slug: "lounge", label: "Best Lounge Access Cards", description: "Cards with strong domestic and international lounge access." },
  { slug: "lifetime-free", label: "Best Lifetime Free Cards", description: "No annual fee, ever." },
  { slug: "rupay", label: "Best RuPay Cards", description: "RuPay network cards, including UPI-linked cards." },
  { slug: "upi", label: "Best UPI Cards", description: "Cards designed for UPI-linked spending." },
  { slug: "student", label: "Best Student Cards", description: "Cards accessible to students and first-time cardholders." },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
