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
    <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
      {items.map((item, i) => (
        <div key={i}>
          <button
            className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-gray-900"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {item.question}
            <span className="ml-2 text-gray-400">{openIndex === i ? "−" : "+"}</span>
          </button>
          {openIndex === i && <p className="pb-3 text-sm text-gray-600">{item.answer}</p>}
        </div>
      ))}
    </div>
  );
}
