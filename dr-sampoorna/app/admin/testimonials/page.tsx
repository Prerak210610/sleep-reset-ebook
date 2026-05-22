"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getFirebase } from "@/lib/firebase";
import GoldButton from "@/components/GoldButton";
import { Trash2 } from "lucide-react";

interface Tw {
  id: string;
  name: string;
  role: string;
  image: string;
  stars: number;
  text: string;
  hidden?: boolean;
}

export default function AdminTestimonials() {
  const [items, setItems] = useState<Tw[]>([]);
  const [draft, setDraft] = useState({ name: "", role: "", image: "", stars: 5, text: "" });

  const load = async () => {
    const { db } = getFirebase();
    const snap = await getDocs(collection(db, "testimonials"));
    setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Tw, "id">) })));
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!draft.name || !draft.text) return;
    const { db } = getFirebase();
    await addDoc(collection(db, "testimonials"), { ...draft, hidden: false, createdAt: serverTimestamp() });
    setDraft({ name: "", role: "", image: "", stars: 5, text: "" });
    load();
  };

  const remove = async (id: string) => {
    const { db } = getFirebase();
    await deleteDoc(doc(db, "testimonials", id));
    load();
  };

  const toggle = async (i: Tw) => {
    const { db } = getFirebase();
    await updateDoc(doc(db, "testimonials", i.id), { hidden: !i.hidden });
    load();
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-4xl">Testimonials</h1>
        <p className="font-accent italic opacity-80 mt-2">Edit written testimonials shown on the homepage.</p>
      </header>

      <section className="bg-creme dark:bg-forest p-6 border border-[var(--line)] space-y-4">
        <h2 className="font-serif text-2xl">Add new</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Name" className="bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none" />
          <input value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} placeholder="Role" className="bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none" />
          <input value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })} placeholder="Image storage path (e.g. testimonials/faces/x.jpg)" className="md:col-span-2 bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none" />
          <input type="number" min={1} max={5} value={draft.stars} onChange={(e) => setDraft({ ...draft, stars: Number(e.target.value) })} placeholder="Stars (1-5)" className="bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none" />
          <textarea value={draft.text} onChange={(e) => setDraft({ ...draft, text: e.target.value })} placeholder="Testimonial text" rows={3} className="md:col-span-2 bg-transparent border border-[var(--line)] focus:border-gold p-3 outline-none resize-none" />
        </div>
        <GoldButton onClick={add}>Add testimonial</GoldButton>
      </section>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((t) => (
          <article key={t.id} className={`bg-creme dark:bg-forest p-5 border ${t.hidden ? "border-red-500/40 opacity-60" : "border-[var(--line)]"}`}>
            <p className="font-serif text-xl">{t.name}</p>
            <p className="text-xs uppercase tracking-widest opacity-70">{t.role} · {t.stars}★</p>
            <p className="text-sm mt-3 italic font-accent opacity-90">"{t.text}"</p>
            <div className="mt-4 flex justify-between">
              <button onClick={() => toggle(t)} className="text-xs uppercase tracking-widest font-accent italic">
                {t.hidden ? "Show" : "Hide"}
              </button>
              <button onClick={() => remove(t.id)} className="text-red-500 hover:opacity-70" aria-label="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </article>
        ))}
        {items.length === 0 && <p className="font-accent italic opacity-70 col-span-2">No custom testimonials. Site is showing built-in defaults.</p>}
      </div>
    </div>
  );
}
