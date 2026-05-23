"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useAuth } from "@/stores/auth";
import { getFirebase } from "@/lib/firebase";
import { whatsappLink, WA_MESSAGES, formatDate, cn } from "@/lib/utils";
import GoldButton from "@/components/GoldButton";
import { useBooking } from "@/stores/booking";

interface Booking {
  id: string;
  bookingRef: string;
  service: string;
  concern: string;
  mode: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt?: { seconds: number };
}

const STATUS_COLOR: Record<Booking["status"], string> = {
  Pending: "border-amber-500 text-amber-500",
  Confirmed: "border-blue-400 text-blue-400",
  Completed: "border-emerald-500 text-emerald-500",
  Cancelled: "border-red-500 text-red-500"
};

export default function ConsultationsPage() {
  const user = useAuth((s) => s.user);
  const openBooking = useBooking((s) => s.openModal);
  const [items, setItems] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const { db } = getFirebase();
        const q = query(
          collection(db, "consultations"),
          where("email", "==", user.email),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Booking, "id">) })));
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-4xl">My Consultations</h1>
        <p className="font-accent italic opacity-80 mt-2">All your bookings in one place.</p>
      </header>

      {loading ? (
        <p className="font-accent italic opacity-70">Loading…</p>
      ) : items.length === 0 ? (
        <div className="bg-creme dark:bg-forest border border-[var(--line)] p-10 text-center">
          <p className="font-serif text-2xl mb-2">No bookings yet.</p>
          <p className="font-accent italic opacity-80 mb-6">Book your first consultation with Dr. Sampoorna.</p>
          <GoldButton onClick={() => openBooking()}>Book Consultation</GoldButton>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((b) => (
            <article key={b.id} className="bg-creme dark:bg-forest p-6 border border-[var(--line)] grid md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-3">
                <p className="text-[10px] uppercase tracking-widest opacity-60 font-accent italic">Reference</p>
                <p className="font-serif text-lg text-gold-shine">{b.bookingRef}</p>
              </div>
              <div className="md:col-span-3">
                <p className="text-[10px] uppercase tracking-widest opacity-60 font-accent italic">Service</p>
                <p className="font-serif text-lg">{b.service}</p>
                <p className="text-xs opacity-70">{b.mode}</p>
              </div>
              <div className="md:col-span-3">
                <p className="text-[10px] uppercase tracking-widest opacity-60 font-accent italic">Concern</p>
                <p className="text-sm">{b.concern || "—"}</p>
                {b.createdAt && (
                  <p className="text-[10px] uppercase tracking-widest opacity-50 mt-1">
                    {formatDate(b.createdAt.seconds * 1000)}
                  </p>
                )}
              </div>
              <div className="md:col-span-3 flex flex-col gap-2 md:items-end">
                <span className={cn("inline-block px-3 py-1 text-[10px] uppercase tracking-widest font-accent italic border", STATUS_COLOR[b.status])}>
                  {b.status}
                </span>
                <a
                  href={whatsappLink(WA_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-accent italic text-gold hover:underline"
                  data-magnetic="true"
                >
                  Message Dr. Sampoorna →
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
