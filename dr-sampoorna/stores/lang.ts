"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Lang, t as translate } from "@/lib/i18n";

interface LangState {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: string) => string;
}

export const useLang = create<LangState>()(
  persist(
    (set, get) => ({
      lang: "en",
      setLang: (l) => set({ lang: l }),
      toggle: () => set({ lang: get().lang === "en" ? "hi" : "en" }),
      t: (key) => translate(key, get().lang)
    }),
    { name: "ds-lang" }
  )
);
