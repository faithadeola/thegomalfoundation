"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface RevealProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly direction?: "up" | "left" | "right" | "none";
  readonly className?: string;
}

const makeVariants = (direction: RevealProps["direction"] = "up"): Variants => {
  const offsets = {
    up: { y: 32, x: 0 },
    left: { y: 0, x: -24 },
    right: { y: 0, x: 24 },
    none: { y: 0, x: 0 },
  };

  const { x, y } = offsets[direction ?? "up"];

  return {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.65, ease: [0.0, 0.0, 0.2, 1.0] },
    },
  };
};

// Wrapping container — staggers children
export function RevealGroup({
  children,
  className,
  staggerDelay = 0.1,
}: {
  readonly children: ReactNode;
  readonly className?: string;
  readonly staggerDelay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Individual reveal item — use inside RevealGroup or standalone
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={makeVariants(direction)}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
