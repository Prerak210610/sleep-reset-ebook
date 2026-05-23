import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function whatsappLink(message: string, phone = "917303083757") {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const WA_MESSAGES = {
  general:
    "Hello Dr. Sampoorna, I would like to book a personalized yoga consultation. Please share the next steps.",
  corporate:
    "Hello Dr. Sampoorna, I am interested in Corporate Yoga sessions for my company. Please share details about the program, pricing, and availability.",
  group:
    "Hello Dr. Sampoorna, I am interested in Group Yoga Classes. Please share the schedule, pricing, and available batches.",
  personal:
    "Hello Dr. Sampoorna, I want to book Personal Yoga Classes. Please guide me based on my body concern and goals.",
  fertility:
    "Hello Dr. Sampoorna, I am interested in the Fertility Yoga (SFY) program. Please share consultation details and how the sessions work.",
  therapeutic:
    "Hello Dr. Sampoorna, I need yoga support for a body problem. Please guide me with the right therapeutic yoga service."
} as const;

export function generateBookingRef() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SMP-${ts}-${rand}`;
}

export function formatDate(d: Date | string | number) {
  const date = typeof d === "string" || typeof d === "number" ? new Date(d) : d;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}



/* ------------------------------------------------------------------ */
/* YouTube helpers                                                     */
/* ------------------------------------------------------------------ */

const YT_PATTERNS = [
  /youtu\.be\/([^?&\/\s]+)/,
  /youtube\.com\/watch\?v=([^?&\s]+)/,
  /youtube\.com\/shorts\/([^?&\/\s]+)/,
  /youtube\.com\/embed\/([^?&\/\s]+)/
];

export function isYouTubeUrl(s: string | undefined | null): boolean {
  if (!s) return false;
  return /(?:youtu\.be|youtube\.com)/.test(s);
}

export function youTubeId(url: string): string | null {
  for (const p of YT_PATTERNS) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export function isYouTubeShorts(url: string): boolean {
  return /youtube\.com\/shorts\//.test(url);
}

export function youTubeEmbed(url: string, opts: { autoplay?: boolean } = {}) {
  const id = youTubeId(url);
  if (!id) return "";
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    ...(opts.autoplay ? { autoplay: "1" } : {})
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

export function youTubeThumb(url: string): string {
  const id = youTubeId(url);
  if (!id) return "";
  // maxresdefault is highest quality; not always available, hqdefault is fallback
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

/* ------------------------------------------------------------------ */
/* Logo helpers (Google favicon API — public, real logos for brands)   */
/* ------------------------------------------------------------------ */

export function logoFromDomain(domain: string, size = 128): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
}
