"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { resolveAsset } from "@/lib/storage";

interface Props {
  paths: string[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}

export default function Lightbox({ paths, index, onClose, onIndex }: Props) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (index == null) return;
    resolveAsset(paths[index]).then(setUrl);
  }, [index, paths]);

  useEffect(() => {
    if (index == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % paths.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + paths.length) % paths.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onClose, onIndex, paths.length]);

  if (index == null) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-gold" aria-label="Close">
        <X size={28} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onIndex((index - 1 + paths.length) % paths.length);
        }}
        className="absolute left-4 md:left-8 text-white hover:text-gold"
        aria-label="Previous"
      >
        <ChevronLeft size={36} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onIndex((index + 1) % paths.length);
        }}
        className="absolute right-4 md:right-8 text-white hover:text-gold"
        aria-label="Next"
      >
        <ChevronRight size={36} />
      </button>
      <div className="max-w-5xl max-h-[85vh] p-6" onClick={(e) => e.stopPropagation()}>
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="max-w-full max-h-[85vh] object-contain" />
        ) : (
          <div className="text-creme-warm font-accent italic">Loading…</div>
        )}
      </div>
    </div>
  );
}
