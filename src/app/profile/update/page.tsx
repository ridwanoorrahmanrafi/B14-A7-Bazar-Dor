'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchCategories } from '@/lib/types';
import type { Category } from '@/lib/types';

export default function UpdateProfilePage() {
  const { user, loading: isPending, updateUserName } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    if (!isPending && !user) {
      router.push('/signin?redirect=/profile/update&reason=protected');
    }
    if (user?.displayName) {
      setName(user.displayName);
    }
  }, [user, isPending, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('নাম লিখুন');
      return;
    }
    setLoading(true);
    try {
      await updateUserName(name.trim());
      toast.success('তথ্য সফলভাবে আপডেট হয়েছে! ✅');
      router.push('/profile');
      router.refresh();
    } catch {
      toast.error('তথ্য আপডেট ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-green-600" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <Navbar categories={categories} />
      <main className="flex-1 page-fade max-w-2xl mx-auto px-4 py-10">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm text-green-700 hover:text-green-900 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          প্রোফাইলে ফিরে যান
        </Link>

        <h1 className="text-2xl font-bold text-green-900 mb-8">তথ্য আপডেট</h1>

        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="update-name" className="block text-sm font-medium text-gray-700 mb-2">
                নাম
              </label>
              <input
                id="update-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent text-sm transition-all"
                required
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                ইমেইল (পরিবর্তনযোগ্য নয়)
              </label>
              <input
                type="email"
                value={user.email || ''}
                readOnly
                className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 text-sm text-gray-400 cursor-not-allowed"
              />
            </div>

            <button
              id="update-submit-btn"
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {loading ? 'আপডেট হচ্ছে...' : 'আপডেট করুন'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
