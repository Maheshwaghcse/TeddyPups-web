import { fetchFaqs } from "@/lib/api";
import { FaqAccordionClient } from "@/components/faq/FaqAccordionClient";
import { MascotPuppy } from "@/components/illustrations/MascotPuppy";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs = await fetchFaqs();

  return (
    <main className="faq-page">
      <section className="faq-hero">
        <div className="faq-container">
          <header className="faq-heading">
            <h1>
              Questions
              <br />
              <span>&amp; answers</span>
            </h1>

            <p>
              Can't find what you're looking for? Message us on WhatsApp —
              our team is available 24/7.
            </p>
          </header>

          <div className="faq-layout">
            <aside className="faq-sidebar">
              <p className="faq-search-label">sniff out a question</p>

              <div className="faq-search-box">
                <span aria-hidden="true">⌕</span>
                <span>delivery, Korea, vaccinated...</span>
              </div>

              <p className="faq-count">
                {faqs.length} notes on the board
              </p>

              <div className="faq-sidebar-mascot">
                <span className="faq-speech">!</span>
                <MascotPuppy
                  pose="walking"
                  className="faq-side-puppy"
                  animateFloat
                />
              </div>

              <a
                href={buildWhatsAppUrl(
                  "Hi TeddyPups! I have a question about your puppies."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="faq-ask-button"
              >
                Ask your own question
              </a>
            </aside>

            <div className="faq-board">
              <div className="faq-board-inner">
                <FaqAccordionClient faqs={faqs} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}