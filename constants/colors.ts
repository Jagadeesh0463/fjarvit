// Semantic color tokens for change indicators, kept out of components so a
// palette change is a one-file edit.

export const CHANGE_COLORS = {
  improved: "text-change-up",
  reduced: "text-change-down",
  neutral: "text-gray-600",
};

export const STATUS_COLORS: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  discontinued: "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-200",
  invite_only: "bg-accent-50 text-accent-700 ring-1 ring-inset ring-accent-100",
};
