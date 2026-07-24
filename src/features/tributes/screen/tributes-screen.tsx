"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SiteNav } from "@features/home/screen/parts/navigation/site-nav";
import { SiteFooter } from "@features/home/screen/parts/footer/site-footer";

const ALL_TRIBUTES = [
  {
    id: "t1",
    text: "Baba found me sleeping in the corridor with my luggage because I had no place to stay. He took me home, gave me a room, and kept me in school for three years. I never asked him how he afforded it.",
    name: "Adebayo Olatunji",
    relation: "GOMAL, Class of 2007",
  },
  {
    id: "t2",
    text: "Mama stayed with me the night before my final paper. I was shaking. She didn't say anything. She just sat there until I fell asleep. I have never forgotten that.",
    name: "Chidinma Eze",
    relation: "GOMAL, Class of 2012",
  },
  {
    id: "t3",
    text: "We nearly separated in 2019. They didn't take sides. They kept asking us questions until we found our own answers. We celebrate eight years next March.",
    name: "Anonymous",
    relation: "A couple they counselled",
  },
  {
    id: "t4",
    text: "Baba's chair at the front pew will never be filled by anyone else. We have tried not to replace it.",
    name: "Rev. Seun Adeyemi",
    relation: "Church, Ogbomoso",
  },
  {
    id: "t5",
    text: "Mama called to check on my daughter every term for four years. Not once did she ask for anything in return. I kept waiting for the ask. It never came.",
    name: "Funmi Babatunde",
    relation: "Parent, GOMAL 2018",
  },
  {
    id: "t6",
    text: "Every Sunday, Baba shook my hand like it was the most important thing he had done all week. For me, it was.",
    name: "Tunde Afolabi",
    relation: "GOMAL, Class of 2003",
  },
  {
    id: "t7",
    text: "She told me I was going to be fine three weeks before my exams. I had failed twice before. She didn't qualify it. She just said it. I was.",
    name: "Ngozi Okonkwo",
    relation: "GOMAL, Class of 2015",
  },
  {
    id: "t8",
    text: "They prayed over us at our wedding. Twenty-two years later we remember what they said word for word. Some things you don't forget.",
    name: "Mr & Mrs Adeleke",
    relation: "Counselled, 2002",
  },
  {
    id: "t9",
    text: "Baba told me the truth about my character in a way nobody had ever dared to. And then he stayed to help me fix it. That is rare.",
    name: "Taiwo Adegoke",
    relation: "GOMAL, Class of 2010",
  },
  {
    id: "t10",
    text: "When my father died and I had nobody to turn to, Mama said: 'Come and stay.' I stayed three months. She never charged me and never made me feel like a burden.",
    name: "Blessing Nwachukwu",
    relation: "GOMAL, Class of 2008",
  },
  {
    id: "t11",
    text: "Twenty-five years is not a school term. It is a generation. And they gave it, without holding back.",
    name: "Dr. Remi Adesanya",
    relation: "GOMAL Governing Board",
  },
  {
    id: "t12",
    text: "I came to GOMAL broken. I left with direction. I owe Baba and Mama more than I can say.",
    name: "Emeka Obi",
    relation: "GOMAL, Class of 2014",
  },
] as const;

interface TributeFormData {
  name: string;
  isAnonymous: boolean;
  relation: string;
  text: string;
}

function TributeSubmitModal({
  onClose,
}: Readonly<{ onClose: () => void }>) {
  const [form, setForm] = useState<TributeFormData>({
    name: "",
    isAnonymous: false,
    relation: "",
    text: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function set<K extends keyof TributeFormData>(field: K, value: TributeFormData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Scrim */}
      <motion.div
        className="absolute inset-0 bg-ink-deep/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative w-full max-w-lg bg-parchment-sheet border border-hair-strong rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {!submitted ? (
          <>
            <div className="px-8 pt-8 pb-0">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2
                    className="font-serif text-[1.25rem] font-medium text-ink"
                    style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0" }}
                  >
                    Add your tribute
                  </h2>
                  <p className="text-[0.875rem] text-ink-3 mt-1">
                    Tell us what Baba or Mama did for you.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="ml-4 w-8 h-8 rounded-full flex items-center justify-center text-ink-3 hover:bg-parchment-warm transition-colors duration-150"
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isAnonymous}
                    onChange={(e) => set("isAnonymous", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-parchment-deep rounded-full peer peer-checked:bg-brass transition-colors duration-150 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                </label>
                <span className="text-[0.875rem] text-ink-3">Submit anonymously</span>
              </div>

              {!form.isAnonymous && (
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className="w-full px-4 py-3 bg-parchment border border-sheet-edge rounded text-[0.9375rem] text-ink placeholder:text-ink-4 outline-none focus:border-brass focus:shadow-[0_0_0_3px_rgba(181,139,60,0.16)] transition-all duration-150"
                  />
                  <input
                    type="text"
                    placeholder="Your connection (e.g. GOMAL 2008)"
                    value={form.relation}
                    onChange={(e) => set("relation", e.target.value)}
                    className="w-full px-4 py-3 bg-parchment border border-sheet-edge rounded text-[0.9375rem] text-ink placeholder:text-ink-4 outline-none focus:border-brass focus:shadow-[0_0_0_3px_rgba(181,139,60,0.16)] transition-all duration-150"
                  />
                </div>
              )}

              <div className="relative">
                <textarea
                  placeholder="Tell us what they did for you..."
                  value={form.text}
                  onChange={(e) => set("text", e.target.value)}
                  rows={5}
                  maxLength={600}
                  className="w-full px-4 py-3 pb-8 bg-parchment border border-sheet-edge rounded text-[0.9375rem] text-ink placeholder:text-ink-4 outline-none focus:border-brass focus:shadow-[0_0_0_3px_rgba(181,139,60,0.16)] transition-all duration-150 resize-none"
                />
                <span className="absolute bottom-3 right-3 text-[11px] text-ink-4 pointer-events-none">
                  {form.text.length}/600
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={!form.text.trim()}
                  className="inline-flex items-center px-6 py-3 rounded-full bg-brass text-ink-deep text-[0.9375rem] font-semibold hover:bg-brass-deep disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
                >
                  Submit tribute
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[0.875rem] text-ink-3 hover:text-ink transition-colors duration-150"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="px-8 py-14 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-parchment-warm border border-hair-strong flex items-center justify-center mx-auto mb-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="var(--brass)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2
              className="font-serif text-[1.375rem] font-medium text-ink mb-2"
              style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0" }}
            >
              Thank you.
            </h2>
            <p className="text-[0.9375rem] text-ink-3 leading-[1.65] max-w-[36ch] mx-auto mb-6">
              Your tribute has been received and will appear on the wall after
              a brief review.
            </p>
            <button
              onClick={onClose}
              className="inline-flex items-center px-5 py-2.5 rounded-full border border-hair-strong text-ink text-[0.875rem] font-medium hover:bg-parchment-warm transition-colors duration-150"
            >
              Close
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function TributesScreen() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-green-canvas">
        {/* Header */}
        <div className="bg-ink-deep pt-32 pb-14 px-6 md:px-10 border-b border-hair-green">
          <div className="max-w-295 mx-auto grid md:grid-cols-[1fr_340px] gap-12 items-center">
            {/* Text */}
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-sage mb-4">
                In living legacy
              </p>
              <h1
                className="font-serif text-[clamp(2rem,5vw,3rem)] font-medium text-parchment mb-3 leading-[1.15]"
                style={{
                  fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                  letterSpacing: "-0.02em",
                }}
              >
                <span className="text-brass-light">1,247</span> lives, and counting.
              </h1>
              <p
                className="font-serif text-[1.0625rem] italic text-sage max-w-[44ch] leading-[1.6] mb-8"
                style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0" }}
              >
                Each one is someone Baba and Mama changed. Add yours.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center px-6 py-3 rounded-full bg-brass text-ink-deep text-[0.9375rem] font-semibold hover:bg-brass-deep transition-colors duration-150"
              >
                Add your tribute
              </button>
            </div>

            {/* Portrait */}
            <motion.div
              className="relative rounded-lg overflow-hidden border border-hair-green h-80"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" as const }}
            >
              <Image
                src="/images/portraits/together.jpg"
                alt="Revd. Gabriel and Mrs. Margaret Lasehinde — Baba and Mama GOMAL"
                fill
                className="object-cover object-top"
                sizes="340px"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink-deep/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
                <p className="text-[0.75rem] font-medium text-parchment/70 tracking-wide">
                  Baba &amp; Mama GOMAL
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tribute grid */}
        <div className="py-16 md:py-20 px-6 md:px-10">
          <div className="max-w-[1180px] mx-auto">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {ALL_TRIBUTES.map((tribute, i) => (
                <motion.div
                  key={tribute.id}
                  className="break-inside-avoid bg-green-raised border border-hair-green rounded p-6 mb-4 flex flex-col"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.04,
                    ease: "easeOut",
                  }}
                >
                  <p className="text-[0.9375rem] text-parchment-warm leading-[1.65] mb-4 flex-1">
                    &ldquo;{tribute.text}&rdquo;
                  </p>
                  <div className="border-t border-hair-green pt-3.5">
                    <p className="font-semibold text-[0.875rem] text-parchment mb-0.5">
                      {tribute.name}
                    </p>
                    <p className="text-[0.8125rem] text-sage">{tribute.relation}</p>
                  </div>
                </motion.div>
              ))}

              {/* Add yours slot */}
              <motion.button
                className="break-inside-avoid w-full border-[1.5px] border-dashed rounded p-6 mb-4 flex flex-col items-center justify-center text-center min-h-40 hover:bg-green-raised transition-colors duration-150"
                style={{ borderColor: "var(--hair-green-strong)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: ALL_TRIBUTES.length * 0.04, ease: "easeOut" }}
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.01 }}
              >
                <div className="w-10 h-10 rounded-full border border-sage-deep flex items-center justify-center mb-2.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 3v10M3 8h10" stroke="#6B8272" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-[0.875rem] text-sage leading-normal">
                  Tell us what they did for you
                </p>
              </motion.button>
            </div>

            {/* Bottom CTA */}
            <div className="flex items-center justify-center pt-4">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-brass text-ink-deep text-[0.9375rem] font-semibold hover:bg-brass-deep transition-colors duration-150"
              >
                Add your tribute
              </button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <TributeSubmitModal onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
