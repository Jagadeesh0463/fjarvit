"use client";

// Shared input primitives for the /tools calculators, styled to match
// the existing SpendCalculator (components/calculator/SpendCalculator.tsx)
// so every calculator on the site looks and feels consistent.

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="text-sm text-gray-700">{label}</label>
      {children}
    </div>
  );
}

export function RupeeInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-sm text-gray-400">₹</span>
      <input
        type="number"
        className="w-36 rounded-lg border border-gray-200 py-1.5 pl-6 pr-2 text-right text-sm text-gray-900 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export function PercentInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="relative">
      <input
        type="number"
        step="0.1"
        className="w-36 rounded-lg border border-gray-200 py-1.5 pl-3 pr-7 text-right text-sm text-gray-900 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-sm text-gray-400">%</span>
    </div>
  );
}

export function PlainInput({
  value,
  onChange,
  suffix,
}: {
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
}) {
  return (
    <div className="relative">
      <input
        type="number"
        className="w-36 rounded-lg border border-gray-200 py-1.5 pl-3 pr-16 text-right text-sm text-gray-900 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {suffix && (
        <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-xs text-gray-400">
          {suffix}
        </span>
      )}
    </div>
  );
}
