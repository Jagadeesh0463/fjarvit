import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Standard className-merging helper, kept here so components never
// hand-roll conditional class strings. Compatible with shadcn/ui
// components if/when those are added via `npx shadcn@latest add`.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
