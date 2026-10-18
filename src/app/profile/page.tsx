'use client';

import { useEffect } from 'react';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, Mail, Edit, LogOut, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchCategories } from '@/lib/types';
import type { Category } from '@/lib/types';
import { useState } from 'react';

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/signin?redirect=/profile&reason=protected');
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    await signOut();
    toast.success('সাইন আউট হয়েছেন');
    router.push('/');
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-green-600" />
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;

  return (
    <>
      <Navbar categories={categories} />
      <main className="flex-1 page-fade max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-green-900 mb-8">আমার প্রোফাইল</h1>

        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-8 space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-5">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-green-600 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>

          {/* Info rows */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-3 text-gray-700">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-500 w-20">নাম:</span>
              <span className="text-sm">{user.name}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-500 w-20">ইমেইল:</span>
              <span className="text-sm">{user.email}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
            <Link
              href="/profile/update"
              id="update-profile-btn"
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <Edit className="w-4 h-4" />
              তথ্য আপডেট করুন
            </Link>
            <button
              id="profile-signout-btn"
              onClick={handleSignOut}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              সাইন আউট
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-green-600 hover:text-green-800">
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
