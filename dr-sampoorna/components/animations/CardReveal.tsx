"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps children. Each direct child gets a scale(0.92)+opacity(0) -> scale(1)+opacity(1)
 * reveal as it enters the viewport, with a small per-item stagger.
 */
export default function CardReveal({
  children,
  className,
  stagger = 0.08
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.children) as HTMLElement[];
    items.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "scale(0.92)";
      el.style.transition = `opacity 0.7s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)`;
      el.style.transitionDelay = `${i * stagger}s`;
    });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "scale(1)";
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [stagger]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
