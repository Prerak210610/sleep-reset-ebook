"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import StorageImage from "@/components/StorageImage";
import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import LineReveal from "@/components/animations/LineReveal";
import CardReveal from "@/components/animations/CardReveal";
import GoldButton from "@/components/GoldButton";
import { ASSETS } from "@/lib/storage";
import { SERVICES, HOW_STEPS, BODY_PROBLEMS } from "@/lib/content";
import { whatsappLink, WA_MESSAGES, generateBookingRef } from "@/lib/utils";
import { getFirebase } from "@/lib/firebase";
import { useSound } from "@/stores/sound";
import { useLang } from "@/stores/lang";

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <CredibilityStrip />
      {SERVICES.map((s, i) => (
        <ServiceSection key={s.key} service={s} index={i} />
      ))}
      <HowItWorks />
      <BodyProblemsGrid />
      <BookingForm />

      <section className="py-12 bg-creme-soft dark:bg-forest-deep border-t border-[var(--line)]">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <p className="font-accent italic text-sm opacity-70 leading-relaxed">
            Wellness Disclaimer · Yoga and wellness services are supportive practices and are not a
            substitute for professional medical diagnosis, treatment, or emergency care. Language
            used throughout — "support", "help with", "designed for" — is intentional. Nothing on
            this page implies cure, treatment, or guaranteed outcome.
          </p>
        </div>
      </section>
    </>
  );
}

function ServicesHero() {
  return (
    <section className="relative min-h-[70vh] -mt-[106px] pt-[120px] flex items-end text-creme-warm overflow-hidden">
      <div className="absolute inset-0">
        <StorageImage path={ASSETS.hero} alt="Services hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-forest-deep/65" />
        <div className="absolute inset-0 grain pointer-events-none" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pb-20 w-full">
        <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
          Services
        </span>
        <WordReveal as="h1" className="font-serif text-display-xl mt-4 max-w-5xl leading-[1.04]">
          Yoga & Wellness Services Backed by 22+ Years of Evidence-Informed Practice
        </WordReveal>
        <div className="mt-10">
          <GoldButton
            as="a"
            href={whatsappLink(WA_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Book Personalized Consultation
          </GoldButton>
        </div>
      </div>
    </section>
  );
}

function CredibilityStrip() {
  const items = [
    "22+ Years",
    "PhD",
    "RYT 500",
    "Ministry of AYUSH",
    "5000+ Lives",
    "100+ Workshops",
    "Bharat Petroleum",
    "Indian Oil",
    "ONGC",
    "HPCL",
    "Dell"
  ];
  return (
    <div className="bg-chocolate-deep text-creme-warm py-5">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-wrap items-center gap-x-6 gap-y-3 justify-center text-[11px] uppercase tracking-widest font-accent italic opacity-90">
        {items.map((it, i) => (
          <span key={it} className="flex items-center gap-6">
            {it}
            {i < items.length - 1 && <span className="text-gold">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

function ServiceSection({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const reverse = index % 2 === 1;
  return (
    <section
      id={service.key}
      className={`relative py-24 md:py-32 ${index % 2 === 0 ? "bg-creme-soft dark:bg-forest-deep" : "bg-creme dark:bg-chocolate-deep"}`}
    >
      <GoldWipe />
      <div className={`relative max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center`}>
        <div className={`md:col-span-6 ${reverse ? "md:order-2" : ""}`}>
          <div className="relative aspect-[4/5]">
            <div className="absolute -inset-3 border border-gold/40" />
            <div className="absolute inset-0 overflow-hidden grain bg-creme-warm">
              <StorageImage path={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div className={`md:col-span-6 space-y-6 ${reverse ? "md:order-1" : ""}`}>
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
            0{index + 1} · {service.format}
          </span>
          <WordReveal as="h2" className="font-serif text-display-md leading-[1.05]">
            {service.title}
          </WordReveal>
          <p className="font-accent italic text-lg opacity-85">{service.tagline}</p>

          <LineReveal className="space-y-5">
            <div>
              <p className="text-[11px] uppercase tracking-widest font-accent italic text-gold mb-2">
                Who it's for
              </p>
              <p className="text-base leading-prose opacity-90">{service.who}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest font-accent italic text-gold mb-2">
                Designed to support
              </p>
              <ul className="space-y-1.5 text-sm opacity-90">
                {service.problems.map((p) => (
                  <li key={p} className="flex items-baseline gap-2">
                    <span className="text-gold text-[9px]">◆</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest font-accent italic text-gold mb-2">
                The session includes
              </p>
              <ul className="space-y-1.5 text-sm opacity-90">
                {service.includes.map((p) => (
                  <li key={p} className="flex items-baseline gap-2">
                    <span className="text-gold text-[9px]">◆</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </LineReveal>

          <div className="flex items-center justify-between pt-6 border-t border-[var(--line)]">
            <span className="font-serif text-2xl text-gold-shine">{service.price}</span>
            <GoldButton
              as="a"
              href={whatsappLink(service.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Enquire on WhatsApp
            </GoldButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32 bg-forest text-creme-warm overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-16">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">How It Works</span>
          <WordReveal as="h2" className="font-serif text-display-lg mt-3 leading-[1.05]">
            Five careful steps. No shortcuts.
          </WordReveal>
        </div>
        <div className="space-y-24">
          {HOW_STEPS.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <div key={s.n} className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
                <div className={`md:col-span-5 ${reverse ? "md:order-2" : ""}`}>
                  <div className="relative aspect-[4/3] grain bg-forest-deep overflow-hidden">
                    <StorageImage path={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>
                <div className={`md:col-span-7 space-y-4 ${reverse ? "md:order-1" : ""}`}>
                  <span className="font-serif text-7xl md:text-8xl text-gold-shine leading-none">{s.n}</span>
                  <h3 className="font-serif text-3xl md:text-4xl">{s.title}</h3>
                  <p className="text-base leading-prose opacity-90 max-w-xl">{s.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BodyProblemsGrid() {
  return (
    <section className="relative py-24 md:py-32 bg-creme-soft dark:bg-forest-deep">
      <GoldWipe />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-12">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
            Designed to Support
          </span>
          <WordReveal as="h2" className="font-serif text-display-lg mt-3">
            Body concerns we work with most often.
          </WordReveal>
          <p className="text-sm opacity-70 mt-4 max-w-xl">
            "Support", "help with", "designed for" — chosen carefully. Yoga is not a treatment.
          </p>
        </div>
        <CardReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {BODY_PROBLEMS.map((b) => (
            <div
              key={b.title}
              className="group bg-creme dark:bg-forest border border-[var(--line)] hover:-translate-y-1 transition-transform"
            >
              <div className="relative aspect-square overflow-hidden grain bg-creme-warm">
                <StorageImage path={b.image} alt={b.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-4">
                <p className="font-serif text-xl">{b.title}</p>
                <p className="text-[11px] uppercase tracking-widest opacity-70 mt-1">{b.blurb}</p>
              </div>
            </div>
          ))}
        </CardReveal>
      </div>
    </section>
  );
}

function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    concern: "",
    mode: "Online",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [ref, setRef] = useState<string | null>(null);
  const tt = useLang((s) => s.t);
  const playChime = useSound((s) => s.playChime);

  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const bookingRef = generateBookingRef();
    try {
      const { db } = getFirebase();
      await addDoc(collection(db, "consultations"), {
        ...form,
        bookingRef,
        status: "Pending",
        notes: "",
        createdAt: serverTimestamp()
      });
      // Trigger Email
      await addDoc(collection(db, "mail"), {
        to: ["cosmiawellness@gmail.com"],
        message: {
          subject: `New consultation booking · ${bookingRef}`,
          html: `<h3>New booking</h3>
            <p><b>Reference:</b> ${bookingRef}</p>
            <p><b>Name:</b> ${form.name}</p>
            <p><b>Phone:</b> ${form.phone}</p>
            <p><b>Email:</b> ${form.email}</p>
            <p><b>Service:</b> ${form.service}</p>
            <p><b>Concern:</b> ${form.concern}</p>
            <p><b>Mode:</b> ${form.mode}</p>
            <p><b>Message:</b> ${form.message}</p>`
        }
      });
      playChime();
      setRef(bookingRef);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const fallback = `Hello Dr. Sampoorna, I want to book a yoga consultation. Name: ${form.name} | Phone: ${form.phone} | Service: ${form.service} | Concern: ${form.concern} | Mode: ${form.mode} | Message: ${form.message}`;

  return (
    <section
      id="book"
      className="relative py-24 md:py-32 text-creme-warm overflow-hidden"
    >
      <div className="absolute inset-0">
        <StorageImage path={ASSETS.bookingBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-chocolate-deep/85" />
        <div className="absolute inset-0 grain pointer-events-none" />
      </div>
      <div className="relative max-w-3xl mx-auto px-6 md:px-10">
        <div className="text-center mb-10">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
            Book a Consultation
          </span>
          <WordReveal as="h2" className="font-serif text-display-md mt-3 leading-[1.05]">
            Begin with an unhurried conversation.
          </WordReveal>
        </div>

        {status === "sent" && ref ? (
          <div className="bg-forest/60 border border-gold/40 p-10 text-center">
            <p className="font-accent italic text-gold uppercase tracking-widest text-xs">
              {tt("form.bookingRef")}
            </p>
            <p className="font-serif text-4xl md:text-5xl mt-3 text-gold-shine">{ref}</p>
            <p className="text-sm mt-6 opacity-90">
              We've received your request. Dr. Sampoorna's team will reach out within one business
              day. A copy has been emailed to {`cosmiawellness@gmail.com`}.
            </p>
            <div className="mt-6">
              <GoldButton
                as="a"
                href={whatsappLink(fallback)}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                className="text-creme-warm border-creme-warm/60"
              >
                Open in WhatsApp
              </GoldButton>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="grid md:grid-cols-2 gap-5 bg-forest/50 backdrop-blur p-8 md:p-10 border border-gold/20">
            <Input label={tt("form.name")} value={form.name} onChange={upd("name")} required />
            <Input label={tt("form.phone")} value={form.phone} onChange={upd("phone")} type="tel" required />
            <Input label={tt("form.email")} value={form.email} onChange={upd("email")} type="email" required className="md:col-span-2" />
            <Select
              label={tt("form.service")}
              value={form.service}
              onChange={upd("service")}
              required
              options={["", ...SERVICES.map((s) => s.title)]}
            />
            <Select
              label={tt("form.mode")}
              value={form.mode}
              onChange={upd("mode")}
              options={["Online", "Offline", "Corporate", "Not Sure"]}
            />
            <Input label={tt("form.concern")} value={form.concern} onChange={upd("concern")} className="md:col-span-2" />
            <div className="md:col-span-2">
              <label className="block text-[11px] uppercase tracking-widest mb-2 font-accent italic text-gold">
                {tt("form.message")}
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={upd("message")}
                className="w-full bg-transparent border-b border-gold/40 focus:border-gold py-3 outline-none transition resize-none text-creme-warm"
              />
            </div>
            <div className="md:col-span-2 flex items-center justify-between pt-4">
              <p className="text-xs opacity-70 font-accent italic">All consultations begin with assessment.</p>
              <GoldButton type="submit" size="lg" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Book Now"}
              </GoldButton>
            </div>
            {status === "error" && (
              <p className="md:col-span-2 text-center text-red-400 font-accent italic text-sm">
                {tt("form.error")}{" "}
                <a className="underline" href={whatsappLink(fallback)} target="_blank" rel="noopener noreferrer">
                  Open WhatsApp
                </a>
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required,
  className
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[11px] uppercase tracking-widest mb-2 font-accent italic text-gold">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-transparent border-b border-gold/40 focus:border-gold py-3 outline-none transition text-creme-warm"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  required,
  className
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[11px] uppercase tracking-widest mb-2 font-accent italic text-gold">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-transparent border-b border-gold/40 focus:border-gold py-3 outline-none transition text-creme-warm"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-forest text-creme-warm">
            {o || "Select…"}
          </option>
        ))}
      </select>
    </div>
  );
}
