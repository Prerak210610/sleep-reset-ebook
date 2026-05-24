"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useAuth } from "@/stores/auth";
import { getFirebase } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import {
  User,
  CalendarCheck,
  Sparkles,
  Bookmark,
  BookOpen,
  GraduationCap,
  Heart,
  HelpCircle,
  Settings,
  LogOut
} from "lucide-react";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "Profile", icon: User },
  { href: "/dashboard/consultations", label: "Consultations", icon: CalendarCheck },
  { href: "/dashboard/recommendations", label: "Recommendations", icon: Sparkles },
  { href: "/dashboard/saved", label: "Saved Articles", icon: Bookmark },
  { href: "/dashboard/journal", label: "Wellness Journal", icon: BookOpen },
  { href: "/dashboard/learning", label: "Learning Progress", icon: GraduationCap },
  { href: "/dashboard/tips", label: "Wellness Tips", icon: Heart },
  { href: "/dashboard/support", label: "Support", icon: HelpCircle },
  { href: "/dashboard/settings", label: "Settings", icon: Settings }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuth((s) => s.user);
  const loading = useAuth((s) => s.loading);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-accent italic opacity-70">
        Loading…
      </div>
    );
  }

  return (
    <div className="bg-creme-soft dark:bg-forest-deep min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 grid lg:grid-cols-12 gap-8">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-1">
          <div className="mb-6 p-4 border border-[var(--line)] bg-creme dark:bg-forest">
            <p className="text-[10px] uppercase tracking-widest opacity-60 font-accent italic">Signed in as</p>
            <p className="font-serif text-lg truncate">{user.displayName ?? user.email}</p>
          </div>
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-widest font-accent italic transition border-l-2",
                  active
                    ? "border-gold text-gold bg-gold/5"
                    : "border-transparent opacity-80 hover:opacity-100 hover:text-gold"
                )}
              >
                <n.icon size={14} />
                {n.label}
              </Link>
            );
          })}
          <button
            onClick={async () => {
              await signOut(getFirebase().auth);
              router.push("/");
            }}
            className="flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-widest font-accent italic opacity-70 hover:text-red-500 transition"
          >
            <LogOut size={14} /> Logout
          </button>
        </aside>

        <main className="lg:col-span-9">{children}</main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-chocolate-deep text-creme-warm border-t border-gold/30 grid grid-cols-5">
        {NAV.slice(0, 5).map((n) => {
          const active = pathname === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-2.5 text-[9px] uppercase tracking-widest font-accent italic",
                active ? "text-gold" : "opacity-70"
              )}
            >
              <n.icon size={16} />
              {n.label.split(" ")[0]}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
