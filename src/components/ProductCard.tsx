import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice, getUnitLabel } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { slug, nameBn, image, unit, today, change } = product;

  const badgeColor =
    change.dir === 'up'
      ? 'bg-red-50 text-red-700 border-red-200'
      : change.dir === 'down'
      ? 'bg-green-50 text-green-700 border-green-200'
      : 'bg-gray-50 text-gray-500 border-gray-200';

  const arrow =
    change.dir === 'up' ? '▲' : change.dir === 'down' ? '▼' : '—';

  const pct = Math.abs(change.pct);

  return (
    <Link href={`/product/${slug}`} className="block" id={`product-card-${slug}`}>
      <div className="product-card bg-white rounded-2xl border border-green-100 p-5 h-full flex flex-col gap-3 cursor-pointer hover:border-green-300">
        {/* Emoji illustration */}
        <div className="text-5xl text-center leading-none">{image}</div>

        {/* Product info */}
        <div className="flex-1">
          <h3 className="font-semibold text-green-900 text-base leading-snug mb-1">
            {nameBn}
          </h3>
          <p className="text-xs text-gray-400">{getUnitLabel(unit)}</p>
        </div>

        {/* Price row */}
        <div className="border-t border-dashed border-green-100 pt-3">
          <div className="text-xs text-gray-400 mb-1">আজকের দাম</div>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xl font-bold text-green-800">
              {formatPrice(today)} <span className="text-sm font-normal text-gray-400">টাকা</span>
            </span>
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full border ${badgeColor}`}
            >
              {arrow} {pct === 0 ? '০.০%' : `${pct}%`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
