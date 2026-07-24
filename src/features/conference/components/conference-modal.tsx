"use client";

import { useState, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AttendanceType =
  | "engaged"
  | "newly-married"
  | "established"
  | "seeking-counsel"
  | "other";

const ATTENDANCE_OPTIONS: { value: AttendanceType; label: string; desc: string }[] = [
  { value: "engaged", label: "Engaged couple", desc: "Planning your marriage and building your foundation early" },
  { value: "newly-married", label: "New couple", desc: "Married within the last three years" },
  { value: "established", label: "Established couple", desc: "Married for several years and wanting to go deeper" },
  { value: "seeking-counsel", label: "Seeking counsel", desc: "Navigating difficulty and looking for a way back to wholeness" },
  { value: "other", label: "Other", desc: "Tell us more in the message below" },
];

interface FormData {
  partnerOneName: string;
  partnerTwoName: string;
  phone: string;
  email: string;
  attendanceType: AttendanceType | "";
  yearsMarried: string;
  message: string;
}

interface SubmitResponse {
  success: boolean;
  error?: string;
}

async function submitRegistration(data: FormData): Promise<SubmitResponse> {
  const res = await fetch("/api/conference/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json() as Promise<SubmitResponse>;
}

const INPUT_BASE =
  "w-full px-4 py-3 bg-parchment border border-sheet-edge rounded text-[0.9375rem] text-ink placeholder:text-ink-4 outline-none transition-all duration-150 focus:border-brass focus:shadow-[0_0_0_3px_rgba(181,139,60,0.16)]";

interface FieldProps {
  readonly id: string;
  readonly label: string;
  readonly error?: string;
  readonly children: React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[0.8125rem] font-semibold text-ink-2">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[0.8125rem] text-crit"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="px-8 py-14 text-center"
    >
      <div className="w-14 h-14 rounded-full bg-green-canvas/20 border border-brass/30 flex items-center justify-center mx-auto mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 13l4 4L19 7" stroke="var(--brass)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2
        className="font-serif text-[1.5rem] font-medium text-ink mb-3"
        style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0" }}
      >
        Registration received.
      </h2>
      <p className="text-[0.9375rem] text-ink-3 leading-[1.65] max-w-[38ch] mx-auto mb-8">
        We have received your interest in the December 2026 Couples&apos; Conference. We will be in touch with details as the date approaches.
      </p>
      <button
        onClick={onClose}
        className="inline-flex items-center px-6 py-3 rounded-full border border-hair-strong text-ink text-[0.875rem] font-medium hover:bg-parchment-warm transition-colors duration-150"
      >
        Close
      </button>
    </motion.div>
  );
}

interface ConferenceModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export function ConferenceModal({ open, onClose }: ConferenceModalProps) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [form, setForm] = useState<FormData>({
    partnerOneName: "",
    partnerTwoName: "",
    phone: "",
    email: "",
    attendanceType: "",
    yearsMarried: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setForm({ partnerOneName: "", partnerTwoName: "", phone: "", email: "", attendanceType: "", yearsMarried: "", message: "" });
        setErrors({});
        setStatus("idle");
        setServerError("");
      }, 300);
    }
  }, [open]);

  function validate(): boolean {
    const next: typeof errors = {};
    if (!form.partnerOneName.trim()) next.partnerOneName = "Please enter your name";
    if (!form.partnerTwoName.trim()) next.partnerTwoName = "Please enter your partner's name";
    if (!form.phone.trim()) next.phone = "Phone number is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "A valid email address is required";
    }
    if (!form.attendanceType) next.attendanceType = "Please select how you are coming";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await submitRegistration(form);
      if (res.success) {
        setStatus("success");
      } else {
        setServerError(res.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerError("Could not send registration. Please try again.");
      setStatus("error");
    }
  }

  const showYearsMarried = form.attendanceType && form.attendanceType !== "engaged";

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
            className="relative w-full max-w-lg bg-parchment-sheet border border-hair-strong rounded-lg overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.0, 0.0, 0.2, 1.0] }}
          >
            {status === "success" ? (
              <SuccessState onClose={onClose} />
            ) : (
              <>
                {/* Header */}
                <div className="flex items-start justify-between px-8 pt-8 pb-5 border-b border-hair">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink-4 mb-1">
                      December 2026 · Ogbomoso
                    </p>
                    <h2
                      className="font-serif text-[1.25rem] font-medium text-ink leading-[1.25]"
                      style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0" }}
                    >
                      Inaugural Couples&apos; Conference
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

                {/* Form body */}
                <div className="px-8 py-7 max-h-[72vh] overflow-y-auto">
                  <p className="text-[0.9375rem] text-ink-3 leading-[1.6] mb-6">
                    Register your interest. We will confirm details and reach out as December approaches.
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Names */}
                    <div className="grid grid-cols-2 gap-4">
                      <Field id={id("p1")} label="Your name" error={errors.partnerOneName}>
                        <input
                          id={id("p1")}
                          type="text"
                          value={form.partnerOneName}
                          onChange={(e) => set("partnerOneName", e.target.value)}
                          placeholder="Your full name"
                          className={INPUT_BASE}
                          autoComplete="name"
                        />
                      </Field>
                      <Field id={id("p2")} label="Partner's name" error={errors.partnerTwoName}>
                        <input
                          id={id("p2")}
                          type="text"
                          value={form.partnerTwoName}
                          onChange={(e) => set("partnerTwoName", e.target.value)}
                          placeholder="Their full name"
                          className={INPUT_BASE}
                        />
                      </Field>
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-2 gap-4">
                      <Field id={id("phone")} label="Phone number" error={errors.phone}>
                        <input
                          id={id("phone")}
                          type="tel"
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          placeholder="+234 800 000 0000"
                          className={INPUT_BASE}
                          autoComplete="tel"
                        />
                      </Field>
                      <Field id={id("email")} label="Email address" error={errors.email}>
                        <input
                          id={id("email")}
                          type="email"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          placeholder="you@example.com"
                          className={INPUT_BASE}
                          autoComplete="email"
                        />
                      </Field>
                    </div>

                    {/* Attendance type */}
                    <Field id={id("type")} label="You are coming as…" error={errors.attendanceType}>
                      <div className="flex flex-col gap-2">
                        {ATTENDANCE_OPTIONS.map((opt) => (
                          <label
                            key={opt.value}
                            className={[
                              "flex items-start gap-3 p-3.5 rounded border cursor-pointer transition-all duration-150",
                              form.attendanceType === opt.value
                                ? "border-brass bg-parchment shadow-[0_0_0_2px_rgba(181,139,60,0.18)]"
                                : "border-sheet-edge bg-parchment hover:border-ink-4",
                            ].join(" ")}
                          >
                            <input
                              type="radio"
                              name={id("type")}
                              value={opt.value}
                              checked={form.attendanceType === opt.value}
                              onChange={() => set("attendanceType", opt.value)}
                              className="mt-0.5 accent-brass shrink-0"
                            />
                            <span>
                              <span className="block text-[0.9375rem] font-semibold text-ink leading-snug">
                                {opt.label}
                              </span>
                              <span className="block text-[0.8125rem] text-ink-3 mt-0.5 leading-snug">
                                {opt.desc}
                              </span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </Field>

                    {/* Years married — shown for non-engaged */}
                    <AnimatePresence>
                      {showYearsMarried && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Field id={id("years")} label="How many years have you been married?">
                            <input
                              id={id("years")}
                              type="text"
                              inputMode="numeric"
                              value={form.yearsMarried}
                              onChange={(e) => set("yearsMarried", e.target.value.replace(/[^0-9]/g, ""))}
                              placeholder="e.g. 3"
                              className={INPUT_BASE}
                            />
                          </Field>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Anything else */}
                    <Field id={id("message")} label="Anything you'd like us to know? (optional)">
                      <textarea
                        id={id("message")}
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        placeholder="Any context that will help us serve you well — questions, concerns, or anything else on your heart."
                        rows={3}
                        maxLength={800}
                        className={[INPUT_BASE, "resize-none pb-1"].join(" ")}
                      />
                    </Field>

                    {/* Server error */}
                    <AnimatePresence>
                      {status === "error" && serverError && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-[0.875rem] text-crit"
                          role="alert"
                        >
                          {serverError}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center gap-4 pt-1">
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brass text-ink-deep text-[0.9375rem] font-semibold hover:bg-brass-deep disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150"
                      >
                        {status === "loading" ? (
                          <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          "Register interest"
                        )}
                      </button>
                      <p className="text-[0.8125rem] text-ink-4">
                        We&apos;ll be in touch.
                      </p>
                    </div>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
