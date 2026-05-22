"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { resolveAsset } from "@/lib/storage";

interface Props {
  open: boolean;
  onClose: () => void;
  path?: string;
  title?: string;
}

export default function VideoModal({ open, onClose, path, title }: Props) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (!open || !path) return;
    resolveAsset(path).then(setUrl);
  }, [open, path]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handler);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-gold transition"
        aria-label="Close"
      >
        <X size={28} />
      </button>
      <div
        className="w-full max-w-4xl aspect-video bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        {url ? (
          <video
            src={url}
            controls
            autoPlay
            className="w-full h-full"
            playsInline
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-creme-warm font-accent italic">
            Loading…
          </div>
        )}
      </div>
      {title && (
        <p className="absolute bottom-6 left-6 right-6 text-center text-creme-warm font-accent italic">
          {title}
        </p>
      )}
    </div>
  );
}
