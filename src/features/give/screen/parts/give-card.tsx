"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ROUTES } from "@shared/constants/routes";

type Frequency = "once" | "monthly" | "yearly";

const FREQ_LABELS: Record<Frequency, string> = {
  once: "Give once",
  monthly: "Monthly",
  yearly: "Yearly",
};

const PRESET_VALUES = [10000, 25000, 50000, 100000] as const;

function formatNaira(n: number): string {
  return `₦${n.toLocaleString()}`;
}

export function GiveCard() {
  const [frequency, setFrequency] = useState<Frequency>("once");
  const [selected, setSelected] = useState<number>(10000);
  const [custom, setCustom] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const effectiveAmount = showCustom
    ? Number(custom.replace(/[^0-9]/g, "")) || 0
    : selected;

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setCustom(raw ? Number(raw).toLocaleString() : "");
  }

  function pickPreset(val: number) {
    setSelected(val);
    setShowCustom(false);
    setCustom("");
  }

  function pickCustom() {
    setShowCustom(true);
  }

  const btnLabel =
    effectiveAmount > 0
      ? `Give ${formatNaira(effectiveAmount)}`
      : "Give";

  return (
    <div className="bg-parchment-sheet border border-hair-strong rounded p-9">
      <p className="font-semibold text-[1.125rem] text-ink mb-1">Give a gift</p>
      <p className="text-[0.9375rem] text-ink-3 mb-6">
        Any amount. Once, monthly, or yearly. Straight to the Foundation.
      </p>

      {/* Frequency toggle */}
      <div className="inline-flex border border-sheet-edge rounded overflow-hidden bg-parchment-warm mb-5">
        {(["once", "monthly", "yearly"] as Frequency[]).map((freq) => (
          <button
            key={freq}
            onClick={() => setFrequency(freq)}
            className={[
              "px-4 py-2.5 text-[0.875rem] font-medium transition-all duration-150",
              frequency === freq
                ? "bg-ink text-parchment font-semibold"
                : "text-ink-3 hover:text-ink",
            ].join(" ")}
          >
            {FREQ_LABELS[freq]}
          </button>
        ))}
      </div>

      {/* Amount presets */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {PRESET_VALUES.map((val) => (
          <button
            key={val}
            onClick={() => pickPreset(val)}
            className={[
              "py-3 px-2 text-[0.9375rem] font-medium text-center rounded border transition-all duration-150",
              !showCustom && selected === val
                ? "bg-ink border-ink text-parchment font-semibold"
                : "bg-parchment-warm border-sheet-edge text-ink hover:bg-parchment-deep hover:border-ink-4",
            ].join(" ")}
          >
            {formatNaira(val)}
          </button>
        ))}
      </div>

      {/* Custom amount row */}
      <AnimatePresence mode="wait">
        {showCustom ? (
          <motion.div
            key="custom-input"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="mb-5"
          >
            <div className="flex items-center border border-brass rounded overflow-hidden bg-parchment-warm focus-within:shadow-[0_0_0_3px_rgba(181,139,60,0.16)]">
              <span className="px-3.5 text-[1rem] font-semibold text-ink-3 select-none">₦</span>
              <input
                type="text"
                inputMode="numeric"
                autoFocus
                placeholder="Enter amount"
                value={custom}
                onChange={handleCustomChange}
                className="flex-1 py-3 pr-4 bg-transparent text-[1rem] font-semibold text-ink outline-none placeholder:text-ink-4"
              />
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="other-btn"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            onClick={pickCustom}
            className="block w-full text-left text-[0.8125rem] text-ink-3 mb-5 underline underline-offset-2 hover:text-ink transition-colors duration-150"
          >
            Enter a different amount →
          </motion.button>
        )}
      </AnimatePresence>

      <button
        disabled={effectiveAmount === 0}
        className="w-full flex items-center justify-center px-7 py-4 rounded-full bg-brass text-ink-deep text-[1.0625rem] font-semibold hover:bg-brass-deep disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 mb-6"
      >
        {btnLabel}
      </button>

      {/* Tertiary links */}
      <div className="mt-2 pt-4 border-t border-hair space-y-2.5">
        <Link
          href={ROUTES.PARTNERSHIP}
          className="block text-[0.9375rem] text-ink-3 underline underline-offset-[3px] hover:text-ink transition-colors duration-150"
        >
          Partner with us — individuals &amp; organisations →
        </Link>
        <a className="block text-[0.9375rem] text-ink-3 underline underline-offset-[3px] hover:text-ink transition-colors duration-150 cursor-pointer">
          Volunteer or mentor a student →
        </a>
      </div>
    </div>
  );
}
