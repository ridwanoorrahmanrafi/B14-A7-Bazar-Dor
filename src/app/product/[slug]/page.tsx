import { notFound, redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { fetchProductBySlug, fetchCategories, calcMarketStats, formatPrice, getUnitLabel } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  // Auth check — protected route
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });
  if (!session) {
    redirect(`/signin?redirect=/product/${slug}&reason=protected`);
  }

  // Fetch product
  let product;
  try {
    product = await fetchProductBySlug(slug);
  } catch {
    notFound();
  }

  const categories = await fetchCategories();
  const stats = calcMarketStats(product.markets);

  const changeColor =
    product.change.dir === 'up'
      ? 'text-red-600'
      : product.change.dir === 'down'
      ? 'text-green-600'
      : 'text-gray-500';

  const ChangeIcon =
    product.change.dir === 'up'
      ? TrendingUp
      : product.change.dir === 'down'
      ? TrendingDown
      : Minus;

  // Group markets by division
  const byDivision: Record<string, typeof product.markets> = {};
  for (const m of product.markets) {
    if (!byDivision[m.division]) byDivision[m.division] = [];
    byDivision[m.division].push(m);
  }

  return (
    <>
      <Navbar categories={categories} />

      <main className="flex-1 page-fade max-w-6xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-green-700 hover:text-green-900 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          হোম পেজে ফিরে যান
        </Link>

        {/* Product Summary */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Emoji + info */}
            <div className="text-7xl md:text-8xl leading-none shrink-0">{product.image}</div>

            <div className="flex-1 space-y-4">
              {/* Title */}
              <div>
                <h1 className="text-3xl font-bold text-green-900">{product.nameBn}</h1>
                <p className="text-gray-500 mt-1">
                  {product.categoryIcon} {product.categoryNameBn} বিভাগ — বাজার মূল্য তথ্য
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {product.categoryIcon} {product.categoryNameBn}
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  {getUnitLabel(product.unit)}
                </span>
              </div>

              {/* Change badge */}
              <div className={`flex items-center gap-2 text-lg font-semibold ${changeColor}`}>
                <ChangeIcon className="w-5 h-5" />
                <span>
                  {product.change.dir === 'up'
                    ? `দাম বেড়েছে ${product.change.pct}%`
                    : product.change.dir === 'down'
                    ? `দাম কমেছে ${Math.abs(product.change.pct)}%`
                    : 'দাম অপরিবর্তিত'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-5 text-center">
            <div className="text-xs text-gray-400 mb-1">সর্বনিম্ন দাম</div>
            <div className="text-2xl font-bold text-green-700">
              {formatPrice(stats.min)}
            </div>
            <div className="text-xs text-gray-400">টাকা</div>
          </div>
          <div className="bg-white rounded-2xl border border-green-300 shadow-sm p-5 text-center ring-2 ring-green-200">
            <div className="text-xs text-gray-400 mb-1">গড় দাম</div>
            <div className="text-2xl font-bold text-green-900">
              {formatPrice(stats.avg)}
            </div>
            <div className="text-xs text-gray-400">টাকা</div>
          </div>
          <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-5 text-center">
            <div className="text-xs text-gray-400 mb-1">সর্বোচ্চ দাম</div>
            <div className="text-2xl font-bold text-red-600">
              {formatPrice(stats.max)}
            </div>
            <div className="text-xs text-gray-400">টাকা</div>
          </div>
        </div>

        {/* Price history */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-green-900 mb-4">দামের ইতিহাস</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'আজকের দাম', price: product.today },
              { label: 'গতকাল', price: product.yesterday },
              { label: 'গত সপ্তাহ', price: product.lastWeek },
              { label: 'গত মাস', price: product.lastMonth },
            ].map(({ label, price }) => (
              <div key={label} className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="text-xs text-gray-400 mb-1">{label}</div>
                <div className="text-lg font-bold text-gray-800">
                  {formatPrice(price)} <span className="text-xs font-normal text-gray-400">টাকা</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market prices section */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-green-900 mb-2">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            {getUnitLabel(product.unit)} — সর্বনিম্ন থেকে সর্বোচ্চ
          </p>

          <div className="space-y-6">
            {Object.entries(byDivision).map(([division, markets]) => (
              <div key={division}>
                <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  {division} বিভাগ
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {markets.map((m) => (
                    <div
                      key={m.market}
                      className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
                    >
                      <div>
                        <div className="text-sm font-medium text-gray-800">{m.market}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-800">
                          {formatPrice(m.min)}–{formatPrice(m.max)}
                        </div>
                        <div className="text-xs text-gray-400">টাকা</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
