// Semantic color tokens for change indicators, kept out of components so a
// palette change is a one-file edit.

export const CHANGE_COLORS = {
  improved: "text-change-up",
  reduced: "text-change-down",
  neutral: "text-gray-600",
};

export const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  discontinued: "bg-gray-200 text-gray-600",
  invite_only: "bg-amber-100 text-amber-800",
};
