"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  limit
} from "firebase/firestore";
import { useAuth } from "@/stores/auth";
import { getFirebase } from "@/lib/firebase";
import GoldButton from "@/components/GoldButton";
import { cn, formatDate } from "@/lib/utils";

const MOODS = ["Good", "Okay", "Pain", "Stressed", "Energized"] as const;
type Mood = (typeof MOODS)[number];

interface Entry {
  id?: string;
  text: string;
  mood: Mood;
  createdAt?: { seconds: number };
}

export default function JournalPage() {
  const user = useAuth((s) => s.user);
  const [text, setText] = useState("");
  const [mood, setMood] = useState<Mood>("Good");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!user) return;
    const { db } = getFirebase();
    const snap = await getDocs(
      query(
        collection(db, "users", user.uid, "journal"),
        orderBy("createdAt", "desc"),
        limit(7)
      )
    );
    setEntries(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Entry) })));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const save = async () => {
    if (!user || !text.trim()) return;
    setSaving(true);
    const { db } = getFirebase();
    await addDoc(collection(db, "users", user.uid, "journal"), {
      text: text.trim(),
      mood,
      createdAt: serverTimestamp()
    });
    setText("");
    setSaving(false);
    load();
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-4xl">Wellness Journal</h1>
        <p className="font-accent italic opacity-80 mt-2">A private daily check-in. Last 7 entries shown.</p>
      </header>

      <section className="bg-creme dark:bg-forest border border-[var(--line)] p-6 md:p-8">
        <p className="text-[11px] uppercase tracking-widest font-accent italic text-gold mb-3">Today</p>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How is your body, breath, mind today?"
          className="w-full bg-transparent border border-[var(--line)] focus:border-gold p-4 outline-none resize-none transition"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={cn(
                "px-4 py-1.5 text-xs uppercase tracking-widest font-accent italic border transition",
                mood === m ? "border-gold text-gold bg-gold/10" : "border-[var(--line)] hover:border-gold"
              )}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="mt-5 flex justify-end">
          <GoldButton onClick={save} disabled={saving || !text.trim()}>
            {saving ? "Saving…" : "Save Entry"}
          </GoldButton>
        </div>
      </section>

      {entries.length > 0 && (
        <section className="space-y-3">
          {entries.map((e) => (
            <article key={e.id} className="bg-creme dark:bg-forest border border-[var(--line)] p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest font-accent italic text-gold">{e.mood}</span>
                {e.createdAt && (
                  <span className="text-[10px] uppercase tracking-widest opacity-60">
                    {formatDate(e.createdAt.seconds * 1000)}
                  </span>
                )}
              </div>
              <p className="text-sm leading-prose opacity-90">{e.text}</p>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
