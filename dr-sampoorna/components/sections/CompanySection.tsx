"use client";

import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import CardReveal from "@/components/animations/CardReveal";
import StorageImage from "@/components/StorageImage";
import { PARTNERS, MEDIA_OUTLETS, RECOGNITIONS } from "@/lib/content";

/**
 * Two clean, non-scrolling grid sections — one for corporate clients,
 * one for media features. Real logos rendered, never cropped, with a
 * cream tile that gives every logo equal visual weight regardless of
 * aspect ratio.
 */
export default function CompanySection() {
  return (
    <section className="relative bg-creme dark:bg-chocolate-deep">
      {/* Companies I worked with */}
      <div className="relative py-24 md:py-28 border-b border-[var(--line)]">
        <GoldWipe />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
              Trusted by India's Leading Enterprises
            </span>
            <WordReveal as="h2" className="font-serif text-display-md mt-3 leading-[1.1]">
              Companies I've Worked With
            </WordReveal>
            <p className="font-accent italic mt-4 opacity-80">
              100+ corporate workshops delivered across energy, technology and infrastructure.
            </p>
          </div>

          <CardReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {PARTNERS.map((p) => (
              <LogoTile key={p.name} name={p.name} logo={p.logo} />
            ))}
          </CardReveal>
        </div>
      </div>

      {/* Featured On — News Channels */}
      <div className="relative py-24 md:py-28">
        <GoldWipe />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
              Recognised by National Media
            </span>
            <WordReveal as="h2" className="font-serif text-display-md mt-3 leading-[1.1]">
              Featured On
            </WordReveal>
            <p className="font-accent italic mt-4 opacity-80">
              100+ media features over 22 years of practice.
            </p>
          </div>

          <CardReveal className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {MEDIA_OUTLETS.map((m) => (
              <LogoTile key={m.name} name={m.name} logo={m.logo} />
            ))}
          </CardReveal>

          {/* Government & Certifying body — small text strip below */}
          <div className="mt-14 pt-10 border-t border-[var(--line)]">
            <p className="text-center text-[11px] uppercase tracking-widest font-accent italic text-gold mb-5">
              Government Recognition & Certification
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm font-accent italic opacity-80">
              {RECOGNITIONS.map((r, i) => (
                <span key={r.name} className="flex items-center gap-6">
                  {r.name}
                  {i < RECOGNITIONS.length - 1 && <span className="text-gold">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoTile({ name, logo }: { name: string; logo?: string }) {
  return (
    <div
      className="group relative aspect-[3/2] bg-creme-soft dark:bg-forest border border-[var(--line)] rounded-sm overflow-hidden hover:border-gold/60 hover:-translate-y-1 transition-all duration-500 flex items-center justify-center p-6"
      title={name}
    >
      {logo ? (
        <StorageImage
          path={logo}
          alt={name}
          className="max-w-[80%] max-h-[80%] w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <span className="font-serif text-2xl text-center opacity-70">{name}</span>
      )}
    </div>
  );
}
