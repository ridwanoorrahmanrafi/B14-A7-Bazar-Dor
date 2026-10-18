import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCUZEI1hQu0rkTBIZX5JCauybbAQ4k4e7g",
  authDomain: "practice-affb9.firebaseapp.com",
  projectId: "practice-affb9",
  storageBucket: "practice-affb9.firebasestorage.app",
  messagingSenderId: "304407709048",
  appId: "1:304407709048:web:f0efb510184daa1e64348d",
  measurementId: "G-CBD73M53R9",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
};
export type { User };
