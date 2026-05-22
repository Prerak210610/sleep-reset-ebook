"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SoundState {
  muted: boolean;
  hasInteracted: boolean;
  ambient: HTMLAudioElement | null;
  ambientUrl: string | null;
  chimeUrl: string | null;
  setMuted: (m: boolean) => void;
  toggleMute: () => void;
  markInteraction: () => void;
  setUrls: (ambientUrl: string | null, chimeUrl: string | null) => void;
  startAmbient: () => void;
  stopAmbient: () => void;
  playChime: () => void;
}

export const useSound = create<SoundState>()(
  persist(
    (set, get) => ({
      muted: false,
      hasInteracted: false,
      ambient: null,
      ambientUrl: null,
      chimeUrl: null,
      setMuted: (m) => {
        const a = get().ambient;
        if (a) a.muted = m;
        set({ muted: m });
      },
      toggleMute: () => {
        const next = !get().muted;
        get().setMuted(next);
      },
      markInteraction: () => {
        if (!get().hasInteracted) {
          set({ hasInteracted: true });
          get().startAmbient();
        }
      },
      setUrls: (ambientUrl, chimeUrl) => set({ ambientUrl, chimeUrl }),
      startAmbient: () => {
        if (typeof window === "undefined") return;
        const { ambientUrl, muted } = get();
        if (!ambientUrl) return;
        let a = get().ambient;
        if (!a) {
          a = new Audio(ambientUrl);
          a.loop = true;
          a.volume = 0.2; // 20% cap
          a.muted = muted;
          set({ ambient: a });
        }
        a.play().catch(() => {});
      },
      stopAmbient: () => {
        const a = get().ambient;
        if (a) {
          a.pause();
        }
      },
      playChime: () => {
        if (typeof window === "undefined") return;
        const { chimeUrl, muted } = get();
        if (muted || !chimeUrl) return;
        const c = new Audio(chimeUrl);
        c.volume = 0.2;
        c.play().catch(() => {});
      }
    }),
    {
      name: "ds-sound",
      partialize: (s) => ({ muted: s.muted, hasInteracted: s.hasInteracted })
    }
  )
);
