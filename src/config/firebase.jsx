import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBy7x55jEe0ARnzmvoEqBxDMaZ66SW54tE",
  authDomain: "hakaton-2ca3d.firebaseapp.com",
  projectId: "hakaton-2ca3d",
  storageBucket: "hakaton-2ca3d.firebasestorage.app",
  messagingSenderId: "713141888916",
  appId: "1:713141888916:web:7daf5f5b7c963e81019181"
};

// ✅ Initialize only ONCE
const app = initializeApp(firebaseConfig);

// ✅ Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
