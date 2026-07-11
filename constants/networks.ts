import { NetworkType } from "@/types/card";

export const NETWORKS: { value: NetworkType; label: string; colorClass: string }[] = [
  { value: "Visa", label: "Visa", colorClass: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200" },
  { value: "Mastercard", label: "Mastercard", colorClass: "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200" },
  { value: "Amex", label: "American Express", colorClass: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200" },
  { value: "RuPay", label: "RuPay", colorClass: "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-200" },
];

export function getNetworkMeta(network: NetworkType) {
  return NETWORKS.find((n) => n.value === network) ?? NETWORKS[0];
}
