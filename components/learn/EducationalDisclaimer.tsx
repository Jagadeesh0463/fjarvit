import { AlertBanner } from "@/components/ui/AlertBanner";

// Shown on every Learning Center page. This content explains how credit
// cards generally work — it is not personalized financial advice, and
// isn't a substitute for a licensed financial advisor who knows your
// actual situation.
export function EducationalDisclaimer() {
  return (
    <AlertBanner variant="info">
      This is educational content, not personalized financial advice. It explains how credit
      cards generally work — your own decision should account for your specific income, expenses,
      and financial goals, and you should consult a licensed financial advisor for advice specific
      to your situation.
    </AlertBanner>
  );
}
