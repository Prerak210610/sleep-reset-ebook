"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { getFirebase } from "@/lib/firebase";
import { formatDate } from "@/lib/utils";

interface U {
  id: string;
  email?: string;
  name?: string;
  phone?: string;
  language?: string;
  onboardingComplete?: boolean;
  onboarding?: { concerns?: string[]; age?: string; sessionType?: string };
  disabled?: boolean;
  createdAt?: { seconds: number };
}

export default function AdminUsers() {
  const [items, setItems] = useState<U[]>([]);
  const [open, setOpen] = useState<U | null>(null);

  const load = async () => {
    const { db } = getFirebase();
    const snap = await getDocs(collection(db, "users"));
    setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<U, "id">) })));
  };
  useEffect(() => { load(); }, []);

  const toggleDisable = async (u: U) => {
    const { db } = getFirebase();
    await updateDoc(doc(db, "users", u.id), { disabled: !u.disabled });
    load();
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-4xl">Users</h1>
        <p className="font-accent italic opacity-80 mt-2">{items.length} registered users</p>
      </header>

      <div className="bg-creme dark:bg-forest border border-[var(--line)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-chocolate-deep text-creme-warm">
            <tr>
              {["Name", "Email", "Phone", "Concerns", "Onboard", "Status", "Joined", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-widest font-accent italic">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((u) => (
              <tr key={u.id} className="border-t border-[var(--line)]">
                <td className="px-4 py-3 font-serif">{u.name || "—"}</td>
                <td className="px-4 py-3 text-xs">{u.email}</td>
                <td className="px-4 py-3 text-xs">{u.phone || "—"}</td>
                <td className="px-4 py-3 text-xs">{u.onboarding?.concerns?.join(", ") || "—"}</td>
                <td className="px-4 py-3 text-xs">{u.onboardingComplete ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-xs">{u.disabled ? <span className="text-red-500">Disabled</span> : "Active"}</td>
                <td className="px-4 py-3 text-xs">{u.createdAt ? formatDate(u.createdAt.seconds * 1000) : "—"}</td>
                <td className="px-4 py-3 text-xs flex gap-2">
                  <button onClick={() => setOpen(u)} className="text-gold uppercase tracking-widest font-accent italic">View</button>
                  <button onClick={() => toggleDisable(u)} className="text-red-500 uppercase tracking-widest font-accent italic">
                    {u.disabled ? "Enable" : "Disable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-[80] bg-black/60 flex items-center justify-center p-6" onClick={() => setOpen(null)}>
          <div className="bg-creme dark:bg-forest max-w-lg w-full p-8 border border-gold/30" onClick={(e) => e.stopPropagation()}>
            <p className="font-serif text-3xl">{open.name || open.email}</p>
            <p className="text-sm opacity-70 mt-1">{open.email}</p>
            <hr className="border-[var(--line)] my-4" />
            <pre className="text-xs whitespace-pre-wrap opacity-80 max-h-80 overflow-auto">{JSON.stringify(open.onboarding ?? {}, null, 2)}</pre>
            <button onClick={() => setOpen(null)} className="mt-4 text-xs uppercase tracking-widest font-accent italic text-gold">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
