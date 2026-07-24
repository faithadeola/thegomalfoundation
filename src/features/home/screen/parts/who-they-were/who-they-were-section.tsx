"use client";

import { motion } from "framer-motion";
import { Reveal } from "@ui/components/reveal/reveal";
import { BookOpen, Heart, Home, Church } from "@icons";
import type { LucideIcon } from "lucide-react";

interface RoomCardProps {
  readonly icon: LucideIcon;
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly index: number;
}

function RoomCard({ icon: Icon, eyebrow, title, body, index }: RoomCardProps) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <motion.div
      className="group relative bg-parchment-sheet border border-hair-strong rounded-lg p-7 flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.0, 0.0, 0.2, 1.0] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Large ghost number */}
      <span
        className="absolute -top-3 -right-2 font-serif font-bold text-[6rem] leading-none text-parchment-deep select-none pointer-events-none transition-colors duration-300 group-hover:text-parchment-deep/60"
        style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0", letterSpacing: "-0.04em" }}
        aria-hidden="true"
      >
        {num}
      </span>

      {/* Brass accent line — slides in on hover */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] bg-brass rounded-t-lg"
        initial={{ width: 0 }}
        whileInView={{ width: "40%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.08 + 0.3, ease: "easeOut" }}
      />

      <div className="w-10 h-10 border border-hair-strong rounded-lg flex items-center justify-center text-ink-3 mb-5 relative z-10">
        <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
      </div>

      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-ink-4 mb-2 relative z-10">
        {eyebrow}
      </p>
      <h3
        className="font-serif font-medium text-ink leading-snug mb-3 relative z-10"
        style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0", fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
      >
        {title}
      </h3>
      <p className="text-[0.875rem] text-ink-3 leading-[1.65] relative z-10">{body}</p>
    </motion.div>
  );
}

const rooms: Omit<RoomCardProps, "index">[] = [
  {
    icon: BookOpen,
    eyebrow: "The Classroom",
    title: "Twenty-five years at GOMAL",
    body: "Not to produce graduates — to build people who were grounded, capable, and faith-rooted.",
  },
  {
    icon: Heart,
    eyebrow: "The Marriage",
    title: "Counsel from a real marriage",
    body: "Couples sat across from a husband and wife who had actually done the work.",
  },
  {
    icon: Home,
    eyebrow: "The Open Door",
    title: "Nobody was ever turned away",
    body: "Students in crisis, families with nowhere to turn — all of them found room at that table.",
  },
  {
    icon: Church,
    eyebrow: "The Church",
    title: "A presence that cannot be replaced",
    body: "Baba's chair at the front pew has not been filled since he passed. The congregation has not tried.",
  },
];

export function WhoTheyWereSection() {
  return (
    <section
      id="story"
      className="bg-parchment py-24 md:py-32 px-6 md:px-10"
      aria-labelledby="story-heading"
    >
      <div className="max-w-295 mx-auto">

        {/* Heading row */}
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end mb-16">
          <div>
            <Reveal>
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink-4 mb-3">
                Their Story
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="story-heading"
                className="font-serif font-medium text-ink leading-[1.05]"
                style={{
                  fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                  fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                  letterSpacing: "-0.025em",
                }}
              >
                Four rooms.
                <br />
                <span className="text-brass">One</span> fingerprint.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <blockquote className="max-w-[34ch] md:text-right">
              <p
                className="font-serif italic text-ink-2 leading-[1.45] mb-2"
                style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0", fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}
              >
                &ldquo;Nobody who came for help ever left the way they arrived.&rdquo;
              </p>
              <cite className="text-[0.8125rem] text-ink-4 not-italic">— Baba, as remembered by the family</cite>
            </blockquote>
          </Reveal>
        </div>

        {/* Room cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {rooms.map((room, i) => (
            <RoomCard key={room.eyebrow} {...room} index={i} />
          ))}
        </div>

        {/* Full-width dark quote band */}
        <Reveal>
          <div className="relative rounded-xl bg-ink-deep overflow-hidden px-8 md:px-16 py-14 mb-14">
            {/* Decorative large quote mark */}
            <span
              className="absolute top-4 left-8 font-serif text-[8rem] leading-none text-white/5 select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <div className="relative z-10 max-w-[60ch] mx-auto text-center">
              <p
                className="font-serif italic text-parchment leading-[1.5] mb-4"
                style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0", fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
              >
                Baba's chair at the front pew will never be filled by anyone else. We have tried not to replace it.
              </p>
              <cite className="text-[0.8125rem] text-sage not-italic tracking-wide">
                — Rev. Seun Adeyemi, Church, Ogbomoso
              </cite>
            </div>
          </div>
        </Reveal>

        {/* Stats row */}
        <Reveal>
          <div className="grid grid-cols-3 gap-0 border-t border-hair pt-10">
            {[
              { num: "25", label: "years at GOMAL" },
              { num: "1,247", label: "tributes and counting" },
              { num: "∞", label: "couples counselled" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-stretch">
                <div className="pr-6 md:pr-12">
                  <div
                    className="font-serif font-semibold text-ink leading-none mb-1"
                    style={{
                      fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                      fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {stat.num}
                  </div>
                  <p className="text-[0.8125rem] text-ink-4">{stat.label}</p>
                </div>
                {i < 2 && (
                  <div className="w-px bg-hair-strong mr-6 md:mr-12 self-stretch" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
