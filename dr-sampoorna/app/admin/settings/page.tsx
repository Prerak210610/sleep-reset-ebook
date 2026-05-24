"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirebase } from "@/lib/firebase";
import GoldButton from "@/components/GoldButton";

interface Settings {
  whatsappNumber?: string;
  contactEmail?: string;
  announcementBar?: string;
  tipOfTheDay?: string;
}

export default function AdminSettings() {
  const [s, setS] = useState<Settings>({});
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { db } = getFirebase();
      const snap = await getDoc(doc(db, "settings", "general"));
      if (snap.exists()) setS(snap.data() as Settings);
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    const { db } = getFirebase();
    await setDoc(doc(db, "settings", "general"), s, { merge: true });
    setSaving(false);
    setSavedAt(new Date().toLocaleTimeString());
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-4xl">Settings</h1>
        <p className="font-accent italic opacity-80 mt-2">Site-wide configuration.</p>
      </header>

      <section className="bg-creme dark:bg-forest p-6 border border-[var(--line)] space-y-4">
        <Field label="WhatsApp Number (digits only)" value={s.whatsappNumber ?? "917303083757"} onChange={(v) => setS({ ...s, whatsappNumber: v })} />
        <Field label="Contact Email" value={s.contactEmail ?? "cosmiawellness@gmail.com"} onChange={(v) => setS({ ...s, contactEmail: v })} />
        <Field label="Announcement Bar Text" value={s.announcementBar ?? ""} onChange={(v) => setS({ ...s, announcementBar: v })} />
        <Field label="Tip of the Day" value={s.tipOfTheDay ?? ""} onChange={(v) => setS({ ...s, tipOfTheDay: v })} multiline />
        <div className="flex items-center gap-4">
          <GoldButton onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</GoldButton>
          {savedAt && <span className="text-xs font-accent italic text-gold">Saved at {savedAt}</span>}
        </div>
      </section>

      <section className="bg-chocolate-deep text-creme-warm p-6 grain relative overflow-hidden border border-gold/30">
        <p className="font-accent italic text-gold uppercase tracking-widest text-xs">Multi-admin Roles</p>
        <p className="font-serif text-2xl mt-2">Owner · Support · Editor</p>
        <p className="text-sm opacity-90 mt-3 max-w-2xl">
          Set Firebase Auth custom claims using the Admin SDK or a Cloud Function:
        </p>
        <pre className="text-xs bg-black/30 mt-3 p-4 overflow-x-auto"><code>{`// Cloud Function (callable)
import * as admin from "firebase-admin";
admin.initializeApp();

export const setRole = functions.https.onCall(async (data, ctx) => {
  if (!ctx.auth?.token.superadmin) throw new Error("forbidden");
  await admin.auth().setCustomUserClaims(data.uid, {
    superadmin: data.role === "owner",
    admin: ["owner","support","editor"].includes(data.role),
    role: data.role
  });
});`}</code></pre>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-widest mb-2 font-accent italic">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full bg-transparent border border-[var(--line)] focus:border-gold p-3 outline-none transition resize-none"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none transition"
        />
      )}
    </div>
  );
}
