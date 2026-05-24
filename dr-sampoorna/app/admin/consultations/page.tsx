"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, doc, updateDoc, orderBy, query } from "firebase/firestore";
import { getFirebase } from "@/lib/firebase";
import { whatsappLink, formatDate, cn } from "@/lib/utils";

interface Consult {
  id: string;
  bookingRef: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  concern: string;
  mode: string;
  message: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  notes?: string;
  createdAt?: { seconds: number };
}

const STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"] as const;

export default function AdminConsultations() {
  const [items, setItems] = useState<Consult[]>([]);
  const [filter, setFilter] = useState({ status: "", service: "", q: "" });
  const [open, setOpen] = useState<Consult | null>(null);

  const load = async () => {
    const { db } = getFirebase();
    const snap = await getDocs(query(collection(db, "consultations"), orderBy("createdAt", "desc")));
    setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Consult, "id">) })));
  };
  useEffect(() => { load(); }, []);

  const services = useMemo(() => Array.from(new Set(items.map((i) => i.service).filter(Boolean))), [items]);

  const filtered = items.filter(
    (i) =>
      (!filter.status || i.status === filter.status) &&
      (!filter.service || i.service === filter.service) &&
      (!filter.q ||
        [i.name, i.email, i.phone, i.bookingRef].some((v) =>
          (v ?? "").toLowerCase().includes(filter.q.toLowerCase())
        ))
  );

  const updateStatus = async (id: string, status: Consult["status"]) => {
    const { db } = getFirebase();
    await updateDoc(doc(db, "consultations", id), { status });
    setItems((s) => s.map((x) => (x.id === id ? { ...x, status } : x)));
  };

  const exportCSV = () => {
    const rows = [
      ["Reference", "Name", "Email", "Phone", "Service", "Mode", "Concern", "Status", "Created"],
      ...filtered.map((i) => [
        i.bookingRef,
        i.name,
        i.email,
        i.phone,
        i.service,
        i.mode,
        i.concern,
        i.status,
        i.createdAt ? formatDate(i.createdAt.seconds * 1000) : ""
      ])
    ];
    const csv = rows.map((r) => r.map((c) => `"${(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `consultations-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl">Consultations</h1>
          <p className="font-accent italic opacity-80 mt-2">{filtered.length} of {items.length} bookings</p>
        </div>
        <button onClick={exportCSV} className="px-4 py-2 border border-gold text-gold text-xs uppercase tracking-widest font-accent italic hover:bg-gold/10">
          Export CSV
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          placeholder="Search name / email / phone / ref"
          value={filter.q}
          onChange={(e) => setFilter({ ...filter, q: e.target.value })}
          className="bg-transparent border border-[var(--line)] focus:border-gold px-3 py-2 outline-none transition"
        />
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="bg-transparent border border-[var(--line)] focus:border-gold px-3 py-2 outline-none transition"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select
          value={filter.service}
          onChange={(e) => setFilter({ ...filter, service: e.target.value })}
          className="bg-transparent border border-[var(--line)] focus:border-gold px-3 py-2 outline-none transition"
        >
          <option value="">All services</option>
          {services.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto bg-creme dark:bg-forest border border-[var(--line)]">
        <table className="w-full text-sm">
          <thead className="bg-chocolate-deep text-creme-warm">
            <tr>
              {["Ref", "Name", "Phone", "Service", "Status", "Date", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-widest font-accent italic">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((i) => (
              <tr key={i.id} className="border-t border-[var(--line)] hover:bg-creme-warm/30">
                <td className="px-4 py-3 font-mono text-xs">{i.bookingRef}</td>
                <td className="px-4 py-3 font-serif">{i.name}</td>
                <td className="px-4 py-3">{i.phone}</td>
                <td className="px-4 py-3">{i.service}</td>
                <td className="px-4 py-3">
                  <select
                    value={i.status}
                    onChange={(e) => updateStatus(i.id, e.target.value as Consult["status"])}
                    className={cn(
                      "bg-transparent border px-2 py-1 text-[10px] uppercase tracking-widest font-accent italic",
                      i.status === "Pending" && "border-amber-500 text-amber-500",
                      i.status === "Confirmed" && "border-blue-400 text-blue-400",
                      i.status === "Completed" && "border-emerald-500 text-emerald-500",
                      i.status === "Cancelled" && "border-red-500 text-red-500"
                    )}
                  >
                    {STATUSES.map((s) => <option key={s} value={s} className="bg-chocolate-deep text-creme-warm">{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-xs opacity-80">
                  {i.createdAt ? formatDate(i.createdAt.seconds * 1000) : "—"}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => setOpen(i)} className="text-xs uppercase tracking-widest font-accent italic text-gold">Open</button>
                  <a
                    href={whatsappLink(`Hello ${i.name}, this is from Dr. Sampoorna's team regarding your booking ${i.bookingRef}.`, i.phone.replace(/\D/g, ""))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-widest font-accent italic"
                  >
                    WA
                  </a>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-10 text-center font-accent italic opacity-70">No bookings match.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail drawer */}
      {open && (
        <div className="fixed inset-0 z-[80] bg-black/60 flex items-center justify-center p-6" onClick={() => setOpen(null)}>
          <div className="bg-creme dark:bg-forest max-w-lg w-full p-8 border border-gold/30 space-y-3" onClick={(e) => e.stopPropagation()}>
            <p className="font-accent italic text-gold text-xs uppercase tracking-widest">{open.bookingRef}</p>
            <h3 className="font-serif text-3xl">{open.name}</h3>
            <p className="text-sm">{open.email} · {open.phone}</p>
            <hr className="border-[var(--line)]" />
            <p className="text-sm"><b>Service:</b> {open.service}</p>
            <p className="text-sm"><b>Mode:</b> {open.mode}</p>
            <p className="text-sm"><b>Concern:</b> {open.concern}</p>
            <p className="text-sm"><b>Message:</b> {open.message || "—"}</p>
            <button onClick={() => setOpen(null)} className="mt-4 text-xs uppercase tracking-widest font-accent italic text-gold">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
