"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

export function BankCard() {
  return (
    <div className="bg-parchment-sheet border border-hair-strong rounded p-7 lg:sticky lg:top-6">
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
        <strong className="text-ink-3">give@lasehinde.org</strong>.
      </p>

      <div className="bg-parchment-warm border border-sheet-edge rounded p-3.5">
        <p className="text-[0.8125rem] text-ink-3 leading-[1.5]">
          Giving from outside Nigeria? Email us and we&apos;ll arrange it.
        </p>
      </div>
    </div>
  );
}
