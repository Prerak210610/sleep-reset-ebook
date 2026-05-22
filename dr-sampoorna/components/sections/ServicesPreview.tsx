"use client";

import CardReveal from "@/components/animations/CardReveal";
import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import StorageImage from "@/components/StorageImage";
import GoldButton from "@/components/GoldButton";
import { SERVICES } from "@/lib/content";
import { whatsappLink } from "@/lib/utils";
import { useLang } from "@/stores/lang";

export default function ServicesPreview() {
  const tt = useLang((s) => s.t);

  return (
    <section className="relative py-24 md:py-32 bg-creme dark:bg-chocolate-deep">
      <GoldWipe />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-16">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
            Services
          </span>
          <WordReveal as="h2" className="font-serif text-display-lg mt-3 leading-[1.05]">
            {tt("sec.services.h")}
          </WordReveal>
        </div>

        <CardReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <article
              key={s.key}
              className="group flex flex-col bg-creme-soft dark:bg-forest border border-[var(--line)] hover:-translate-y-1 transition-transform duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <StorageImage
                  path={s.image}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-chocolate-deep/80 text-creme-warm font-accent italic text-[11px] uppercase tracking-widest px-3 py-1">
                  {s.format}
                </span>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <h3 className="font-serif text-3xl">{s.title}</h3>
                <p className="font-accent italic text-sm opacity-80 mt-1">{s.tagline}</p>
                <ul className="mt-5 space-y-1.5 text-sm opacity-85">
                  {s.includes.slice(0, 4).map((p) => (
                    <li key={p} className="flex items-baseline gap-2">
                      <span className="text-gold text-[9px]">◆</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-7 pt-5 border-t border-[var(--line)]">
                  <span className="font-serif text-xl text-gold-shine">{s.price}</span>
                  <GoldButton
                    as="a"
                    href={whatsappLink(s.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="md"
                  >
                    Enquire
                  </GoldButton>
                </div>
              </div>
            </article>
          ))}
        </CardReveal>
      </div>
    </section>
  );
}
