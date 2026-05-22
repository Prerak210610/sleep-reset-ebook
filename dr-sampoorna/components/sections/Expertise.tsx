"use client";

import CardReveal from "@/components/animations/CardReveal";
import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import { EXPERTISE } from "@/lib/content";

export default function Expertise() {
  // Asymmetric: top row 2 cards, bottom row 3 cards (desktop)
  const top = EXPERTISE.slice(0, 2);
  const bottom = EXPERTISE.slice(2);

  return (
    <section className="relative py-24 md:py-32 bg-creme-soft dark:bg-forest-deep">
      <GoldWipe />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-16">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
            Areas of Expertise
          </span>
          <WordReveal as="h2" className="font-serif text-display-lg mt-4 leading-[1.05]">
            A practice that holds the whole human.
          </WordReveal>
        </div>

        <CardReveal className="grid md:grid-cols-2 gap-6 mb-6">
          {top.map((c, i) => (
            <Card key={i} index={i + 1} {...c} large />
          ))}
        </CardReveal>

        <CardReveal className="grid md:grid-cols-3 gap-6">
          {bottom.map((c, i) => (
            <Card key={i + top.length} index={i + top.length + 1} {...c} />
          ))}
        </CardReveal>
      </div>
    </section>
  );
}

function Card({
  index,
  title,
  items,
  large = false
}: {
  index: number;
  title: string;
  items: string[];
  large?: boolean;
}) {
  return (
    <div
      className={`relative group bg-forest dark:bg-forest-deep text-creme-warm p-8 md:p-10 border-t-2 border-gold/80 hover:-translate-y-1 transition-transform duration-500 ${
        large ? "min-h-[280px]" : "min-h-[240px]"
      }`}
    >
      <div className="absolute inset-0 grain opacity-50 pointer-events-none" />
      <div className="relative">
        <span className="font-accent italic text-gold/70 text-xs tracking-widest">
          0{index}
        </span>
        <h3 className={`font-serif mt-3 ${large ? "text-4xl md:text-5xl" : "text-3xl"}`}>
          {title}
        </h3>
        <ul className="mt-6 space-y-2 text-sm opacity-85">
          {items.map((it) => (
            <li key={it} className="flex items-baseline gap-3">
              <span className="text-gold text-[10px]">◆</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
