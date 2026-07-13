const REASONS = [
  {
    title: "Historical benefit tracking",
    description: "See exactly how a card's cashback, rewards, or lounge access has changed over time — not just what it offers today.",
  },
  {
    title: "Official source references",
    description: "Every recorded change links back to the bank's own terms and conditions, not a rumor or a forum post.",
  },
  {
    title: "Last verified dates",
    description: "Every card shows the date its data was last checked, so you know how fresh the information is.",
  },
  {
    title: "Before vs after comparisons",
    description: "When a benefit changes, see the old and new terms side by side, with what it actually means for you.",
  },
];

function CheckIcon() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

export function WhyFjarvit() {
  return (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-500">Why Fjarvit</h2>
      <p className="mt-1 text-lg font-bold text-gray-900">Not just another card comparison site</p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {REASONS.map((reason) => (
          <div
            key={reason.title}
            className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-white p-5 shadow-card"
          >
            <CheckIcon />
            <div>
              <p className="text-sm font-bold text-gray-900">{reason.title}</p>
              <p className="mt-1 text-sm text-gray-600">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
