"use client";

import { useState, useId } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { EP } from "@shared/constants/endpoints";
import {
  PARTNERSHIP_TYPE_LABELS,
  type PartnershipFormData,
  type PartnershipType,
} from "@features/partnership/types/partnership";

interface SubmitResponse {
  success: boolean;
  error?: string;
}

const PARTNERSHIP_TYPES = Object.entries(PARTNERSHIP_TYPE_LABELS) as [
  PartnershipType,
  string,
][];

async function submitPartnership(data: PartnershipFormData): Promise<SubmitResponse> {
  const res = await fetch(EP.PARTNERSHIP.SUBMIT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json() as Promise<SubmitResponse>;
}

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

const INPUT_BASE =
  "w-full px-4 py-3 bg-parchment-sheet border border-sheet-edge rounded text-[0.9375rem] text-ink placeholder:text-ink-4 outline-none transition-all duration-150 focus:border-brass focus:shadow-[0_0_0_3px_rgba(181,139,60,0.16)]";

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center py-16 px-8"
    >
      <div className="w-14 h-14 rounded-full bg-parchment-warm border border-hair-strong flex items-center justify-center mx-auto mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 13l4 4L19 7"
            stroke="var(--brass)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2
        className="font-serif text-[1.5rem] font-medium text-ink mb-3"
        style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0" }}
      >
        Application received.
      </h2>
      <p className="text-[0.9375rem] text-ink-3 leading-[1.65] max-w-[40ch] mx-auto">
        Thank you for reaching out. We read every application and will respond
        within two weeks.
      </p>
    </motion.div>
  );
}

export function PartnershipForm() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    partnershipType: "" as PartnershipType | "",
    proposal: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  const mutation = useMutation<SubmitResponse, Error, PartnershipFormData>({
    mutationFn: submitPartnership,
  });

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validate(): boolean {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Your name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "A valid email address is required";
    }
    if (!form.phone.trim()) next.phone = "Phone number is required";
    if (!form.partnershipType) next.partnershipType = "Please select how you'd like to partner";
    if (form.proposal.trim().length < 20) {
      next.proposal = "Please share a little more detail (at least 20 characters)";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(form as PartnershipFormData);
  }

  if (mutation.isSuccess && mutation.data.success) {
    return <SuccessState />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field id={id("name")} label="Your name" error={errors.name}>
          <input
            id={id("name")}
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your full name"
            className={INPUT_BASE}
            autoComplete="name"
          />
        </Field>

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
      </div>

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

      <Field id={id("type")} label="How would you like to partner?" error={errors.partnershipType}>
        <select
          id={id("type")}
          value={form.partnershipType}
          onChange={(e) => set("partnershipType", e.target.value)}
          className={[
            INPUT_BASE,
            "appearance-none cursor-pointer",
            !form.partnershipType ? "text-ink-4" : "",
          ].join(" ")}
        >
          <option value="" disabled>
            Select an area
          </option>
          {PARTNERSHIP_TYPES.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>

      <Field id={id("proposal")} label="Tell us more" error={errors.proposal}>
        <div className="relative">
          <textarea
            id={id("proposal")}
            value={form.proposal}
            onChange={(e) => set("proposal", e.target.value)}
            placeholder="What do you have in mind? Whether you're an individual, a school, a church, or a business — tell us what partnership looks like for you."
            rows={6}
            maxLength={2000}
            className={[INPUT_BASE, "resize-y min-h-[140px] pb-8"].join(" ")}
          />
          <span
            className="absolute bottom-3 right-3 text-[11px] text-ink-4 pointer-events-none"
            aria-live="polite"
          >
            {form.proposal.length}/2000
          </span>
        </div>
      </Field>

      <AnimatePresence>
        {mutation.isSuccess && !mutation.data.success && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[0.875rem] text-crit"
            role="alert"
          >
            {mutation.data.error ?? "Failed to send application. Please try again."}
          </motion.p>
        )}
        {mutation.isError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[0.875rem] text-crit"
            role="alert"
          >
            Failed to send application. Please try again.
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-brass text-ink-deep text-[1rem] font-semibold hover:bg-brass-deep disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150"
      >
        {mutation.isPending ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          "Submit application"
        )}
      </button>
    </form>
  );
}
