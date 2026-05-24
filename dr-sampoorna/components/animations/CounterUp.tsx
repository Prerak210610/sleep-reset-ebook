"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  display?: string; // override numeric output (e.g. "PhD")
  className?: string;
}

export default function CounterUp({
  value,
  duration = 1800,
  prefix = "",
  suffix = "",
  display,
  className
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (display) return; // non-numeric
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !done) {
            const start = performance.now();
            const animate = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
              setShown(Math.round(eased * value));
              if (t < 1) requestAnimationFrame(animate);
              else setDone(true);
            };
            requestAnimationFrame(animate);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration, display, done]);

  return (
    <span ref={ref} className={className}>
      {display ? display : `${prefix}${shown.toLocaleString("en-IN")}${suffix}`}
    </span>
  );
}
