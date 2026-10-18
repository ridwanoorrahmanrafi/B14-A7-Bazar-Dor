'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/ProductCardSkeleton';
import type { Product, Category, SortOption } from '@/lib/types';
import { sortProducts } from '@/lib/types';

interface CategoryClientProps {
  initialProducts: Product[];
  category: Category;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'ডিফল্ট' },
  { value: 'price-asc', label: 'দাম: কম থেকে বেশি' },
  { value: 'price-desc', label: 'দাম: বেশি থেকে কম' },
];

export default function CategoryClient({ initialProducts, category }: CategoryClientProps) {
  const [sort, setSort] = useState<SortOption>('default');
  const [sortOpen, setSortOpen] = useState(false);

  const sorted = sortProducts(initialProducts, sort);
  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label || 'ডিফল্ট';

  if (initialProducts.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="text-6xl">🛒</div>
        <h2 className="text-2xl font-bold text-gray-700">কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="text-gray-400">এই ক্যাটাগরিতে কোনো পণ্য নেই।</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Sort control */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          {sorted.length}টি পণ্য পাওয়া গেছে
        </p>
        <div className="relative">
          <button
            id="sort-dropdown-btn"
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-green-200 rounded-xl text-sm font-medium text-green-800 hover:bg-green-50 transition-colors shadow-sm"
          >
            <span>সাজান: {currentSortLabel}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
          </button>
          {sortOpen && (
            <div className="absolute right-0 mt-1 bg-white border border-green-100 rounded-xl shadow-lg py-1 z-10 min-w-[200px]">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  id={`sort-${opt.value}`}
                  onClick={() => { setSort(opt.value); setSortOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-green-50 transition-colors ${
                    sort === opt.value ? 'text-green-700 font-semibold bg-green-50' : 'text-gray-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
