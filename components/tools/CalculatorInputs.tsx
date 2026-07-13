"use client";

import { cloneElement, isValidElement, useId } from "react";

// Shared input primitives for the /tools calculators, styled to match
// the existing SpendCalculator (components/calculator/SpendCalculator.tsx)
// so every calculator on the site looks and feels consistent.
//
// Field generates a unique id and injects it into its single input child
// (RupeeInput/PercentInput/PlainInput all forward `id` onto their real
// <input>), so the <label> is programmatically associated via htmlFor —
// not just visually adjacent — for screen readers.
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  const id = useId();
  const child = isValidElement<{ id?: string }>(children) ? cloneElement(children, { id }) : children;

  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={id} className="text-sm text-gray-700">
        {label}
      </label>
      {child}
    </div>
  );
}

export function RupeeInput({
  id,
  value,
  onChange,
}: {
  id?: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-sm text-gray-400">₹</span>
      <input
        id={id}
        type="number"
        className="w-36 rounded-lg border border-gray-200 py-1.5 pl-6 pr-2 text-right text-sm text-gray-900 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export function RupeeDecimalInput({
  id,
  value,
  onChange,
}: {
  id?: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-sm text-gray-400">₹</span>
      <input
        id={id}
        type="number"
        step="0.01"
        className="w-36 rounded-lg border border-gray-200 py-1.5 pl-6 pr-2 text-right text-sm text-gray-900 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export function PercentInput({
  id,
  value,
  onChange,
}: {
  id?: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="relative">
      <input
        id={id}
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
  id,
  value,
  onChange,
  suffix,
}: {
  id?: string;
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
}) {
  return (
    <div className="relative">
      <input
        id={id}
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
