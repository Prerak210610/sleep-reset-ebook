"use client";

import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import { useLang } from "@/stores/lang";

export default function Footer() {
  const tt = useLang((s) => s.t);

  return (
    <footer className="relative bg-chocolate-deep text-creme-warm pt-24 pb-10">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-5">
          <h3 className="font-serif text-4xl">
            Dr. <em className="font-accent">Sampoorna</em>
          </h3>
          <p className="font-accent italic text-gold text-sm tracking-wide">
            PhD Scholar, Yogic Science · Founder, Cosmia Wellness
          </p>
          <p className="text-sm leading-prose opacity-80 max-w-md">{tt("footer.tagline")}</p>
          <div className="flex items-center gap-4 pt-3">
            <a
              href="https://instagram.com/cosmiawellness"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition"
              aria-label="Instagram"
              data-magnetic="true"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://youtube.com/@cosmiawellness"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition"
              aria-label="YouTube"
              data-magnetic="true"
            >
              <Youtube size={18} />
            </a>
            <a
              href="https://wa.me/917303083757"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition text-sm tracking-widest uppercase"
              data-magnetic="true"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <p className="font-accent italic text-gold text-xs uppercase tracking-widest mb-4">
            {tt("footer.quick")}
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="opacity-80 hover:text-gold">About</Link></li>
            <li><Link href="/services" className="opacity-80 hover:text-gold">Services</Link></li>
            <li><Link href="/media" className="opacity-80 hover:text-gold">Media</Link></li>
            <li><Link href="/blog" className="opacity-80 hover:text-gold">Blog</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="font-accent italic text-gold text-xs uppercase tracking-widest mb-4">
            {tt("footer.services")}
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services#corporate" className="opacity-80 hover:text-gold">Corporate</Link></li>
            <li><Link href="/services#group" className="opacity-80 hover:text-gold">Group</Link></li>
            <li><Link href="/services#personal" className="opacity-80 hover:text-gold">Personal</Link></li>
            <li><Link href="/services#fertility" className="opacity-80 hover:text-gold">Fertility (SFY)</Link></li>
            <li><Link href="/services#therapeutic" className="opacity-80 hover:text-gold">Therapeutic</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <p className="font-accent italic text-gold text-xs uppercase tracking-widest">
            {tt("footer.contact")}
          </p>
          <p className="text-sm opacity-80">+91 7303083757</p>
          <p className="text-sm opacity-80">cosmiawellness@gmail.com</p>
          <p className="font-accent italic text-gold text-xs uppercase tracking-widest pt-3">
            {tt("footer.policies")}
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="opacity-80 hover:text-gold">Privacy Policy</Link></li>
            <li><Link href="/terms" className="opacity-80 hover:text-gold">Terms & Conditions</Link></li>
            <li><Link href="/disclaimer" className="opacity-80 hover:text-gold">Wellness Disclaimer</Link></li>
          </ul>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 mt-16 pt-8 border-t border-gold/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs opacity-70">
        <p>© 2025 Dr. Sampoorna · Powered by Cosmia Wellness · Made with ❤ in India</p>
        <p className="max-w-xl text-center md:text-right italic font-accent leading-relaxed">
          {tt("disclaimer.short")}
        </p>
      </div>
    </footer>
  );
}
