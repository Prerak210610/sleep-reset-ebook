"use client";

import { whatsappLink, WA_MESSAGES } from "@/lib/utils";

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink(WA_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic="true"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 transition-transform"
      aria-label="WhatsApp Dr. Sampoorna"
    >
      <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden>
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39-.156 0-.292-.078-.41-.156a8.516 8.516 0 0 1-3.997-3.997c-.078-.117-.156-.253-.156-.41 0-.43 1.39-1.146 1.39-1.518 0-.273-.722-2.236-.917-2.71-.156-.39-.235-.527-.624-.527-.117 0-.273-.04-.39-.04-.39 0-.586.117-.83.39-.625.624-1.31 1.6-1.31 3.04 0 1.6 1.171 3.139 1.327 3.345 1.523 2.014 3.275 3.43 5.74 4.45.586.235 1.054.39 1.418.488.585.156 1.62.117 2.247-.156.488-.196 1.6-.722 1.835-1.405.196-.585.196-1.092.117-1.21-.078-.117-.273-.196-.585-.351-.39-.196-2.184-1.057-2.515-1.18-.156-.04-.273-.078-.39-.078z"/>
        <path d="M16 0a16 16 0 0 0-13.43 24.665L0 32l7.55-2.5A16 16 0 1 0 16 0zm0 29.333A13.34 13.34 0 0 1 9.235 27.4l-.486-.292-4.485 1.485 1.503-4.36-.31-.502A13.336 13.336 0 1 1 29.333 16 13.35 13.35 0 0 1 16 29.333z"/>
      </svg>
    </a>
  );
}
