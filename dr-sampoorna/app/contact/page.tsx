"use client";

import { Phone, Mail, MessageCircle, Clock } from "lucide-react";
import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import ContactSection from "@/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <>
      <section className="relative -mt-[106px] pt-[140px] pb-20 bg-forest-deep text-creme-warm overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">Contact</span>
          <WordReveal as="h1" className="font-serif text-display-xl mt-4 max-w-3xl leading-[1.05]">
            Begin with a careful conversation.
          </WordReveal>
        </div>
      </section>

      <section className="relative py-16 bg-creme-soft dark:bg-forest-deep">
        <GoldWipe />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-4 gap-6">
          <InfoCard icon={<Phone size={18} />} title="Phone" value="+91 7303083757" href="tel:+917303083757" />
          <InfoCard icon={<Mail size={18} />} title="Email" value="cosmiawellness@gmail.com" href="mailto:cosmiawellness@gmail.com" />
          <InfoCard icon={<MessageCircle size={18} />} title="WhatsApp" value="@cosmiawellness" href="https://wa.me/917303083757" />
          <InfoCard icon={<Clock size={18} />} title="Hours" value="Mon–Sat · 7AM–8PM IST" />
        </div>
      </section>

      <ContactSection />

      {/* Map */}
      <section className="relative bg-creme dark:bg-chocolate-deep">
        <div className="aspect-[16/9] md:aspect-[21/9] w-full">
          <iframe
            title="Cosmia Wellness Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5!2d77.391!3d28.535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNoida!5e0!3m2!1sen!2sin!4v1700000000000"
            className="w-full h-full grayscale-[60%] contrast-[0.95]"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}

function InfoCard({ icon, title, value, href }: { icon: React.ReactNode; title: string; value: string; href?: string }) {
  const content = (
    <div className="bg-creme dark:bg-forest border border-[var(--line)] p-6 hover:-translate-y-1 transition-transform h-full">
      <div className="text-gold mb-3">{icon}</div>
      <p className="text-[11px] uppercase tracking-widest font-accent italic opacity-70">{title}</p>
      <p className="font-serif text-xl mt-1">{value}</p>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" data-magnetic="true">
      {content}
    </a>
  ) : (
    content
  );
}
