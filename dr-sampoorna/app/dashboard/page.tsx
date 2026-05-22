"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/stores/auth";
import { getFirebase } from "@/lib/firebase";
import GoldButton from "@/components/GoldButton";

interface ProfileData {
  name?: string;
  email?: string;
  phone?: string;
  language?: string;
  onboarding?: { concerns?: string[] };
  onboardingComplete?: boolean;
}

export default function ProfilePage() {
  const user = useAuth((s) => s.user);
  const [data, setData] = useState<ProfileData | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ProfileData>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { db } = getFirebase();
      const snap = await getDoc(doc(db, "users", user.uid));
      const d = (snap.exists() ? snap.data() : {}) as ProfileData;
      setData(d);
      setDraft(d);
    })();
  }, [user]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { db } = getFirebase();
    await updateDoc(doc(db, "users", user.uid), {
      name: draft.name ?? "",
      phone: draft.phone ?? "",
      language: draft.language ?? "English"
    });
    setData(draft);
    setEditing(false);
    setSaving(false);
  };

  const completion = (() => {
    if (!data) return 0;
    let pts = 0;
    if (data.name) pts += 25;
    if (data.phone) pts += 25;
    if (data.language) pts += 15;
    if (data.onboardingComplete) pts += 35;
    return pts;
  })();

  const firstName = (data?.name || user?.displayName || user?.email || "Friend").split(" ")[0];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section className="bg-forest text-creme-warm p-8 md:p-10 grain relative overflow-hidden">
        <p className="font-accent italic text-gold uppercase tracking-widest text-xs">Welcome back</p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">{firstName}</h1>
        <p className="font-accent italic opacity-90 mt-3">Your wellness journey with Dr. Sampoorna.</p>
      </section>

      {/* Profile completion */}
      <section className="bg-creme dark:bg-forest p-6 md:p-8 border border-[var(--line)]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif text-2xl">Profile Completion</h2>
          <span className="font-accent italic text-gold text-sm">{completion}%</span>
        </div>
        <div className="h-2 bg-[var(--line)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gold-shine transition-all duration-700"
            style={{ width: `${completion}%` }}
          />
        </div>
      </section>

      {/* Profile card */}
      <section className="bg-creme dark:bg-forest p-6 md:p-8 border border-[var(--line)]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl">My Profile</h2>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-xs uppercase tracking-widest font-accent italic text-gold"
            >
              Edit
            </button>
          )}
        </div>

        {!editing ? (
          <dl className="grid md:grid-cols-2 gap-6">
            <Row label="Name" value={data?.name || "—"} />
            <Row label="Email" value={data?.email || user?.email || "—"} />
            <Row label="Phone" value={data?.phone || "—"} />
            <Row label="Language" value={data?.language || "English"} />
          </dl>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Name" value={draft.name ?? ""} onChange={(v) => setDraft({ ...draft, name: v })} />
            <Field label="Phone" value={draft.phone ?? ""} onChange={(v) => setDraft({ ...draft, phone: v })} />
            <Field label="Language" value={draft.language ?? "English"} onChange={(v) => setDraft({ ...draft, language: v })} />
            <div className="md:col-span-2 flex gap-3">
              <GoldButton onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</GoldButton>
              <button onClick={() => { setDraft(data ?? {}); setEditing(false); }} className="text-xs uppercase tracking-widest font-accent italic">
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Concerns */}
      {data?.onboarding?.concerns && data.onboarding.concerns.length > 0 && (
        <section className="bg-creme dark:bg-forest p-6 md:p-8 border border-[var(--line)]">
          <h2 className="font-serif text-2xl mb-4">Your Concerns</h2>
          <div className="flex flex-wrap gap-2">
            {data.onboarding.concerns.map((c) => (
              <span key={c} className="px-3 py-1 border border-gold/40 text-gold text-xs uppercase tracking-widest font-accent italic">
                {c}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-widest opacity-60 font-accent italic">{label}</dt>
      <dd className="font-serif text-xl mt-1">{value}</dd>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-widest mb-2 font-accent italic">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-[var(--line)] focus:border-gold py-3 outline-none transition"
      />
    </div>
  );
}
