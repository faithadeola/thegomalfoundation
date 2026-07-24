"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { PartnershipForm } from "./partnership-form";

interface PartnershipModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export function PartnershipModal({ open, onClose }: PartnershipModalProps) {
  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink-deep/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="relative w-full max-w-xl bg-parchment border border-hair-strong rounded-lg overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.0, 0.0, 0.2, 1.0] }}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-8 pt-8 pb-5 border-b border-hair">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink-4 mb-1">
                  Partner with us
                </p>
                <h2
                  className="font-serif text-[1.25rem] font-medium text-ink leading-[1.25]"
                  style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0" }}
                >
                  Partnership application
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="mt-1 ml-4 w-8 h-8 rounded-full flex items-center justify-center text-ink-3 hover:bg-parchment-warm transition-colors duration-150 shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable form body */}
            <div className="px-8 py-7 max-h-[70vh] overflow-y-auto">
              <p className="text-[0.9375rem] text-ink-3 leading-[1.6] mb-6">
                Five minutes. Tell us about your organisation and what a partnership would look like. We respond to every application within two weeks.
              </p>
              <PartnershipForm />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
