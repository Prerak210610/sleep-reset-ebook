"use client";

import { getDownloadURL, ref } from "firebase/storage";
import { getFirebase } from "./firebase";

const cache = new Map<string, string>();

/**
 * Resolve a Firebase Storage path to a download URL, OR pass through a full URL.
 * Falls back to a placeholder gradient if not found, so the UI never breaks
 * before assets are uploaded.
 */
export async function resolveAsset(path: string, fallback?: string): Promise<string> {
  if (!path) return fallback ?? "";
  // Full URL (e.g. YouTube) — pass through unchanged
  if (/^https?:\/\//i.test(path)) return path;
  // Public folder path — served by Next.js as a static asset
  if (path.startsWith("/")) return path;
  if (cache.has(path)) return cache.get(path)!;
  try {
    const { storage } = getFirebase();
    const url = await getDownloadURL(ref(storage, path));
    cache.set(path, url);
    return url;
  } catch {
    if (fallback) {
      cache.set(path, fallback);
      return fallback;
    }
    return "";
  }
}

/** Asset registry — local public/images files, YouTube URLs, or Firebase Storage paths */
export const ASSETS = {
  // Hero / founder — placeholders until uploaded
  hero: "/images/WhatsApp Image 2026-05-12 at 2.48.08 PM.jpeg", // also used as professional1
  founderPortrait: "/images/WhatsApp Image 2026-05-12 at 2.48.08 PM.jpeg",
  founderTeaching: "founder/founder-teaching.jpg",

  // Session photos — most still pending upload
  serviceSession1: "/images/WhatsApp Image 2026-05-17 at 10.14.05 PM.jpeg",
  serviceSession2: "/images/WhatsApp Image 2026-05-17 at 10.14.16 PM.jpeg",
  serviceSession3: "/images/Screenshot 2026-05-17 215326.png",
  serviceSession4: "/images/WhatsApp Image 2026-05-17 at 10.28.55 PM.jpeg",

  // ── News videos (YouTube URLs) ────────────────────────────────────
  newsIndiaTV: "https://youtu.be/23wa9LMDqVs",
  newsZee:     "https://youtu.be/1lResLlpRvM",
  newsDarshan: "https://youtu.be/NBCVkhIR-RY",
  news24:      "https://youtu.be/QK1pYRt0CBc",

  // ── India TV Wellness Series (YouTube URLs) ───────────────────────
  wellness1: "https://youtu.be/B6VlxPBpuZc", // Low BP
  wellness2: "https://youtu.be/WwM-RRisFXg", // High BP & Stress
  wellness3: "https://youtu.be/eXzoSgbrB8c", // Eye Wellness
  wellness4: "https://youtu.be/aaiSxlTHhc4", // Face Glow
  wellness5: "https://youtu.be/23wa9LMDqVs", // Cervical
  wellness6: "https://youtu.be/ZTj2svDmc6Q", // Frozen Shoulder
  wellness7: "https://youtu.be/x5UU6InGQS8", // Sleep

  // ── Atal Mithila Samman (YouTube) ─────────────────────────────────
  atalMithila: "https://youtu.be/o6rclXU5EYo",

  // Professional photos
  professional1: "/images/WhatsApp Image 2026-05-12 at 2.48.08 PM.jpeg",
  professional2: "/images/WhatsApp Image 2026-05-12 at 2.48.08 PM.jpeg",
  professional3: "photos/professional/service-professional-3.jpg",

  // Certificates
  ayush:  "/images/WhatsApp Image 2026-05-14 at 4.47.48 PM.jpeg",
  ryt300: "/images/ChatGPT Image May 22, 2026, 07_20_56 PM.png",
  ryt200: "/images/ChatGPT Image May 22, 2026, 07_22_54 PM.png",

  // Service cards
  cardCorporate:   "/images/WhatsApp Image 2026-05-14 at 4.53.32 PM.jpeg",
  cardGroup:       "/images/Screenshot 2026-05-17 215326.png",
  cardPersonal:    "/images/WhatsApp Image 2026-05-17 at 10.28.55 PM.jpeg",
  cardFertility:   "/images/WhatsApp Image 2026-05-13 at 4.37.06 PM.jpeg",
  cardTherapeutic: "/images/WhatsApp Image 2026-05-17 at 10.52.10 PM.jpeg",

  // How it works steps
  step1: "/images/ChatGPT Image May 17, 2026, 10_59_40 PM.png",
  step2: "/images/ChatGPT Image May 17, 2026, 11_00_55 PM.png",
  step3: "/images/ChatGPT Image May 17, 2026, 11_01_52 PM.png",
  step4: "/images/ChatGPT Image May 17, 2026, 11_02_18 PM.png",
  step5: "/images/ChatGPT Image May 17, 2026, 11_04_11 PM.png",

  // Body problems
  bodyBack:      "/images/Screenshot 2026-05-17 194450.png",
  bodyNeck:      "/images/Screenshot 2026-05-17 194714.png",
  bodyKnee:      "/images/Screenshot 2026-05-17 194751.png",
  bodyShoulder:  "/images/Screenshot 2026-05-17 194901.png",
  bodyJoint:     "/images/Screenshot 2026-05-17 194933.png",
  bodySciatica:  "/images/Screenshot 2026-05-17 195011.png",
  bodyStress:    "/images/Screenshot 2026-05-17 195056.png",
  bodySleep:     "/images/Screenshot 2026-05-17 195131.png",
  bodyFatigue:   "/images/Screenshot 2026-05-17 195304.png",
  bodyWeight:    "/images/Screenshot 2026-05-17 195414.png",
  bodyDigestion: "/images/Screenshot 2026-05-17 195443.png",
  bodyPosture:   "/images/Screenshot 2026-05-17 195523.png",

  // ── Testimonial videos (YouTube Shorts — vertical) ───────────────
  testimonialVideo1: "https://youtube.com/shorts/8AOxeaIsuig", // Asha Jha
  testimonialVideo2: "https://youtube.com/shorts/y-VdUgur5lE", // Chavi Sharma

  // Booking bg / sounds — pending
  bookingBg: "service-booking-bg.jpg",
  ambient: "sounds/ambient.mp3",
  chime: "sounds/chime.mp3",

  // Asanas — looked up by name (see content.ts ASANAS array)
  asana: (n: number) => `/images/asanas/asana-${String(n).padStart(2, "0")}.jpg`,

  // Corporate photos
  corporate1: "/images/WhatsApp Image 2026-05-14 at 4.53.32 PM.jpeg",
  corporate2: "/images/WhatsApp Image 2026-05-14 at 4.53.33 PM.jpeg",
  corporate3: "/images/WhatsApp Image 2026-05-14 at 4.10.22 PM.jpeg",
  corporate4: "/images/Screenshot 2026-05-17 223616.png",
  corporate5: "/images/Screenshot 2026-05-17 223637.png",
  corporate6: "/images/WhatsApp Image 2026-05-14 at 4.10.32 PM.jpeg"
} as const;
