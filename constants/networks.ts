import { NetworkType } from "@/types/card";

export const NETWORKS: { value: NetworkType; label: string; colorClass: string }[] = [
  { value: "Visa", label: "Visa", colorClass: "bg-blue-100 text-blue-800" },
  { value: "Mastercard", label: "Mastercard", colorClass: "bg-orange-100 text-orange-800" },
  { value: "Amex", label: "American Express", colorClass: "bg-emerald-100 text-emerald-800" },
  { value: "RuPay", label: "RuPay", colorClass: "bg-purple-100 text-purple-800" },
];

export function getNetworkMeta(network: NetworkType) {
  return NETWORKS.find((n) => n.value === network) ?? NETWORKS[0];
}
