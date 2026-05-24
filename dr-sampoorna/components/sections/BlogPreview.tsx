"use client";

import Link from "next/link";
import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import CardReveal from "@/components/animations/CardReveal";
import StorageImage from "@/components/StorageImage";
import { BLOG_POSTS } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { useLang } from "@/stores/lang";

export default function BlogPreview() {
  const tt = useLang((s) => s.t);
  return (
    <section className="relative py-24 md:py-32 bg-creme dark:bg-chocolate-deep">
      <GoldWipe />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
              The Journal
            </span>
            <WordReveal as="h2" className="font-serif text-display-lg mt-3">
              {tt("sec.blog.h")}
            </WordReveal>
          </div>
          <Link
            href="/blog"
            className="font-accent italic text-gold tracking-wide hover:translate-x-1 transition-transform inline-flex items-center gap-2"
            data-magnetic="true"
          >
            {tt("sec.blog.cta")} <span aria-hidden>→</span>
          </Link>
        </div>

        <CardReveal className="grid md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group block bg-creme-soft dark:bg-forest border border-[var(--line)] hover:-translate-y-1 transition-transform"
              data-magnetic="true"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <StorageImage path={p.cover} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <span className="text-[10px] uppercase tracking-widest font-accent italic text-gold">
                  {p.category}
                </span>
                <h3 className="font-serif text-2xl mt-3 leading-tight">{p.title}</h3>
                <p className="text-sm opacity-80 mt-3 leading-prose">{p.excerpt}</p>
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
  );
}
