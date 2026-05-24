"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import StorageImage from "@/components/StorageImage";
import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import VideoModal from "@/components/VideoModal";
import Lightbox from "@/components/Lightbox";
import CardReveal from "@/components/animations/CardReveal";
import { ASSETS } from "@/lib/storage";
import { NEWS_VIDEOS, WELLNESS_SERIES } from "@/lib/content";
import { cn } from "@/lib/utils";

type Tab = "news" | "series" | "photos";

const SESSION_PHOTOS = [ASSETS.serviceSession1, ASSETS.serviceSession2, ASSETS.serviceSession3, ASSETS.serviceSession4];
const CORPORATE_PHOTOS = [ASSETS.corporate1, ASSETS.corporate2, ASSETS.corporate3, ASSETS.corporate4, ASSETS.corporate5, ASSETS.corporate6];
const PROFESSIONAL = [ASSETS.professional1, ASSETS.professional2, ASSETS.professional3];
const CERTS = [
  { path: ASSETS.ayush, label: "Ministry of AYUSH — Dec 2019" },
  { path: ASSETS.ryt300, label: "RYT 300 · Yoga Alliance USA" },
  { path: ASSETS.ryt200, label: "RYT 200 · Yoga Alliance USA" }
];

export default function MediaPage() {
  const [tab, setTab] = useState<Tab>("news");
  const [video, setVideo] = useState<{ src?: string; title?: string } | null>(null);
  const [lightbox, setLightbox] = useState<{ paths: string[]; idx: number } | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative -mt-[106px] pt-[160px] pb-20 text-creme-warm overflow-hidden">
        <div className="absolute inset-0">
          <StorageImage path={ASSETS.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-forest-deep/70" />
          <div className="absolute inset-0 grain pointer-events-none" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">Media</span>
          <WordReveal as="h1" className="font-serif text-display-xl mt-4 max-w-4xl leading-[1.05]">
            Recognized Across Platforms
          </WordReveal>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-[106px] z-30 bg-creme-soft/95 dark:bg-forest-deep/95 backdrop-blur border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex gap-3 md:gap-8 py-4 overflow-x-auto no-scrollbar">
          {(
            [
              ["news", "News Coverage"],
              ["series", "India TV Wellness Series"],
              ["photos", "Photos & Recognition"]
            ] as [Tab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              data-magnetic="true"
              className={cn(
                "text-[12px] uppercase tracking-widest font-accent italic px-1 py-2 whitespace-nowrap border-b-2 transition",
                tab === id ? "border-gold text-gold" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: NEWS */}
      {tab === "news" && (
        <section className="relative py-16 md:py-24 bg-creme-soft dark:bg-forest-deep">
          <GoldWipe />
          <div className="relative max-w-7xl mx-auto px-6 md:px-10">
            <CardReveal className="grid md:grid-cols-2 gap-6">
              {NEWS_VIDEOS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVideo({ src: v.src, title: `${v.channel} — ${v.title}` })}
                  className="group relative aspect-video bg-chocolate-deep grain text-creme-warm overflow-hidden text-left"
                  data-magnetic="true"
                >
                  {v.poster && (
                    <StorageImage
                      path={v.poster}
                      alt={v.title}
                      className="absolute inset-0 w-full h-full object-contain bg-chocolate-deep group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate-deep/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="w-16 h-16 rounded-full bg-gold-shine flex items-center justify-center text-chocolate-deep group-hover:scale-110 transition-transform shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                      <Play size={24} fill="currentColor" />
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 bg-chocolate-deep/85 text-gold font-accent italic text-[11px] tracking-widest uppercase px-3 py-1">
                    {v.channel}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-chocolate-deep/95 to-transparent pointer-events-none">
                    <p className="font-serif text-2xl">{v.title}</p>
                  </div>
                </button>
              ))}
            </CardReveal>
          </div>
        </section>
      )}

      {/* TAB 2: SERIES */}
      {tab === "series" && (
        <section className="relative py-16 md:py-24 bg-creme dark:bg-chocolate-deep">
          <GoldWipe />
          <div className="relative max-w-7xl mx-auto px-6 md:px-10">
            <CardReveal className="grid md:grid-cols-3 gap-6">
              {WELLNESS_SERIES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVideo({ src: v.src, title: v.title })}
                  className="group relative bg-creme-soft dark:bg-forest border border-[var(--line)] hover:-translate-y-1 transition-transform text-left"
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
                  </div>
                </button>
              ))}
            </CardReveal>
          </div>
        </section>
      )}

      {/* TAB 3: PHOTOS */}
      {tab === "photos" && (
        <div className="bg-creme-soft dark:bg-forest-deep">
          <PhotoBlock
            kicker="Professional Portraits"
            title="Studio Portraits"
            paths={PROFESSIONAL}
            onOpen={(idx) => setLightbox({ paths: PROFESSIONAL, idx })}
            aspect="aspect-[3/4]"
          />
          <PhotoBlock
            kicker="Sessions"
            title="Live Sessions"
            paths={SESSION_PHOTOS}
            onOpen={(idx) => setLightbox({ paths: SESSION_PHOTOS, idx })}
            aspect="aspect-[4/3]"
          />
          <PhotoBlock
            kicker="Corporate"
            title="Corporate Sessions"
            paths={CORPORATE_PHOTOS}
            onOpen={(idx) => setLightbox({ paths: CORPORATE_PHOTOS, idx })}
            aspect="aspect-[4/3]"
          />

          {/* Certificates */}
          <section className="relative py-16 md:py-24 bg-creme dark:bg-chocolate-deep">
            <GoldWipe />
            <div className="relative max-w-7xl mx-auto px-6 md:px-10">
              <div className="max-w-3xl mb-10">
                <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
                  Certificates & Awards
                </span>
                <WordReveal as="h2" className="font-serif text-display-md mt-3">
                  Recognised. Certified. Honoured.
                </WordReveal>
              </div>
              <CardReveal className="grid md:grid-cols-3 gap-6">
                {CERTS.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox({ paths: CERTS.map((x) => x.path), idx: i })}
                    className="group bg-creme-soft dark:bg-forest border border-[var(--line)] hover:-translate-y-1 transition-transform text-left"
                    data-magnetic="true"
                  >
                    <div className="relative aspect-[4/3] grain bg-creme-warm overflow-hidden">
                      <StorageImage path={c.path} alt={c.label} className="absolute inset-0 w-full h-full object-contain" />
                    </div>
                    <p className="p-5 font-serif text-lg">{c.label}</p>
                  </button>
                ))}
                <button
                  onClick={() => setVideo({ src: ASSETS.atalMithila, title: "Atal Mithila Samman" })}
                  className="group bg-chocolate-deep text-creme-warm relative overflow-hidden text-left hover:-translate-y-1 transition-transform"
                  data-magnetic="true"
                >
                  <div className="relative aspect-[4/3] grain bg-chocolate-deep overflow-hidden">
                    <StorageImage
                      path={ASSETS.thumbAtalMithila}
                      alt="Atal Mithila Samman"
                      className="absolute inset-0 w-full h-full object-contain bg-chocolate-deep"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="w-14 h-14 rounded-full bg-gold-shine flex items-center justify-center text-chocolate-deep shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                        <Play size={20} fill="currentColor" />
                      </span>
                    </div>
                  </div>
                  <p className="p-5 font-serif text-lg">Atal Mithila Samman · Watch</p>
                </button>
              </CardReveal>
            </div>
          </section>
        </div>
      )}

      <VideoModal open={!!video} onClose={() => setVideo(null)} path={video?.src} title={video?.title} />
      <Lightbox
        paths={lightbox?.paths ?? []}
        index={lightbox?.idx ?? null}
        onClose={() => setLightbox(null)}
        onIndex={(i) => setLightbox((s) => (s ? { ...s, idx: i } : s))}
      />
    </>
  );
}

function PhotoBlock({
  kicker,
  title,
  paths,
  aspect,
  onOpen
}: {
  kicker: string;
  title: string;
  paths: string[];
  aspect: string;
  onOpen: (idx: number) => void;
}) {
  return (
    <section className="relative py-16 md:py-20">
      <GoldWipe />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-8">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">{kicker}</span>
          <h2 className="font-serif text-3xl md:text-5xl mt-2">{title}</h2>
        </div>
        <CardReveal className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {paths.map((p, i) => (
            <button
              key={i}
              onClick={() => onOpen(i)}
              className={cn("group relative grain bg-creme-warm overflow-hidden", aspect)}
              data-magnetic="true"
            >
              <StorageImage path={p} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </button>
          ))}
        </CardReveal>
      </div>
    </section>
  );
}
