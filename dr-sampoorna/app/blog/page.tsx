"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import StorageImage from "@/components/StorageImage";
import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import CardReveal from "@/components/animations/CardReveal";
import { BLOG_POSTS } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { getFirebase } from "@/lib/firebase";

interface Post {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  cover: string;
  body: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>(BLOG_POSTS);

  useEffect(() => {
    (async () => {
      try {
        const { db } = getFirebase();
        const snap = await getDocs(query(collection(db, "blogPosts"), orderBy("date", "desc")));
        if (!snap.empty) {
          setPosts(snap.docs.map((d) => d.data() as Post));
        }
      } catch {
        /* defaults */
      }
    })();
  }, []);

  const [featured, ...rest] = posts;

  return (
    <>
      {/* Featured hero */}
      {featured && (
        <section className="relative -mt-[106px] pt-[140px] pb-20 text-creme-warm overflow-hidden">
          <div className="absolute inset-0">
            <StorageImage path={featured.cover} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-chocolate-deep/75" />
            <div className="absolute inset-0 grain pointer-events-none" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 md:px-10">
            <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
              Featured · {featured.category}
            </span>
            <WordReveal as="h1" className="font-serif text-display-xl mt-4 max-w-4xl leading-[1.05]">
              {featured.title}
            </WordReveal>
            <p className="font-accent italic text-lg mt-6 opacity-90 max-w-2xl">{featured.excerpt}</p>
            <Link
              href={`/blog/${featured.slug}`}
              className="mt-8 inline-flex items-center gap-3 font-accent italic text-gold tracking-wide hover:gap-5 transition-all"
              data-magnetic="true"
            >
              Read article <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      )}

      <section className="relative py-20 md:py-28 bg-creme dark:bg-chocolate-deep">
        <GoldWipe />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="mb-10">
            <span className="font-accent italic text-gold uppercase tracking-widest text-xs">Articles</span>
            <h2 className="font-serif text-display-md mt-2">From the Journal</h2>
          </div>
          <CardReveal className="grid md:grid-cols-3 gap-8">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group bg-creme-soft dark:bg-forest border border-[var(--line)] hover:-translate-y-1 transition-transform"
                data-magnetic="true"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <StorageImage path={p.cover} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <span className="text-[10px] uppercase tracking-widest font-accent italic text-gold">
                    {p.category}
                  </span>
                  <h3 className="font-serif text-2xl mt-2 leading-tight">{p.title}</h3>
                  <p className="text-sm opacity-80 mt-3 leading-prose line-clamp-3">{p.excerpt}</p>
                  <div className="flex items-center justify-between mt-5 text-[11px] uppercase tracking-widest opacity-70">
                    <span>{formatDate(p.date)}</span>
                    <span>Read More →</span>
                  </div>
                </div>
              </Link>
            ))}
          </CardReveal>
        </div>
      </section>
    </>
  );
}
