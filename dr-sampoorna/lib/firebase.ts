"use client";

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  type Auth
} from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// Per spec — exact config
const firebaseConfig = {
  apiKey: "AIzaSyCc04JxN__4gd655MCAKYkPNbMtPWYazR0",
  authDomain: "dr-sampoorna-8128a.firebaseapp.com",
  projectId: "dr-sampoorna-8128a",
  storageBucket: "dr-sampoorna-8128a.firebasestorage.app",
  messagingSenderId: "169788587156",
  appId: "1:169788587156:web:10067daaa8c705136e4881"
};

let app: FirebaseApp;
let _auth: Auth;
let _db: Firestore;
let _storage: FirebaseStorage;
let _analytics: Analytics | null = null;

if (typeof window !== "undefined") {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  _auth = getAuth(app);
  _db = getFirestore(app);
  _storage = getStorage(app);

  isSupported()
    .then((ok) => {
      if (ok) _analytics = getAnalytics(app);
    })
    .catch(() => {
      _analytics = null;
    });
}

export const getFirebase = () => {
  if (typeof window === "undefined") {
    throw new Error("Firebase client SDK is browser-only");
  }
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    _auth = getAuth(app);
    _db = getFirestore(app);
    _storage = getStorage(app);
  }
  return { app, auth: _auth, db: _db, storage: _storage, analytics: _analytics };
};

export const googleProvider = () => new GoogleAuthProvider();
export const facebookProvider = () => new FacebookAuthProvider();
export const appleProvider = () => new OAuthProvider("apple.com");

export const ADMIN_EMAIL = "cosmiawellness@gmail.com";

/**
 * Read the superadmin custom claim. The claim must be set out-of-band via
 * Firebase Admin SDK / a Cloud Function (see README). Falls back to email
 * comparison so the founder can always reach /admin during initial setup.
 */
export async function isAdminUser(user: { email: string | null; getIdTokenResult?: () => Promise<{ claims: Record<string, unknown> }> } | null) {
  if (!user) return false;
  try {
    if (user.getIdTokenResult) {
      const tokenResult = await user.getIdTokenResult();
      if (tokenResult.claims?.superadmin === true || tokenResult.claims?.admin === true) {
        return true;
      }
    }
  } catch {
    // ignore
  }
  return user.email === ADMIN_EMAIL;
}
