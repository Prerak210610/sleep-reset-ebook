"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  stagger?: number;
  threshold?: number;
  children: ReactNode;
}

export default function LineReveal({ className, stagger = 0.12, threshold = 0.15, children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Apply stagger to direct children
    Array.from(el.children).forEach((child, i) => {
      (child as HTMLElement).style.transitionDelay = `${i * stagger}s`;
    });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            obs.unobserve(el);
          }
        });
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [stagger, threshold]);

  return (
    <div ref={ref} className={cn("line-reveal", className)}>
      {children}
    </div>
  );
}
