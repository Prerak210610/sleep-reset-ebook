"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { getFirebase } from "@/lib/firebase";

interface Counts {
  totalBookings: number;
  todayBookings: number;
  weekBookings: number;
  monthBookings: number;
  users: number;
  unreadMessages: number;
  byService: Record<string, number>;
  byDay: { day: string; count: number }[];
}

export default function AdminOverview() {
  const [c, setC] = useState<Counts | null>(null);

  useEffect(() => {
    (async () => {
      const { db } = getFirebase();
      const now = new Date();
      const startOfDay = new Date(now); startOfDay.setHours(0, 0, 0, 0);
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const consultSnap = await getDocs(collection(db, "consultations"));
      const all = consultSnap.docs.map((d) => d.data() as { service?: string; createdAt?: Timestamp });
      const inRange = (after: Date) => all.filter((b) => b.createdAt?.toDate && b.createdAt.toDate() >= after).length;

      const byService: Record<string, number> = {};
      all.forEach((b) => {
        const k = b.service || "Unspecified";
        byService[k] = (byService[k] ?? 0) + 1;
      });

      // Last 7 days
      const byDay: { day: string; count: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i); d.setHours(0, 0, 0, 0);
        const next = new Date(d.getTime() + 24 * 60 * 60 * 1000);
        const count = all.filter((b) => {
          const t = b.createdAt?.toDate?.();
          return t && t >= d && t < next;
        }).length;
        byDay.push({ day: d.toLocaleDateString("en-IN", { weekday: "short" }), count });
      }

      const usersSnap = await getDocs(collection(db, "users"));

      let unreadMessages = 0;
      try {
        const msgSnap = await getDocs(query(collection(db, "contactMessages"), where("status", "==", "unread")));
        unreadMessages = msgSnap.size;
      } catch {
        unreadMessages = 0;
      }

      setC({
        totalBookings: all.length,
        todayBookings: inRange(startOfDay),
        weekBookings: inRange(weekAgo),
        monthBookings: inRange(monthAgo),
        users: usersSnap.size,
        unreadMessages,
        byService,
        byDay
      });
    })();
  }, []);

  if (!c) {
    return <p className="font-accent italic opacity-70">Loading overview…</p>;
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-4xl">Overview</h1>
        <p className="font-accent italic opacity-80 mt-2">Live data from Firestore.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Stat label="Total Bookings" value={c.totalBookings} />
        <Stat label="Today" value={c.todayBookings} />
        <Stat label="This Week" value={c.weekBookings} />
        <Stat label="This Month" value={c.monthBookings} />
        <Stat label="Registered Users" value={c.users} />
        <Stat label="Unread Messages" value={c.unreadMessages} accent />
      </div>

      {/* By service pie-ish */}
      <section className="bg-creme dark:bg-forest border border-[var(--line)] p-6">
        <h2 className="font-serif text-2xl mb-4">Bookings by Service</h2>
        <div className="space-y-2">
          {Object.entries(c.byService).map(([k, v]) => {
            const total = Object.values(c.byService).reduce((a, b) => a + b, 0) || 1;
            const pct = Math.round((v / total) * 100);
            return (
              <div key={k}>
                <div className="flex justify-between text-xs uppercase tracking-widest font-accent italic mb-1">
                  <span>{k}</span>
                  <span className="text-gold">{v} · {pct}%</span>
                </div>
                <div className="h-1.5 bg-[var(--line)] rounded-full overflow-hidden">
                  <div className="h-full bg-gold-shine" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
          {Object.keys(c.byService).length === 0 && <p className="text-sm opacity-70 italic">No bookings yet.</p>}
        </div>
      </section>

      <section className="bg-creme dark:bg-forest border border-[var(--line)] p-6">
        <h2 className="font-serif text-2xl mb-4">Last 7 Days</h2>
        <div className="flex items-end gap-2 h-32">
          {c.byDay.map((d, i) => {
            const max = Math.max(...c.byDay.map((x) => x.count), 1);
            const pct = (d.count / max) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-[var(--line)] flex-1 relative">
                  <div className="absolute bottom-0 left-0 right-0 bg-gold-shine" style={{ height: `${pct}%` }} />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-accent italic opacity-70">{d.day}</span>
                <span className="text-xs">{d.count}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-forest text-creme-warm p-6 grain relative overflow-hidden">
        <p className="font-accent italic text-gold uppercase tracking-widest text-xs">GA4 Analytics</p>
        <p className="font-serif text-2xl mt-2">Embed Google Analytics dashboard</p>
        <p className="text-sm opacity-90 mt-2 max-w-xl">
          Connect your GA4 property in <code>NEXT_PUBLIC_GA_MEASUREMENT_ID</code> and use Looker Studio to embed a live dashboard here.
          Page-view tracking is already initialised via the Firebase Analytics SDK.
        </p>
      </section>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`p-5 border ${accent ? "border-gold/60 bg-gold/5" : "border-[var(--line)] bg-creme dark:bg-forest"}`}>
      <p className="text-[10px] uppercase tracking-widest font-accent italic opacity-70">{label}</p>
      <p className={`font-serif text-4xl mt-2 ${accent ? "text-gold-shine" : ""}`}>{value}</p>
    </div>
  );
}
