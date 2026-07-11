import { NetworkType } from "@/types/card";
import { getNetworkMeta } from "@/constants/networks";
import { cn } from "@/lib/utils/cn";

export function NetworkBadge({ network }: { network: NetworkType }) {
  const meta = getNetworkMeta(network);
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", meta.colorClass)}>
      {meta.label}
    </span>
  );
}
