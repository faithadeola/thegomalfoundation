"use client";

import { GiveCard } from "./parts/give-card";
import { BankCard } from "./parts/bank-card";
import { SiteNav } from "@features/home/screen/parts/navigation/site-nav";
import { SiteFooter } from "@features/home/screen/parts/footer/site-footer";

export function GiveScreen() {
  return (
    <>
    <SiteNav />
    <main className="min-h-screen bg-ink-deep">
      {/* Mini-hero */}
      <div className="bg-ink-deep pt-32 pb-14 px-6 md:px-10 border-b border-hair-green text-center">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-sage mb-3">
          In loving memory · In living legacy
        </p>
        <h1
          className="font-serif text-[clamp(1.375rem,3vw,2rem)] font-medium text-parchment mb-1.5 leading-[1.2]"
          style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0" }}
        >
          The GOMAL Foundation
        </h1>
        <p className="text-[0.8125rem] text-sage-deep mb-5">
          Revd. G.O. Lasehinde · 1949–2023 &nbsp;·&nbsp; Mrs. M.A. Lasehinde · 1955–2026
        </p>
        <p
          className="font-serif text-[1rem] italic text-sage"
          style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0" }}
        >
          &ldquo;Nobody who came for help ever left the way they arrived.&rdquo;
        </p>
      </div>

      {/* Give section */}
      <div className="bg-parchment py-16 px-6 md:px-10">
        <div className="max-w-295 mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink-4 mb-3">
            Give
          </p>
          <h2
            className="font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-medium text-ink mb-2"
            style={{
              fontVariationSettings: "'SOFT' 40, 'WONK' 0",
              letterSpacing: "-0.015em",
            }}
          >
            Support the work they started.
          </h2>
          <p className="text-[1rem] text-ink-2 mb-12 max-w-[52ch] leading-[1.65]">
            Received in the spirit Baba and Mama gave — freely, and without
            asking twice.
          </p>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
            <GiveCard />
            <BankCard />
          </div>

          {/* Paystack trust signal */}
          <div className="flex items-center gap-2 mt-5 text-[0.8125rem] text-ink-4">
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
            Payments secured by Paystack
          </div>
        </div>
      </div>

    </main>
    <SiteFooter />
    </>
  );
}
