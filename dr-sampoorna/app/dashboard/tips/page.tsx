"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/stores/auth";
import { getFirebase } from "@/lib/firebase";

const TIPS_BY_CONCERN: Record<string, string> = {
  "Back Pain":
    "Keep your spine long before you bend. Inhale to lengthen, exhale to fold — never the other way around.",
  "Neck/Shoulder Pain":
    "Drop the shoulders away from the ears. The neck rests when the shoulders agree to.",
  "Knee/Joint Pain":
    "Strong knees come from awake feet. Spread the toes, ground the four corners, and the knee remembers.",
  "Hormonal/PCOD/PCOS":
    "Slow exhales calm the endocrine cascade. Try 4-in, 8-out for ten breaths twice a day.",
  Fertility:
    "The pelvis loves rhythm and rest in equal measure. Restorative practice is not lazy — it's strategic.",
  "Stress/Anxiety":
    "Lengthen the exhale, not the inhale. The exhale is what activates calm.",
  Sleep:
    "Forty-five minutes before bed: warm light, slow breath, no screens. The body trusts repetition.",
  Weight:
    "Movement is medicine, but breath is digestion. Vajrasana for ten minutes after dinner.",
  "Corporate Wellness":
    "Two minutes every hour. Stand. Spine long. Three breaths. Sit again. The body works for the body that works for it."
};

const DEFAULT_TIP = "Begin where you are. Breathe. Notice. Continue.";

export default function TipsPage() {
  const user = useAuth((s) => s.user);
  const [concern, setConcern] = useState<string | null>(null);
  const [adminTip, setAdminTip] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { db } = getFirebase();
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        const cs = (snap.data()?.onboarding?.concerns ?? []) as string[];
        setConcern(cs[0] ?? null);
      }
      try {
        const tipDoc = await getDoc(doc(db, "settings", "general"));
        setAdminTip((tipDoc.data()?.tipOfTheDay as string) ?? null);
      } catch {
        /* ignore */
      }
    })();
  }, [user]);

  const tip = concern ? TIPS_BY_CONCERN[concern] ?? DEFAULT_TIP : DEFAULT_TIP;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-4xl">Wellness Tips</h1>
        <p className="font-accent italic opacity-80 mt-2">Daily, personal, careful.</p>
      </header>

      <article className="bg-forest text-creme-warm p-8 md:p-10 grain relative overflow-hidden">
        <p className="font-accent italic text-gold uppercase tracking-widest text-xs">For you today</p>
        <p className="font-serif text-2xl md:text-3xl mt-3 leading-tight">{tip}</p>
      </article>

      {adminTip && (
        <article className="bg-creme dark:bg-forest border border-[var(--line)] p-6 md:p-8">
          <p className="font-accent italic text-gold uppercase tracking-widest text-xs">Tip of the day · from Dr. Sampoorna</p>
          <p className="font-serif text-xl mt-2 leading-relaxed">{adminTip}</p>
        </article>
      )}
    </div>
  );
}
