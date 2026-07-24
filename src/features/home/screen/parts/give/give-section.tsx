"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Reveal, RevealGroup } from "@ui/components/reveal/reveal";
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

function CopyButton({ text }: Readonly<{ text: string }>) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <button
      onClick={handleCopy}
      className="px-3.5 py-2.5 bg-parchment-deep border-l border-sheet-edge text-[0.8125rem] font-semibold text-ink-3 hover:bg-sheet-edge hover:text-ink transition-colors duration-150 shrink-0"
      aria-label="Copy account number"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            Copied!
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            Copy
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function BankCard() {
  return (
    <div className="bg-parchment-sheet border border-hair-strong rounded p-7 lg:sticky lg:top-24">
      <p className="font-semibold text-[0.9375rem] text-ink mb-5">
        Give by bank transfer
      </p>

      <div className="mb-4 pb-4 border-b border-hair">
        <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-ink-4 mb-1">
          Account name
        </p>
        <p className="text-[1rem] font-semibold text-ink">The GOMAL Foundation</p>
      </div>

      <div className="mb-4 pb-4 border-b border-hair">
        <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-ink-4 mb-1.5">
          Account number
        </p>
        <div className="flex items-center bg-parchment-warm border border-sheet-edge rounded overflow-hidden">
          <span className="flex-1 px-3.5 py-2.5 font-mono text-[1.0625rem] font-bold tracking-[0.06em] text-ink select-all">
            0123456789
          </span>
          <CopyButton text="0123456789" />
        </div>
      </div>

      <div className="mb-4 pb-4 border-b border-hair">
        <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-ink-4 mb-1">
          Bank
        </p>
        <p className="text-[1rem] font-semibold text-ink">First Bank of Nigeria</p>
      </div>

      <p className="text-[0.8125rem] text-ink-4 leading-[1.5] mb-5">
        After transferring, send your name and amount to{" "}
        <strong className="text-ink-3">give@lasehinde.org</strong> so we can
        acknowledge your gift.
      </p>

      <div className="bg-parchment-warm border border-sheet-edge rounded p-3.5">
        <p className="text-[0.8125rem] text-ink-3 leading-[1.5]">
          Giving from outside Nigeria? Email{" "}
          <strong>give@lasehinde.org</strong> and we'll arrange it.
        </p>
      </div>
    </div>
  );
}

function GiveCard() {
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

  return (
    <div className="rounded-lg overflow-hidden border border-hair-strong">
      {/* Warm header band */}
      <div className="bg-parchment-deep px-8 pt-8 pb-6 border-b border-hair-strong">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink-4 mb-3">
          Give a gift
        </p>
        <p
          className="font-serif italic text-ink leading-[1.45]"
          style={{
            fontVariationSettings: "'SOFT' 40, 'WONK' 0",
            fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
          }}
        >
          &ldquo;Nobody who came for help ever left the way they arrived.&rdquo;
        </p>
        <p className="text-[0.8125rem] text-ink-4 mt-2">— Baba, as remembered by the family</p>
      </div>

      {/* Give controls */}
      <div className="bg-parchment-sheet px-8 py-7">
        {/* Frequency toggle */}
        <div className="inline-flex border border-sheet-edge rounded overflow-hidden bg-parchment-warm mb-6 w-full sm:w-auto">
          {(["once", "monthly", "yearly"] as Frequency[]).map((freq) => (
            <button
              key={freq}
              onClick={() => setFrequency(freq)}
              className={[
                "flex-1 sm:flex-none px-4 py-2.5 text-[0.875rem] font-medium transition-all duration-150",
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          {PRESET_VALUES.map((val) => (
            <button
              key={val}
              onClick={() => pickPreset(val)}
              className={[
                "py-3.5 px-2 text-[0.9375rem] font-semibold text-center rounded-lg border transition-all duration-150",
                !showCustom && selected === val
                  ? "bg-brass border-brass text-ink-deep shadow-sm"
                  : "bg-parchment-warm border-sheet-edge text-ink hover:border-brass/40 hover:bg-brass-tint",
              ].join(" ")}
            >
              {formatNaira(val)}
            </button>
          ))}
        </div>

        {/* Custom amount */}
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
              <div className="flex items-center border border-brass rounded-lg overflow-hidden bg-parchment-warm focus-within:shadow-[0_0_0_3px_rgba(181,139,60,0.16)]">
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
              onClick={() => setShowCustom(true)}
              className="block w-full text-left text-[0.8125rem] text-ink-3 mb-5 underline underline-offset-2 hover:text-ink transition-colors duration-150"
            >
              Enter a different amount →
            </motion.button>
          )}
        </AnimatePresence>

        {/* Primary CTA */}
        <button
          disabled={effectiveAmount === 0}
          className="w-full flex items-center justify-center px-7 py-4 rounded-full bg-brass text-ink-deep text-[1.0625rem] font-semibold hover:bg-brass-deep disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 shadow-sm mb-6"
        >
          {effectiveAmount > 0 ? `Give ${formatNaira(effectiveAmount)}` : "Give"}
        </button>

        {/* Tertiary links */}
        <div className="pt-4 border-t border-hair space-y-2.5">
          <Link
            href={ROUTES.PARTNERSHIP}
            className="block text-[0.875rem] text-ink-3 underline underline-offset-[3px] hover:text-ink transition-colors duration-150"
          >
            Partner with us — individuals &amp; organisations →
          </Link>
          <button
            type="button"
            className="block text-left text-[0.875rem] text-ink-3 underline underline-offset-[3px] hover:text-ink transition-colors duration-150"
          >
            Volunteer or mentor a student →
          </button>
        </div>
      </div>
    </div>
  );
}

export function GiveSection() {
  return (
    <section
      id="give"
      className="bg-parchment py-28 md:py-32 px-6 md:px-10"
      aria-labelledby="give-heading"
    >
      <div className="max-w-295 mx-auto">
        <RevealGroup>
          <Reveal>
            <div className="mb-6">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink-4 mb-3">
                Give
              </p>
              <h2
                id="give-heading"
                className="font-serif text-[clamp(1.75rem,3.5vw,2.25rem)] font-medium text-ink mb-2"
                style={{
                  fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                  letterSpacing: "-0.015em",
                }}
              >
                Support the work they started.
              </h2>
              <p className="text-[1rem] text-ink-2 max-w-[52ch] leading-[1.65]">
                Received in the spirit Baba and Mama gave — freely, and without
                asking twice.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
              <GiveCard />
              <BankCard />
            </div>
          </Reveal>

          {/* Paystack trust signal */}
          <Reveal>
            <div className="flex items-center gap-2 mt-4 text-[0.8125rem] text-ink-4">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="opacity-50"
              >
                <path
                  d="M7 1C5.343 1 4 2.343 4 4v1H3a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1V6a1 1 0 00-1-1h-1V4c0-1.657-1.343-3-3-3zm2 5V4a2 2 0 10-4 0v2h4z"
                  fill="currentColor"
                />
              </svg>
              Payments secured by Paystack — trusted by millions of Nigerians
            </div>
          </Reveal>
        </RevealGroup>
      </div>
    </section>
  );
}
