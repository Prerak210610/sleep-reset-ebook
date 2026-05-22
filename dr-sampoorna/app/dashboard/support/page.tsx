"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/stores/auth";
import { getFirebase } from "@/lib/firebase";
import GoldButton from "@/components/GoldButton";
import { whatsappLink, WA_MESSAGES } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ = [
  {
    q: "Do I need any prior yoga experience?",
    a: "No. Every plan begins with a careful assessment. Beginners and experienced practitioners are both welcomed."
  },
  {
    q: "Are sessions online or offline?",
    a: "Both. Most personal sessions can be conducted online with the same care as in-person."
  },
  {
    q: "How long until I see change?",
    a: "Honest answer: it depends on the body, the concern, and consistency. Many students notice meaningful change in 4–6 weeks of regular practice."
  },
  {
    q: "Is the SFY Protocol a treatment?",
    a: "No. SFY is a supportive practice. It does not replace medical care and makes no guarantees about outcomes."
  },
  {
    q: "How do I cancel a booking?",
    a: "Cancellations 24 hours in advance are credited toward a future session. See Terms & Conditions."
  }
];

export default function SupportPage() {
  const user = useAuth((s) => s.user);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [open, setOpen] = useState<number | null>(0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setStatus("sending");
    try {
      const { db } = getFirebase();
      await addDoc(collection(db, "contactMessages"), {
        name: user.displayName ?? "",
        email: user.email,
        phone: "",
        subject: `[Support] ${subject}`,
        message,
        status: "unread",
        createdAt: serverTimestamp()
      });
      setStatus("sent");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-4xl">Support</h1>
        <p className="font-accent italic opacity-80 mt-2">We're here when you need us.</p>
      </header>

      <section className="grid md:grid-cols-3 gap-5">
        <a
          href={whatsappLink(WA_MESSAGES.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-creme dark:bg-forest border border-[var(--line)] p-6 hover:-translate-y-1 transition-transform"
          data-magnetic="true"
        >
          <p className="text-[10px] uppercase tracking-widest font-accent italic text-gold">WhatsApp</p>
          <p className="font-serif text-2xl mt-1">+91 7303083757</p>
          <p className="text-xs opacity-70 mt-2">Fastest channel</p>
        </a>
        <a
          href="mailto:cosmiawellness@gmail.com"
          className="bg-creme dark:bg-forest border border-[var(--line)] p-6 hover:-translate-y-1 transition-transform"
          data-magnetic="true"
        >
          <p className="text-[10px] uppercase tracking-widest font-accent italic text-gold">Email</p>
          <p className="font-serif text-2xl mt-1">cosmiawellness@gmail.com</p>
          <p className="text-xs opacity-70 mt-2">Within one business day</p>
        </a>
        <a
          href="tel:+917303083757"
          className="bg-creme dark:bg-forest border border-[var(--line)] p-6 hover:-translate-y-1 transition-transform"
          data-magnetic="true"
        >
          <p className="text-[10px] uppercase tracking-widest font-accent italic text-gold">Phone</p>
          <p className="font-serif text-2xl mt-1">+91 7303083757</p>
          <p className="text-xs opacity-70 mt-2">Mon–Sat · 7AM–8PM IST</p>
        </a>
      </section>

      <section className="bg-creme dark:bg-forest border border-[var(--line)] p-6 md:p-8">
        <h2 className="font-serif text-2xl mb-5">Quick Message</h2>
        <form onSubmit={submit} className="space-y-4">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            required
            className="w-full bg-transparent border-b border-[var(--line)] focus:border-gold py-3 outline-none transition"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help?"
            rows={4}
            required
            className="w-full bg-transparent border border-[var(--line)] focus:border-gold p-4 outline-none resize-none transition"
          />
          <div className="flex justify-end">
            <GoldButton type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send"}
            </GoldButton>
          </div>
          {status === "sent" && <p className="text-gold font-accent italic text-sm">Sent. Our team will respond shortly.</p>}
          {status === "error" && <p className="text-red-500 font-accent italic text-sm">Something went wrong. Try WhatsApp.</p>}
        </form>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">Frequently Asked</h2>
        <div className="space-y-2">
          {FAQ.map((f, i) => (
            <div key={i} className="bg-creme dark:bg-forest border border-[var(--line)]">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-serif text-lg">{f.q}</span>
                <ChevronDown
                  size={18}
                  className={cn("transition-transform", open === i && "rotate-180")}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm leading-prose opacity-90">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
