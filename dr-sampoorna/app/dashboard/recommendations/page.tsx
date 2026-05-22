"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/stores/auth";
import { getFirebase } from "@/lib/firebase";
import { SERVICES, BLOG_POSTS } from "@/lib/content";
import StorageImage from "@/components/StorageImage";

const CONCERN_TO_SERVICE: Record<string, string[]> = {
  "Back Pain": ["therapeutic", "personal"],
  "Neck/Shoulder Pain": ["therapeutic", "personal"],
  "Knee/Joint Pain": ["therapeutic", "personal"],
  "Hormonal/PCOD/PCOS": ["fertility", "personal"],
  Fertility: ["fertility", "personal"],
  "Stress/Anxiety": ["personal", "group"],
  Sleep: ["therapeutic", "personal"],
  Weight: ["personal", "group"],
  "Corporate Wellness": ["corporate"],
  "General Fitness": ["group", "personal"]
};

const CONCERN_TO_BLOG: Record<string, string[]> = {
  Fertility: ["what-is-sampoorna-fertility-yoga"],
  "Hormonal/PCOD/PCOS": ["what-is-sampoorna-fertility-yoga"],
  "Back Pain": ["back-pain-three-mistakes"],
  "Corporate Wellness": ["yoga-for-corporate-burnout"]
};

export default function RecommendationsPage() {
  const user = useAuth((s) => s.user);
  const [concerns, setConcerns] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { db } = getFirebase();
      const snap = await getDoc(doc(db, "users", user.uid));
      const c = (snap.data()?.onboarding?.concerns ?? []) as string[];
      setConcerns(c);
    })();
  }, [user]);

  const recommendedServiceKeys = Array.from(
    new Set(concerns.flatMap((c) => CONCERN_TO_SERVICE[c] ?? []))
  );
  const recommendedServices = SERVICES.filter((s) => recommendedServiceKeys.includes(s.key));
  const recommendedBlogSlugs = Array.from(new Set(concerns.flatMap((c) => CONCERN_TO_BLOG[c] ?? [])));
  const recommendedBlogs = BLOG_POSTS.filter((p) => recommendedBlogSlugs.includes(p.slug));

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-4xl">Personalized for You</h1>
        <p className="font-accent italic opacity-80 mt-2">
          Based on your wellness concerns: {concerns.length ? concerns.join(", ") : "complete your onboarding to personalize"}
        </p>
      </header>

      {recommendedServices.length > 0 && (
        <section>
          <h2 className="font-serif text-2xl mb-4">Recommended Services</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {recommendedServices.map((s) => (
              <Link
                key={s.key}
                href={`/services#${s.key}`}
                className="group bg-creme dark:bg-forest border border-[var(--line)] hover:-translate-y-1 transition-transform overflow-hidden"
                data-magnetic="true"
              >
                <div className="relative aspect-[16/10] grain bg-creme-warm">
                  <StorageImage path={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <p className="font-serif text-2xl">{s.title}</p>
                  <p className="font-accent italic text-sm opacity-80 mt-1">{s.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {recommendedBlogs.length > 0 && (
        <section>
          <h2 className="font-serif text-2xl mb-4">Reading For You</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {recommendedBlogs.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group bg-creme dark:bg-forest border border-[var(--line)] hover:-translate-y-1 transition-transform overflow-hidden"
                data-magnetic="true"
              >
                <div className="relative aspect-[16/10] grain bg-creme-warm">
                  <StorageImage path={p.cover} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-widest font-accent italic text-gold">{p.category}</span>
                  <p className="font-serif text-xl mt-1">{p.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {recommendedServices.length === 0 && recommendedBlogs.length === 0 && (
        <div className="bg-creme dark:bg-forest border border-[var(--line)] p-10 text-center">
          <p className="font-accent italic opacity-80">
            Complete your onboarding to see personalised recommendations.
          </p>
        </div>
      )}
    </div>
  );
}
