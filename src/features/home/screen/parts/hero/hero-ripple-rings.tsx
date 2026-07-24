"use client";

import { motion } from "framer-motion";

const rings = [
  { size: 240, delay: 0.0, duration: 5.5 },
  { size: 420, delay: 0.8, duration: 5.5 },
  { size: 640, delay: 1.6, duration: 5.5 },
  { size: 880, delay: 2.4, duration: 5.5 },
];

export function HeroRippleRings() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ top: "30%", left: "50%", transform: "translate(-50%, -50%)" }}
      aria-hidden="true"
    >
      {rings.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-sage"
          style={{
            width: ring.size,
            height: ring.size,
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            scale: [0.4, 1.4],
            opacity: [0.12, 0],
          }}
          transition={{
            duration: ring.duration,
            delay: ring.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
