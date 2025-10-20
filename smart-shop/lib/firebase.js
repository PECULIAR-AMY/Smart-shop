// lib/firebase.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDNoTbA8AFdsD3yUG4iPsf8wxcjxMURw5k",
  authDomain: "smart-shop-9df4b.firebaseapp.com",
  projectId: "smart-shop-9df4b",
  storageBucket: "smart-shop-9df4b.firebasestorage.app",
  messagingSenderId: "658137744463",
  appId: "1:658137744463:web:c7bc78988eac19dfa2563a",
  measurementId: "G-GV48WR6KY9"
};

// ✅ Initialize Firebase only once (important for Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
