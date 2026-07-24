"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, RevealGroup } from "@ui/components/reveal/reveal";
import { PARTNERSHIP_TYPE_LABELS } from "@features/partnership/types/partnership";
import { PartnershipModal } from "@features/partnership/components/partnership-modal";

const PARTNERSHIP_TYPES = Object.entries(PARTNERSHIP_TYPE_LABELS)
  .filter(([value]) => value !== "other")
  .map(([value, label]) => ({ value, label }));

export function PartnershipSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="partnership"
        className="bg-parchment-warm border-t border-hair-strong py-28 md:py-32 px-6 md:px-10"
        aria-labelledby="partnership-heading"
      >
        <div className="max-w-295 mx-auto">
          <RevealGroup>
            <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-start">
              {/* Left: context */}
              <div>
                <Reveal>
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink-4 mb-3">
                    Partner with us
                  </p>
                  <h2
                    id="partnership-heading"
                    className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium text-ink mb-4 leading-[1.2]"
                    style={{
                      fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    The work is bigger than any one gift.
                  </h2>
                  <p className="text-[1rem] text-ink-2 leading-[1.65] max-w-[48ch] mb-8">
                    Schools, churches, counsellors, businesses, media — there is a way to join what they started.
                  </p>
                </Reveal>

                {/* Partnership type chips */}
                <Reveal direction="up">
                  <div className="flex flex-wrap gap-2">
                    {PARTNERSHIP_TYPES.map((type, i) => (
                      <motion.span
                        key={type.value}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
                        className="inline-flex items-center px-3 py-1.5 rounded-full border border-hair-strong bg-parchment-sheet text-[0.8125rem] font-medium text-ink-3"
                      >
                        {type.label}
                      </motion.span>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* Right: CTA card */}
              <Reveal direction="up">
                <div className="bg-parchment-sheet border border-hair-strong rounded p-8">
                  <p
                    className="font-serif text-[1.25rem] font-medium text-ink mb-2 leading-[1.35]"
                    style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0" }}
                  >
                    Tell us how you'd like to help
                  </p>
                  <p className="text-[0.9375rem] text-ink-3 leading-[1.6] mb-8">
                    Five minutes. We read every message and respond within two weeks.
                  </p>

                  <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center justify-center w-full px-6 py-4 rounded-full bg-brass text-ink-deep text-[1rem] font-semibold hover:bg-brass-deep transition-colors duration-150"
                  >
                    Apply to partner
                  </button>

                  <p className="text-center text-[0.8125rem] text-ink-4 mt-4">
                    We respond to every message.
                  </p>
                </div>
              </Reveal>
            </div>
          </RevealGroup>
        </div>
      </section>

      <PartnershipModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
