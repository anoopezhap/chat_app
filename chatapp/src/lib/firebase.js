import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-c9c1d.firebaseapp.com",
  projectId: "reactchat-c9c1d",
  storageBucket: "reactchat-c9c1d.appspot.com",
  messagingSenderId: "189132680785",
  appId: "1:189132680785:web:7a6743d5e6c53ce47d9270",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
