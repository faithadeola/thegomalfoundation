"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@shared/constants/routes";

const SAMPLE_TRIBUTES = [
  {
    id: "t1",
    text: "Baba found me sleeping in the corridor with my luggage because I had no place to stay. He took me home, gave me a room, and kept me in school for three years. I never asked him how he afforded it.",
    name: "Adebayo Olatunji",
    relation: "GOMAL, Class of 2007",
  },
  {
    id: "t2",
    text: "Mama stayed with me the night before my final paper. I was shaking. She didn't say anything. She just sat there until I fell asleep. I have never forgotten that.",
    name: "Chidinma Eze",
    relation: "GOMAL, Class of 2012",
  },
  {
    id: "t3",
    text: "We nearly separated in 2019. They didn't take sides. They kept asking us questions until we found our own answers. We celebrate eight years next March.",
    name: "Anonymous",
    relation: "A couple they counselled",
  },
  {
    id: "t4",
    text: "Every Sunday, Baba shook my hand like it was the most important thing he had done all week. For me, it was.",
    name: "Tunde Afolabi",
    relation: "GOMAL, Class of 2003",
  },
] as const;

const RIPPLE_SIZES = [200, 380, 580] as const;
const RIPPLE_DELAYS = [0, 0.8, 1.6] as const;

function WallRipples() {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
      aria-hidden="true"
    >
      {RIPPLE_SIZES.map((size, i) => (
        <motion.div
          key={size}
          className="absolute top-1/2 left-1/2 rounded-full border border-sage"
          style={{ width: size, height: size, x: "-50%", y: "-50%" }}
          animate={{ scale: [0.5, 1.5], opacity: [0.08, 0] }}
          transition={{
            duration: 5,
            ease: "easeOut",
            delay: RIPPLE_DELAYS[i],
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

function TributeCard({
  tribute,
  index,
}: Readonly<{
  tribute: (typeof SAMPLE_TRIBUTES)[number];
  index: number;
}>) {
  return (
    <motion.div
      className="bg-green-raised border border-hair-green rounded p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.0, 0.0, 0.2, 1.0] }}
    >
      <p className="text-[0.9375rem] text-parchment-warm leading-[1.65] mb-4">
        &ldquo;{tribute.text}&rdquo;
      </p>
      <div className="border-t border-hair-green pt-3.5">
        <p className="font-semibold text-[0.875rem] text-parchment mb-0.5">
          {tribute.name}
        </p>
        <p className="text-[0.8125rem] text-sage">{tribute.relation}</p>
      </div>
    </motion.div>
  );
}

function useCountUp(target: number, active: boolean, duration = 2000): number {
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
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return count;
}

function WallCounter({ inView }: Readonly<{ inView: boolean }>) {
  const count = useCountUp(1247, inView);

  return (
    <span
      className="font-serif font-semibold text-[clamp(4rem,10vw,7rem)] text-brass-light leading-none relative z-10 block"
      style={{
        fontVariationSettings: "'SOFT' 40, 'WONK' 0",
        letterSpacing: "-0.03em",
      }}
    >
      {count.toLocaleString()}
    </span>
  );
}

export function MultiplicationWallSection() {
  const counterRef = useRef<HTMLDivElement>(null);
  const counterInView = useInView(counterRef, { once: true, margin: "-80px" });

  return (
    <section
      id="wall"
      className="bg-green-canvas py-24 md:py-28 px-6 md:px-10 overflow-hidden"
      aria-labelledby="wall-heading"
    >
      <div className="max-w-295 mx-auto">
        {/* Counter area */}
        <div ref={counterRef} className="text-center relative mb-12">
          <WallRipples />

          <motion.p
            className="text-[11px] font-semibold tracking-[0.18em] uppercase text-sage mb-4 relative z-10"
            initial={{ opacity: 0 }}
            animate={counterInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            In living legacy
          </motion.p>

          <div className="mb-2.5">
            <WallCounter inView={counterInView} />
          </div>

          <motion.p
            className="text-[1.125rem] text-parchment-warm relative z-10 mb-1.5"
            id="wall-heading"
            initial={{ opacity: 0, y: 6 }}
            animate={counterInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            lives, and counting.
          </motion.p>

          <motion.p
            className="text-[0.9375rem] text-sage italic relative z-10"
            initial={{ opacity: 0, y: 6 }}
            animate={counterInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Each one is someone Baba and Mama changed.
          </motion.p>
        </div>

        {/* Baba & Mama photo — panoramic strip */}
        <motion.div
          className="relative rounded-lg overflow-hidden mb-10"
          style={{ height: "clamp(220px, 34vw, 420px)" }}
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.0, 0.0, 0.2, 1.0] }}
        >
          <Image
            src="/images/portraits/baba-mama-worship.jpg"
            alt="Revd. Gabriel and Mrs. Margaret Lasehinde — Baba and Mama GOMAL in worship"
            fill
            className="object-cover"
            style={{ objectPosition: "50% 12%" }}
            sizes="(max-width: 768px) 100vw, 1180px"
          />
          <div className="absolute inset-0 bg-linear-to-t from-green-canvas/70 via-green-canvas/10 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-b from-green-canvas/40 via-transparent to-transparent" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 px-6 pb-4"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-[0.75rem] font-medium text-parchment/60 tracking-[0.12em] uppercase">
              Baba &amp; Mama GOMAL
            </p>
          </motion.div>
        </motion.div>

        {/* 4-card tribute grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {SAMPLE_TRIBUTES.map((tribute, i) => (
            <TributeCard key={tribute.id} tribute={tribute} index={i} />
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          className="flex items-center justify-center gap-6 flex-wrap"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
        >
          <Link
            href={ROUTES.TRIBUTES}
            className="inline-flex items-center px-6 py-3 rounded-full bg-brass text-ink-deep text-sm font-semibold hover:bg-brass-deep transition-colors duration-150"
          >
            Add your tribute
          </Link>
          <Link
            href={ROUTES.TRIBUTES}
            className="text-[0.9375rem] font-medium text-sage underline underline-offset-[3px] hover:text-parchment transition-colors duration-150"
          >
            Read all 1,247 tributes →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
