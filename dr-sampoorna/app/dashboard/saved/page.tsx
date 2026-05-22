"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "@/stores/auth";
import { getFirebase } from "@/lib/firebase";
import StorageImage from "@/components/StorageImage";
import { Trash2 } from "lucide-react";
import { BLOG_POSTS } from "@/lib/content";

interface Saved {
  slug: string;
  title: string;
  cover: string;
}

export default function SavedPage() {
  const user = useAuth((s) => s.user);
  const [items, setItems] = useState<Saved[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          const { db } = getFirebase();
          const snap = await getDocs(collection(db, "users", user.uid, "bookmarks"));
          setItems(snap.docs.map((d) => d.data() as Saved));
        } catch {
          /* fall through to localStorage */
        }
      }
      const ls = localStorage.getItem("ds-bookmarks");
      const slugs: string[] = ls ? JSON.parse(ls) : [];
      const fromLocal = BLOG_POSTS.filter((p) => slugs.includes(p.slug)).map((p) => ({
        slug: p.slug,
        title: p.title,
        cover: p.cover
      }));
      setItems((prev) => (prev.length ? prev : fromLocal));
      setLoading(false);
    })();
  }, [user]);

  const remove = async (slug: string) => {
    setItems((s) => s.filter((x) => x.slug !== slug));
    if (user) {
      try {
        const { db } = getFirebase();
        await deleteDoc(doc(db, "users", user.uid, "bookmarks", slug));
      } catch {
        /* ignore */
      }
    }
    const ls = localStorage.getItem("ds-bookmarks");
    const list: string[] = ls ? JSON.parse(ls) : [];
    localStorage.setItem("ds-bookmarks", JSON.stringify(list.filter((s) => s !== slug)));
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-4xl">Saved Articles</h1>
        <p className="font-accent italic opacity-80 mt-2">Your bookmarks. Always with you.</p>
      </header>

      {loading ? (
        <p className="font-accent italic opacity-70">Loading…</p>
      ) : items.length === 0 ? (
        <div className="bg-creme dark:bg-forest border border-[var(--line)] p-10 text-center">
          <p className="font-accent italic opacity-80 mb-4">No saved articles yet.</p>
          <Link href="/blog" className="font-accent italic text-gold underline">Browse the journal →</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((p) => (
            <article key={p.slug} className="group bg-creme dark:bg-forest border border-[var(--line)] flex">
              <div className="relative w-32 flex-none">
                <StorageImage path={p.cover} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-5 flex flex-col">
                <p className="font-serif text-xl leading-tight">{p.title}</p>
                <div className="mt-auto pt-4 flex gap-3 items-center">
                  <Link href={`/blog/${p.slug}`} className="text-xs uppercase tracking-widest font-accent italic text-gold">
                    Read →
                  </Link>
                  <button onClick={() => remove(p.slug)} className="ml-auto text-[var(--muted)] hover:text-red-500 transition" aria-label="Remove">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
