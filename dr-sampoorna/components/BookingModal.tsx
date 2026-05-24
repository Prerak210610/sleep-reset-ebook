"use client";

import { useEffect, useState } from "react";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getFirebase } from "@/lib/firebase";
import { generateBookingRef, whatsappLink, cn } from "@/lib/utils";
import { SERVICES } from "@/lib/content";
import { useBooking } from "@/stores/booking";
import { useSound } from "@/stores/sound";
import GoldButton from "./GoldButton";

const CONCERNS = [
  "Back Pain",
  "Neck/Shoulder Pain",
  "Knee/Joint Pain",
  "Hormonal/PCOD/PCOS",
  "Fertility",
  "Stress/Anxiety",
  "Sleep",
  "Weight",
  "Corporate Wellness",
  "General Fitness",
  "Other"
];
const AGES = ["Under 25", "25–35", "35–45", "45–55", "55+"];
const ACTIVITY = [
  "Very active",
  "Moderately active",
  "Mostly sedentary",
  "Currently in pain / limited"
];
const TIME_SLOTS = [
  "Morning · 6 AM – 9 AM",
  "Mid-morning · 9 AM – 12 PM",
  "Afternoon · 12 PM – 4 PM",
  "Evening · 4 PM – 8 PM"
];

interface FormState {
  // Step 1
  name: string;
  phone: string;
  email: string;
  language: "English" | "Hindi";
  // Step 2
  concerns: string[];
  age: string;
  activity: string;
  conditions: string;
  // Step 3
  mode: "Online" | "Offline";
  service: string;
  date: string;
  time: string;
  message: string;
}

const empty: FormState = {
  name: "",
  phone: "",
  email: "",
  language: "English",
  concerns: [],
  age: "",
  activity: "",
  conditions: "",
  mode: "Online",
  service: "",
  date: "",
  time: "",
  message: ""
};

export default function BookingModal() {
  const open = useBooking((s) => s.open);
  const preselect = useBooking((s) => s.preselectService);
  const close = useBooking((s) => s.closeModal);
  const playChime = useSound((s) => s.playChime);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  // Reset form whenever modal opens fresh
  useEffect(() => {
    if (open) {
      setStep(1);
      setStatus("idle");
      setBookingRef(null);
      setForm({ ...empty, service: preselect ?? "" });
    }
  }, [open, preselect]);

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Esc to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && close();
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, close]);

  if (!open) return null;

  const upd = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleConcern = (c: string) =>
    setForm((f) => ({
      ...f,
      concerns: f.concerns.includes(c) ? f.concerns.filter((x) => x !== c) : [...f.concerns, c]
    }));

  const canNext1 = form.name.trim() && form.phone.trim() && form.email.trim();
  const canNext2 = form.concerns.length > 0 && form.age && form.activity;
  const canSubmit = form.mode && form.service && form.date && form.time;

  const submit = async () => {
    setStatus("sending");
    const ref = generateBookingRef();
    const price = form.mode === "Online" ? "₹197" : "₹497";
    try {
      const { db } = getFirebase();
      await addDoc(collection(db, "consultations"), {
        ...form,
        bookingRef: ref,
        price,
        status: "Pending",
        notes: "",
        createdAt: serverTimestamp()
      });
      await addDoc(collection(db, "mail"), {
        to: ["cosmiawellness@gmail.com"],
        message: {
          subject: `New consultation booking · ${ref}`,
          html: `<h3>New booking</h3>
            <p><b>Reference:</b> ${ref}</p>
            <p><b>Name:</b> ${form.name}</p>
            <p><b>Phone:</b> ${form.phone}</p>
            <p><b>Email:</b> ${form.email}</p>
            <p><b>Language:</b> ${form.language}</p>
            <p><b>Concerns:</b> ${form.concerns.join(", ")}</p>
            <p><b>Age:</b> ${form.age}</p>
            <p><b>Activity:</b> ${form.activity}</p>
            <p><b>Conditions:</b> ${form.conditions || "—"}</p>
            <p><b>Service:</b> ${form.service}</p>
            <p><b>Mode:</b> ${form.mode} (${price})</p>
            <p><b>Date:</b> ${form.date}</p>
            <p><b>Time:</b> ${form.time}</p>
            <p><b>Message:</b> ${form.message || "—"}</p>`
        }
      });
      playChime();
      setBookingRef(ref);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  // Build a WhatsApp fallback link from current form state (for the success screen)
  const waFallback = whatsappLink(
    `Hello Dr. Sampoorna, I have just booked a consultation. Reference: ${bookingRef}. Name: ${form.name}. Phone: ${form.phone}. Service: ${form.service}. Mode: ${form.mode}. Date: ${form.date}. Time: ${form.time}.`
  );

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={close}
    >
      <div
        className="relative bg-creme dark:bg-chocolate-deep w-full md:max-w-2xl md:rounded-sm border border-gold/30 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 z-10 p-2 hover:text-gold transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="px-6 md:px-10 pt-10 pb-6 border-b border-[var(--line)]">
          <p className="font-accent italic text-gold uppercase tracking-widest text-xs">
            Book Personalized Consultation
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mt-2 leading-tight">
            {status === "sent" ? "You're booked." : "Begin with an unhurried conversation."}
          </h2>

          {/* Step indicator */}
          {status !== "sent" && (
            <div className="flex items-center gap-3 mt-6">
              {[
                { n: 1, label: "Your Details" },
                { n: 2, label: "Health Information" },
                { n: 3, label: "Schedule & Confirm" }
              ].map((s, i, arr) => (
                <div key={s.n} className="flex items-center gap-3 flex-1">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-xs font-accent italic transition",
                      step > s.n
                        ? "bg-gold text-chocolate-deep"
                        : step === s.n
                        ? "bg-gold text-chocolate-deep"
                        : "bg-[var(--line)] text-[var(--muted)]"
                    )}
                  >
                    {step > s.n ? <Check size={14} /> : s.n}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] uppercase tracking-widest font-accent italic whitespace-nowrap hidden sm:inline",
                      step >= s.n ? "text-current" : "opacity-50"
                    )}
                  >
                    {s.label}
                  </span>
                  {i < arr.length - 1 && (
                    <span
                      className={cn(
                        "h-px flex-1 transition-colors",
                        step > s.n ? "bg-gold" : "bg-[var(--line)]"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 md:px-10 py-8 min-h-[320px]">
          {/* SUCCESS */}
          {status === "sent" && bookingRef && (
            <div className="text-center space-y-5">
              <div className="inline-flex w-14 h-14 rounded-full bg-gold/15 text-gold items-center justify-center">
                <Check size={26} />
              </div>
              <p className="font-accent italic text-gold uppercase tracking-widest text-xs">
                Your booking reference
              </p>
              <p className="font-serif text-4xl md:text-5xl text-gold-shine">{bookingRef}</p>
              <p className="text-sm leading-prose opacity-90 max-w-md mx-auto">
                Dr. Sampoorna's team will reach out within one business day on{" "}
                <span className="text-current">{form.phone}</span> /{" "}
                <span className="text-current">{form.email}</span> to confirm your{" "}
                <span className="text-current">{form.mode.toLowerCase()}</span> session on{" "}
                <span className="text-current">{form.date}</span> ({form.time}).
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <GoldButton onClick={close}>Done</GoldButton>
                <a
                  href={waFallback}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest font-accent italic px-5 py-3 border border-current hover:text-gold hover:border-gold transition inline-flex items-center justify-center"
                  data-magnetic="true"
                >
                  Also message on WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* STEP 1 — Your Details */}
          {status !== "sent" && step === 1 && (
            <div className="space-y-5">
              <Input label="Full Name" value={form.name} onChange={(v) => upd("name", v)} required />
              <div className="grid sm:grid-cols-2 gap-5">
                <Input label="Phone" value={form.phone} onChange={(v) => upd("phone", v)} type="tel" required />
                <Input label="Email" value={form.email} onChange={(v) => upd("email", v)} type="email" required />
              </div>
              <Pills
                label="Preferred Language"
                options={["English", "Hindi"]}
                value={form.language}
                onChange={(v) => upd("language", v as "English" | "Hindi")}
              />
            </div>
          )}

          {/* STEP 2 — Health Information */}
          {status !== "sent" && step === 2 && (
            <div className="space-y-6">
              <div>
                <Label>Main Concerns</Label>
                <p className="text-xs opacity-70 -mt-2 mb-3">Select all that apply.</p>
                <div className="flex flex-wrap gap-2">
                  {CONCERNS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleConcern(c)}
                      className={cn(
                        "px-4 py-1.5 text-xs uppercase tracking-widest font-accent italic border transition",
                        form.concerns.includes(c)
                          ? "border-gold text-gold bg-gold/10"
                          : "border-[var(--line)] hover:border-gold"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <Pills
                label="Age Range"
                options={AGES}
                value={form.age}
                onChange={(v) => upd("age", v)}
              />

              <Pills
                label="Activity Level"
                options={ACTIVITY}
                value={form.activity}
                onChange={(v) => upd("activity", v)}
              />

              <div>
                <Label>Any current medical conditions / surgeries / medications? (optional)</Label>
                <textarea
                  rows={3}
                  value={form.conditions}
                  onChange={(e) => upd("conditions", e.target.value)}
                  placeholder="Helpful context for personalising your plan."
                  className="w-full bg-transparent border border-[var(--line)] focus:border-gold p-3 outline-none transition resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3 — Schedule & Confirm */}
          {status !== "sent" && step === 3 && (
            <div className="space-y-6">
              <div>
                <Label>Preferred Mode</Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  <ModeCard
                    selected={form.mode === "Online"}
                    onClick={() => upd("mode", "Online")}
                    title="Online"
                    price="₹197"
                    note="per session · live with Dr. Sampoorna's team"
                  />
                  <ModeCard
                    selected={form.mode === "Offline"}
                    onClick={() => upd("mode", "Offline")}
                    title="Offline"
                    price="₹497"
                    note="per session · in-person, on-site"
                  />
                </div>
              </div>

              <div>
                <Label>Service of Interest</Label>
                <select
                  value={form.service}
                  onChange={(e) => upd("service", e.target.value)}
                  className="w-full bg-transparent border-b border-[var(--line)] focus:border-gold py-3 outline-none transition"
                  required
                >
                  <option value="">Select…</option>
                  {SERVICES.map((s) => (
                    <option key={s.key} value={s.title} className="bg-creme dark:bg-chocolate-deep">
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label>Preferred Date</Label>
                  <input
                    type="date"
                    value={form.date}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => upd("date", e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-[var(--line)] focus:border-gold py-3 outline-none transition"
                  />
                </div>
                <div>
                  <Label>Preferred Time</Label>
                  <select
                    value={form.time}
                    onChange={(e) => upd("time", e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-[var(--line)] focus:border-gold py-3 outline-none transition"
                  >
                    <option value="">Select…</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t} className="bg-creme dark:bg-chocolate-deep">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label>Anything else to share? (optional)</Label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => upd("message", e.target.value)}
                  className="w-full bg-transparent border border-[var(--line)] focus:border-gold p-3 outline-none transition resize-none"
                />
              </div>

              {/* Summary */}
              <div className="bg-gold/5 border border-gold/30 p-5 text-sm leading-prose">
                <p className="font-accent italic text-gold uppercase tracking-widest text-xs mb-3">
                  Summary
                </p>
                <div className="grid sm:grid-cols-2 gap-y-1 gap-x-4">
                  <p><span className="opacity-70">Name:</span> {form.name || "—"}</p>
                  <p><span className="opacity-70">Phone:</span> {form.phone || "—"}</p>
                  <p><span className="opacity-70">Service:</span> {form.service || "—"}</p>
                  <p>
                    <span className="opacity-70">Mode:</span> {form.mode} ·{" "}
                    <span className="text-gold-shine">{form.mode === "Online" ? "₹197" : "₹497"}</span>
                  </p>
                  <p><span className="opacity-70">Date:</span> {form.date || "—"}</p>
                  <p><span className="opacity-70">Time:</span> {form.time || "—"}</p>
                </div>
              </div>

              {status === "error" && (
                <p className="text-red-500 text-sm font-accent italic text-center">
                  Something went wrong. Please try again or use{" "}
                  <a className="underline" href={waFallback} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                  .
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {status !== "sent" && (
          <div className="px-6 md:px-10 py-5 border-t border-[var(--line)] flex items-center justify-between gap-3">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="text-xs uppercase tracking-widest font-accent italic disabled:opacity-30 hover:text-gold transition inline-flex items-center gap-2"
              data-magnetic="true"
            >
              <ChevronLeft size={14} /> Back
            </button>
            {step < 3 ? (
              <GoldButton
                onClick={() => setStep((s) => s + 1)}
                disabled={(step === 1 && !canNext1) || (step === 2 && !canNext2)}
                size="md"
              >
                Continue <ChevronRight size={14} />
              </GoldButton>
            ) : (
              <GoldButton
                onClick={submit}
                disabled={!canSubmit || status === "sending"}
                size="md"
              >
                {status === "sending" ? "Booking…" : "Confirm Booking"}
              </GoldButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] uppercase tracking-widest mb-3 font-accent italic text-gold">
      {children}
    </label>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-transparent border-b border-[var(--line)] focus:border-gold py-3 outline-none transition"
      />
    </div>
  );
}

function Pills({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={cn(
              "px-4 py-1.5 text-xs uppercase tracking-widest font-accent italic border transition",
              value === o ? "border-gold text-gold bg-gold/10" : "border-[var(--line)] hover:border-gold"
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function ModeCard({
  selected,
  onClick,
  title,
  price,
  note
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  price: string;
  note: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-5 text-left border transition group",
        selected ? "border-gold bg-gold/10" : "border-[var(--line)] hover:border-gold"
      )}
      data-magnetic="true"
    >
      <p className="font-serif text-2xl">{title}</p>
      <p className="font-serif text-3xl text-gold-shine mt-1">{price}</p>
      <p className="text-[11px] uppercase tracking-widest font-accent italic mt-2 opacity-80">{note}</p>
    </button>
  );
}
