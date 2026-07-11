import { FAQItem } from "@/types/card";

// Shared question set most cards use as-is. Card-specific answers are filled
// in per card; truly card-specific questions go in that card's
// `faqOverrides` array (see types/card.ts) and are appended after these.
export const FAQ_TEMPLATE: Omit<FAQItem, "answer">[] = [
  { question: "Is this card lifetime free?" },
  { question: "Is it worth it?" },
  { question: "Who should get this card?" },
  { question: "Does it support UPI?" },
  { question: "Can I get lounge access with this card?" },
  { question: "What income is required to qualify?" },
  { question: "Who should avoid this card?" },
  { question: "What are the best alternatives?" },
];
