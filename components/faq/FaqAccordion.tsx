"use client";

import { useState } from "react";
import { FAQItem } from "@/types/card";
import { FAQ_TEMPLATE } from "@/constants/faqTemplate";

interface Props {
  templateAnswers?: Record<string, string>;
  overrides?: FAQItem[];
}

// Combines the shared question set (with per-card answers) and any
// card-specific overrides into one rendered accordion. A template question
// with no answer for this card is simply skipped rather than shown blank.
export function FaqAccordion({ templateAnswers = {}, overrides = [] }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const templateItems: FAQItem[] = FAQ_TEMPLATE.filter((q) => templateAnswers[q.question]).map((q) => ({
    question: q.question,
    answer: templateAnswers[q.question],
  }));

  const items = [...templateItems, ...overrides];

  if (items.length === 0) return null;

  return (
    <div className="divide-y divide-brand-100 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card">
      {items.map((item, i) => (
        <div key={i}>
          <button
            className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-semibold text-gray-900 transition-colors hover:bg-brand-50/50"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {item.question}
            <span
              className={`ml-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-200 ${
                openIndex === i ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          </button>
          {openIndex === i && (
            <p className="px-4 pb-4 text-sm leading-relaxed text-gray-600">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}
