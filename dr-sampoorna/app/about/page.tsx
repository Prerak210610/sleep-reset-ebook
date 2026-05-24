"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import StorageImage from "@/components/StorageImage";
import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import LineReveal from "@/components/animations/LineReveal";
import StickyImageScroll from "@/components/animations/StickyImageScroll";
import VideoModal from "@/components/VideoModal";
import GoldButton from "@/components/GoldButton";
import { ASSETS } from "@/lib/storage";
import { whatsappLink, WA_MESSAGES } from "@/lib/utils";

export default function AboutPage() {
  const [open, setOpen] = useState<{ src?: string; title?: string } | null>(null);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[80vh] -mt-[106px] pt-[120px] flex items-end text-creme-warm overflow-hidden">
        <div className="absolute inset-0">
          <StorageImage path={ASSETS.hero} alt="Dr. Sampoorna" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-forest-deep/65" />
          <div className="absolute inset-0 grain pointer-events-none" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pb-20 w-full">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
            About Dr. Sampoorna
          </span>
          <WordReveal as="h1" className="font-serif text-display-xl mt-4 leading-[1.04] max-w-5xl">
            22 Years. One Mission. Transforming Lives Through Yogic Science.
          </WordReveal>
        </div>
      </section>

      {/* STORY (extended sticky scroll) */}
      <div className="bg-creme-soft dark:bg-forest-deep">
        <GoldWipe />
        <StickyImageScroll
          kicker="Where It Started"
          heading="A path opened by a single, quiet question."
          slides={[
            { path: ASSETS.founderPortrait, caption: "It began in a small room, with a body that had run out of explanations." },
            { path: ASSETS.founderTeaching, caption: "Every breath taught something the textbooks could not." },
            { path: ASSETS.serviceSession1, caption: "Soon, students became seekers. Seekers became a practice." },
            { path: ASSETS.serviceSession2, caption: "Twenty-two years of clinical work. Five thousand lives." },
            { path: ASSETS.serviceSession3, caption: "And still, every session begins the same way — listening." }
          ]}
        />
      </div>

      {/* PHD & ACADEMIC */}
      <section className="relative py-24 md:py-32 bg-creme dark:bg-chocolate-deep">
        <GoldWipe />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 md:sticky md:top-32 md:self-start">
            <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
              Academic Journey
            </span>
            <h2 className="font-serif text-display-md mt-3">PhD Scholar, Yogic Science</h2>
            <p className="font-accent italic text-sm opacity-80 mt-4">
              Where research and tradition do not contradict — they refine each other.
            </p>
          </div>
          <div className="md:col-span-8 space-y-8">
            <LineReveal className="space-y-6">
              <p className="text-lg leading-prose">
                Dr. Sampoorna's doctoral work in Yogic Science represents two decades of practical
                inquiry brought into formal research. The work bridges classical yogic literature with
                contemporary clinical observation — examining how breath, posture and attention shape
                physiological and psychological outcomes in measurable ways.
              </p>
              <blockquote className="border-l-2 border-gold pl-6 my-10">
                <p className="font-serif text-3xl md:text-4xl leading-tight italic">
                  "The body keeps a record. Yoga is the patient practice of reading that record honestly."
                </p>
                <footer className="mt-4 text-sm uppercase tracking-widest opacity-70 not-italic font-accent">
                  — Dr. Sampoorna
                </footer>
              </blockquote>
              <p className="text-lg leading-prose">
                Beyond the PhD, Dr. Sampoorna holds RYT 500 and RYT 200 certifications from Yoga
                Alliance USA — the international gold standard for yoga teacher accreditation — and is
                recognised by the Government of India and the Ministry of AYUSH for her contribution to
                yogic education and public wellness.
              </p>
            </LineReveal>
          </div>
        </div>
      </section>

      {/* SFY PROTOCOL */}
      <section className="relative py-24 md:py-32 bg-forest text-creme-warm overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7 space-y-6">
            <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
              The SFY Protocol
            </span>
            <WordReveal as="h2" className="font-serif text-display-md leading-[1.05]">
              Sampoorna Fertility Yoga
            </WordReveal>
            <p className="font-accent italic text-lg opacity-90">
              A research-informed framework supporting the fertility journey through breath, posture,
              meditation and lifestyle.
            </p>
            <LineReveal className="space-y-5 text-base leading-prose opacity-90 max-w-2xl">
              <p>
                SFY is not a treatment, not a diagnosis, not a guarantee. It is a structured supportive
                practice — built across 22 years of clinical work with women navigating PCOD, hormonal
                imbalance and the long road of fertility care.
              </p>
              <p>
                The protocol begins with an unhurried assessment: pelvic mobility, breath patterning,
                postural carriage and lifestyle history. From there, a phased plan unfolds — gentle,
                restorative, progressive — and is refined as the body responds.
              </p>
              <p>
                What SFY does not replace: endocrinology, gynaecology or assisted reproductive care.
                What it offers: a steady ground from which to do the rest of the journey with a
                regulated nervous system, restored agency and a practice for life.
              </p>
            </LineReveal>
            <div className="pt-4">
              <GoldButton
                as="a"
                href={whatsappLink(WA_MESSAGES.fertility)}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
              >
                Enquire about SFY
              </GoldButton>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden">
              <div className="absolute -inset-3 border border-gold/40" />
              <StorageImage path={ASSETS.cardFertility} alt="SFY Protocol" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* AYUSH */}
      <section className="relative py-24 md:py-32 bg-creme-soft dark:bg-forest-deep">
        <GoldWipe />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <div className="relative aspect-[4/5] grain bg-creme-warm overflow-hidden">
              <StorageImage path={ASSETS.ayush} alt="Ministry of AYUSH recognition" className="absolute inset-0 w-full h-full object-contain" />
            </div>
          </div>
          <div className="md:col-span-5 space-y-5">
            <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
              Government Recognition
            </span>
            <WordReveal as="h2" className="font-serif text-display-md">
              Featured by the Ministry of AYUSH
            </WordReveal>
            <p className="font-accent italic text-lg opacity-85 leading-relaxed">
              Featured on the official Ayush Mantralaya (Ministry of AYUSH, Govt. of India) calendar
              for Dhyana / Yogic Meditation — December 2019.
            </p>
          </div>
        </div>
      </section>

      {/* ATAL MITHILA */}
      <section className="relative py-24 md:py-32 bg-creme dark:bg-chocolate-deep">
        <GoldWipe />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 space-y-5 order-2 md:order-1">
            <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
              Awarded
            </span>
            <WordReveal as="h2" className="font-serif text-display-md">
              Atal Mithila Samman
            </WordReveal>
            <p className="text-lg leading-prose opacity-90">
              An honour recognising sustained contribution to public wellness and yogic education
              across the Mithila region and beyond.
            </p>
          </div>
          <div className="md:col-span-7 order-1 md:order-2">
            <button
              onClick={() => setOpen({ src: ASSETS.atalMithila, title: "Atal Mithila Samman" })}
              className="group relative aspect-video w-full bg-chocolate-deep grain overflow-hidden"
              data-magnetic="true"
            >
              <StorageImage
                path={ASSETS.thumbAtalMithila}
                alt="Atal Mithila Samman"
                className="absolute inset-0 w-full h-full object-contain bg-chocolate-deep group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="w-16 h-16 rounded-full bg-gold-shine flex items-center justify-center text-chocolate-deep group-hover:scale-110 transition-transform shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  <Play size={24} fill="currentColor" />
                </span>
              </div>
              <span className="absolute top-4 left-4 bg-chocolate-deep/85 text-gold font-accent italic text-[10px] tracking-widest uppercase px-3 py-1">
                Watch the moment
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* RYT CERTIFICATIONS */}
      <section className="relative py-24 md:py-32 bg-creme-soft dark:bg-forest-deep">
        <GoldWipe />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl mb-12">
            <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
              Yoga Alliance USA
            </span>
            <WordReveal as="h2" className="font-serif text-display-lg mt-3">
              International Certifications
            </WordReveal>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <article className="bg-creme dark:bg-forest p-8 border border-[var(--line)]">
              <div className="relative aspect-[4/3] mb-6 grain bg-creme-warm overflow-hidden">
                <StorageImage path={ASSETS.ryt300} alt="RYT 300" className="absolute inset-0 w-full h-full object-contain" />
              </div>
              <h3 className="font-serif text-3xl">RYT 300</h3>
              <p className="text-sm opacity-85 mt-3 leading-prose">
                300-hour Registered Yoga Teacher certification from Yoga Alliance USA — the global
                gold standard in yoga education.
              </p>
            </article>
            <article className="bg-creme dark:bg-forest p-8 border border-[var(--line)]">
              <div className="relative aspect-[4/3] mb-6 grain bg-creme-warm overflow-hidden">
                <StorageImage path={ASSETS.ryt200} alt="RYT 200" className="absolute inset-0 w-full h-full object-contain" />
              </div>
              <h3 className="font-serif text-3xl">RYT 200</h3>
              <p className="text-sm opacity-85 mt-3 leading-prose">
                200-hour foundational Registered Yoga Teacher certification from Yoga Alliance USA.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CORPORATE */}
      <section className="relative py-24 md:py-32 bg-creme dark:bg-chocolate-deep">
        <GoldWipe />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl mb-10">
            <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
              Corporate Partnerships
            </span>
            <WordReveal as="h2" className="font-serif text-display-lg mt-3">
              100+ workshops with India's most demanding teams.
            </WordReveal>
          </div>
          <div className="flex flex-wrap gap-3 mb-10">
            {["Bharat Petroleum", "Indian Oil", "ONGC", "Hindustan Petroleum", "Dell"].map((p) => (
              <span
                key={p}
                className="text-[11px] uppercase tracking-widest font-accent italic px-4 py-1.5 border border-gold/40"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[ASSETS.corporate1, ASSETS.corporate2, ASSETS.corporate3, ASSETS.corporate4, ASSETS.corporate5, ASSETS.corporate6].map(
              (p, i) => (
                <div key={i} className="relative aspect-[4/3] grain bg-creme-warm overflow-hidden">
                  <StorageImage path={p} alt={`Corporate session ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="relative py-24 md:py-32 bg-forest-deep text-creme-warm">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
            Mission
          </span>
          <WordReveal as="h2" className="font-serif text-display-lg mt-4 leading-[1.05]">
            To make therapeutic yoga careful, evidence-informed, and accessible.
          </WordReveal>
          <p className="font-accent italic text-lg opacity-85 mt-8 leading-relaxed">
            For every body that walks in seeking relief, the practice should listen first, prescribe
            slowly, and progress honestly. No grand promises. No shortcuts. Only the steady,
            careful work that 22 years has shown actually changes lives.
          </p>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-12 bg-creme-soft dark:bg-forest-deep border-t border-[var(--line)]">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <p className="font-accent italic text-sm opacity-70 leading-relaxed">
            Yoga and wellness services are supportive practices and are not a substitute for
            professional medical diagnosis, treatment, or emergency care. Always consult your
            physician before beginning any new wellness practice.
          </p>
        </div>
      </section>

      <VideoModal open={!!open} onClose={() => setOpen(null)} path={open?.src} title={open?.title} />
    </>
  );
}
