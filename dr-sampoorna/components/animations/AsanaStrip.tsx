"use client";

import { useEffect, useRef, useState } from "react";
import { ASANAS } from "@/lib/content";
import { ASSETS } from "@/lib/storage";
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

  const cards = [...ASANAS, ...ASANAS]; // duplicate for seamless loop

  return (
    <div
      className="relative overflow-hidden py-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={trackRef} className="flex gap-6 will-change-transform">
        {cards.map((a, i) => {
          const idx = (i % ASANAS.length) + 1;
          return (
            <div
              key={`${a.name}-${i}`}
              className="group flex-none w-[260px] md:w-[300px] rounded-sm bg-creme-soft dark:bg-forest/50 border border-[var(--line)] overflow-hidden hover:-translate-y-1 transition-transform duration-500"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-creme-warm">
                <StorageImage
                  path={ASSETS.asana(idx)}
                  alt={a.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h4 className="text-2xl font-serif">{a.name}</h4>
                <p className="text-xs uppercase tracking-widest mt-2 opacity-70">{a.benefit}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
