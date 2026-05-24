"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { getFirebase } from "@/lib/firebase";
import GoldButton from "@/components/GoldButton";
import { SERVICES, type ServiceKey } from "@/lib/content";

interface Override {
  key: ServiceKey;
  title?: string;
  tagline?: string;
  price?: string;
  whatsapp?: string;
  enabled?: boolean;
}

export default function AdminServices() {
  const [overrides, setOverrides] = useState<Record<string, Override>>({});

  useEffect(() => {
    (async () => {
      const { db } = getFirebase();
      const snap = await getDocs(collection(db, "services"));
      const obj: Record<string, Override> = {};
      snap.docs.forEach((d) => (obj[d.id] = d.data() as Override));
      setOverrides(obj);
    })();
  }, []);

  const save = async (key: ServiceKey) => {
    const { db } = getFirebase();
    await setDoc(doc(db, "services", key), { ...overrides[key], key }, { merge: true });
  };

  const update = (key: ServiceKey, patch: Partial<Override>) =>
    setOverrides((o) => ({ ...o, [key]: { ...(o[key] ?? { key }), ...patch, key } }));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-4xl">Services</h1>
        <p className="font-accent italic opacity-80 mt-2">Override built-in service copy. Saved overrides take priority.</p>
      </header>
      <div className="space-y-4">
        {SERVICES.map((s) => {
          const o = overrides[s.key] ?? { key: s.key };
          return (
            <article key={s.key} className="bg-creme dark:bg-forest p-5 border border-[var(--line)] grid md:grid-cols-2 gap-3">
              <p className="md:col-span-2 font-serif text-xl text-gold">{s.title}</p>
              <input value={o.title ?? ""} onChange={(e) => update(s.key, { title: e.target.value })} placeholder={`Title (default: ${s.title})`} className="bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none" />
              <input value={o.price ?? ""} onChange={(e) => update(s.key, { price: e.target.value })} placeholder={`Price (default: ${s.price})`} className="bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none" />
              <input value={o.tagline ?? ""} onChange={(e) => update(s.key, { tagline: e.target.value })} placeholder={`Tagline (default: ${s.tagline})`} className="md:col-span-2 bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none" />
              <textarea value={o.whatsapp ?? ""} onChange={(e) => update(s.key, { whatsapp: e.target.value })} placeholder={`WhatsApp message (default: ${s.whatsapp})`} rows={2} className="md:col-span-2 bg-transparent border border-[var(--line)] focus:border-gold p-3 outline-none resize-none" />
              <div className="md:col-span-2 flex items-center justify-between">
                <label className="text-xs uppercase tracking-widest font-accent italic flex items-center gap-2">
                  <input type="checkbox" checked={o.enabled !== false} onChange={(e) => update(s.key, { enabled: e.target.checked })} />
                  Enabled
                </label>
                <GoldButton onClick={() => save(s.key)} size="md">Save</GoldButton>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
