"use client";

import { useEffect, useState } from "react";
import { Play, BadgeCheck, Star } from "lucide-react";
import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import VideoModal from "@/components/VideoModal";
import StorageImage from "@/components/StorageImage";
import { TESTIMONIALS_VIDEO, TESTIMONIALS_WRITTEN } from "@/lib/content";
import { collection, getDocs } from "firebase/firestore";
import { getFirebase } from "@/lib/firebase";
import { useLang } from "@/stores/lang";
import { isYouTubeUrl, youTubeThumb } from "@/lib/utils";

interface WrittenTestimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  stars: number;
  text: string;
}

export default function Testimonials() {
  const [open, setOpen] = useState<{ src?: string; title?: string } | null>(null);
  const [written, setWritten] = useState<WrittenTestimonial[]>(TESTIMONIALS_WRITTEN);
  const tt = useLang((s) => s.t);

  useEffect(() => {
    // Try to load admin-edited testimonials from Firestore; fall back to defaults.
    (async () => {
      try {
        const { db } = getFirebase();
        const snap = await getDocs(collection(db, "testimonials"));
        if (!snap.empty) {
          setWritten(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<WrittenTestimonial, "id">) })));
        }
      } catch {
        /* keep defaults */
      }
    })();
  }, []);

  return (
    <section className="relative py-24 md:py-32 bg-creme-soft dark:bg-forest-deep">
      <GoldWipe />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-12">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
            Voices
          </span>
          <WordReveal as="h2" className="font-serif text-display-lg mt-3 leading-[1.05]">
            {tt("sec.testimonials.h")}
          </WordReveal>
        </div>

        {/* Video testimonials (YouTube Shorts — vertical) */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {TESTIMONIALS_VIDEO.map((v) => {
            const thumb = isYouTubeUrl(v.src) ? youTubeThumb(v.src) : null;
            return (
              <button
                key={v.id}
                onClick={() => setOpen({ src: v.src, title: `${v.name} — ${v.role}` })}
                className="group relative aspect-[16/10] bg-chocolate-deep grain text-creme-warm overflow-hidden text-left"
                data-magnetic="true"
              >
                {thumb && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumb}
                    alt={v.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-[1.03] transition-transform duration-700"
                    style={{ objectPosition: "center top" }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate-deep/95 via-chocolate-deep/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-16 h-16 rounded-full bg-gold-shine flex items-center justify-center text-chocolate-deep group-hover:scale-110 transition-transform">
                    <Play size={24} fill="currentColor" />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-serif text-2xl">{v.name}</p>
                  <p className="font-accent italic text-sm opacity-80">{v.role}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Auto-scroll carousel of written */}
        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-marquee" style={{ animationDuration: "60s" }}>
            {[...written, ...written].map((t, i) => (
              <article
                key={`${t.id}-${i}`}
                className="flex-none w-[320px] md:w-[380px] bg-creme dark:bg-forest p-7 border border-[var(--line)]"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-creme-warm flex-none">
                    <StorageImage path={t.image} alt={t.name} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center top" }} />
                  </div>
                  <div>
                    <p className="font-serif text-xl leading-tight">{t.name}</p>
                    <p className="text-[11px] uppercase tracking-widest opacity-70">{t.role}</p>
                  </div>
                  <BadgeCheck size={18} className="ml-auto text-gold" />
                </div>
                <div className="flex gap-0.5 mt-4">
                  {Array.from({ length: t.stars }).map((_, idx) => (
                    <Star key={idx} size={14} className="text-gold" fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm leading-prose mt-4 italic font-accent opacity-90">"{t.text}"</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <VideoModal open={!!open} onClose={() => setOpen(null)} path={open?.src} title={open?.title} />
    </section>
  );
}
