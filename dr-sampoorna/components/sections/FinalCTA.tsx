"use client";

import GoldButton from "@/components/GoldButton";
import WordReveal from "@/components/animations/WordReveal";
import { whatsappLink, WA_MESSAGES } from "@/lib/utils";
import { useLang } from "@/stores/lang";

export default function FinalCTA() {
  const tt = useLang((s) => s.t);
  return (
    <section className="relative py-24 md:py-32 bg-forest text-creme-warm overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center space-y-8">
        <WordReveal as="h2" className="font-serif text-display-lg leading-[1.05]">
          {tt("sec.cta.h")}
        </WordReveal>
        <p className="font-accent italic text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
          {tt("sec.cta.sub")}
        </p>
        <div className="pt-4">
          <GoldButton
            as="a"
            href={whatsappLink(WA_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            {tt("hero.book")}
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
