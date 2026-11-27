"use client";

import { useState, useEffect } from "react";
import type { FaqItem } from "@/lib/types";

interface FaqAccordionClientProps {
  faqs: FaqItem[];
}

const PIN_COLORS = ["terracotta", "blue", "gold", "rose"] as const;

export function FaqAccordionClient({ faqs }: FaqAccordionClientProps) {
  // First note is open by default to match https://puppy.instabizweb.com/faq
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  // Upgrade the sidebar `.faq-search-box` into a live interactive filter
  // and keep `.faq-count` synced with the number of visible notes.
  useEffect(() => {
    const searchBox = document.querySelector(".faq-search-box");
    if (!searchBox) return;

    let input = searchBox.querySelector("input") as HTMLInputElement | null;

    if (!input) {
      searchBox.innerHTML = `
        <svg class="faq-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7"></circle>
          <line x1="20" y1="20" x2="16.2" y2="16.2"></line>
        </svg>
        <input
          type="search"
          class="faq-search-input"
          placeholder="delivery, Korea, vaccinated..."
          aria-label="Sniff out a question"
        />
      `;
      input = searchBox.querySelector("input");
    }

    const handleInput = (e: Event) => {
      const val = (e.target as HTMLInputElement).value;
      setQuery(val);
    };

    input?.addEventListener("input", handleInput);
    return () => {
      input?.removeEventListener("input", handleInput);
    };
  }, []);

  const filteredFaqs = (faqs || []).filter((faq) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      (faq.category && faq.category.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    const countEl = document.querySelector(".faq-count");
    if (countEl) {
      const count = filteredFaqs.length;
      countEl.textContent = `${count} ${count === 1 ? "note" : "notes"} on the board`;
    }
  }, [filteredFaqs.length]);

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

  if (filteredFaqs.length === 0) {
    return (
      <div className="faq-empty">
        <p>No notes match &ldquo;{query}&rdquo; — try another word!</p>
      </div>
    );
  }

  return (
    <div className="faq-accordion">
      {filteredFaqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const pinColor = PIN_COLORS[index % PIN_COLORS.length];
        const variantIndex = (index % 4) + 1;

        return (
          <div
            key={faq._id ?? index}
            className={`faq-accordion-item faq-note-variant-${variantIndex}${isOpen ? " faq-accordion-item--open" : ""
              }`}
          >
            {/* Colored glossy pushpin */}
            <span
              className={`faq-note-pin faq-note-pin--${pinColor}`}
              aria-hidden="true"
            />

            <button
              type="button"
              className="faq-accordion-trigger"
              aria-expanded={isOpen}
              onClick={() => toggle(index)}
            >
              <span className="faq-accordion-question">{faq.question}</span>
              <span className="faq-accordion-icon" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            <div className="faq-accordion-body" hidden={!isOpen}>
              <p className="faq-accordion-answer">{faq.answer}</p>
            </div>

            {/* Bottom-right folded paper corner */}
            <span className="faq-note-fold" aria-hidden="true" />
          </div>
        );
      })}
    </div>
  );
}