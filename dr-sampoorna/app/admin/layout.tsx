"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useAuth } from "@/stores/auth";
import { getFirebase } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  FileText,
  Briefcase,
  PlayCircle,
  Quote,
  Mail,
  Send,
  BarChart2,
  Settings,
  LogOut,
  Shield
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/consultations", label: "Consultations", icon: CalendarCheck },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/blog", label: "Blog CMS", icon: FileText },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/media", label: "Media", icon: PlayCircle },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/newsletter", label: "Newsletter", icon: Send },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuth((s) => s.user);
  const isAdmin = useAuth((s) => s.isAdmin);
  const loading = useAuth((s) => s.loading);

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
    else if (!isAdmin) router.replace("/dashboard");
  }, [user, isAdmin, loading, router]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-accent italic opacity-70">
        Verifying admin access…
      </div>
    );
  }

  return (
    <div className="bg-creme-soft dark:bg-forest-deep min-h-[80vh]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 grid lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3 space-y-1">
          <div className="mb-5 p-4 border border-gold/30 bg-chocolate-deep text-creme-warm">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={14} className="text-gold" />
              <span className="text-[10px] uppercase tracking-widest font-accent italic text-gold">Superadmin</span>
            </div>
            <p className="font-serif text-lg truncate">{user.email}</p>
          </div>
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-xs uppercase tracking-widest font-accent italic transition border-l-2",
                  active ? "border-gold text-gold bg-gold/5" : "border-transparent opacity-80 hover:opacity-100 hover:text-gold"
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
            className="flex items-center gap-3 px-4 py-2.5 text-xs uppercase tracking-widest font-accent italic opacity-70 hover:text-red-500 transition"
          >
            <LogOut size={14} /> Logout
          </button>

          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2.5 text-xs uppercase tracking-widest font-accent italic opacity-70 hover:text-gold transition mt-4 border-t border-[var(--line)] pt-4"
          >
            ← Use as a normal user
          </Link>
        </aside>

        <main className="lg:col-span-9">{children}</main>
      </div>
    </div>
  );
}
