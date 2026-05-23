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
  // If it's already a full URL (e.g. YouTube), pass through unchanged
  if (/^https?:\/\//i.test(path)) return path;
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

/** Asset registry — maps friendly slot names to Storage paths or YouTube URLs */
export const ASSETS = {
  // Hero / founder
  hero: "hero/service-hero.jpg.jpeg",
  founderPortrait: "founder/founder-portrait.jpg",
  founderTeaching: "founder/founder-teaching.jpg",

  // Session photos
  serviceSession1: "photos/sessions/WhatsApp Image 2026-05-17 at 10.14.05 PM.jpeg",
  serviceSession2: "photos/sessions/WhatsApp Image 2026-05-17 at 10.14.16 PM.jpeg",
  serviceSession3: "photos/sessions/Screenshot 2026-05-17 215326.png",
  serviceSession4: "photos/sessions/WhatsApp Image 2026-05-17 at 10.28.55 PM.jpeg",

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
  professional1: "photos/professional/WhatsApp Image 2026-05-12 at 2.48.08 PM.jpeg",
  professional2: "photos/professional/service-hero.jpg.jpeg",
  professional3: "photos/professional/service-professional-3.jpg",

  // Certificates (still images on Storage)
  ayush: "certificates/WhatsApp Image 2026-05-14 at 4.47.48 PM.jpeg",
  ryt300: "certificates/ChatGPT Image May 22, 2026, 07_20_56 PM.png",
  ryt200: "certificates/ChatGPT Image May 22, 2026, 07_22_54 PM.png",
  // Service cards 30-34
  cardCorporate: "service-cards/WhatsApp Image 2026-05-14 at 4.53.32 PM.jpeg",
  cardGroup: "service-cards/Screenshot 2026-05-17 215326.png",
  cardPersonal: "service-cards/WhatsApp Image 2026-05-17 at 10.28.55 PM.jpeg",
  cardFertility: "service-cards/WhatsApp Image 2026-05-13 at 4.37.06 PM.jpeg",
  cardTherapeutic: "service-cards/WhatsApp Image 2026-05-17 at 10.52.10 PM.jpeg",
  // How it works 35-39
  step1: "how-it-works/ChatGPT Image May 17, 2026, 10_59_40 PM.png",
  step2: "how-it-works/ChatGPT Image May 17, 2026, 11_00_55 PM.png",
  step3: "how-it-works/ChatGPT Image May 17, 2026, 11_01_52 PM.png",
  step4: "how-it-works/ChatGPT Image May 17, 2026, 11_02_18 PM.png",
  step5: "how-it-works/ChatGPT Image May 17, 2026, 11_04_11 PM.png",
  // Body problems 40-51
  bodyBack: "body-problems/Screenshot 2026-05-17 194450.png",
  bodyNeck: "body-problems/Screenshot 2026-05-17 194714.png",
  bodyKnee: "body-problems/Screenshot 2026-05-17 194751.png",
  bodyShoulder: "body-problems/Screenshot 2026-05-17 194901.png",
  bodyJoint: "body-problems/Screenshot 2026-05-17 194933.png",
  bodySciatica: "body-problems/Screenshot 2026-05-17 195011.png",
  bodyStress: "body-problems/Screenshot 2026-05-17 195056.png",
  bodySleep: "body-problems/Screenshot 2026-05-17 195131.png",
  bodyFatigue: "body-problems/Screenshot 2026-05-17 195304.png",
  bodyWeight: "body-problems/Screenshot 2026-05-17 195414.png",
  bodyDigestion: "body-problems/Screenshot 2026-05-17 195443.png",
  bodyPosture: "body-problems/Screenshot 2026-05-17 195523.png",
  // ── Testimonial videos (YouTube Shorts — vertical) ───────────────
  testimonialVideo1: "https://youtube.com/shorts/8AOxeaIsuig", // Asha Jha
  testimonialVideo2: "https://youtube.com/shorts/y-VdUgur5lE", // Chavi Sharma
  // Testimonial faces
  face1: "testimonials/faces/Screenshot 2026-05-14 125823.png",
  face2: "testimonials/faces/Screenshot 2026-05-14 125842.png",
  face3: "testimonials/faces/Screenshot 2026-05-14 125902.png",
  face4: "testimonials/faces/WhatsApp Image 2026-05-13 at 5.04.14 PM.jpeg",
  face5: "testimonials/faces/WhatsApp Image 2026-05-13 at 5.04.33 PM.jpeg",
  face6: "testimonials/faces/WhatsApp Image 2026-05-13 at 5.05.15 PM.jpeg",
  // Booking bg
  bookingBg: "service-booking-bg.jpg",
  // Sounds
  ambient: "sounds/ambient.mp3",
  chime: "sounds/chime.mp3",
  // Asanas asana-01..21
  asana: (n: number) => `asanas/asana-${String(n).padStart(2, "0")}.jpg`,
  // Corporate photos 20-25
  corporate1: "photos/corporate/WhatsApp Image 2026-05-14 at 4.53.32 PM.jpeg",
  corporate2: "photos/corporate/WhatsApp Image 2026-05-14 at 4.53.33 PM.jpeg",
  corporate3: "photos/corporate/WhatsApp Image 2026-05-14 at 4.10.22 PM.jpeg",
  corporate4: "photos/corporate/Screenshot 2026-05-17 223616.png",
  corporate5: "photos/corporate/Screenshot 2026-05-17 223637.png",
  corporate6: "photos/corporate/WhatsApp Image 2026-05-14 at 4.10.32 PM.jpeg"
} as const;
