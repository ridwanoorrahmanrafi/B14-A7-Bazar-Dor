import { Product, Category } from './types';

const BASE_URL_1 = 'https://api.api-store.workers.dev/api/bazardor';
const BASE_URL_2 = 'https://api.abcz.workers.dev/api/bazardor';

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const url1 = `${BASE_URL_1}${endpoint}`;
  const url2 = `${BASE_URL_2}${endpoint}`;

  try {
    const res = await fetch(url1, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      return (await res.json()) as T;
    }
  } catch (error) {
    console.warn(`Primary API ${url1} failed, trying fallback:`, error);
  }

  // Fallback to secondary API
  const fallbackRes = await fetch(url2, {
    next: { revalidate: 60 },
  });
  if (!fallbackRes.ok) {
    throw new Error(`Failed to fetch from fallback API ${url2}: ${fallbackRes.statusText}`);
  }
  return (await fallbackRes.json()) as T;
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    return await fetchFromApi<Product[]>('/products');
  } catch (err) {
    console.error('Error fetching all products:', err);
    return [];
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const products = await fetchFromApi<Product[]>(`/products?category=${encodeURIComponent(categorySlug)}`);
    if (Array.isArray(products) && products.length > 0) {
      return products;
    }
  } catch (err) {
    console.warn(`Category query for ${categorySlug} failed, filtering from all products:`, err);
  }

  // Fallback: fetch all and filter locally
  const all = await getAllProducts();
  return all.filter((p) => p.category === categorySlug);
}

export async function getProductByIdOrSlug(idOrSlug: string): Promise<Product | null> {
  // If it's a numeric id, try direct endpoint first
  if (/^\d+$/.test(idOrSlug)) {
    try {
      const prod = await fetchFromApi<Product>(`/products/${idOrSlug}`);
      if (prod && prod.id) return prod;
    } catch {
      // Continue to search by slug or ID
    }
  }

  // Otherwise or if not found, search in all products
  const all = await getAllProducts();
  const matched = all.find(
    (p) => String(p.id) === idOrSlug || p.slug === idOrSlug
  );
  return matched || null;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await fetchFromApi<Category[]>('/categories');
    if (Array.isArray(categories) && categories.length > 0) {
      return categories;
    }
  } catch (err) {
    console.error('Error fetching categories:', err);
  }

  // Fallback standard categories if API is down
  return [
    { id: 'chal', slug: 'chal', nameBn: 'চাল', icon: '🍚' },
    { id: 'dal', slug: 'dal', nameBn: 'ডাল', icon: '🫘' },
    { id: 'tel', slug: 'tel', nameBn: 'তেল', icon: '🛢️' },
    { id: 'sobji', slug: 'sobji', nameBn: 'সবজি', icon: '🥬' },
    { id: 'mach', slug: 'mach', nameBn: 'মাছ', icon: '🐟' },
    { id: 'mangsho', slug: 'mangsho', nameBn: 'মাংস', icon: '🍗' },
    { id: 'dim-dui', slug: 'dim-dui', nameBn: 'ডিম-দুধ', icon: '🥛' },
    { id: 'mosla', slug: 'mosla', nameBn: 'মসলা', icon: '🌶️' },
  ];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const cat = await fetchFromApi<Category>(`/categories/${encodeURIComponent(slug)}`);
    if (cat && cat.id) return cat;
  } catch {
    // Continue to fallback
  }

  const all = await getCategories();
  return all.find((c) => c.slug === slug || c.id === slug) || null;
}
