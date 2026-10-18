export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface PriceChange {
  dir: 'up' | 'down' | 'flat';
  pct: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: MarketPrice[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export type SortOption = 'default' | 'price-asc' | 'price-desc';

// Unit display labels in Bangla
export const UNIT_LABELS: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

// Convert English digits to Bangla digits
export function toBengaliDigit(num: number | string): string {
  const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => digits[parseInt(d)]);
}

// Format price with Bengali digits and comma separators
export function formatPrice(price: number): string {
  const formatted = price.toLocaleString("en-IN");
  return toBengaliDigit(formatted);
}

// Get Bangla date string
export function getBanglaDate(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Dhaka",
  };
  try {
    return now.toLocaleDateString("bn-BD", options);
  } catch {
    return now.toLocaleDateString("en-US", options);
  }
}

// Get unit label in Bangla
export function getUnitLabel(unit: string): string {
  return UNIT_LABELS[unit] || `প্রতি ${unit}`;
}

// Calculate average of markets
export function calcMarketStats(markets: MarketPrice[]) {
  if (!markets || markets.length === 0) {
    return { min: 0, max: 0, avg: 0 };
  }
  const allPrices = markets.flatMap((m) => [m.min, m.max]);
  const min = Math.min(...markets.map((m) => m.min));
  const max = Math.max(...markets.map((m) => m.max));
  const avg = Math.round(allPrices.reduce((a, b) => a + b, 0) / allPrices.length);
  return { min, max, avg };
}

// Sort products by price (numeric)
export function sortProducts(products: Product[], sort: SortOption): Product[] {
  if (sort === "price-asc") {
    return [...products].sort((a, b) => a.today - b.today);
  } else if (sort === "price-desc") {
    return [...products].sort((a, b) => b.today - a.today);
  }
  return products;
}

const BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function apiFetch<T>(endpoint: string): Promise<T> {
  let lastError: unknown;
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${endpoint}`, { next: { revalidate: 3600 } });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error(`Failed to fetch from ${endpoint}`);
}

export async function fetchProducts(): Promise<Product[]> {
  return apiFetch<Product[]>("/products");
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  // If slug is numeric, try direct ID endpoint
  if (/^\d+$/.test(slug)) {
    try {
      return await apiFetch<Product>(`/products/${slug}`);
    } catch {
      // fallback to list search
    }
  }

  // Otherwise search across all products by slug or id
  const products = await fetchProducts();
  const found = products.find(
    (p) => p.slug === slug || String(p.id) === slug
  );

  if (!found) {
    throw new Error("Product not found");
  }

  return found;
}

export async function fetchCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  return apiFetch<Product[]>(`/products?category=${encodeURIComponent(category)}`);
}

export async function fetchCategoryBySlug(slug: string): Promise<Category> {
  try {
    return await apiFetch<Category>(`/categories/${encodeURIComponent(slug)}`);
  } catch {
    const categories = await fetchCategories();
    const found = categories.find((c) => c.slug === slug || c.id === slug);
    if (!found) {
      throw new Error("Category not found");
    }
    return found;
  }
}
