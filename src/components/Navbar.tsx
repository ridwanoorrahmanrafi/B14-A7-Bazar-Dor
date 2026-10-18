'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getBanglaDate } from '@/lib/types';
import type { Category } from '@/lib/types';
import { ShoppingCart, LogIn, UserPlus, LogOut, User, ChevronDown, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  const pathname = usePathname();
  const { user, loading: isPending, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [banglaDate, setBanglaDate] = useState('');

  useEffect(() => {
    setBanglaDate(getBanglaDate());
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success('সফলভাবে সাইন আউট হয়েছেন');
    } catch {
      toast.error('সাইন আউট ব্যর্থ হয়েছে');
    }
  };

  const isActiveCategory = (slug: string) => {
    return pathname === `/category/${slug}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white navbar-shadow">
      {/* Top row: Logo + Auth */}
      <div className="border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shadow-md group-hover:bg-green-700 transition-colors">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-green-800 leading-tight">🛒 বাজার দর</div>
              <div className="text-xs text-green-600 leading-tight">{banglaDate || '...'}</div>
            </div>
          </Link>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isPending ? (
              <div className="skeleton-shimmer h-9 w-32 rounded-lg" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-green-800 hover:bg-green-50 transition-colors"
                >
                  {user.photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.photoURL} alt={user.displayName || user.email || ''} className="w-7 h-7 rounded-full" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">
                      {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium">{user.displayName || user.email?.split('@')[0]}</span>
                </Link>
                <button
                  id="signout-btn"
                  onClick={handleSignOut}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  সাইন আউট
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  id="signin-nav-btn"
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-green-700 border border-green-200 hover:bg-green-50 transition-colors text-sm font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  id="signup-nav-btn"
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors text-sm font-medium shadow-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  সাইন আপ
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-green-700 hover:bg-green-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="মেনু"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Category nav row */}
      <div className="bg-green-800">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
            <Link
              href="/"
              className={`px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                pathname === '/'
                  ? 'text-yellow-300 border-yellow-300'
                  : 'text-green-100 border-transparent hover:text-white hover:border-green-400'
              }`}
            >
              🏠 সব পণ্য
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActiveCategory(cat.slug)
                    ? 'text-yellow-300 border-yellow-300'
                    : 'text-green-100 border-transparent hover:text-white hover:border-green-400'
                }`}
              >
                {cat.icon} {cat.nameBn}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-green-100 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-1">
            {/* Auth section */}
            <div className="pb-3 border-b border-green-100">
              {isPending ? (
                <div className="skeleton-shimmer h-9 w-full rounded-lg" />
              ) : user ? (
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-green-800 hover:bg-green-50"
                  >
                    <User className="w-4 h-4" />
                    <span>{user.displayName || user.email?.split('@')[0]}</span>
                  </Link>
                  <button
                    onClick={() => { handleSignOut(); setMobileOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    সাইন আউট
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-green-700 border border-green-200 text-sm font-medium"
                  >
                    <LogIn className="w-4 h-4" /> সাইন ইন
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-green-600 text-white text-sm font-medium"
                  >
                    <UserPlus className="w-4 h-4" /> সাইন আপ
                  </Link>
                </div>
              )}
            </div>

            {/* Category links */}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                pathname === '/' ? 'bg-green-100 text-green-800' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              🏠 সব পণ্য
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActiveCategory(cat.slug) ? 'bg-green-100 text-green-800' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat.icon} {cat.nameBn}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
