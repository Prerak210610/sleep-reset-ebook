"use client";

import { useEffect, useRef } from "react";

/**
 * Custom dot cursor with subtle magnetic attraction to elements with
 * data-magnetic="true" or to standard interactive elements.
 * Disabled on touch devices and when user prefers reduced motion.
 */
export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = matchMedia("(pointer: coarse)").matches;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduceMotion) return;

    document.documentElement.classList.add("custom-cursor-active");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = 0,
      my = 0;
    let dx = 0,
      dy = 0;
    let rx = 0,
      ry = 0;
    let target: HTMLElement | null = null;
    let scale = 1;
    let curScale = 1;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      const t = (e.target as HTMLElement)?.closest(
        '[data-magnetic="true"], a, button, input, select, textarea, [role="button"]'
      ) as HTMLElement | null;
      target = t;
      scale = t ? 1.8 : 1;
    };

    const tick = () => {
      // Magnetic pull
      let tx = mx;
      let ty = my;
      if (target) {
        const r = target.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const ddx = (cx - mx) * 0.18;
        const ddy = (cy - my) * 0.18;
        tx = mx + ddx;
        ty = my + ddy;
      }
      dx += (tx - dx) * 0.35;
      dy += (ty - dy) * 0.35;
      rx += (tx - rx) * 0.12;
      ry += (ty - ry) * 0.12;
      curScale += (scale - curScale) * 0.18;

      dot.style.transform = `translate3d(${dx - 3}px, ${dy - 3}px, 0)`;
      ring.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0) scale(${curScale})`;
      requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    const raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="fixed z-[9999] top-0 left-0 pointer-events-none w-[6px] h-[6px] rounded-full bg-gold mix-blend-difference hidden md:block"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="fixed z-[9999] top-0 left-0 pointer-events-none w-[32px] h-[32px] rounded-full border border-gold/60 mix-blend-difference hidden md:block"
        style={{ transition: "border-color 0.3s ease" }}
      />
    </>
  );
}
