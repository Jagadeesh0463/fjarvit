import { CardStatus } from "@/types/card";
import { STATUS_COLORS } from "@/constants/colors";
import { cn } from "@/lib/utils/cn";

const LABELS: Record<CardStatus, string> = {
  active: "Accepting applications",
  discontinued: "Discontinued",
  invite_only: "Invite only",
};

export function StatusBadge({ status }: { status: CardStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        STATUS_COLORS[status]
      )}
    >
      {LABELS[status]}
    </span>
  );
}
