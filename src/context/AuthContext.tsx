'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  auth,
  googleProvider,
  githubProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
  type User,
} from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<User>;
  registerWithEmail: (email: string, pass: string, name: string) => Promise<User>;
  loginWithGoogle: () => Promise<User>;
  loginWithGithub: () => Promise<User>;
  updateUserName: (name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function syncSessionCookie(user: User | null) {
  if (typeof document === 'undefined') return;
  if (user) {
    const sessionData = {
      uid: user.uid,
      email: user.email,
      name: user.displayName || user.email?.split('@')[0] || 'ব্যবহারকারী',
      photoURL: user.photoURL || null,
    };
    document.cookie = `bazar_user_session=${encodeURIComponent(
      JSON.stringify(sessionData)
    )}; path=/; max-age=604800; SameSite=Lax`;
  } else {
    document.cookie = 'bazar_user_session=; path=/; max-age=0; SameSite=Lax';
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      syncSessionCookie(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, pass: string): Promise<User> => {
    const res = await signInWithEmailAndPassword(auth, email, pass);
    syncSessionCookie(res.user);
    return res.user;
  };

  const registerWithEmail = async (email: string, pass: string, name: string): Promise<User> => {
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    if (name.trim()) {
      await updateProfile(res.user, { displayName: name.trim() });
    }
    syncSessionCookie(res.user);
    return res.user;
  };

  const loginWithGoogle = async (): Promise<User> => {
    const res = await signInWithPopup(auth, googleProvider);
    syncSessionCookie(res.user);
    return res.user;
  };

  const loginWithGithub = async (): Promise<User> => {
    const res = await signInWithPopup(auth, githubProvider);
    syncSessionCookie(res.user);
    return res.user;
  };

  const updateUserName = async (name: string): Promise<void> => {
    if (!auth.currentUser) throw new Error('কোনো ব্যবহারকারী লগইন নেই');
    await updateProfile(auth.currentUser, { displayName: name.trim() });
    // Trigger local state update
    setUser({ ...auth.currentUser });
    syncSessionCookie(auth.currentUser);
  };

  const logout = async (): Promise<void> => {
    await firebaseSignOut(auth);
    syncSessionCookie(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        loginWithGithub,
        updateUserName,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
