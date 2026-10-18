import Link from 'next/link';
import { fetchProducts, fetchCategories } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PriceTicker from '@/components/PriceTicker';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/types';

export const revalidate = 3600;

export default async function Home() {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  // Top 6 risers (sorted by pct descending, dir === up)
  const risers = [...products]
    .filter((p) => p.change.dir === 'up')
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Top 6 fallers (sorted by pct ascending, dir === down)
  const fallers = [...products]
    .filter((p) => p.change.dir === 'down')
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <Navbar categories={categories} />
      <PriceTicker products={products} />

      <main className="flex-1 page-fade">
        {/* Hero Section */}
        <section className="hero-gradient py-16 md:py-24 border-b border-green-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 space-y-6">
                {/* Eyebrow */}
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  🇧🇩 বাংলাদেশ বাজার তথ্য পোর্টাল
                </span>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-bold text-green-900 leading-tight">
                  প্রতিদিনের{' '}
                  <span className="text-green-600">বাজার দর</span>{' '}
                  এক নজরে
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                  চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার আজকের দাম দেখুন — সারা বাংলাদেশের বাজার থেকে সংগ্রহ করা তথ্য।
                </p>

                {/* CTA Button */}
                <a
                  href="#সব-পণ্য"
                  id="hero-cta-btn"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-200 hover:shadow-xl hover:-translate-y-0.5"
                >
                  সব পণ্য দেখুন
                  <span className="text-xl">↓</span>
                </a>
              </div>

              {/* Hero illustration */}
              <div className="flex-shrink-0 w-full md:w-auto">
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                  <div className="absolute inset-0 bg-green-200 rounded-full opacity-30 blur-3xl" />
                  <div className="relative bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center gap-4">
                    <div className="grid grid-cols-3 gap-3 text-4xl text-center">
                      <span>🍚</span><span>🫘</span><span>🛢️</span>
                      <span>🥬</span><span>🐟</span><span>🍗</span>
                      <span>🥚</span><span>🌶️</span><span>🧄</span>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-green-800">৩৫+ পণ্য</div>
                      <div className="text-xs text-gray-400">৮ ক্যাটাগরি</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section A: Risers */}
        {risers.length > 0 && (
          <section className="py-12 bg-red-50/50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-red-800 section-heading">
                  আজ দাম বেড়েছে ▲
                </h2>
                <p className="text-sm text-red-500 mt-2">সর্বোচ্চ দাম বৃদ্ধি পাওয়া পণ্য</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {risers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section B: Fallers */}
        {fallers.length > 0 && (
          <section className="py-12 bg-green-50/50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-green-800 section-heading">
                  আজ দাম কমেছে ▼
                </h2>
                <p className="text-sm text-green-500 mt-2">সর্বোচ্চ দাম হ্রাস পাওয়া পণ্য</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {fallers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section C: All Products */}
        <section id="সব-পণ্য" className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-green-900 section-heading">
                সব পণ্য
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                সকল ক্যাটাগরির পণ্যের আজকের বাজার দর — {products.length}টি পণ্য
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
