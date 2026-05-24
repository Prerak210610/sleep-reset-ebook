"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, Volume2, VolumeX, User } from "lucide-react";
import { useTheme } from "@/stores/theme";
import { useLang } from "@/stores/lang";
import { useSound } from "@/stores/sound";
import { useAuth } from "@/stores/auth";
import { useBooking } from "@/stores/booking";
import { whatsappLink, WA_MESSAGES, cn } from "@/lib/utils";
import GoldButton from "./GoldButton";

const NAV = [
  { href: "/", labelKey: "nav.home" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/services", labelKey: "nav.services" },
  { href: "/media", labelKey: "nav.media" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/contact", labelKey: "nav.contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const theme = useTheme((s) => s.theme);
  const toggleTheme = useTheme((s) => s.toggle);
  const lang = useLang((s) => s.lang);
  const tt = useLang((s) => s.t);
  const toggleLang = useLang((s) => s.toggle);
  const muted = useSound((s) => s.muted);
  const toggleMute = useSound((s) => s.toggleMute);
  const user = useAuth((s) => s.user);
  const isAdmin = useAuth((s) => s.isAdmin);
  const openBooking = useBooking((s) => s.openModal);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-chocolate-deep text-creme-warm text-[11px] tracking-widest uppercase py-2 text-center font-accent italic">
        {tt("ann.bar")}
      </div>

      <header
        className={cn(
          "fixed top-[34px] inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-chocolate-deep/[0.97] backdrop-blur-md border-b border-gold/30 text-creme-warm"
            : "bg-transparent text-creme-warm"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="font-serif text-xl md:text-2xl tracking-tight" data-magnetic="true">
            Dr. <em className="font-accent">Sampoorna</em>
          </Link>

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-[13px] tracking-widest uppercase opacity-90 hover:text-gold transition-colors"
                data-magnetic="true"
              >
                {tt(n.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              aria-label="Toggle language"
              onClick={toggleLang}
              className="text-[11px] tracking-widest uppercase px-2 py-1 hover:text-gold transition"
              data-magnetic="true"
            >
              {lang === "en" ? "EN / हि" : "हि / EN"}
            </button>
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="p-2 hover:text-gold transition"
              data-magnetic="true"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={toggleMute}
              className="p-2 hover:text-gold transition"
              data-magnetic="true"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <GoldButton
              onClick={() => openBooking()}
              className="hidden md:inline-flex"
              size="md"
            >
              {tt("nav.book")}
            </GoldButton>

            {user ? (
              <Link
                href={isAdmin ? "/admin" : "/dashboard"}
                className="ml-1 p-2 rounded-full border border-current hover:text-gold hover:border-gold transition"
                aria-label="Account"
                data-magnetic="true"
              >
                <User size={16} />
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden md:inline text-[12px] tracking-widest uppercase px-3 py-2 hover:text-gold transition"
                data-magnetic="true"
              >
                {tt("nav.login")}
              </Link>
            )}

            <button
              aria-label="Open menu"
              className="lg:hidden p-2"
              onClick={() => setOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-chocolate-deep text-creme-warm transition-transform duration-500 lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-6 border-b border-gold/20">
          <span className="font-serif text-xl">Dr. Sampoorna</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col p-6 gap-6">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="font-serif text-3xl"
            >
              {tt(n.labelKey)}
            </Link>
          ))}
          <div className="pt-6 border-t border-gold/20 mt-2 space-y-4">
            <GoldButton
              onClick={() => {
                openBooking();
                setOpen(false);
              }}
              size="lg"
              className="w-full"
            >
              {tt("nav.book")}
            </GoldButton>
            {!user && (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block text-center text-sm tracking-widest uppercase opacity-80"
              >
                {tt("nav.login")}
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
