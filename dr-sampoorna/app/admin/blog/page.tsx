"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getFirebase } from "@/lib/firebase";
import GoldButton from "@/components/GoldButton";
import { Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Post {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string;
  cover: string;
  date: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  published?: boolean;
}

const CATEGORIES = [
  "Yogic Science & Research",
  "Therapeutic Yoga",
  "Fertility & Hormonal Wellness",
  "Corporate Wellness",
  "Sleep & Breathwork",
  "Body Pain & Recovery",
  "Lifestyle & Daily Wellness"
];

export default function AdminBlog() {
  const [items, setItems] = useState<Post[]>([]);
  const [draft, setDraft] = useState<Partial<Post>>({
    slug: "",
    title: "",
    category: CATEGORIES[0],
    excerpt: "",
    body: "",
    cover: "",
    date: new Date().toISOString().slice(0, 10),
    published: true
  });

  const load = async () => {
    const { db } = getFirebase();
    const snap = await getDocs(collection(db, "blogPosts"));
    setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Post, "id">) })));
  };
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!draft.title || !draft.slug) return;
    const { db } = getFirebase();
    await addDoc(collection(db, "blogPosts"), { ...draft, createdAt: serverTimestamp() });
    setDraft({ slug: "", title: "", category: CATEGORIES[0], excerpt: "", body: "", cover: "", date: new Date().toISOString().slice(0, 10), published: true });
    load();
  };

  const remove = async (id: string) => {
    const { db } = getFirebase();
    await deleteDoc(doc(db, "blogPosts", id));
    load();
  };

  const togglePublished = async (p: Post) => {
    const { db } = getFirebase();
    await updateDoc(doc(db, "blogPosts", p.id), { published: !p.published });
    load();
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-4xl">Blog CMS</h1>
        <p className="font-accent italic opacity-80 mt-2">Create, publish, manage articles.</p>
      </header>

      <section className="bg-creme dark:bg-forest p-6 border border-[var(--line)] space-y-3">
        <h2 className="font-serif text-2xl">New Post</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <input value={draft.title ?? ""} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Title" className="bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none" />
          <input value={draft.slug ?? ""} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} placeholder="URL slug" className="bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none" />
          <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className="bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none">
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} className="bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none" />
          <input value={draft.cover ?? ""} onChange={(e) => setDraft({ ...draft, cover: e.target.value })} placeholder="Cover storage path" className="md:col-span-2 bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none" />
          <textarea value={draft.excerpt ?? ""} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} placeholder="Excerpt" rows={2} className="md:col-span-2 bg-transparent border border-[var(--line)] focus:border-gold p-3 outline-none resize-none" />
          <textarea value={draft.body ?? ""} onChange={(e) => setDraft({ ...draft, body: e.target.value })} placeholder="Body (use blank lines between paragraphs)" rows={6} className="md:col-span-2 bg-transparent border border-[var(--line)] focus:border-gold p-3 outline-none resize-none" />
          <input value={draft.metaTitle ?? ""} onChange={(e) => setDraft({ ...draft, metaTitle: e.target.value })} placeholder="SEO meta title" className="bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none" />
          <input value={draft.metaDescription ?? ""} onChange={(e) => setDraft({ ...draft, metaDescription: e.target.value })} placeholder="SEO meta description" className="bg-transparent border-b border-[var(--line)] focus:border-gold py-2 outline-none" />
        </div>
        <GoldButton onClick={create}>Publish</GoldButton>
      </section>

      <div className="space-y-3">
        {items.map((p) => (
          <article key={p.id} className="bg-creme dark:bg-forest p-5 border border-[var(--line)] flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-widest font-accent italic text-gold">{p.category}</p>
              <p className="font-serif text-xl truncate">{p.title}</p>
              <p className="text-xs opacity-60 mt-1">{p.date && formatDate(p.date)} · /blog/{p.slug}</p>
            </div>
            <button onClick={() => togglePublished(p)} className="text-xs uppercase tracking-widest font-accent italic">
              {p.published ? "Unpublish" : "Publish"}
            </button>
            <button onClick={() => remove(p.id)} className="text-red-500"><Trash2 size={16} /></button>
          </article>
        ))}
        {items.length === 0 && <p className="font-accent italic opacity-70">No posts yet. Built-in default posts are still showing on /blog.</p>}
      </div>
    </div>
  );
}
