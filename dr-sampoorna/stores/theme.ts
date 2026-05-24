"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
  hydrate: () => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      setTheme: (t) => {
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", t === "dark");
        }
        set({ theme: t });
      },
      toggle: () => {
        const next = get().theme === "light" ? "dark" : "light";
        get().setTheme(next);
      },
      hydrate: () => {
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", get().theme === "dark");
        }
      }
    }),
    { name: "ds-theme" }
  )
);
