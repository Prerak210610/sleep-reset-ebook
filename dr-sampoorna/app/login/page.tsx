"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { Apple, Facebook, Mail } from "lucide-react";
import GoldButton from "@/components/GoldButton";
import GoldWipe from "@/components/animations/GoldWipe";
import WordReveal from "@/components/animations/WordReveal";
import { getFirebase, googleProvider, facebookProvider, appleProvider, isAdminUser } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const afterAuth = async () => {
    const { auth, db } = getFirebase();
    const user = auth.currentUser;
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName ?? "",
        photoURL: user.photoURL ?? "",
        createdAt: serverTimestamp(),
        onboardingComplete: false
      });
    }
    const data = snap.exists() ? snap.data() : null;
    const admin = await isAdminUser(user);
    if (admin) {
      router.push("/admin");
      return;
    }
    if (!data || !data.onboardingComplete) {
      router.push("/onboarding");
    } else {
      router.push("/dashboard");
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const { auth } = getFirebase();
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      await afterAuth();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  const handleProvider = async (which: "google" | "facebook" | "apple") => {
    setError(null);
    setBusy(true);
    try {
      const { auth } = getFirebase();
      const provider =
        which === "google" ? googleProvider() : which === "facebook" ? facebookProvider() : appleProvider();
      await signInWithPopup(auth, provider);
      await afterAuth();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="relative min-h-[80vh] -mt-[106px] pt-[140px] pb-20 bg-creme-soft dark:bg-forest-deep">
      <GoldWipe />
      <div className="relative max-w-md mx-auto px-6 md:px-10">
        <div className="text-center mb-10">
          <span className="font-accent italic text-gold uppercase tracking-widest text-xs">
            {mode === "signin" ? "Welcome Back" : "Begin Your Journey"}
          </span>
          <WordReveal as="h1" className="font-serif text-display-md mt-3">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </WordReveal>
        </div>

        <div className="bg-creme dark:bg-forest border border-[var(--line)] p-8 space-y-5">
          <button onClick={() => handleProvider("google")} disabled={busy} className="w-full flex items-center justify-center gap-3 py-3 border border-[var(--line)] hover:border-gold transition text-sm uppercase tracking-widest font-accent italic" data-magnetic="true">
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.2-.9 2.2-2 2.9v2.4h3.2c1.9-1.7 3-4.3 3-7.1z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.4c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.7-5.6-4.1H3.1v2.5C4.7 19.6 8.1 22 12 22z"/><path fill="#FBBC05" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.5H3.1C2.4 9 2 10.5 2 12s.4 3 1.1 4.5L6.4 14z"/><path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C17 3.1 14.7 2 12 2 8.1 2 4.7 4.4 3.1 7.5L6.4 10c.8-2.4 3-4.1 5.6-4.1z"/></svg>
            Continue with Google
          </button>
          <button onClick={() => handleProvider("apple")} disabled={busy} className="w-full flex items-center justify-center gap-3 py-3 border border-[var(--line)] hover:border-gold transition text-sm uppercase tracking-widest font-accent italic" data-magnetic="true">
            <Apple size={16} /> Continue with Apple
          </button>
          <button onClick={() => handleProvider("facebook")} disabled={busy} className="w-full flex items-center justify-center gap-3 py-3 border border-[var(--line)] hover:border-gold transition text-sm uppercase tracking-widest font-accent italic" data-magnetic="true">
            <Facebook size={16} /> Continue with Facebook
          </button>

          <div className="flex items-center gap-3 my-4">
            <span className="flex-1 h-px bg-[var(--line)]" />
            <span className="text-[10px] uppercase tracking-widest font-accent italic opacity-60">or</span>
            <span className="flex-1 h-px bg-[var(--line)]" />
          </div>

          <form onSubmit={handleEmail} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest mb-2 font-accent italic">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-b border-[var(--line)] focus:border-gold py-3 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest mb-2 font-accent italic">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-transparent border-b border-[var(--line)] focus:border-gold py-3 outline-none transition"
              />
            </div>
            <GoldButton type="submit" size="lg" className="w-full" disabled={busy}>
              <Mail size={14} className="mr-2" />
              {busy ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
            </GoldButton>
          </form>

          {error && <p className="text-red-500 text-xs text-center font-accent italic">{error}</p>}
        </div>

        <p className="text-center mt-6 text-sm font-accent italic">
          {mode === "signin" ? (
            <>
              New here?{" "}
              <button onClick={() => setMode("signup")} className="text-gold underline">
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setMode("signin")} className="text-gold underline">
                Sign in
              </button>
            </>
          )}
        </p>
        <p className="text-center mt-2 text-[10px] uppercase tracking-widest opacity-60">
          <Link href="/">← Back to home</Link>
        </p>
      </div>
    </section>
  );
}
