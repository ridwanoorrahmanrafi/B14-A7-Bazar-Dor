'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff, LogIn, ShoppingCart } from 'lucide-react';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';
  const { loginWithEmail, loginWithGoogle, loginWithGithub } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get('reason') === 'protected') {
      toast.error('এই পেজটি দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন', { id: 'protected-route-toast' });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('ইমেইল ও পাসওয়ার্ড দিন');
      return;
    }
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      toast.success('সফলভাবে লগইন হয়েছেন! 🎉');
      router.push(redirectTo);
      router.refresh();
    } catch (err: any) {
      const code = err?.code;
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        toast.error('ইমেইল বা পাসওয়ার্ড সঠিক নয়');
      } else if (code === 'auth/invalid-email') {
        toast.error('সঠিক ইমেইল লিখুন');
      } else if (code === 'auth/too-many-requests') {
        toast.error('অতিরিক্ত চেষ্টা করা হয়েছে, কিছুক্ষণ পরে চেষ্টা করুন');
      } else {
        toast.error(err?.message || 'লগইন ব্যর্থ হয়েছে, আবার চেষ্টা করুন');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      toast.success('Google দিয়ে লগইন সফল হয়েছে! 🎉');
      router.push(redirectTo);
      router.refresh();
    } catch (err: any) {
      console.error('Google Sign-in Error:', err);
      if (err?.code === 'auth/unauthorized-domain') {
        toast.error('Firebase Console-এ আপনার Vercel ডোমেইন Authorized Domain হিসেবে যোগ করুন', { duration: 6000 });
      } else if (err?.code === 'auth/popup-blocked') {
        toast.error('ব্রাউজারের পপআপ ব্লকার বন্ধ করে আবার চেষ্টা করুন');
      } else if (err?.code !== 'auth/popup-closed-by-user') {
        toast.error(err?.message || 'Google লগইন ব্যর্থ হয়েছে');
      }
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await loginWithGithub();
      toast.success('GitHub দিয়ে লগইন সফল হয়েছে! 🎉');
      router.push(redirectTo);
      router.refresh();
    } catch (err: any) {
      console.error('GitHub Sign-in Error:', err);
      if (err?.code === 'auth/unauthorized-domain') {
        toast.error('Firebase Console-এ আপনার Vercel ডোমেইন Authorized Domain হিসেবে যোগ করুন', { duration: 6000 });
      } else if (err?.code === 'auth/popup-blocked') {
        toast.error('ব্রাউজারের পপআপ ব্লকার বন্ধ করে আবার চেষ্টা করুন');
      } else if (err?.code !== 'auth/popup-closed-by-user') {
        toast.error(err?.message || 'GitHub লগইন ব্যর্থ হয়েছে');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">বাজার দর</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-8">
          <h1 className="text-2xl font-bold text-green-900 mb-2">সাইন ইন</h1>
          <p className="text-sm text-gray-400 mb-6">আপনার অ্যাকাউন্টে লগইন করুন</p>

          {/* Email/Password form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700 mb-1">
                ইমেইল
              </label>
              <input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="আপনার ইমেইল লিখুন"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent text-sm transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700 mb-1">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  id="signin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent text-sm transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="signin-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-400">
              <span className="bg-white px-3">অথবা</span>
            </div>
          </div>

          {/* Social login buttons */}
          <div className="space-y-3 mb-6">
            <button
              id="google-signin-btn"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google দিয়ে সাইন ইন
            </button>
            <button
              id="github-signin-btn"
              onClick={handleGithubSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub দিয়ে সাইন ইন
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            অ্যাকাউন্ট নেই?{' '}
            <Link href="/signup" className="text-green-600 hover:text-green-800 font-medium">
              রেজিস্ট্রেশন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="loading loading-spinner loading-lg text-green-600" /></div>}>
      <SignInForm />
    </Suspense>
  );
}
