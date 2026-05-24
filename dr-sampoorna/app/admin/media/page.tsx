"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getFirebase } from "@/lib/firebase";
import GoldButton from "@/components/GoldButton";
import { Trash2 } from "lucide-react";

interface Item {
  id: string;
  type: "video" | "photo";
  gallery: "news" | "wellness-series" | "sessions" | "corporate" | "professional" | "asanas";
  title: string;
  description?: string;
  path: string;
  enabled?: boolean;
  order?: number;
}

const GALLERIES = ["news", "wellness-series", "sessions", "corporate", "professional", "asanas"] as const;

export default function AdminMedia() {
  const [items, setItems] = useState<Item[]>([]);
  const [draft, setDraft] = useState<Partial<Item>>({ type: "video", gallery: "news", title: "", path: "", enabled: true });

  const load = async () => {
    const { db } = getFirebase();
    const snap = await getDocs(collection(db, "media"));
    setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Item, "id">) })));
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!draft.title || !draft.path) return;
    const { db } = getFirebase();
    await addDoc(collection(db, "media"), { ...draft, createdAt: serverTimestamp() });
    setDraft({ type: "video", gallery: "news", title: "", path: "", enabled: true });
    load();
  };

  const remove = async (id: string) => {
    const { db } = getFirebase();
    await deleteDoc(doc(db, "media", id));
    load();
  };

  const toggle = async (i: Item) => {
    const { db } = getFirebase();
    await updateDoc(doc(db, "media", i.id), { enabled: !i.enabled });
    load();
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-4xl">Media</h1>
        <p className="font-accent italic opacity-80 mt-2">Manage videos, photos, gallery assignments.</p>
      </header>

      <section className="bg-creme dark:bg-forest p-5 border border-[var(--line)] space-y-3">
        <h2 className="font-serif text-2xl">Add asset</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as Item["type"] })} className="bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none">
            <option value="video">Video</option>
            <option value="photo">Photo</option>
          </select>
          <select value={draft.gallery} onChange={(e) => setDraft({ ...draft, gallery: e.target.value as Item["gallery"] })} className="bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none">
            {GALLERIES.map((g) => <option key={g}>{g}</option>)}
          </select>
          <input value={draft.title ?? ""} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Title" className="bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none" />
          <input value={draft.path ?? ""} onChange={(e) => setDraft({ ...draft, path: e.target.value })} placeholder="Storage path" className="bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none" />
          <input value={draft.description ?? ""} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="Description" className="md:col-span-2 bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none" />
        </div>
        <GoldButton onClick={add}>Add</GoldButton>
      </section>

      <div className="grid md:grid-cols-2 gap-3">
        {items.map((i) => (
          <article key={i.id} className="bg-creme dark:bg-forest p-5 border border-[var(--line)] flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-accent italic text-gold">{i.type} · {i.gallery}</p>
              <p className="font-serif text-lg">{i.title}</p>
              <p className="text-xs opacity-60 truncate">{i.path}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button onClick={() => toggle(i)} className="text-xs uppercase tracking-widest font-accent italic">
                {i.enabled ? "Disable" : "Enable"}
              </button>
              <button onClick={() => remove(i.id)} className="text-red-500"><Trash2 size={14} /></button>
            </div>
          </article>
        ))}
        {items.length === 0 && (
          <p className="md:col-span-2 font-accent italic opacity-70">
            No custom media yet. Site is showing built-in defaults from <code>lib/storage.ts</code>.
          </p>
        )}
      </div>
    </div>
  );
}
