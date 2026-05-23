"use client";

import { useState } from "react";
import { cn, logoFromDomain } from "@/lib/utils";

interface Item {
  name: string;
  domain?: string;
}

interface Props {
  items: Item[];
  reverse?: boolean;
  speed?: number; // seconds for full loop
  className?: string;
}

/**
 * Premium partner/media logo strip.
 * - Renders a real logo via Google favicon API when a domain is supplied
 * - Falls back to elegant text wordmark when no domain or image fails
 * - Sepia + 80% opacity treatment so all logos read as a unified set on
 *   chocolate / cream backgrounds
 */
export default function LogoMarquee({ items, reverse = false, speed = 50, className }: Props) {
  const [paused, setPaused] = useState(false);
  const doubled = [...items, ...items];

  return (
    <div
      className={cn("relative overflow-hidden whitespace-nowrap", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="inline-flex items-center gap-12"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running"
        }}
      >
        {doubled.map((item, i) => (
          <LogoBadge key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

function LogoBadge({ item }: { item: Item }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = item.domain && !logoFailed;

  return (
    <span className="inline-flex items-center gap-3 opacity-85 hover:opacity-100 transition-opacity">
      {showLogo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoFromDomain(item.domain!, 128)}
          alt={item.name}
          width={28}
          height={28}
          onError={() => setLogoFailed(true)}
          className="w-7 h-7 object-contain"
          style={{ filter: "saturate(0.9) contrast(1.05)" }}
        />
      )}
      <span className="font-accent italic text-sm tracking-widest uppercase">
        {item.name}
      </span>
      <span className="text-gold ml-3">·</span>
    </span>
  );
}
