"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { useAuth } from "@/stores/auth";
import { useTheme } from "@/stores/theme";
import { useLang } from "@/stores/lang";
import { getFirebase } from "@/lib/firebase";
import GoldButton from "@/components/GoldButton";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const user = useAuth((s) => s.user);
  const router = useRouter();
  const theme = useTheme((s) => s.theme);
  const setTheme = useTheme((s) => s.setTheme);
  const lang = useLang((s) => s.lang);
  const setLang = useLang((s) => s.setLang);

  const [data, setData] = useState<{ name?: string; phone?: string; concerns?: string[]; notify?: { email: boolean; whatsapp: boolean } } | null>(null);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { db } = getFirebase();
      const snap = await getDoc(doc(db, "users", user.uid));
      const d = snap.data();
      setData({
        name: d?.name ?? "",
        phone: d?.phone ?? "",
        concerns: d?.onboarding?.concerns ?? [],
        notify: d?.notify ?? { email: true, whatsapp: true }
      });
    })();
  }, [user]);

  const save = async () => {
    if (!user || !data) return;
    setSaving(true);
    const { db } = getFirebase();
    await updateDoc(doc(db, "users", user.uid), {
      name: data.name,
      phone: data.phone,
      "onboarding.concerns": data.concerns,
      notify: data.notify
    });
    setSaving(false);
  };

  const remove = async () => {
    if (!user) return;
    const { db, auth } = getFirebase();
    await deleteDoc(doc(db, "users", user.uid));
    if (auth.currentUser) await deleteUser(auth.currentUser);
    router.push("/");
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-4xl">Settings</h1>
        <p className="font-accent italic opacity-80 mt-2">Account, preferences, and privacy.</p>
      </header>

      {/* Profile */}
      <section className="bg-creme dark:bg-forest border border-[var(--line)] p-6 md:p-8 space-y-4">
        <h2 className="font-serif text-2xl">Profile</h2>
        <Field label="Name" value={data?.name ?? ""} onChange={(v) => setData((d) => (d ? { ...d, name: v } : d))} />
        <Field label="Phone" value={data?.phone ?? ""} onChange={(v) => setData((d) => (d ? { ...d, phone: v } : d))} />
        <div>
          <p className="text-[11px] uppercase tracking-widest mb-2 font-accent italic">Concerns</p>
          <div className="flex flex-wrap gap-2">
            {data?.concerns?.length
              ? data.concerns.map((c) => <span key={c} className="px-3 py-1 border border-gold/40 text-gold text-xs uppercase tracking-widest font-accent italic">{c}</span>)
              : <span className="text-sm opacity-70 font-accent italic">No concerns selected.</span>}
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="bg-creme dark:bg-forest border border-[var(--line)] p-6 md:p-8 space-y-5">
        <h2 className="font-serif text-2xl">Preferences</h2>

        <PrefRow label="Theme">
          {(["light", "dark"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={cn(
                "px-4 py-1.5 text-xs uppercase tracking-widest font-accent italic border transition",
                theme === t ? "border-gold text-gold bg-gold/10" : "border-[var(--line)] hover:border-gold"
              )}
            >
              {t}
            </button>
          ))}
        </PrefRow>

        <PrefRow label="Language">
          {(["en", "hi"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                "px-4 py-1.5 text-xs uppercase tracking-widest font-accent italic border transition",
                lang === l ? "border-gold text-gold bg-gold/10" : "border-[var(--line)] hover:border-gold"
              )}
            >
              {l === "en" ? "English" : "हिन्दी"}
            </button>
          ))}
        </PrefRow>

        <PrefRow label="Email Notifications">
          <Toggle
            on={!!data?.notify?.email}
            onChange={(v) => setData((d) => (d ? { ...d, notify: { ...d.notify!, email: v } } : d))}
          />
        </PrefRow>
        <PrefRow label="WhatsApp Notifications">
          <Toggle
            on={!!data?.notify?.whatsapp}
            onChange={(v) => setData((d) => (d ? { ...d, notify: { ...d.notify!, whatsapp: v } } : d))}
          />
        </PrefRow>
      </section>

      <div className="flex gap-3">
        <GoldButton onClick={save} disabled={saving}>{saving ? "Saving…" : "Save Changes"}</GoldButton>
      </div>

      {/* Delete */}
      <section className="border border-red-500/30 p-6 md:p-8">
        <h2 className="font-serif text-2xl text-red-500">Delete Account</h2>
        <p className="text-sm opacity-80 mt-2">This permanently removes your account, journal entries, and saved articles. This cannot be undone.</p>
        {confirmDelete ? (
          <div className="mt-5 flex gap-3">
            <button onClick={remove} className="px-5 py-2 bg-red-500 text-white text-xs uppercase tracking-widest font-accent italic">
              Yes, delete forever
            </button>
            <button onClick={() => setConfirmDelete(false)} className="text-xs uppercase tracking-widest font-accent italic">
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={() => setConfirmDelete(true)} className="mt-5 px-5 py-2 border border-red-500 text-red-500 text-xs uppercase tracking-widest font-accent italic hover:bg-red-500/10 transition">
            Delete account
          </button>
        )}
      </section>
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

function PrefRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <p className="text-[11px] uppercase tracking-widest font-accent italic">{label}</p>
      <div className="flex gap-2 items-center">{children}</div>
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={cn(
        "relative w-12 h-6 rounded-full transition",
        on ? "bg-gold" : "bg-[var(--line)]"
      )}
      aria-pressed={on}
    >
      <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-creme transition-transform", on ? "translate-x-6" : "translate-x-0.5")} />
    </button>
  );
}
