"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getFirebase } from "@/lib/firebase";
import { formatDate } from "@/lib/utils";

interface Sub {
  id: string;
  email: string;
  source?: string;
  subscribedAt?: { seconds: number };
}

export default function AdminNewsletter() {
  const [items, setItems] = useState<Sub[]>([]);

  useEffect(() => {
    (async () => {
      const { db } = getFirebase();
      const snap = await getDocs(collection(db, "newsletter"));
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Sub, "id">) })));
    })();
  }, []);

  const exportCSV = () => {
    const rows = [["Email", "Source", "Subscribed"], ...items.map((s) => [s.email, s.source ?? "", s.subscribedAt ? formatDate(s.subscribedAt.seconds * 1000) : ""])];
    const csv = rows.map((r) => r.map((c) => `"${(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `newsletter-${Date.now()}.csv`; a.click();
  };

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-4xl">Newsletter</h1>
          <p className="font-accent italic opacity-80 mt-2">{items.length} subscribers</p>
        </div>
        <button onClick={exportCSV} className="px-4 py-2 border border-gold text-gold text-xs uppercase tracking-widest font-accent italic hover:bg-gold/10">Export CSV</button>
      </header>

      <div className="bg-creme dark:bg-forest border border-[var(--line)] divide-y divide-[var(--line)]">
        {items.map((s) => (
          <div key={s.id} className="p-4 flex items-center justify-between text-sm">
            <span className="font-serif">{s.email}</span>
            <span className="text-xs opacity-70">{s.source ?? "—"} · {s.subscribedAt ? formatDate(s.subscribedAt.seconds * 1000) : ""}</span>
          </div>
        ))}
        {items.length === 0 && <p className="p-6 font-accent italic opacity-70">No subscribers yet.</p>}
      </div>
    </div>
  );
}
