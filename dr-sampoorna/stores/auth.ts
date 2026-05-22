"use client";

import { create } from "zustand";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebase, isAdminUser } from "@/lib/firebase";

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  init: () => () => void; // returns unsubscribe
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  loading: true,
  init: () => {
    if (typeof window === "undefined") return () => {};
    const { auth } = getFirebase();
    const unsub = onAuthStateChanged(auth, async (u) => {
      const admin = await isAdminUser(u);
      set({ user: u, isAdmin: admin, loading: false });
    });
    return unsub;
  }
}));
