"use client";

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  type AnchorHTMLAttributes,
} from "react";
import { cn } from "@shared/helpers/cn";
import { Loader2 } from "@icons";

interface ButtonBaseProps {
  readonly variant?: "primary" | "secondary" | "ghost-green" | "ghost" | "destructive";
  readonly size?: "sm" | "md" | "lg";
  readonly isLoading?: boolean;
  readonly children: ReactNode;
  readonly className?: string;
  readonly asChild?: boolean;
}

type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

type AnchorProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    readonly href?: string;
  };

const variantClasses: Record<
  NonNullable<ButtonBaseProps["variant"]>,
  string
> = {
  primary:
    "bg-brass text-ink-deep font-semibold rounded-[var(--radius-pill)] hover:bg-brass-deep active:scale-[0.98] border-0 focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2",
  secondary:
    "bg-transparent text-ink border border-[var(--hair-strong)] rounded-[var(--radius)] hover:bg-parchment-deep active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ink-4 focus-visible:ring-offset-2",
  "ghost-green":
    "bg-transparent text-sage border border-[var(--hair-green-strong)] rounded-[var(--radius)] hover:bg-[var(--green-raised)] hover:text-parchment active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-[var(--green-canvas)]",
  ghost:
    "bg-transparent text-ink-3 rounded-[var(--radius)] hover:text-ink hover:bg-parchment-warm active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ink-4 focus-visible:ring-offset-2",
  destructive:
    "bg-transparent text-crit border border-[var(--crit)] rounded-[var(--radius)] hover:bg-[#FDF1F0] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-crit focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed",
};

const sizeClasses: Record<NonNullable<ButtonBaseProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

function getClassNames(
  variant: ButtonBaseProps["variant"] = "primary",
  size: ButtonBaseProps["size"] = "md",
  className?: string
): string {
  return cn(
    "inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-150 cursor-pointer outline-none select-none no-underline",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      className,
      asChild: _asChild,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled ?? isLoading}
        aria-busy={isLoading}
        className={getClassNames(variant, size, className)}
        {...rest}
      >
        {isLoading && (
          <Loader2
            size={16}
            aria-hidden="true"
            className="animate-spin flex-shrink-0"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Link-style button for use with Next.js Link
export const ButtonLink = forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      className,
      asChild: _asChild,
      isLoading: _isLoading,
      ...rest
    },
    ref
  ) => {
    return (
      <a
        ref={ref}
        className={getClassNames(variant, size, className)}
        {...rest}
      >
        {children}
      </a>
    );
  }
);

ButtonLink.displayName = "ButtonLink";
