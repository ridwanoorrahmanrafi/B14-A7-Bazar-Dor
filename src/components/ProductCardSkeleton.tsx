export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-green-100 p-5 flex flex-col gap-3 animate-pulse">
      {/* Emoji placeholder */}
      <div className="h-12 w-12 mx-auto rounded-full skeleton-shimmer" />

      {/* Name */}
      <div className="space-y-2">
        <div className="h-4 skeleton-shimmer rounded w-3/4" />
        <div className="h-3 skeleton-shimmer rounded w-1/2" />
      </div>

      {/* Price */}
      <div className="border-t border-dashed border-green-100 pt-3 space-y-2">
        <div className="h-3 skeleton-shimmer rounded w-1/3" />
        <div className="flex justify-between">
          <div className="h-6 skeleton-shimmer rounded w-2/5" />
          <div className="h-5 skeleton-shimmer rounded-full w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
