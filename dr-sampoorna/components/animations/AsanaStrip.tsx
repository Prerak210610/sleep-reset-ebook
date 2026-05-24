"use client";

import { useEffect, useRef, useState } from "react";
import { ASANAS } from "@/lib/content";
import StorageImage from "@/components/StorageImage";

export default function AsanaStrip() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);
  const offsetRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let last = performance.now();
    const speed = 40; // px per second

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused) {
        offsetRef.current += speed * dt;
        const half = track.scrollWidth / 2;
        if (offsetRef.current >= half) offsetRef.current -= half;
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused]);

  // Duplicate for seamless loop
  const cards = [...ASANAS, ...ASANAS];

  return (
    <div
      className="relative overflow-hidden py-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={trackRef} className="flex gap-6 will-change-transform">
        {cards.map((a, i) => (
          <div
            key={`${a.name}-${i}`}
            className="group flex-none w-[260px] md:w-[300px] rounded-sm bg-creme-soft dark:bg-forest/50 border border-[var(--line)] overflow-hidden hover:-translate-y-1 transition-transform duration-500"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-creme-warm">
              {a.image ? (
                <StorageImage
                  path={a.image}
                  alt={a.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: "center top" }}
                />
              ) : (
                <div className="absolute inset-0 grain bg-creme-warm flex items-center justify-center">
                  <span className="font-serif text-3xl text-chocolate/40 italic">
                    {a.name.split(" ")[0]}
                  </span>
                </div>
              )}
            </div>
            <div className="p-5">
              <h4 className="text-xl md:text-2xl font-serif">{a.name}</h4>
              <p className="text-[10px] uppercase tracking-widest mt-2 opacity-70 leading-relaxed">
                {a.benefit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
