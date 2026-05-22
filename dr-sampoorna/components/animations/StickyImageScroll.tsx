"use client";

import { useEffect, useRef } from "react";
import StorageImage from "@/components/StorageImage";

interface Slide {
  path: string;
  caption: string;
  alt?: string;
}

interface Props {
  heading: string;
  kicker?: string;
  slides: Slide[];
}

export default function StickyImageScroll({ heading, kicker, slides }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add("is-in");
        });
      },
      { threshold: 0.4 }
    );
    slideRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10">
        {/* Sticky left */}
        <div className="md:sticky md:top-32 md:h-[60vh] flex flex-col justify-center">
          {kicker && (
            <span className="font-accent text-gold uppercase tracking-widest text-xs mb-5 block">
              {kicker}
            </span>
          )}
          <h2 className="text-display-lg font-serif font-light leading-[1.05]">{heading}</h2>
          <span className="gold-wipe is-in mt-8 max-w-[80px]" aria-hidden />
        </div>

        {/* Scrolling right */}
        <div className="space-y-32 md:space-y-48 pt-10 md:pt-32">
          {slides.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className="line-reveal"
            >
              <div className="aspect-[4/5] relative overflow-hidden rounded-sm bg-creme-warm grain">
                <StorageImage
                  path={s.path}
                  alt={s.alt ?? s.caption}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <p className="mt-6 font-accent italic text-lg md:text-xl text-[var(--muted)]">
                {s.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
