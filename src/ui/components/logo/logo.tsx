"use client";

import { cn } from "@shared/helpers/cn";

interface LogoProps {
  readonly variant?: "full" | "mark-only";
  readonly theme?: "dark" | "light";
  readonly className?: string;
}

export function Logo({
  variant = "full",
  theme = "dark",
  className,
}: LogoProps) {
  const nameColor =
    theme === "dark" ? "text-parchment" : "text-ink";
  const subColor =
    theme === "dark" ? "text-sage" : "text-ink-3";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Monogram mark */}
      <div
        className={cn(
          "flex-shrink-0 w-9 h-9 rounded-[var(--radius)] border flex items-center justify-center",
          theme === "dark"
            ? "border-[var(--hair-green)] bg-[var(--green-raised)]"
            : "border-[var(--hair-strong)] bg-[var(--parchment-sheet)]"
        )}
      >
        <span
          className="font-serif text-brass text-sm font-semibold leading-none"
          style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0" }}
        >
          GF
        </span>
      </div>

      {variant === "full" && (
        <div className="flex flex-col gap-0">
          <span
            className={cn(
              "font-serif text-sm font-semibold leading-tight tracking-tight",
              nameColor
            )}
            style={{ fontVariationSettings: "'SOFT' 40, 'WONK' 0" }}
          >
            The GOMAL Foundation
          </span>
          <span className={cn("text-[10px] tracking-[0.12em] uppercase", subColor)}>
            Baba &amp; Mama GOMAL
          </span>
        </div>
      )}
    </div>
  );
}
