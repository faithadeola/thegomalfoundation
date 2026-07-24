"use client";

import { motion } from "framer-motion";
import { RevealGroup, Reveal } from "@ui/components/reveal/reveal";
import { BookOpen, Heart, Home, Church } from "@icons";
import type { LucideIcon } from "lucide-react";

interface RoomCardProps {
  readonly icon: LucideIcon;
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
}

function RoomCard({ icon: Icon, eyebrow, title, body }: RoomCardProps) {
  return (
    <motion.div
      className="bg-parchment-sheet border border-[var(--hair-strong)] rounded-[var(--radius)] p-9"
      whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.0, 0.0, 0.2, 1.0] } }}
    >
      <div className="w-11 h-11 border border-[var(--sheet-edge)] rounded-[var(--radius)] flex items-center justify-center text-ink-3 mb-5">
        <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
      </div>
      <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-ink-4 mb-2">
        {eyebrow}
      </p>
      <h3
        className="font-serif font-medium text-ink leading-snug mb-3"
        style={{
          fontVariationSettings: "'SOFT' 40, 'WONK' 0",
          fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
        }}
      >
        {title}
      </h3>
      <p className="text-[1rem] text-ink-2 leading-relaxed">{body}</p>
    </motion.div>
  );
}

const rooms: RoomCardProps[] = [
  {
    icon: BookOpen,
    eyebrow: "The Classroom",
    title: "Twenty-five years at GOMAL",
    body: "Baba and Mama built a legacy at GOMAL Baptist College — creating quality education and care. They built young people who were grounded, capable, purpose-driven, and strongly rooted in faith.",
  },
  {
    icon: Heart,
    eyebrow: "The Marriage",
    title: "Counsel drawn from a real marriage",
    body: "They did not teach from a textbook. Couples sat across from a husband and wife who had actually done the work — and left carrying something they couldn't quite put into words.",
  },
  {
    icon: Home,
    eyebrow: "The Open Door",
    title: "Nobody was ever turned away",
    body: "The house on the compound was never too full. Students in crisis, families with nowhere to turn, strangers who became lifelong family — all of them found room at that table.",
  },
  {
    icon: Church,
    eyebrow: "The Church",
    title: "A presence that cannot be replaced",
    body: "Baba's chair at the front pew has not been filled since he passed. The congregation has not tried. Some absences are honoured by being left exactly as they are.",
  },
];

export function WhoTheyWereSection() {
  return (
    <>
      {/* SECTION: Four rooms */}
      <section
        id="story"
        className="bg-parchment py-[120px] px-6 md:px-10"
        aria-labelledby="story-heading"
      >
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink-4 mb-3">
              Their Story
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="story-heading"
              className="font-serif font-medium text-ink leading-[1.1] tracking-tight mb-12 max-w-[20ch]"
              style={{
                fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                fontSize: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              Four rooms.
              <br />
              One fingerprint.
            </h2>
          </Reveal>

          <RevealGroup
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16"
            staggerDelay={0.1}
          >
            {rooms.map((room) => (
              <RoomCard key={room.eyebrow} {...room} />
            ))}
          </RevealGroup>

          {/* Brass arc divider */}
          <svg
            viewBox="0 0 1100 32"
            preserveAspectRatio="none"
            className="w-full h-8 overflow-visible"
            aria-hidden="true"
          >
            <path
              d="M0 28 Q550 4 1100 28"
              fill="none"
              stroke="var(--brass)"
              strokeWidth="1"
              opacity="0.4"
            />
          </svg>
        </div>
      </section>

      {/* SECTION: In their words — dark band */}
      <section className="bg-ink-deep py-24 px-6 md:px-10">
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-sage mb-6">
              In their words
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <blockquote
              className="font-serif italic text-parchment leading-snug mb-5"
              style={{
                fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              }}
            >
              &ldquo;Nobody who came for help ever left the way they
              arrived.&rdquo;
            </blockquote>
            <p className="text-sm text-sage italic mb-12">
              — Baba, as remembered by the family
            </p>
          </Reveal>

          {/* Brass rule */}
          <div className="w-10 h-px bg-brass mb-12" aria-hidden="true" />

          <Reveal delay={0.15}>
            <blockquote
              className="font-serif italic text-parchment leading-snug mb-5"
              style={{
                fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              }}
            >
              &ldquo;Sit. Have you eaten?&rdquo; She never asked what was wrong
              first.
            </blockquote>
            <p className="text-sm text-sage italic">
              — Mama, as remembered by the family
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION: What they left behind */}
      <section className="bg-parchment-warm py-[120px] px-6 md:px-10">
        <div className="max-w-[1180px] mx-auto">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink-4 mb-4">
              What they left behind
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="font-serif italic text-ink-2 max-w-[52ch] leading-[1.45] mb-10"
              style={{
                fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                fontSize: "clamp(1.375rem, 2.5vw, 2rem)",
              }}
            >
              &ldquo;The number of lives changed by one household is not
              something you can count. But you can try.&rdquo;
            </p>
          </Reveal>

          <RevealGroup className="flex flex-wrap gap-0" staggerDelay={0.12}>
            {[
              { num: "25", label: "years of GOMAL" },
              { num: "1,247", label: "tributes and counting" },
              { num: "∞", label: "couples counselled, quietly" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-stretch">
                <div className="pr-10 md:pr-16">
                  <div
                    className="font-serif font-semibold text-ink leading-none tracking-tight mb-1"
                    style={{
                      fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                      fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                    }}
                  >
                    {stat.num}
                  </div>
                  <p className="text-sm text-ink-3">{stat.label}</p>
                </div>
                {i < 2 && (
                  <div className="w-px bg-[var(--hair-strong)] mx-4 md:mx-8 self-stretch" aria-hidden="true" />
                )}
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
