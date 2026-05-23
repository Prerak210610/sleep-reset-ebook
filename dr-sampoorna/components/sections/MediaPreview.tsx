"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import CardReveal from "@/components/animations/CardReveal";
import VideoModal from "@/components/VideoModal";
import { NEWS_VIDEOS, MEDIA_OUTLETS, PARTNERS } from "@/lib/content";
import Link from "next/link";
import { useLang } from "@/stores/lang";
import { isYouTubeUrl, youTubeThumb } from "@/lib/utils";

export default function MediaPreview() {
  const [open, setOpen] = useState<{ src?: string; title?: string } | null>(null);
  const tt = useLang((s) => s.t);

  const featured = NEWS_VIDEOS.slice(0, 3);

  return (
    <section className="relative py-24 md:py-32 bg-creme-soft dark:bg-chocolate-deep">
      <GoldWipe />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-12">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">Media</span>
          <WordReveal as="h2" className="font-serif text-display-lg mt-3">
            {tt("sec.media.h")}
          </WordReveal>
        </div>

        {/* Outlet badges */}
        <div className="flex flex-wrap gap-3 mb-12">
          {[...MEDIA_OUTLETS, ...PARTNERS].map((o) => (
            <span
              key={o.name}
              className="text-[11px] uppercase tracking-widest font-accent italic px-4 py-1.5 border border-gold/40 text-current"
            >
              {o.name}
            </span>
          ))}
        </div>

        <CardReveal className="grid md:grid-cols-3 gap-6">
          {featured.map((v) => {
            const thumb = isYouTubeUrl(v.src) ? youTubeThumb(v.src) : null;
            return (
              <button
                key={v.id}
                onClick={() => setOpen({ src: v.src, title: v.title })}
                className="group text-left bg-chocolate-deep text-creme-warm relative overflow-hidden hover:-translate-y-1 transition-transform"
                data-magnetic="true"
              >
                <div className="relative aspect-video bg-chocolate-deep grain overflow-hidden">
                  {thumb && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb}
                      alt={v.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:scale-[1.03] transition-transform duration-700"
                      style={{ objectPosition: "center top" }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate-deep/80 via-chocolate-deep/20 to-chocolate-deep/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full bg-gold-shine flex items-center justify-center text-chocolate-deep group-hover:scale-110 transition-transform">
                      <Play size={20} fill="currentColor" />
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 bg-chocolate-deep/85 text-gold font-accent italic text-[11px] tracking-widest uppercase px-3 py-1">
                    {v.channel}
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-serif text-2xl">{v.title}</p>
                  <p className="text-[11px] uppercase tracking-widest mt-2 opacity-70">Watch Now</p>
                </div>
              </button>
            );
          })}
        </CardReveal>

        <Link
          href="/media"
          className="mt-12 inline-flex items-center gap-3 font-accent italic text-gold tracking-wide hover:gap-5 transition-all"
          data-magnetic="true"
        >
          {tt("sec.media.cta")} <span aria-hidden>→</span>
        </Link>
      </div>

      <VideoModal open={!!open} onClose={() => setOpen(null)} path={open?.src} title={open?.title} />
    </section>
  );
}
