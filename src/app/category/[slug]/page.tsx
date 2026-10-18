import { notFound } from 'next/navigation';
import { fetchProductsByCategory, fetchCategories, fetchCategoryBySlug } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryClient from './CategoryClient';
import Link from 'next/link';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  let category;
  let products;
  let categories;

  try {
    [category, products, categories] = await Promise.all([
      fetchCategoryBySlug(slug),
      fetchProductsByCategory(slug),
      fetchCategories(),
    ]);
  } catch {
    notFound();
  }

  return (
    <>
      <Navbar categories={categories} />

      <main className="flex-1 page-fade">
        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* Category header */}
          <div className="mb-8">
            <Link href="/" className="text-sm text-green-600 hover:text-green-800 mb-4 inline-block">
              ← হোমে ফিরুন
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-4xl shadow-sm">
                {category.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-green-900">{category.nameBn}</h1>
                <p className="text-gray-500 text-sm mt-1">
                  বিভিন্ন বাজার থেকে সংগ্রহ করা আজকের দাম
                </p>
              </div>
            </div>
          </div>

          {/* Category products with sort */}
          <CategoryClient initialProducts={products} category={category} />
        </div>
      </main>

      <Footer />
    </>
  );
}
