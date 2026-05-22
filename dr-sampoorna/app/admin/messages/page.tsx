"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, orderBy, query } from "firebase/firestore";
import { getFirebase } from "@/lib/firebase";
import { formatDate, cn } from "@/lib/utils";

interface Msg {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "resolved";
  createdAt?: { seconds: number };
}

export default function AdminMessages() {
  const [items, setItems] = useState<Msg[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "read" | "resolved">("all");

  const load = async () => {
    const { db } = getFirebase();
    const snap = await getDocs(query(collection(db, "contactMessages"), orderBy("createdAt", "desc")));
    setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Msg, "id">) })));
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: Msg["status"]) => {
    const { db } = getFirebase();
    await updateDoc(doc(db, "contactMessages", id), { status });
    setItems((s) => s.map((x) => (x.id === id ? { ...x, status } : x)));
  };

  const filtered = items.filter((i) => filter === "all" || i.status === filter);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-4xl">Contact Messages</h1>
        <p className="font-accent italic opacity-80 mt-2">{filtered.length} of {items.length} messages</p>
      </header>

      <div className="flex gap-2 flex-wrap">
        {(["all", "unread", "read", "resolved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-1.5 text-xs uppercase tracking-widest font-accent italic border transition",
              filter === f ? "border-gold text-gold bg-gold/10" : "border-[var(--line)] hover:border-gold"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((m) => (
          <article key={m.id} className={cn("bg-creme dark:bg-forest border p-5", m.status === "unread" ? "border-gold" : "border-[var(--line)]")}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <div>
                <p className="font-serif text-xl">{m.name}</p>
                <p className="text-xs opacity-70">{m.email} · {m.phone || "—"}</p>
              </div>
              <span className="text-[10px] uppercase tracking-widest opacity-60">
                {m.createdAt ? formatDate(m.createdAt.seconds * 1000) : ""}
              </span>
            </div>
            {m.subject && <p className="font-accent italic text-gold text-sm">{m.subject}</p>}
            <p className="text-sm leading-prose mt-2 opacity-90 whitespace-pre-wrap">{m.message}</p>
            <div className="mt-4 flex gap-2">
              {(["unread", "read", "resolved"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(m.id, s)}
                  className={cn(
                    "px-3 py-1 text-[10px] uppercase tracking-widest font-accent italic border transition",
                    m.status === s ? "border-gold text-gold bg-gold/10" : "border-[var(--line)] hover:border-gold"
                  )}
                >
                  Mark {s}
                </button>
              ))}
              <a
                href={`mailto:${m.email}?subject=Re:%20${encodeURIComponent(m.subject)}`}
                className="ml-auto px-3 py-1 text-[10px] uppercase tracking-widest font-accent italic border border-[var(--line)] hover:border-gold"
              >
                Reply by email
              </a>
            </div>
          </article>
        ))}
        {filtered.length === 0 && <p className="font-accent italic opacity-70">No messages.</p>}
      </div>
    </div>
  );
}
