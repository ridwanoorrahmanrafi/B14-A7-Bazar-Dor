import { ProductGridSkeleton } from '@/components/ProductCardSkeleton';

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-green-50/20">
      {/* Navbar skeleton placeholder */}
      <div className="h-16 bg-white border-b border-green-100 flex items-center px-4 max-w-6xl mx-auto justify-between">
        <div className="h-8 w-32 skeleton-shimmer rounded-lg" />
        <div className="h-8 w-48 skeleton-shimmer rounded-lg" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Hero skeleton */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-green-100 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <div className="h-6 w-40 skeleton-shimmer rounded-full" />
            <div className="h-12 w-3/4 skeleton-shimmer rounded-xl" />
            <div className="h-6 w-full skeleton-shimmer rounded-lg" />
            <div className="h-12 w-48 skeleton-shimmer rounded-xl mt-4" />
          </div>
          <div className="w-64 h-64 skeleton-shimmer rounded-3xl shrink-0" />
        </div>

        {/* Risers skeleton */}
        <div>
          <div className="h-8 w-48 skeleton-shimmer rounded-lg mb-6" />
          <ProductGridSkeleton count={6} />
        </div>

        {/* All products skeleton */}
        <div>
          <div className="h-8 w-36 skeleton-shimmer rounded-lg mb-6" />
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    </div>
  );
}
