"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

export default function GoldWipe({ className }: { className?: string }) {
  const ref = useScrollReveal<HTMLSpanElement>(0.3);
  return <span ref={ref} className={cn("gold-wipe", className)} aria-hidden />;
}
