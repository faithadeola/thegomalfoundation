"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "@icons";
import { ROUTES } from "@shared/constants/routes";

type Phase = "baba" | "mama" | "together";

const PHASE_LABELS: Record<Phase, { name: string; dates: string }> = {
  baba: { name: "Revd. G.O. Lasehinde", dates: "1949 – 2023" },
  mama: { name: "Mrs. M.A. Lasehinde", dates: "1955 – 2026" },
  together: { name: "Baba & Mama GOMAL", dates: "Together" },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.7 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.0, 0.0, 0.2, 1.0] as const },
  },
};

interface HeroContentProps {
  readonly activePhase: Phase;
}

export function HeroContent({ activePhase }: HeroContentProps) {
  const label = PHASE_LABELS[activePhase];

  return (
    <motion.div
      className="relative w-full max-w-295 mx-auto px-6 md:px-10 pb-20 pt-36 md:pt-0 md:py-0 md:min-h-screen md:flex md:items-center pointer-events-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left panel — occupies left 42% on desktop, matching the portrait cutoff */}
      <div className="w-full md:w-[42%] md:pr-10">

        {/* Eyebrow with vertical rule */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-7">
          <div className="w-px h-7 bg-sage/60 shrink-0" aria-hidden="true" />
          <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-sage leading-none">
            In loving memory · In living legacy
          </p>
        </motion.div>

        {/* Foundation name — large, dominant */}
        <motion.h1 variants={itemVariants} className="mb-5">
          <span
            className="block font-serif font-semibold text-parchment leading-[0.95]"
            style={{
              fontVariationSettings: "'SOFT' 40, 'WONK' 0",
              fontSize: "clamp(3rem, 6.5vw, 5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            The<br />GOMAL<br />Foundation
          </span>
        </motion.h1>

        {/* Animated name label — syncs with portrait */}
        <motion.div variants={itemVariants} className="mb-6 h-9 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="flex items-baseline gap-2.5"
            >
              <span
                className="font-serif italic text-sage"
                style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0", fontSize: "clamp(0.875rem, 1.3vw, 1rem)" }}
              >
                {label.name}
              </span>
              <span className="text-[0.75rem] text-sage/60 tracking-wide">
                {label.dates}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Body */}
        <motion.p
          variants={itemVariants}
          className="text-[0.9375rem] text-parchment/65 leading-[1.75] mb-9 max-w-[36ch]"
        >
          Nobody who came for help ever left the way they arrived. Twenty-five years. Thousands of students. A home always open.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
          <Link
            href={ROUTES.GIVE}
            className="inline-flex items-center justify-center gap-2 font-semibold text-ink-deep bg-brass hover:bg-brass-deep rounded-full px-7 py-3.5 text-[0.9375rem] transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 no-underline"
          >
            Give to the Foundation
          </Link>
          <Link
            href="#story"
            className="inline-flex items-center justify-center gap-2 font-medium text-sage border border-hair-green-strong rounded-full px-7 py-3.5 text-[0.9375rem] transition-all duration-150 hover:bg-green-raised hover:text-parchment active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage no-underline"
          >
            Read their story
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </motion.div>

      </div>
    </motion.div>
  );
}
