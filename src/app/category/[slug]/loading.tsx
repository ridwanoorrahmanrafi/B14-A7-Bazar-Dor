import { ProductGridSkeleton } from '@/components/ProductCardSkeleton';

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-green-50/20">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* Header skeleton */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 skeleton-shimmer rounded-2xl" />
          <div className="space-y-2">
            <div className="h-8 w-48 skeleton-shimmer rounded-lg" />
            <div className="h-4 w-64 skeleton-shimmer rounded" />
          </div>
        </div>

        {/* Sort & count skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-5 w-32 skeleton-shimmer rounded" />
          <div className="h-10 w-44 skeleton-shimmer rounded-xl" />
        </div>

        {/* Product grid skeleton */}
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
