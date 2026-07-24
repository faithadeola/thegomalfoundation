"use client";

import { useState } from "react";
import { SiteNav } from "@features/home/screen/parts/navigation/site-nav";
import { SiteFooter } from "@features/home/screen/parts/footer/site-footer";
import { PARTNERSHIP_TYPE_LABELS } from "@features/partnership/types/partnership";
import { PartnershipModal } from "@features/partnership/components/partnership-modal";

const FOCUS_PAIRS = [
  { type: "education", desc: "Schools, scholarship funds, teachers, education NGOs" },
  { type: "marriage-family", desc: "Counsellors, churches, couples, family ministries" },
  { type: "youth-mentorship", desc: "Mentors, career platforms, alumni networks, employers" },
  { type: "community-outreach", desc: "Individuals, community groups, civic organisations" },
  { type: "volunteering", desc: "Anyone willing to give their time and skills" },
  { type: "financial", desc: "Donors, foundations, corporates, giving circles" },
  { type: "media-communications", desc: "Broadcasters, publications, digital platforms" },
] as const;

export function PartnershipScreen() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-parchment pt-24">
        {/* Header */}
        <div className="bg-parchment py-16 md:py-20 px-6 md:px-10 border-b border-hair-strong">
          <div className="max-w-295 mx-auto">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink-4 mb-4">
              Partner with us
            </p>
            <h1
              className="font-serif text-[clamp(2rem,5vw,3rem)] font-medium text-ink mb-4 leading-[1.15]"
              style={{
                fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                letterSpacing: "-0.02em",
              }}
            >
              The work is bigger than any one gift.
            </h1>
            <p className="text-[1.0625rem] text-ink-2 leading-[1.65] max-w-[52ch]">
              Whether you are an individual, a school, a church, a business, or someone
              who simply wants to give their time — there is a place for you in what
              Baba and Mama started.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="py-16 md:py-20 px-6 md:px-10">
          <div className="max-w-295 mx-auto grid lg:grid-cols-[1fr_560px] gap-16 items-start">
            {/* Left: context */}
            <div>
              <h2
                className="font-serif text-[1.25rem] font-medium text-ink mb-5"
                style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0" }}
              >
                Ways to partner
              </h2>

              <div className="space-y-3 mb-10">
                {FOCUS_PAIRS.map(({ type, desc }) => (
                  <div
                    key={type}
                    className="flex items-start gap-4 py-4 border-b border-hair last:border-b-0"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brass mt-2.25 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[0.9375rem] text-ink mb-0.5">
                        {PARTNERSHIP_TYPE_LABELS[type]}
                      </p>
                      <p className="text-[0.875rem] text-ink-3">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-green-canvas rounded p-6">
                <p
                  className="font-serif text-[1.0625rem] font-medium text-parchment mb-2 leading-[1.4]"
                  style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0" }}
                >
                  We respond to every application.
                </p>
                <p className="text-[0.875rem] text-sage leading-[1.6]">
                  We read every application personally and respond within two weeks.
                  There is no automated rejection here.
                </p>
              </div>
            </div>

            {/* Right: CTA card */}
            <div className="bg-parchment-sheet border border-hair-strong rounded p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h2
                  className="font-serif text-[1.375rem] font-medium text-ink mb-1.5"
                  style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0" }}
                >
                  Apply to partner
                </h2>
                <p className="text-[0.9375rem] text-ink-3 leading-[1.6] mb-8">
                  Five minutes. Tell us who you are and how you would like to be
                  involved. We respond to every application.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center justify-center w-full px-6 py-4 rounded-full bg-brass text-ink-deep text-[1rem] font-semibold hover:bg-brass-deep transition-colors duration-150"
              >
                Open application form →
              </button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />

      <PartnershipModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
