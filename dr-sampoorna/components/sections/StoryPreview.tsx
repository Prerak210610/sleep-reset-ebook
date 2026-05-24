"use client";

import StickyImageScroll from "@/components/animations/StickyImageScroll";
import GoldWipe from "@/components/animations/GoldWipe";
import { ASSETS } from "@/lib/storage";
import Link from "next/link";

export default function StoryPreview() {
  return (
    <div className="relative bg-creme-soft dark:bg-forest-deep">
      <GoldWipe />
      <StickyImageScroll
        kicker="Where It Started"
        heading="22 years ago, a question changed everything."
        slides={[
          {
            path: ASSETS.founderPortrait,
            caption: "A practice rooted in the lived weight of every body.",
            alt: "Dr. Sampoorna early years"
          },
          {
            path: ASSETS.founderTeaching,
            caption: "Every session is a conversation between body and breath.",
            alt: "Dr. Sampoorna teaching"
          },
          {
            path: ASSETS.serviceSession1,
            caption: "5000 lives — and counting.",
            alt: "Group session"
          }
        ]}
      />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-28">
        <Link
          href="/about"
          className="inline-flex items-center gap-3 font-accent italic text-gold tracking-wide hover:gap-5 transition-all"
          data-magnetic="true"
        >
          Read the full story
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
