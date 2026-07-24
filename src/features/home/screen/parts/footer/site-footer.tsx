import Link from "next/link";
import { Logo } from "@ui/components/logo/logo";
import { ROUTES } from "@shared/constants/routes";

const foundationLinks = [
  { label: "About the Foundation", href: "#foundation" },
  { label: "Four Focus Areas", href: "#foundation" },
  { label: "GROWTHLAB 2.0", href: "#foundation" },
  { label: "Inaugural Couples' Conference", href: "#foundation" },
];

const actionLinks = [
  { label: "Give to the Foundation", href: ROUTES.GIVE },
  { label: "Add your tribute", href: ROUTES.TRIBUTES },
  { label: "Partnership", href: ROUTES.PARTNERSHIP },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink-deep border-t border-[var(--hair-green)]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-16">
        {/* Three-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand column */}
          <div>
            <Logo theme="dark" className="mb-5" />
            <p className="text-sm text-ink-3 leading-relaxed max-w-[34ch]">
              In loving memory and living legacy of Baba and Mama GOMAL.
              A register that never closed.
            </p>
          </div>

          {/* Foundation links */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-ink-4 mb-4">
              The Foundation
            </p>
            <ul className="flex flex-col gap-3">
              {foundationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-3 hover:text-parchment transition-colors duration-150 no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Give + contact */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-ink-4 mb-4">
              Get Involved
            </p>
            <ul className="flex flex-col gap-3 mb-6">
              {actionLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-3 hover:text-parchment transition-colors duration-150 no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={ROUTES.GIVE}
              className="inline-flex items-center justify-center font-semibold text-sm text-ink-deep bg-brass hover:bg-brass-deep rounded-[var(--radius-pill)] px-5 py-2.5 transition-all duration-150 no-underline"
            >
              Give to the Foundation
            </Link>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="border-t border-[var(--hair-green)] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[12px] text-ink-4">
            &copy; {new Date().getFullYear()} The GOMAL Foundation · Ogbomoso, Oyo State, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
