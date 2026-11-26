
import Link from "next/link";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";
import type { FaqItem } from "@/lib/types";

interface FaqPreviewSectionProps {
  faqs: FaqItem[];
}

export function FaqPreviewSection({ faqs }: FaqPreviewSectionProps) {
  const featured = faqs.slice(0, 3);

  return (
    <section className="faq-preview">
      {/* Decorative background */}
      <div className="faq-preview-stars" aria-hidden="true">
        ✦　　✧　　 ✦　　　 ✧
      </div>

      <div className="faq-preview-container">
        {/* Heading */}
        <div className="faq-preview-heading">
          <h2>
            Questions
            <br />
            <span>&amp; answers</span>
          </h2>

          <p>
            Can't find what you're looking for? Message us on WhatsApp —
            our team is available 24/7.
          </p>
        </div>

        {/* Main layout */}
        <div className="faq-preview-layout">
          {/* Left sidebar */}
          <aside className="faq-preview-sidebar">
            <p className="faq-preview-label">
              sniff out a question
            </p>

            <div className="faq-preview-search">
              <span>⌕</span>
              <span>delivery, Korea, vaccinated...</span>
            </div>

            <p className="faq-preview-count">
              {faqs.length} notes on the board
            </p>

            <div className="faq-preview-mascot">
              <span className="faq-preview-speech">!</span>

              <MascotPuppy
                pose="walking"
                className="faq-preview-puppy"
                animateFloat
              />
            </div>

            <Link
              href="/faq"
              className="faq-preview-button"
            >
              Ask your own question
            </Link>
          </aside>

          {/* FAQ pinboard */}
          <div className="faq-preview-board">
            <div className="faq-preview-board-inner">
              {featured.map((item, index) => (
                <article
                  key={item._id}
                  className={`faq-preview-card faq-preview-card-${index + 1}`}
                >
                  <span className="faq-preview-pin" />

                  <h3>{item.question}</h3>

                  <p>{item.answer}</p>

                  <span className="faq-preview-fold" />
                </article>
              ))}

              <div className="faq-preview-more">
                <Link href="/faq">
                  Read all questions &amp; answers →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
