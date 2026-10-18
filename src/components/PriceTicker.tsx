'use client';

import { useEffect, useRef, useState } from 'react';
import type { Product } from '@/lib/types';
import { formatPrice, getUnitLabel } from '@/lib/types';

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    // Duplicate for seamless loop
    setItems([...products, ...products]);
  }, [products]);

  if (products.length === 0) return null;

  return (
    <div className="bg-[#14532d] text-white py-2 overflow-hidden" aria-label="দাম টিকার">
      <div className="flex items-center">
        <div className="shrink-0 px-3 py-0.5 bg-yellow-400 text-green-900 text-xs font-bold rounded-r-full mr-3 whitespace-nowrap z-10">
          📊 লাইভ দাম
        </div>
        <div className="overflow-hidden flex-1">
          <div className="ticker-track">
            {items.map((p, idx) => (
              <span
                key={`${p.id}-${idx}`}
                className="inline-flex items-center gap-1.5 mr-8 text-sm"
              >
                <span>{p.image}</span>
                <span className="font-medium">{p.nameBn}</span>
                <span className="text-green-300">
                  {formatPrice(p.today)} টাকা/{p.unit === 'kg' ? 'কেজি' : p.unit === 'litre' ? 'লিটার' : p.unit === 'dozen' ? 'ডজন' : 'পিস'}
                </span>
                <span
                  className={`font-bold text-xs ${
                    p.change.dir === 'up'
                      ? 'text-yellow-300'
                      : p.change.dir === 'down'
                      ? 'text-red-300'
                      : 'text-gray-400'
                  }`}
                >
                  {p.change.dir === 'up' ? '▲' : p.change.dir === 'down' ? '▼' : '—'}
                  {p.change.pct !== 0 ? ` ${Math.abs(p.change.pct)}%` : ' ০%'}
                </span>
                <span className="text-green-600 ml-4">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
