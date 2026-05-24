"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  items: string[];
  reverse?: boolean;
  speed?: number; // seconds for full loop
  className?: string;
}

export default function Marquee({ items, reverse = false, speed = 40, className }: Props) {
  const [paused, setPaused] = useState(false);
  const doubled = [...items, ...items];

  return (
    <div
      className={cn("relative overflow-hidden whitespace-nowrap", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="inline-flex gap-12"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running"
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="font-accent text-sm tracking-widest uppercase opacity-80">
            {item} <span className="text-gold mx-3">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
