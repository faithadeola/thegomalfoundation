"use client";

import { HeroPortraitSequence } from "./hero-portrait-sequence";
import { HeroRippleRings } from "./hero-ripple-rings";
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
  return (
    <section
      className="relative min-h-screen bg-ink-deep overflow-hidden flex flex-col justify-end"
      aria-label="In loving memory of Baba and Mama GOMAL"
    >
      {/* Portrait area — upper 65% */}
      <div className="absolute top-0 left-0 right-0 h-[65%]">
        <HeroPortraitSequence
          babaImageSrc={babaImageSrc}
          mamaImageSrc={mamaImageSrc}
          togetherImageSrc={togetherImageSrc}
        />
      </div>

      {/* Ripple rings behind portrait */}
      <HeroRippleRings />

      {/* Hero text content — sits at bottom, overlapping vignette */}
      <HeroContent />
    </section>
  );
}
