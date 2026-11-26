"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/types";

interface FaqAccordionClientProps {
  faqs: FaqItem[];
}

export function FaqAccordionClient({ faqs }: FaqAccordionClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) {
    return (
      <div className="faq-empty">
        <p>Our answers are on their way! Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="faq-accordion">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq._id ?? index}
            className={`faq-accordion-item${isOpen ? " faq-accordion-item--open" : ""}`}
          >
            <button
              className="faq-accordion-trigger"
              aria-expanded={isOpen}
              onClick={() => toggle(index)}
            >
              <span className="faq-accordion-question">{faq.question}</span>
              <span className="faq-accordion-icon" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            <div
              className="faq-accordion-body"
              hidden={!isOpen}
            >
              <p className="faq-accordion-answer">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
