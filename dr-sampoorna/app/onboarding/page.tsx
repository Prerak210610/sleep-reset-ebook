"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import GoldWipe from "@/components/animations/GoldWipe";
import GoldButton from "@/components/GoldButton";
import { getFirebase } from "@/lib/firebase";
import { useAuth } from "@/stores/auth";
import { cn } from "@/lib/utils";

interface Answers {
  name: string;
  phone: string;
  language: "English" | "Hindi";
  source: string;
  concerns: string[];
  age: string;
  sessionType: string;
  activity: string;
}

const SOURCES = ["Instagram", "YouTube", "Friend", "News TV", "Corporate Session", "Google", "Other"];
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
const SESSION_TYPES = [
  "Personal 1:1",
  "Group Classes",
  "Corporate",
  "Fertility Yoga",
  "Therapeutic",
  "Just exploring"
];
const ACTIVITY = [
  "Very active",
  "Moderately active",
  "Mostly sedentary",
  "Currently in pain/limited"
];

export default function OnboardingPage() {
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const loading = useAuth((s) => s.loading);
  const [step, setStep] = useState(1);
  const [a, setA] = useState<Answers>({
    name: "",
    phone: "",
    language: "English",
    source: "",
    concerns: [],
    age: "",
    sessionType: "",
    activity: ""
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  const next = () => setStep((s) => Math.min(6, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const finish = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { db } = getFirebase();
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          email: user.email,
          name: a.name || user.displayName || "",
          phone: a.phone,
          language: a.language,
          onboarding: a,
          onboardingComplete: true,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );
      router.push("/dashboard");
    } finally {
      setSaving(false);
    }
  };

  const toggleConcern = (c: string) =>
    setA((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(c) ? prev.concerns.filter((x) => x !== c) : [...prev.concerns, c]
    }));

  const canNext =
    (step === 1 && a.name.trim().length > 0) ||
    (step === 2 && !!a.source) ||
    (step === 3 && a.concerns.length > 0) ||
    (step === 4 && !!a.age) ||
    (step === 5 && !!a.sessionType) ||
    (step === 6 && !!a.activity);

  return (
    <section className="relative min-h-[90vh] -mt-[106px] pt-[140px] pb-20 bg-creme-soft dark:bg-forest-deep">
      <GoldWipe />
      <div className="relative max-w-2xl mx-auto px-6 md:px-10">
        <div className="text-center mb-10">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">Onboarding</span>
          <h1 className="font-serif text-display-md mt-3">Let's personalise your experience</h1>
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i + 1 < step ? "bg-gold w-8" : i + 1 === step ? "bg-gold w-12" : "bg-[var(--line)] w-6"
                )}
              />
            ))}
          </div>
        </div>

        <div className="bg-creme dark:bg-forest border border-[var(--line)] p-8 md:p-10 min-h-[360px]">
          {step === 1 && (
            <Step kicker="01 · Identity" title="Tell us your name">
              <div className="space-y-5">
                <Field label="Full Name" value={a.name} onChange={(v) => setA({ ...a, name: v })} required />
                <Field label="Phone (optional)" value={a.phone} onChange={(v) => setA({ ...a, phone: v })} />
                <RadioRow
                  label="Preferred Language"
                  options={["English", "Hindi"]}
                  value={a.language}
                  onChange={(v) => setA({ ...a, language: v as "English" | "Hindi" })}
                />
              </div>
            </Step>
          )}
          {step === 2 && (
            <Step kicker="02 · Origin" title="How did you hear about Dr. Sampoorna?">
              <Pills options={SOURCES} value={a.source} onChange={(v) => setA({ ...a, source: v })} />
            </Step>
          )}
          {step === 3 && (
            <Step kicker="03 · Concerns" title="What's your main wellness concern?">
              <p className="text-sm opacity-70 mb-4">Select all that apply.</p>
              <div className="flex flex-wrap gap-2">
                {CONCERNS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleConcern(c)}
                    className={cn(
                      "px-4 py-2 text-xs uppercase tracking-widest font-accent italic border transition",
                      a.concerns.includes(c)
                        ? "border-gold text-gold bg-gold/10"
                        : "border-[var(--line)] hover:border-gold"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Step>
          )}
          {step === 4 && (
            <Step kicker="04 · Age" title="Which age range describes you?">
              <Pills options={AGES} value={a.age} onChange={(v) => setA({ ...a, age: v })} />
            </Step>
          )}
          {step === 5 && (
            <Step kicker="05 · Format" title="What kind of session interests you?">
              <Pills options={SESSION_TYPES} value={a.sessionType} onChange={(v) => setA({ ...a, sessionType: v })} />
            </Step>
          )}
          {step === 6 && (
            <Step kicker="06 · Activity" title="How active are you currently?">
              <Pills options={ACTIVITY} value={a.activity} onChange={(v) => setA({ ...a, activity: v })} />
            </Step>
          )}
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={back}
            disabled={step === 1}
            className="text-xs uppercase tracking-widest font-accent italic disabled:opacity-30 hover:text-gold transition"
            data-magnetic="true"
          >
            ← Back
          </button>
          {step < 6 ? (
            <GoldButton onClick={next} disabled={!canNext} size="md">
              Next →
            </GoldButton>
          ) : (
            <GoldButton onClick={finish} disabled={!canNext || saving} size="md">
              {saving ? "Saving…" : "Finish"}
            </GoldButton>
          )}
        </div>
      </div>
    </section>
  );
}

function Step({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="font-accent italic text-gold uppercase tracking-widest text-xs">{kicker}</span>
      <h2 className="font-serif text-3xl md:text-4xl mt-2 mb-6">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-widest mb-2 font-accent italic">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-transparent border-b border-[var(--line)] focus:border-gold py-3 outline-none transition"
      />
    </div>
  );
}

function RadioRow({
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
      <label className="block text-[11px] uppercase tracking-widest mb-3 font-accent italic">{label}</label>
      <div className="flex gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={cn(
              "px-5 py-2 text-xs uppercase tracking-widest font-accent italic border transition",
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

function Pills({
  options,
  value,
  onChange
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={cn(
            "px-4 py-2 text-xs uppercase tracking-widest font-accent italic border transition",
            value === o ? "border-gold text-gold bg-gold/10" : "border-[var(--line)] hover:border-gold"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
