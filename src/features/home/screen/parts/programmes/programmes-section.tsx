"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Reveal } from "@ui/components/reveal/reveal";
import { ConferenceModal } from "@features/conference/components/conference-modal";

const GALLERY_PHOTOS = [
  { src: "/images/gallery/growthlab-01.jpg", alt: "GROWTHLAB 2.0 — students in session" },
  { src: "/images/gallery/growthlab-02.jpg", alt: "GROWTHLAB 2.0 — workshop moment" },
  { src: "/images/gallery/growthlab-03.jpg", alt: "GROWTHLAB 2.0 — group discussion" },
  { src: "/images/gallery/growthlab-04.jpg", alt: "GROWTHLAB 2.0 — mentor and student" },
  { src: "/images/gallery/growthlab-05.jpg", alt: "GROWTHLAB 2.0 — programme participants" },
  { src: "/images/gallery/growthlab-06.jpg", alt: "GROWTHLAB 2.0 — keynote address" },
  { src: "/images/gallery/growthlab-07.jpg", alt: "GROWTHLAB 2.0 — audience engaged" },
  { src: "/images/gallery/growthlab-08.jpg", alt: "GROWTHLAB 2.0 — breakout session" },
  { src: "/images/gallery/growthlab-09.jpg", alt: "GROWTHLAB 2.0 — youth leaders" },
  { src: "/images/gallery/growthlab-10.jpg", alt: "GROWTHLAB 2.0 — class of 2025" },
  { src: "/images/gallery/growthlab-11.jpg", alt: "GROWTHLAB 2.0 — panel discussion" },
  { src: "/images/gallery/growthlab-12.jpg", alt: "GROWTHLAB 2.0 — networking" },
  { src: "/images/gallery/growthlab-13.jpg", alt: "GROWTHLAB 2.0 — closing ceremony" },
  { src: "/images/gallery/growthlab-14.jpg", alt: "GROWTHLAB 2.0 — certificate presentation" },
  { src: "/images/gallery/growthlab-15.jpg", alt: "GROWTHLAB 2.0 — legacy continues" },
] as const;

const STATS = [
  { id: "s1", value: 300, suffix: "+", label: "Students reached" },
  { id: "s2", value: 29, suffix: "", label: "Schools partnered" },
  { id: "s3", value: 20, suffix: "", label: "Public schools" },
  { id: "s4", value: 9, suffix: "", label: "Private schools" },
  { id: "s5", value: 3, suffix: "", label: "Lead speakers" },
] as const;

function useCountUp(target: number, active: boolean, duration = 1400): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    startRef.current = null;
    function tick(ts: number) {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return count;
}

function StatCell({
  stat,
  index,
  inView,
}: Readonly<{ stat: (typeof STATS)[number]; index: number; inView: boolean }>) {
  const count = useCountUp(stat.value, inView);
  return (
    <motion.div
      className="px-6 py-8 text-center border-b border-r border-hair lg:border-b-0 nth-[2n]:border-r-0 lg:nth-[2n]:border-r lg:last:border-r-0"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <div
        className="font-serif font-semibold text-[2.75rem] text-ink leading-none mb-1"
        style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0", letterSpacing: "-0.025em" }}
      >
        {count}{stat.suffix}
      </div>
      <p className="text-[0.8125rem] text-ink-3 leading-[1.4]">{stat.label}</p>
    </motion.div>
  );
}

const SLIDE_DURATION = 4200;

function GrowthLabGallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const thumbsScrollRef = useRef<HTMLDivElement>(null);

  const advance = useCallback((dir: 1 | -1 = 1) => {
    setActive((prev) => (prev + dir + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => advance(1), SLIDE_DURATION);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, active, advance]);

  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const step = 50;
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (step / SLIDE_DURATION) * 100, 100));
    }, step);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [active, paused]);

  useEffect(() => {
    const container = thumbsScrollRef.current;
    if (!container) return;
    const thumb = container.children[active] as HTMLElement | undefined;
    if (!thumb) return;
    const containerWidth = container.clientWidth;
    const thumbLeft = thumb.offsetLeft;
    const thumbWidth = thumb.offsetWidth;
    container.scrollTo({ left: thumbLeft - containerWidth / 2 + thumbWidth / 2, behavior: "smooth" });
  }, [active]);

  const panVariants = {
    enter: { scale: 1.08, x: "1%", y: "0.5%" },
    center: {
      scale: 1.14, x: "-1%", y: "-0.5%",
      transition: { duration: SLIDE_DURATION / 1000 + 0.3, ease: "linear" as const },
    },
    exit: { scale: 1.06, opacity: 0, transition: { duration: 0.55, ease: "easeIn" as const } },
  };

  const captionVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.25, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.3 } },
  };

  const current = GALLERY_PHOTOS[active];

  return (
    <div
      className="mt-10 rounded-lg overflow-hidden border border-hair-strong"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative bg-ink-deep overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={active}
            className="absolute inset-0"
            variants={panVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1180px"
              priority={active === 0}
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink-deep/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-10">
          <AnimatePresence mode="wait">
            <motion.div key={active} variants={captionVariants} initial="hidden" animate="visible" exit="exit">
              <p className="text-[0.8125rem] font-medium text-parchment/80 tracking-wide">
                {String(active + 1).padStart(2, "0")} / {String(GALLERY_PHOTOS.length).padStart(2, "0")}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => { advance(-1); setPaused(false); }}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink-deep/50 hover:bg-ink-deep/80 flex items-center justify-center text-parchment transition-colors duration-150 backdrop-blur-sm"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => { advance(1); setPaused(false); }}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink-deep/50 hover:bg-ink-deep/80 flex items-center justify-center text-parchment transition-colors duration-150 backdrop-blur-sm"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="h-[2px] bg-parchment-deep relative overflow-hidden">
        <motion.div className="absolute left-0 top-0 h-full bg-brass" style={{ width: `${progress}%` }} transition={{ duration: 0 }} />
      </div>

      <div ref={thumbsScrollRef} className="bg-ink-deep px-4 py-3 overflow-x-auto hide-scrollbar">
        <div className="flex gap-2" style={{ width: "max-content" }}>
          {GALLERY_PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              onClick={() => { setActive(i); setProgress(0); setPaused(false); }}
              aria-label={`Go to photo ${i + 1}`}
              className="relative shrink-0 rounded overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
              style={{ width: 72, height: 50 }}
            >
              <Image src={photo.src} alt="" fill className="object-cover transition-all duration-200" sizes="72px" />
              <motion.div
                className="absolute inset-0 border-[1.5px] rounded"
                animate={{ borderColor: i === active ? "var(--brass)" : "transparent", opacity: i === active ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <div
                className="absolute inset-0 transition-opacity duration-200"
                style={{ background: "rgba(0,0,0,0.35)", opacity: i === active ? 0 : 1 }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProgrammesSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const [conferenceOpen, setConferenceOpen] = useState(false);

  return (
    <>
      {/* ── GROWTHLAB ── */}
      <section
        id="programmes"
        className="bg-parchment py-24 md:py-32 px-6 md:px-10 border-t border-hair-strong"
        aria-labelledby="programmes-heading"
      >
        <div className="max-w-295 mx-auto">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink-4 mb-2">
                  Already working
                </p>
                <h2
                  id="programmes-heading"
                  className="font-serif font-medium text-ink leading-[1.1]"
                  style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0", fontSize: "clamp(1.75rem,3vw,2.5rem)", letterSpacing: "-0.02em" }}
                >
                  GROWTHLAB 2.0, 2025
                </h2>
              </div>
              <a
                href="https://drive.google.com/file/d/17QBlPPqV-svB6-QEZFHzAp60pMIHsLex/view"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.875rem] text-ink-3 underline underline-offset-2 hover:text-ink transition-colors duration-150 shrink-0"
              >
                View impact report →
              </a>
            </div>
          </Reveal>

          <div
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 bg-parchment-sheet border border-hair-strong rounded overflow-hidden mb-3"
          >
            {STATS.map((stat, i) => (
              <StatCell key={stat.id} stat={stat} index={i} inView={statsInView} />
            ))}
          </div>

          <p className="text-[0.8125rem] text-ink-4 mb-8">
            In partnership with SMARTA Teens Consulting and Dr. Gabriel Lasehinde.
          </p>

          <GrowthLabGallery />
        </div>
      </section>

      {/* ── Inaugural Couples' Conference ── */}
      <section className="bg-green-canvas py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-295 mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-[48ch]">
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-sage">
                    December 2026 · Ogbomoso
                  </p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-brass/20 border border-brass/40 text-[10px] font-semibold tracking-[0.12em] uppercase text-brass">
                    Coming soon
                  </span>
                </div>
                <h2
                  className="font-serif font-medium text-parchment leading-[1.15] mb-4"
                  style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0", fontSize: "clamp(1.5rem,2.5vw,2rem)", letterSpacing: "-0.015em" }}
                >
                  Inaugural Couples&apos; Conference
                </h2>
                <p className="text-[0.9375rem] text-parchment-warm leading-[1.65]">
                  A small, closed-room conference for couples — new, established, or seeking counsel. Safe enough for honesty. Structured enough for breakthrough.
                </p>
              </div>
              <button
                onClick={() => setConferenceOpen(true)}
                className="shrink-0 inline-flex items-center px-7 py-4 rounded-full bg-brass text-ink-deep text-[0.9375rem] font-semibold hover:bg-brass-deep transition-colors duration-150"
              >
                Register interest
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <ConferenceModal open={conferenceOpen} onClose={() => setConferenceOpen(false)} />
    </>
  );
}
