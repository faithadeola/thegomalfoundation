"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@shared/helpers/cn";

// Three phases: baba alone → mama alone → both together
type Phase = "baba" | "mama" | "together";

const PHASE_SEQUENCE: Phase[] = ["baba", "mama", "together"];

const PHASE_DURATIONS: Record<Phase, number> = {
  baba: 2800,
  mama: 2800,
  together: 4000,
};

const TRANSITION_DURATION = 1.1;

interface PortraitImageProps {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
  readonly fit?: "cover" | "contain";
  readonly className?: string;
}

function PortraitImage({ src, alt, objectPosition = "center 20%", fit = "cover", className }: PortraitImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn(fit === "contain" ? "object-contain" : "object-cover", className)}
      style={{ objectPosition }}
      sizes="(max-width: 768px) 100vw, 50vw"
      priority
    />
  );
}

interface PlaceholderPortraitProps {
  readonly label: string;
  readonly side: "left" | "right" | "center";
}

// Used until real photos are dropped in
function PlaceholderPortrait({ label, side }: PlaceholderPortraitProps) {
  const gradients: Record<PlaceholderPortraitProps["side"], string> = {
    left: "from-green-canvas via-green-raised to-ink-deep",
    right: "from-ink-deep via-green-raised to-green-canvas",
    center: "from-green-lifted via-green-canvas to-ink-deep",
  };

  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center bg-linear-to-b",
        gradients[side]
      )}
    >
      <div className="w-24 h-24 rounded-full bg-green-lifted/60 border border-[var(--hair-green)] flex items-center justify-center mb-4">
        <svg width="40" height="40" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="28" r="18" stroke="#8DA692" strokeWidth="1.5" />
          <path
            d="M8 72c0-17.673 14.327-32 32-32s32 14.327 32 32"
            stroke="#8DA692"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="text-[11px] text-sage tracking-[0.12em] uppercase text-center px-4 leading-relaxed">
        {label}
      </p>
    </div>
  );
}

interface HeroPortraitSequenceProps {
  readonly babaImageSrc?: string;
  readonly mamaImageSrc?: string;
  readonly togetherImageSrc?: string;
  readonly className?: string;
}

export function HeroPortraitSequence({
  babaImageSrc,
  mamaImageSrc,
  togetherImageSrc,
  className,
}: HeroPortraitSequenceProps) {
  const [currentPhase, setCurrentPhase] = useState<Phase>("baba");
  const [phaseIndex, setPhaseIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const duration = PHASE_DURATIONS[currentPhase];

    timerRef.current = setTimeout(() => {
      const nextIndex = (phaseIndex + 1) % PHASE_SEQUENCE.length;
      setPhaseIndex(nextIndex);
      setCurrentPhase(PHASE_SEQUENCE[nextIndex]);
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentPhase, phaseIndex]);

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* BABA portrait — slides/fades in from left */}
      <AnimatePresence mode="wait">
        {currentPhase === "baba" && (
          <motion.div
            key="baba"
            className="absolute inset-0"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{
              duration: TRANSITION_DURATION,
              ease: [0.0, 0.0, 0.2, 1.0],
            }}
          >
            {babaImageSrc ? (
              <>
                <div className="absolute inset-0 bg-ink-deep" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative overflow-hidden rounded" style={{ width: "62%", maxWidth: 520, aspectRatio: "3/4" }}>
                    <Image
                      src={babaImageSrc}
                      alt="Revd. Gabriel Lasehinde — Baba GOMAL"
                      fill
                      className="object-cover"
                      style={{ objectPosition: "center 18%" }}
                      sizes="520px"
                      priority
                    />
                  </div>
                </div>
              </>
            ) : (
              <PlaceholderPortrait
                label={"Revd. Gabriel Lasehinde\nBaba GOMAL · 1949–2023"}
                side="left"
              />
            )}
            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-ink-deep/30 via-transparent to-ink-deep/70 mix-blend-multiply" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAMA portrait — slides/fades in from right */}
      <AnimatePresence mode="wait">
        {currentPhase === "mama" && (
          <motion.div
            key="mama"
            className="absolute inset-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{
              duration: TRANSITION_DURATION,
              ease: [0.0, 0.0, 0.2, 1.0],
            }}
          >
            {mamaImageSrc ? (
              <>
                <div className="absolute inset-0 bg-ink-deep" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative overflow-hidden rounded" style={{ width: "62%", maxWidth: 520, aspectRatio: "3/4" }}>
                    <Image
                      src={mamaImageSrc}
                      alt="Mrs. Margaret Lasehinde — Mama GOMAL"
                      fill
                      className="object-cover"
                      style={{ objectPosition: "35% 20%" }}
                      sizes="520px"
                      priority
                    />
                  </div>
                </div>
              </>
            ) : (
              <PlaceholderPortrait
                label={"Mrs. Margaret Lasehinde\nMama GOMAL · 1955–2026"}
                side="right"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-b from-ink-deep/30 via-transparent to-ink-deep/70 mix-blend-multiply" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOGETHER portrait — dissolves in from centre */}
      <AnimatePresence mode="wait">
        {currentPhase === "together" && (
          <motion.div
            key="together"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{
              duration: TRANSITION_DURATION * 1.2,
              ease: [0.0, 0.0, 0.2, 1.0],
            }}
          >
            {togetherImageSrc ? (
              <PortraitImage
                src={togetherImageSrc}
                alt="Revd. Gabriel & Mrs. Margaret Lasehinde — Baba and Mama GOMAL"
              />
            ) : (
              <PlaceholderPortrait
                label={"Baba & Mama GOMAL\nTogether"}
                side="center"
              />
            )}
            {/* Slightly lighter overlay for together — let them shine */}
            <div className="absolute inset-0 bg-linear-to-b from-ink-deep/10 via-transparent to-ink-deep/50 mix-blend-multiply" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase indicator — subtle dots at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {PHASE_SEQUENCE.map((phase, i) => (
          <button
            key={phase}
            onClick={() => {
              if (timerRef.current) clearTimeout(timerRef.current);
              setPhaseIndex(i);
              setCurrentPhase(phase);
            }}
            aria-label={`View ${phase === "baba" ? "Baba" : phase === "mama" ? "Mama" : "both together"}`}
            className="focus:outline-none"
          >
            <motion.div
              className="rounded-full bg-sage"
              animate={{
                width: i === phaseIndex ? 20 : 6,
                height: 6,
                opacity: i === phaseIndex ? 1 : 0.4,
              }}
              transition={{ duration: 0.35, ease: [0.0, 0.0, 0.2, 1.0] }}
            />
          </button>
        ))}
      </div>

      {/* Permanent bottom vignette — content bleeds into text below */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-ink-deep to-transparent pointer-events-none" />
    </div>
  );
}
