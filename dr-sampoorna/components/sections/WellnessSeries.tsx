"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import CardReveal from "@/components/animations/CardReveal";
import VideoModal from "@/components/VideoModal";
import StorageImage from "@/components/StorageImage";
import { WELLNESS_SERIES } from "@/lib/content";
import { useLang } from "@/stores/lang";

export default function WellnessSeries() {
  const [open, setOpen] = useState<{ src?: string; title?: string } | null>(null);
  const tt = useLang((s) => s.t);

  return (
    <section className="relative py-24 md:py-32 bg-creme dark:bg-chocolate-deep">
      <GoldWipe />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-12">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
            India TV Wellness Series
          </span>
          <WordReveal as="h2" className="font-serif text-display-lg mt-3 leading-[1.05]">
            {tt("sec.wellness.h")}
          </WordReveal>
        </div>

        <CardReveal className="grid md:grid-cols-3 gap-6">
          {WELLNESS_SERIES.map((v) => (
            <button
              key={v.id}
              onClick={() => setOpen({ src: v.src, title: v.title })}
              className="text-left group relative bg-creme-soft dark:bg-chocolate border border-[var(--line)] hover:-translate-y-1 transition-transform"
              data-magnetic="true"
            >
              <div className="relative aspect-video bg-chocolate-deep grain overflow-hidden">
                {v.poster && (
                  <StorageImage
                    path={v.poster}
                    alt={v.title}
                    className="absolute inset-0 w-full h-full object-contain bg-chocolate-deep group-hover:scale-[1.03] transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="w-12 h-12 rounded-full bg-gold-shine flex items-center justify-center text-chocolate-deep shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                    <Play size={16} fill="currentColor" />
                  </span>
                </div>
                <span className="absolute top-3 left-3 bg-chocolate-deep/85 text-gold font-accent italic text-[10px] tracking-widest uppercase px-2.5 py-1">
                  {v.topic}
                </span>
              </div>
              <div className="p-5">
                <p className="font-serif text-xl leading-tight">{v.title}</p>
                <p className="text-[10px] uppercase tracking-widest mt-3 opacity-70">Watch Now</p>
              </div>
            </button>
          ))}
        </CardReveal>
      </div>

      <VideoModal open={!!open} onClose={() => setOpen(null)} path={open?.src} title={open?.title} />
    </section>
  );
}
