// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqomCZEsj9-ruoCW0ttsFynR_4TjaQGLI",
  authDomain: "canteen-management-system-famt.firebaseapp.com",
  projectId: "canteen-management-system-famt",
  storageBucket: "canteen-management-system-famt.firebasestorage.app",
  messagingSenderId: "24087358050",
  appId: "1:24087358050:web:0ca67d6b204d015ca6ff3b",
  measurementId: "G-3X77BNS20S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore with offline persistence
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

export const storage = getStorage(app);