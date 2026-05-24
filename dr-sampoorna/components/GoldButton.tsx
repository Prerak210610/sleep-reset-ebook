"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  variant?: "fill" | "ghost";
  size?: "md" | "lg";
}

type Props =
  | (BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button"; href?: never })
  | (BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string });

const GoldButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(function GoldButton(
  { variant = "fill", size = "md", className, children, ...props }: Props,
  ref
) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-accent italic tracking-wide transition-all duration-300 will-change-transform";
  const sizes = {
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };
  const variants = {
    fill:
      "bg-gold-shine text-chocolate-deep hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(200,137,42,0.35)] [background-position:0%_50%] hover:[background-position:100%_50%] [transition:background-position_900ms_ease,transform_300ms_ease,box-shadow_400ms_ease]",
    ghost:
      "border border-current text-current hover:bg-current/5 hover:scale-[1.02]"
  };

  if ((props as { as?: string }).as === "a") {
    const { href, ...rest } = props as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <a
        ref={ref as never}
        href={href}
        data-magnetic="true"
        className={cn(base, sizes[size], variants[variant], className)}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as never}
      data-magnetic="true"
      className={cn(base, sizes[size], variants[variant], className)}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});

export default GoldButton;
