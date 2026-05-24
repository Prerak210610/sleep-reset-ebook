"use client";

import AsanaStrip from "@/components/animations/AsanaStrip";
import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import { useLang } from "@/stores/lang";

export default function AsanaSection() {
  const tt = useLang((s) => s.t);
  return (
    <section className="relative py-20 md:py-28 bg-creme-soft dark:bg-forest-deep overflow-hidden">
      <GoldWipe />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 mb-12">
        <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
          The Practice
        </span>
        <WordReveal as="h2" className="font-serif text-display-lg mt-3 max-w-3xl">
          {tt("sec.asana.h")}
        </WordReveal>
        <p className="font-accent italic text-lg mt-3 opacity-80">{tt("sec.asana.s")}</p>
      </div>
      <AsanaStrip />
    </section>
  );
}
