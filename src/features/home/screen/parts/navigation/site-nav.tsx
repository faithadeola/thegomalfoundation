"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "@icons";
import { Logo } from "@ui/components/logo/logo";
import { ROUTES } from "@shared/constants/routes";
import { cn } from "@shared/helpers/cn";

const homeNavLinks = [
  { label: "Their Story", href: "#story" },
  { label: "The Foundation", href: "#foundation" },
  { label: "The Wall", href: "#wall" },
  { label: "Partnership", href: ROUTES.PARTNERSHIP },
] as const;

const innerNavLinks = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Partnership", href: ROUTES.PARTNERSHIP },
  { label: "Tributes", href: ROUTES.TRIBUTES },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === ROUTES.HOME;
  const navLinks = isHome ? homeNavLinks : innerNavLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change / escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-ink-deep/95 backdrop-blur-sm border-b border-[var(--hair-green)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded-[var(--radius)]">
            <Logo theme="dark" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-sage hover:text-parchment transition-colors duration-150 tracking-wide no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded-[var(--radius-sm)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Give CTA + Mobile hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.GIVE}
              className="hidden md:inline-flex items-center justify-center gap-2 font-semibold text-sm text-ink-deep bg-brass hover:bg-brass-deep rounded-[var(--radius-pill)] px-5 py-2.5 transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass no-underline"
            >
              Give
            </Link>

            <button
              className="md:hidden w-9 h-9 flex items-center justify-center text-sage hover:text-parchment transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded-[var(--radius)]"
              onClick={() => setDrawerOpen((v) => !v)}
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Scrim */}
            <motion.div
              className="fixed inset-0 z-40 bg-ink-deep/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-ink-deep border-l border-[var(--hair-green)] flex flex-col md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.0, 0.0, 0.2, 1.0] }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--hair-green)]">
                <Logo theme="dark" />
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-sage hover:text-parchment transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-col gap-1 p-6" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.3, ease: [0.0, 0.0, 0.2, 1.0] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setDrawerOpen(false)}
                      className="block py-3 px-3 text-base font-medium text-sage hover:text-parchment hover:bg-green-raised rounded-[var(--radius)] transition-all duration-150 no-underline"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer Give CTA */}
              <div className="mt-auto p-6 border-t border-[var(--hair-green)]">
                <Link
                  href={ROUTES.GIVE}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-center gap-2 font-semibold text-ink-deep bg-brass hover:bg-brass-deep rounded-[var(--radius-pill)] px-6 py-3.5 text-base transition-all duration-150 active:scale-[0.98] no-underline w-full"
                >
                  Give to the Foundation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
