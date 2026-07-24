"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "@icons";
import { ROUTES } from "@shared/constants/routes";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.85,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] as const },
  },
};

export function HeroContent() {
  return (
    <motion.div
      className="relative z-10 max-w-[1180px] mx-auto px-6 md:px-10 pb-20 pt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Eyebrow */}
      <motion.p
        variants={itemVariants}
        className="text-[11px] font-semibold tracking-[0.18em] uppercase text-sage mb-4"
      >
        In loving memory · In living legacy
      </motion.p>

      {/* Formal name */}
      <motion.h1 variants={itemVariants} className="mb-2">
        <span
          className="block font-serif font-semibold text-parchment leading-[1.08] tracking-tight"
          style={{
            fontVariationSettings: "'SOFT' 40, 'WONK' 0",
            fontSize: "clamp(1.875rem, 4.5vw, 3.25rem)",
          }}
        >
          The GOMAL Foundation
        </span>
      </motion.h1>

      {/* Nickname + dates */}
      <motion.div variants={itemVariants} className="mb-1">
        <span
          className="font-serif italic text-sage text-base"
          style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0" }}
        >
          (Baba and Mama GOMAL)
        </span>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-[13px] text-sage-deep tracking-wide mb-6"
      >
        Revd. G.O. Lasehinde · 1949–2023 &nbsp;&middot;&nbsp; Mrs. M.A.
        Lasehinde · 1955–2026
      </motion.p>

      {/* Body */}
      <motion.p
        variants={itemVariants}
        className="text-[1.0625rem] text-parchment/75 leading-relaxed max-w-[52ch] mb-8"
      >
        Nobody who came for help ever left the way they arrived. Twenty-five
        years. Thousands of students. A home always open. A marriage that
        became a ministry.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-3 mb-8"
      >
        <Link
          href={ROUTES.GIVE}
          className="inline-flex items-center justify-center gap-2 font-semibold text-ink-deep bg-brass hover:bg-brass-deep rounded-[var(--radius-pill)] px-8 py-4 text-base transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 no-underline"
        >
          Give to the Foundation
        </Link>
        <Link
          href="#story"
          className="inline-flex items-center justify-center gap-2 font-medium text-sage border border-[var(--hair-green-strong)] rounded-[var(--radius)] px-8 py-4 text-base transition-all duration-150 hover:bg-[var(--green-raised)] hover:text-parchment active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage no-underline"
        >
          Read their story
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </motion.div>

    </motion.div>
  );
}
