"use client";

import { useState } from "react";
import { HeroPortraitSequence } from "./hero-portrait-sequence";
import { HeroContent } from "./hero-content";

interface HeroSectionProps {
  readonly babaImageSrc?: string;
  readonly mamaImageSrc?: string;
  readonly togetherImageSrc?: string;
}

export function HeroSection({
  babaImageSrc,
  mamaImageSrc,
  togetherImageSrc,
}: HeroSectionProps) {
  const [activePhase, setActivePhase] = useState<"baba" | "mama" | "together">("baba");

  return (
    <section
      className="relative min-h-screen bg-ink-deep overflow-hidden"
      aria-label="In loving memory of Baba and Mama GOMAL"
    >
      {/* Full-bleed portrait background */}
      <div className="absolute inset-0">
        <HeroPortraitSequence
          babaImageSrc={babaImageSrc}
          mamaImageSrc={mamaImageSrc}
          togetherImageSrc={togetherImageSrc}
          onPhaseChange={setActivePhase}
        />
      </div>

      {/* Left-side content panel */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end md:justify-center pointer-events-none">
        <HeroContent activePhase={activePhase} />
      </div>
    </section>
  );
}
