"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  as?: ElementType;
  className?: string;
  children: string;
  stagger?: number; // seconds per word
  delay?: number;
  threshold?: number;
}

export default function WordReveal({
  as: Tag = "h2",
  className,
  children,
  stagger = 0.08,
  delay = 0,
  threshold = 0.2
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
  }, [threshold]);

  const words = children.split(/\s+/);

  return (
    <Tag ref={ref as never} className={cn("word-reveal-root", className)}>
      {words.map((w, i) => (
        <span
          key={i}
          className="word-reveal mr-[0.25em]"
          style={{ transitionDelay: `${delay + i * stagger}s` } as never}
        >
          <span style={{ transitionDelay: `${delay + i * stagger}s` }}>{w}</span>
        </span>
      ))}
    </Tag>
  );
}
