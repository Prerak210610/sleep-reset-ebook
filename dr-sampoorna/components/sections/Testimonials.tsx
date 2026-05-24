"use client";

import { useEffect, useState } from "react";
import { Play, BadgeCheck } from "lucide-react";
import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import VideoModal from "@/components/VideoModal";
import StorageImage from "@/components/StorageImage";
import { TESTIMONIALS_VIDEO, TESTIMONIALS_WRITTEN, type WrittenTestimonial } from "@/lib/content";
import { collection, getDocs } from "firebase/firestore";
import { getFirebase } from "@/lib/firebase";
import { useLang } from "@/stores/lang";
import { isYouTubeUrl, youTubeThumb, cn } from "@/lib/utils";

export default function Testimonials() {
  const [open, setOpen] = useState<{ src?: string; title?: string } | null>(null);
  const [zoom, setZoom] = useState<string | null>(null);
  const [written, setWritten] = useState<WrittenTestimonial[]>(TESTIMONIALS_WRITTEN);
  const tt = useLang((s) => s.t);

  useEffect(() => {
    // Try to load admin-edited testimonials from Firestore; fall back to defaults.
    (async () => {
      try {
        const { db } = getFirebase();
        const snap = await getDocs(collection(db, "testimonials"));
        if (!snap.empty) {
          setWritten(
            snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<WrittenTestimonial, "id">) }))
          );
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
            Voices · {written.length} verified reviews
          </span>
          <WordReveal as="h2" className="font-serif text-display-lg mt-3 leading-[1.05]">
            {tt("sec.testimonials.h")}
          </WordReveal>
        </div>

        {/* Video testimonials (YouTube Shorts — vertical) */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
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

        {/* Written testimonials — auto-scroll horizontal carousel of review screenshots */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 animate-marquee will-change-transform"
            style={{ animationDuration: `${Math.max(60, written.length * 4)}s` }}
          >
            {[...written, ...written].map((t, i) => (
              <ReviewCard
                key={`${t.id}-${i}`}
                testimonial={t}
                onZoom={() => setZoom(t.review)}
              />
            ))}
          </div>
        </div>
      </div>

      <VideoModal open={!!open} onClose={() => setOpen(null)} path={open?.src} title={open?.title} />

      {/* Zoom modal for review screenshots */}
      {zoom && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur flex items-center justify-center p-6"
          onClick={() => setZoom(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={zoom}
            alt="Verified review"
            className="max-w-3xl max-h-[90vh] w-full h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setZoom(null)}
            className="absolute top-6 right-6 text-creme-warm hover:text-gold font-accent italic text-sm tracking-widest uppercase"
          >
            Close
          </button>
        </div>
      )}
    </section>
  );
}

/**
 * Single review card. Layout: face avatar (top-left) + review screenshot.
 * If face is null, render a colored circle with the initial letter.
 */
function ReviewCard({
  testimonial: t,
  onZoom
}: {
  testimonial: WrittenTestimonial;
  onZoom: () => void;
}) {
  return (
    <article className="group flex-none w-[280px] md:w-[320px] bg-creme dark:bg-forest border border-[var(--line)] overflow-hidden hover:-translate-y-1 transition-transform duration-500">
      {/* Header — avatar + verified badge */}
      <div className="flex items-center gap-3 p-4 border-b border-[var(--line)]">
        <Avatar face={t.face} initial={t.initial} />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-widest font-accent italic text-gold">
            Verified Review
          </p>
          <p className="text-[11px] uppercase tracking-widest opacity-60 mt-0.5">
            5 stars · Google
          </p>
        </div>
        <BadgeCheck size={18} className="text-gold flex-none" />
      </div>

      {/* Review screenshot — clickable to zoom */}
      <button
        onClick={onZoom}
        className="block w-full bg-creme-warm relative overflow-hidden"
        data-magnetic="true"
        aria-label="View full review"
      >
        <StorageImage
          path={t.review}
          alt="Verified review"
          className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-700"
        />
      </button>
    </article>
  );
}

/** Avatar — face photo, OR a colored circle with initial letter when no face exists */
function Avatar({ face, initial }: { face: string | null; initial?: string }) {
  if (face) {
    return (
      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-creme-warm flex-none">
        <StorageImage
          path={face}
          alt="Reviewer"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center top" }}
        />
      </div>
    );
  }

  // Initial-letter fallback — chocolate-on-cream-warm with subtle gold ring
  const letter = (initial || "?").toUpperCase();
  // Mild deterministic hue based on letter so cards aren't identical
  const hueFromLetter = (letter.charCodeAt(0) * 31) % 360;
  return (
    <div
      className={cn(
        "relative w-12 h-12 rounded-full flex items-center justify-center flex-none",
        "border border-gold/40"
      )}
      style={{
        background: `linear-gradient(135deg, hsl(${hueFromLetter}, 55%, 78%), hsl(${(hueFromLetter + 40) % 360}, 60%, 65%))`
      }}
    >
      <span className="font-serif text-2xl text-chocolate-deep">{letter}</span>
    </div>
  );
}
