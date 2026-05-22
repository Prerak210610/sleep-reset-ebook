"use client";

import { useEffect } from "react";
import { useTheme } from "@/stores/theme";
import { useAuth } from "@/stores/auth";
import { useSound } from "@/stores/sound";
import { resolveAsset, ASSETS } from "@/lib/storage";

export default function Providers({ children }: { children: React.ReactNode }) {
  const hydrate = useTheme((s) => s.hydrate);
  const initAuth = useAuth((s) => s.init);
  const setUrls = useSound((s) => s.setUrls);
  const markInteraction = useSound((s) => s.markInteraction);

  useEffect(() => {
    hydrate();
    const unsub = initAuth();

    // Resolve sound URLs from Storage (graceful fallback if not uploaded)
    Promise.all([resolveAsset(ASSETS.ambient), resolveAsset(ASSETS.chime)]).then(
      ([a, c]) => setUrls(a || null, c || null)
    );

    const onFirstInput = () => {
      markInteraction();
      window.removeEventListener("click", onFirstInput);
      window.removeEventListener("touchstart", onFirstInput);
    };
    window.addEventListener("click", onFirstInput, { once: true });
    window.addEventListener("touchstart", onFirstInput, { once: true });

    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, [hydrate, initAuth, setUrls, markInteraction]);

  return <>{children}</>;
}
