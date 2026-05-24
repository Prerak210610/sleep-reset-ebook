"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Bookmark, Share2, Copy, Check } from "lucide-react";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import StorageImage from "@/components/StorageImage";
import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import LineReveal from "@/components/animations/LineReveal";
import { BLOG_POSTS } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { getFirebase } from "@/lib/firebase";
import { useAuth } from "@/stores/auth";

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const user = useAuth((s) => s.user);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const related = useMemo(
    () => BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3),
    [slug]
  );

  useEffect(() => {
    if (!post) return;
    const ls = localStorage.getItem("ds-bookmarks");
    const list: string[] = ls ? JSON.parse(ls) : [];
    setBookmarked(list.includes(post.slug));
  }, [post]);

  // Track read in /users/{uid}/learning
  useEffect(() => {
    if (!post || !user) return;
    (async () => {
      try {
        const { db } = getFirebase();
        await setDoc(
          doc(db, "users", user.uid, "learning", `read-${post.slug}`),
          {
            type: "blog",
            slug: post.slug,
            title: post.title,
            at: new Date().toISOString()
          },
          { merge: true }
        );
      } catch {
        /* ignore */
      }
    })();
  }, [post, user]);

  if (!post) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl">Article not found</h1>
          <Link href="/blog" className="font-accent italic text-gold mt-4 inline-block">
            ← Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  const toggleBookmark = async () => {
    const next = !bookmarked;
    setBookmarked(next);
    const ls = localStorage.getItem("ds-bookmarks");
    const list: string[] = ls ? JSON.parse(ls) : [];
    const updated = next ? [...new Set([...list, post.slug])] : list.filter((s) => s !== post.slug);
    localStorage.setItem("ds-bookmarks", JSON.stringify(updated));

    if (user) {
      try {
        const { db } = getFirebase();
        const ref = doc(db, "users", user.uid, "bookmarks", post.slug);
        if (next) {
          await setDoc(ref, { slug: post.slug, title: post.title, cover: post.cover, savedAt: new Date().toISOString() });
        } else {
          await deleteDoc(ref);
        }
      } catch {
        /* ignore */
      }
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const url = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${post.title} — Dr. Sampoorna`;

  return (
    <article className="bg-creme dark:bg-chocolate-deep">
      <header className="relative -mt-[106px] pt-[140px] pb-16 text-creme-warm overflow-hidden">
        <div className="absolute inset-0">
          <StorageImage path={post.cover} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-chocolate-deep/80" />
          <div className="absolute inset-0 grain pointer-events-none" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 md:px-10">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">{post.category}</span>
          <WordReveal as="h1" className="font-serif text-display-lg mt-4 leading-[1.05]">
            {post.title}
          </WordReveal>
          <p className="text-sm uppercase tracking-widest opacity-80 mt-6">{formatDate(post.date)}</p>
        </div>
      </header>

      <GoldWipe />

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        {/* Action bar */}
        <div className="flex items-center gap-3 mb-10 pb-6 border-b border-[var(--line)]">
          <button
            onClick={toggleBookmark}
            className={`flex items-center gap-2 px-4 py-2 border ${
              bookmarked ? "border-gold text-gold" : "border-[var(--line)]"
            } text-xs uppercase tracking-widest font-accent italic hover:text-gold hover:border-gold transition`}
            data-magnetic="true"
          >
            <Bookmark size={14} fill={bookmarked ? "currentColor" : "none"} /> {bookmarked ? "Saved" : "Bookmark"}
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${shareText} — ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-[var(--line)] text-xs uppercase tracking-widest font-accent italic hover:text-gold hover:border-gold transition"
            data-magnetic="true"
          >
            WhatsApp
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-[var(--line)] text-xs uppercase tracking-widest font-accent italic hover:text-gold hover:border-gold transition"
            data-magnetic="true"
          >
            Twitter
          </a>
          <button
            onClick={copyLink}
            className="ml-auto flex items-center gap-2 px-4 py-2 border border-[var(--line)] text-xs uppercase tracking-widest font-accent italic hover:text-gold hover:border-gold transition"
            data-magnetic="true"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy Link"}
          </button>
        </div>

        <LineReveal className="prose-content space-y-6 text-lg leading-prose">
          {post.body.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </LineReveal>
      </div>

      {/* Related */}
      <section className="bg-creme-soft dark:bg-forest-deep py-20">
        <GoldWipe />
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h3 className="font-serif text-3xl mb-8">Continue Reading</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group bg-creme dark:bg-forest border border-[var(--line)] hover:-translate-y-1 transition-transform"
                data-magnetic="true"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <StorageImage path={p.cover} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-widest font-accent italic text-gold">{p.category}</span>
                  <p className="font-serif text-xl mt-2 leading-tight">{p.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
