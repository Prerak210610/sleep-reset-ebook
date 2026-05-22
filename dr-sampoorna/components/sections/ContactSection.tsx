"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import GoldButton from "@/components/GoldButton";
import { getFirebase } from "@/lib/firebase";
import { useLang } from "@/stores/lang";
import { useSound } from "@/stores/sound";

export default function ContactSection() {
  const tt = useLang((s) => s.t);
  const playChime = useSound((s) => s.playChime);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const { db } = getFirebase();
      // Trigger Email extension reads from /contactMessages and /mail collections
      await addDoc(collection(db, "contactMessages"), {
        ...form,
        status: "unread",
        createdAt: serverTimestamp()
      });
      // Optional: write to /mail to trigger Firebase Trigger Email extension
      await addDoc(collection(db, "mail"), {
        to: ["cosmiawellness@gmail.com"],
        message: {
          subject: `New contact: ${form.subject || "Website enquiry"}`,
          html: `<h3>New contact form submission</h3>
            <p><b>Name:</b> ${form.name}</p>
            <p><b>Phone:</b> ${form.phone}</p>
            <p><b>Email:</b> ${form.email}</p>
            <p><b>Subject:</b> ${form.subject}</p>
            <p><b>Message:</b><br/>${form.message}</p>`
        }
      });
      playChime();
      setStatus("sent");
      setForm({ name: "", phone: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative py-24 md:py-32 bg-creme-soft dark:bg-forest-deep">
      <GoldWipe />
      <div className="relative max-w-5xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">Contact</span>
          <WordReveal as="h2" className="font-serif text-display-lg mt-3">
            {tt("sec.contact.h")}
          </WordReveal>
        </div>

        <form onSubmit={submit} className="grid md:grid-cols-2 gap-5">
          <Field label={tt("form.name")} value={form.name} onChange={update("name")} required />
          <Field label={tt("form.phone")} value={form.phone} onChange={update("phone")} type="tel" required />
          <Field label={tt("form.email")} value={form.email} onChange={update("email")} type="email" required className="md:col-span-2" />
          <Field label={tt("form.subject")} value={form.subject} onChange={update("subject")} className="md:col-span-2" />
          <div className="md:col-span-2">
            <label className="block text-[11px] uppercase tracking-widest mb-2 font-accent italic">
              {tt("form.message")}
            </label>
            <textarea
              rows={5}
              value={form.message}
              onChange={update("message")}
              required
              className="w-full bg-transparent border-b border-[var(--line)] focus:border-gold py-3 outline-none transition resize-none"
            />
          </div>
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4">
            <p className="text-xs opacity-70 font-accent italic">
              We respond within one business day.
            </p>
            <GoldButton type="submit" size="lg" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : tt("form.submit")}
            </GoldButton>
          </div>
        </form>

        {status === "sent" && (
          <p className="mt-6 text-center font-accent italic text-gold text-sm">
            {tt("form.success")}
          </p>
        )}
        {status === "error" && (
          <p className="mt-6 text-center font-accent italic text-red-500 text-sm">
            {tt("form.error")}
          </p>
        )}
      </div>
    </section>
  );
}

function Field({
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
      <label className="block text-[11px] uppercase tracking-widest mb-2 font-accent italic">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-transparent border-b border-[var(--line)] focus:border-gold py-3 outline-none transition"
      />
    </div>
  );
}
