"use client";

import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import LineReveal from "@/components/animations/LineReveal";
import { type ReactNode } from "react";

export default function PolicyLayout({
  kicker,
  title,
  updated,
  children
}: {
  kicker: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="relative -mt-[106px] pt-[140px] pb-16 bg-forest-deep text-creme-warm overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-10">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">{kicker}</span>
          <WordReveal as="h1" className="font-serif text-display-lg mt-4">
            {title}
          </WordReveal>
          <p className="text-xs uppercase tracking-widest opacity-70 mt-6">Last updated: {updated}</p>
        </div>
      </section>
      <GoldWipe />
      <section className="bg-creme dark:bg-chocolate-deep py-16">
        <LineReveal className="max-w-3xl mx-auto px-6 md:px-10 space-y-8 text-base leading-prose">
          {children}
        </LineReveal>
      </section>
    </>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="font-serif text-3xl md:text-4xl mt-10">{children}</h2>;
}
