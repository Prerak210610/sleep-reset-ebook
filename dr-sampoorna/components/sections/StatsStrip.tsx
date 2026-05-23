"use client";

import CounterUp from "@/components/animations/CounterUp";
import LogoMarquee from "@/components/animations/LogoMarquee";
import { STATS, PARTNERS, MEDIA_OUTLETS, RECOGNITIONS } from "@/lib/content";
import { useLang } from "@/stores/lang";

export default function StatsStrip() {
  const tt = useLang((s) => s.t);

  // Two interleaved sets so each row reads differently
  const rowA = [...PARTNERS, ...RECOGNITIONS];
  const rowB = [...MEDIA_OUTLETS, ...PARTNERS];

  return (
    <section className="relative bg-chocolate-deep text-creme-warm py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="text-center md:border-r md:border-gold/15 md:last:border-r-0 px-2"
            >
              <p className="font-serif text-5xl md:text-6xl text-gold-shine tracking-tight">
                <CounterUp
                  value={s.value}
                  suffix={s.suffix ?? ""}
                  display={(s as { display?: string }).display}
                />
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-widest opacity-80 font-accent italic">
                {tt(s.labelKey)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee strip — real partner logos */}
      <div className="relative mt-14 border-y border-gold/15 py-5">
        <LogoMarquee items={rowA} speed={55} />
      </div>
      <div className="relative mt-px py-5 border-b border-gold/15">
        <LogoMarquee items={rowB} reverse speed={60} />
      </div>
    </section>
  );
}
