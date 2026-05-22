"use client";

import StorageImage from "@/components/StorageImage";
import GoldButton from "@/components/GoldButton";
import WordReveal from "@/components/animations/WordReveal";
import { ASSETS } from "@/lib/storage";
import { useLang } from "@/stores/lang";
import { whatsappLink, WA_MESSAGES } from "@/lib/utils";
import Link from "next/link";

export default function Hero() {
  const tt = useLang((s) => s.t);

  return (
    <section className="relative min-h-[100vh] -mt-[106px] pt-[120px] flex items-center text-creme-warm overflow-hidden">
      {/* BG image with flat overlay (no gradient) */}
      <div className="absolute inset-0">
        <StorageImage
          path={ASSETS.hero}
          alt="Dr. Sampoorna - therapeutic yoga"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-forest-deep/[0.65]" />
        <div className="absolute inset-0 grain pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-8">
          <span className="font-accent italic text-gold tracking-widest text-xs uppercase">
            22 Years · PhD Yogic Science · 5000+ Lives
          </span>

          <WordReveal as="h1" className="font-serif font-light text-display-xl leading-[1.04]">
            {tt("hero.h1")}
          </WordReveal>

          <p className="font-accent italic text-lg md:text-xl max-w-2xl opacity-90">
            {tt("hero.sub")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <GoldButton
              as="a"
              href={whatsappLink(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              {tt("hero.book")}
            </GoldButton>
            <GoldButton as="a" href="/about" variant="ghost" size="lg" className="text-creme-warm">
              {tt("hero.explore")}
            </GoldButton>
          </div>

          <div className="flex items-center gap-5 pt-6 text-[11px] uppercase tracking-widest opacity-80">
            <span>RYT 500</span>
            <span className="text-gold">·</span>
            <span>Ministry of AYUSH</span>
            <span className="text-gold">·</span>
            <span>Govt of India Certified</span>
          </div>
        </div>

        {/* Founder portrait floating */}
        <div className="lg:col-span-5 hidden lg:block relative">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto animate-levitate">
            <div className="absolute -inset-3 border border-gold/40 rounded-sm" />
            <div className="absolute inset-0 overflow-hidden rounded-sm">
              <StorageImage
                path={ASSETS.founderPortrait}
                alt="Dr. Sampoorna portrait"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-creme-warm/70">
        <span className="block w-px h-12 bg-gold" />
        <span className="font-accent italic text-xs tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
}
