"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useAuth } from "@/stores/auth";
import { getFirebase } from "@/lib/firebase";
import { formatDate } from "@/lib/utils";

interface Item {
  id: string;
  type: "blog" | "video";
  slug?: string;
  title: string;
  at: string;
}

export default function LearningPage() {
  const user = useAuth((s) => s.user);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const { db } = getFirebase();
        const snap = await getDocs(query(collection(db, "users", user.uid, "learning"), orderBy("at", "desc")));
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Item, "id">) })));
      } catch {
        setItems([]);
      }
    })();
  }, [user]);

  const blogReads = items.filter((i) => i.type === "blog");
  const videoWatches = items.filter((i) => i.type === "video");
  const lastBlog = blogReads[0];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-4xl">Learning Progress</h1>
        <p className="font-accent italic opacity-80 mt-2">Articles read, videos watched, and where you left off.</p>
      </header>

      <div className="grid sm:grid-cols-2 gap-5">
        <Stat n={blogReads.length} label="Articles Read" />
        <Stat n={videoWatches.length} label="Videos Watched" />
      </div>

      {lastBlog?.slug && (
        <section className="bg-forest text-creme-warm p-6 grain relative overflow-hidden">
          <p className="font-accent italic text-gold uppercase tracking-widest text-xs">Continue reading</p>
          <p className="font-serif text-2xl mt-2">{lastBlog.title}</p>
          <Link href={`/blog/${lastBlog.slug}`} className="font-accent italic text-gold hover:underline mt-4 inline-block">
            Resume →
          </Link>
        </section>
      )}

      {items.length > 0 && (
        <section>
          <h2 className="font-serif text-2xl mb-4">Recent Activity</h2>
          <div className="space-y-2">
            {items.slice(0, 20).map((i) => (
              <div key={i.id} className="bg-creme dark:bg-forest border border-[var(--line)] p-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-accent italic text-gold">{i.type}</p>
                  <p className="font-serif text-lg">{i.title}</p>
                </div>
                <span className="text-[10px] uppercase tracking-widest opacity-60">{formatDate(i.at)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {items.length === 0 && (
        <p className="font-accent italic opacity-70">Start reading articles or watching videos to track your progress.</p>
      )}
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="bg-creme dark:bg-forest border border-[var(--line)] p-6">
      <p className="font-serif text-5xl text-gold-shine">{n}</p>
      <p className="text-[11px] uppercase tracking-widest font-accent italic mt-1 opacity-80">{label}</p>
    </div>
  );
}
