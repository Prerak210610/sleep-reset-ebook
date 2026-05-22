"use client";

import { getDownloadURL, ref } from "firebase/storage";
import { getFirebase } from "./firebase";

const cache = new Map<string, string>();

/**
 * Resolve a Firebase Storage path to a download URL.
 * Falls back to a placeholder gradient if not found, so the UI never breaks
 * before assets are uploaded.
 */
export async function resolveAsset(path: string, fallback?: string): Promise<string> {
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

/** Asset registry — maps friendly slot names to Storage paths per the upload table */
export const ASSETS = {
  hero: "hero/service-hero.jpg",
  founderPortrait: "founder/founder-portrait.jpg",
  founderTeaching: "founder/founder-teaching.jpg",
  serviceSession1: "photos/sessions/WhatsApp Image 2026-05-17 at 10.14.05 PM.jpeg",
  serviceSession2: "photos/sessions/WhatsApp Image 2026-05-17 at 10.14.16 PM.jpeg",
  serviceSession3: "photos/sessions/Screenshot 2026-05-17 215326.png",
  serviceSession4: "photos/sessions/WhatsApp Image 2026-05-17 at 10.28.55 PM.jpeg",
  // News videos
  newsIndiaTV: "news/WhatsApp Video 2026-05-12 at 2.48.42 PM.mp4",
  newsZee: "news/WhatsApp Video 2026-05-17 at 9.26.52 PM.mp4",
  newsDarshan: "news/WhatsApp Video 2026-05-17 at 8.45.58 PM.mp4",
  news24: "news/WhatsApp Video 2026-05-17 at 9.25.50 PM.mp4",
  // Wellness series 1..7
  wellness1: "wellness-series/WhatsApp Video 2026-05-12 at 2.48.23 PM.mp4",
  wellness2: "wellness-series/WhatsApp Video 2026-05-12 at 2.48.23 PM (1).mp4",
  wellness3: "wellness-series/WhatsApp Video 2026-05-12 at 2.48.28 PM.mp4",
  wellness4: "wellness-series/WhatsApp Video 2026-05-12 at 2.48.33 PM.mp4",
  wellness5: "wellness-series/WhatsApp Video 2026-05-12 at 2.48.42 PM.mp4",
  wellness6: "wellness-series/WhatsApp Video 2026-05-12 at 2.49.01 PM.mp4",
  wellness7: "wellness-series/WhatsApp Video 2026-05-12 at 2.49.07 PM.mp4",
  // Professional photos
  professional1: "photos/professional/service-professional-1.jpg",
  professional2: "photos/professional/service-professional-2.jpg",
  professional3: "photos/professional/service-professional-3.jpg",
  // Certificates
  ayush: "certificates/WhatsApp Image 2026-05-14 at 4.47.48 PM.jpeg",
  ryt300: "certificates/WhatsApp Image 2026-05-13 at 4.40.52 PM.jpeg",
  ryt200: "certificates/WhatsApp Image 2026-05-13 at 5.14.59 PM.jpeg",
  atalMithila: "certificates/WhatsApp Video 2026-05-15 at 1.20.43 AM.mp4",
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
  // Testimonials videos
  testimonialVideo1: "testimonials/WhatsApp Video 2026-05-13 at 4.50.30 PM.mp4",
  testimonialVideo2: "testimonials/WhatsApp Video 2026-05-13 at 4.48.17 PM.mp4",
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
