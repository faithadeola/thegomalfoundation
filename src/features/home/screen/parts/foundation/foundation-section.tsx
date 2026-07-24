"use client";

import { motion } from "framer-motion";
import { Reveal } from "@ui/components/reveal/reveal";

const FOCUS_AREAS = [
  {
    num: "01",
    title: "Education & Scholarships",
    desc: "Mentorship, school support, and opportunities for young people to build on solid ground.",
  },
  {
    num: "02",
    title: "Marriage & Family",
    desc: "Counsel and support for couples building homes that hold.",
  },
  {
    num: "03",
    title: "Youth Leadership",
    desc: "Connecting young people with mentors and platforms to lead with purpose.",
  },
  {
    num: "04",
    title: "Community Outreach",
    desc: "Giving back to the communities Baba and Mama gave their lives to serve.",
  },
] as const;

export function FoundationSection() {
  return (
    <section
      id="foundation"
      className="bg-green-canvas py-24 md:py-32 px-6 md:px-10 border-t border-hair-green-strong"
      aria-labelledby="foundation-heading"
    >
      <div className="max-w-295 mx-auto">

        {/* Heading */}
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-sage mb-3">
            The Foundation
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <h2
              id="foundation-heading"
              className="font-serif font-medium text-parchment leading-[1.05]"
              style={{
                fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                fontSize: "clamp(2.25rem, 4.5vw, 3.25rem)",
                letterSpacing: "-0.025em",
              }}
            >
              Carrying their work<br />
              <span className="text-brass">forward.</span>
            </h2>
            <p className="text-[0.9375rem] text-parchment/60 max-w-[40ch] leading-[1.65] md:text-right">
              The GOMAL Foundation equips young people, strengthens families, and serves communities — in the spirit Baba and Mama lived.
            </p>
          </div>
        </Reveal>

        {/* Focus area cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-hair-green-strong rounded-xl overflow-hidden">
          {FOCUS_AREAS.map((area, i) => (
            <motion.div
              key={area.num}
              className="bg-green-raised flex flex-col p-8 relative overflow-hidden group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ backgroundColor: "var(--green-lifted)", transition: { duration: 0.2 } }}
            >
              {/* Ghost number */}
              <span
                className="absolute -bottom-4 -right-2 font-serif font-bold text-[7rem] leading-none text-green-lifted/80 group-hover:text-green-lifted select-none pointer-events-none transition-colors duration-300"
                style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0", letterSpacing: "-0.04em" }}
                aria-hidden="true"
              >
                {area.num}
              </span>

              {/* Brass top accent */}
              <div className="w-8 h-[2px] bg-brass mb-6" />

              <p className="font-semibold text-[0.9375rem] text-parchment leading-[1.3] mb-3 relative z-10">
                {area.title}
              </p>
              <p className="text-[0.875rem] text-parchment/55 leading-[1.6] relative z-10">
                {area.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom pull-quote */}
        <Reveal>
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6 border-t border-hair-green-strong pt-10">
            <div className="w-12 h-12 rounded-full border border-brass/40 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 2l2.4 5.6L18 8.6l-4 4 .9 5.4L10 15.4 5.1 18l.9-5.4-4-4 5.6-.9L10 2z" fill="var(--brass)" opacity="0.8" />
              </svg>
            </div>
            <p className="text-[0.9375rem] text-parchment/60 leading-[1.65] max-w-[54ch]">
              Every programme we run, every couple we support, every student we reach — it is their life's work, continuing through ours.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
