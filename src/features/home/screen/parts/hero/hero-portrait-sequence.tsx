"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@shared/helpers/cn";

type Phase = "baba" | "mama" | "together";

const PHASE_SEQUENCE: Phase[] = ["baba", "mama", "together"];

const PHASE_DURATIONS: Record<Phase, number> = {
  baba: 3500,
  mama: 3500,
  together: 5000,
};

const TRANSITION_DURATION = 1.2;

interface HeroPortraitSequenceProps {
  readonly babaImageSrc?: string;
  readonly mamaImageSrc?: string;
  readonly togetherImageSrc?: string;
  readonly className?: string;
  readonly onPhaseChange?: (phase: Phase) => void;
}

export function HeroPortraitSequence({
  babaImageSrc,
  mamaImageSrc,
  togetherImageSrc,
  className,
  onPhaseChange,
}: HeroPortraitSequenceProps) {
  const [currentPhase, setCurrentPhase] = useState<Phase>("baba");
  const [phaseIndex, setPhaseIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function goToPhase(index: number) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhaseIndex(index);
    setCurrentPhase(PHASE_SEQUENCE[index]);
    onPhaseChange?.(PHASE_SEQUENCE[index]);
  }

  useEffect(() => {
    onPhaseChange?.(currentPhase);
    const duration = PHASE_DURATIONS[currentPhase];
    timerRef.current = setTimeout(() => {
      const nextIndex = (phaseIndex + 1) % PHASE_SEQUENCE.length;
      setPhaseIndex(nextIndex);
      setCurrentPhase(PHASE_SEQUENCE[nextIndex]);
    }, duration);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [currentPhase, phaseIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cn("relative w-full h-full bg-ink-deep", className)}>

      <AnimatePresence mode="sync">

        {/* ── BABA ──
            Portrait is tall (3:4), face centred horizontally at ~25% from top.
            On mobile: object-cover, face centred top.
            On desktop: render as a contained portrait column on the RIGHT half —
            this way the portrait keeps its aspect ratio and Baba's face is always visible. */}
        {currentPhase === "baba" && (
          <motion.div
            key="baba"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: TRANSITION_DURATION, ease: "easeInOut" }}
          >
            {babaImageSrc && (
              <>
                {/* Mobile: full bleed object-cover */}
                <div className="absolute inset-0 md:hidden">
                  <Image
                    src={babaImageSrc}
                    alt="Revd. Gabriel Lasehinde — Baba GOMAL"
                    fill
                    className="object-cover object-[center_18%]"
                    sizes="100vw"
                    priority
                  />
                </div>

                {/* Desktop: contained portrait panel anchored to right half */}
                <div className="absolute inset-0 hidden md:block">
                  {/* Right-side portrait container — takes right 52% of screen */}
                  <div className="absolute top-0 bottom-0 right-0 w-[52%] flex items-start justify-center pt-0 overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={babaImageSrc}
                        alt="Revd. Gabriel Lasehinde — Baba GOMAL"
                        fill
                        className="object-cover object-[center_8%]"
                        sizes="52vw"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* Solid top strip — kills white background bleed at nav */}
            <div className="absolute top-0 inset-x-0 h-20 bg-ink-deep" />
            {/* Bottom fade */}
            <div className="absolute inset-0 bg-linear-to-t from-ink-deep via-ink-deep/40 to-transparent" />
            {/* Left-to-right fade for text legibility on desktop */}
            <div className="absolute inset-0 hidden md:block bg-linear-to-r from-ink-deep from-[35%] via-ink-deep/70 via-[48%] to-transparent pointer-events-none" />
          </motion.div>
        )}

        {/* ── MAMA ──
            Landscape photo, Mama's face at ~38% x, 30% y.
            Shift right on desktop so face clears the text panel. */}
        {currentPhase === "mama" && (
          <motion.div
            key="mama"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: TRANSITION_DURATION, ease: "easeInOut" }}
          >
            {mamaImageSrc && (
              <>
                {/* Mobile: full bleed */}
                <div className="absolute inset-0 md:hidden">
                  <Image
                    src={mamaImageSrc}
                    alt="Mrs. Margaret Lasehinde — Mama GOMAL"
                    fill
                    className="object-cover object-[38%_28%]"
                    sizes="100vw"
                    priority
                  />
                </div>
                {/* Desktop: contained in right 52%, face centred within that panel */}
                <div className="absolute inset-0 hidden md:block">
                  <div className="absolute top-0 bottom-0 right-0 w-[52%] overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={mamaImageSrc}
                        alt="Mrs. Margaret Lasehinde — Mama GOMAL"
                        fill
                        className="object-cover object-[35%_25%]"
                        sizes="52vw"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-ink-deep via-ink-deep/40 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-b from-ink-deep/50 via-transparent to-transparent" />
            <div className="absolute inset-0 hidden md:block bg-linear-to-r from-ink-deep from-[35%] via-ink-deep/70 via-[48%] to-transparent pointer-events-none" />
          </motion.div>
        )}

        {/* ── TOGETHER ──
            Landscape photo, both faces at ~45% x, 25% y.
            Push right on desktop. */}
        {currentPhase === "together" && (
          <motion.div
            key="together"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: TRANSITION_DURATION * 1.1, ease: "easeInOut" }}
          >
            {togetherImageSrc && (
              <>
                {/* Mobile: full bleed */}
                <div className="absolute inset-0 md:hidden">
                  <Image
                    src={togetherImageSrc}
                    alt="Revd. Gabriel & Mrs. Margaret Lasehinde — Baba and Mama GOMAL"
                    fill
                    className="object-cover object-[45%_22%]"
                    sizes="100vw"
                    priority
                  />
                </div>
                {/* Desktop: contained in right 55% — both faces span the centre of the photo
                    so centering within this panel shows both clearly */}
                <div className="absolute inset-0 hidden md:block">
                  <div className="absolute top-0 bottom-0 right-0 w-[55%] overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={togetherImageSrc}
                        alt="Revd. Gabriel & Mrs. Margaret Lasehinde — Baba and Mama GOMAL"
                        fill
                        className="object-cover object-[45%_20%]"
                        sizes="55vw"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-ink-deep via-ink-deep/40 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-b from-ink-deep/50 via-transparent to-transparent" />
            <div className="absolute inset-0 hidden md:block bg-linear-to-r from-ink-deep from-[35%] via-ink-deep/70 via-[48%] to-transparent pointer-events-none" />
          </motion.div>
        )}

      </AnimatePresence>

      {/* Mobile bottom fade */}
      <div className="absolute inset-0 bg-linear-to-t from-ink-deep/90 via-ink-deep/40 to-transparent md:hidden pointer-events-none" />

      {/* Phase dots — bottom right */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-10">
        {PHASE_SEQUENCE.map((phase, i) => (
          <button
            key={phase}
            onClick={() => goToPhase(i)}
            aria-label={`View ${phase === "baba" ? "Baba" : phase === "mama" ? "Mama" : "both together"}`}
            className="focus:outline-none focus-visible:ring-1 focus-visible:ring-sage rounded-full"
          >
            <motion.div
              className="rounded-full bg-parchment"
              animate={{
                width: i === phaseIndex ? 22 : 6,
                height: 6,
                opacity: i === phaseIndex ? 0.9 : 0.35,
              }}
              transition={{ duration: 0.3, ease: [0.0, 0.0, 0.2, 1.0] }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
