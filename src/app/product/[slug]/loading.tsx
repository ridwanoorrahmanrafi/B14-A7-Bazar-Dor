export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-green-50/20">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <div className="h-5 w-32 skeleton-shimmer rounded mb-4" />

        {/* Product summary card skeleton */}
        <div className="bg-white rounded-2xl border border-green-100 p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-24 h-24 skeleton-shimmer rounded-2xl" />
          <div className="flex-1 space-y-3 w-full">
            <div className="h-8 w-60 skeleton-shimmer rounded-lg" />
            <div className="h-4 w-40 skeleton-shimmer rounded" />
            <div className="flex gap-2">
              <div className="h-6 w-20 skeleton-shimmer rounded-full" />
              <div className="h-6 w-24 skeleton-shimmer rounded-full" />
            </div>
          </div>
        </div>

        {/* Price stats skeleton */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-green-100 text-center space-y-2">
            <div className="h-4 w-16 mx-auto skeleton-shimmer rounded" />
            <div className="h-8 w-24 mx-auto skeleton-shimmer rounded-lg" />
          </div>
          <div className="bg-white rounded-2xl p-6 border border-green-200 text-center space-y-2">
            <div className="h-4 w-16 mx-auto skeleton-shimmer rounded" />
            <div className="h-8 w-24 mx-auto skeleton-shimmer rounded-lg" />
          </div>
          <div className="bg-white rounded-2xl p-6 border border-green-100 text-center space-y-2">
            <div className="h-4 w-16 mx-auto skeleton-shimmer rounded" />
            <div className="h-8 w-24 mx-auto skeleton-shimmer rounded-lg" />
          </div>
        </div>

        {/* Market prices skeleton */}
        <div className="bg-white rounded-2xl p-6 border border-green-100 space-y-4">
          <div className="h-6 w-48 skeleton-shimmer rounded-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-14 bg-gray-50 rounded-xl skeleton-shimmer" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
