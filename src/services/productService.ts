// ============================================
// PRODUCT SERVICE - Data Access Layer
// ============================================
// Handles all product-related database operations
// ============================================

import { supabase } from '../lib/supabase';
import type { Product, ProductFilter, PaginatedResponse } from '../types';

/**
 * Get all products with optional filtering and pagination
 */
export const getProducts = async (
  filter?: ProductFilter,
  page: number = 1,
  limit: number = 12
): Promise<PaginatedResponse<Product>> => {
  let query = supabase
    .from('products')
    .select('*, categories(name, slug)', { count: 'exact' })
    .eq('is_active', true);

  // Apply filters
  if (filter?.category) {
    query = query.eq('category_id', filter.category);
  }

  if (filter?.minPrice) {
    query = query.gte('price', filter.minPrice);
  }

  if (filter?.maxPrice) {
    query = query.lte('price', filter.maxPrice);
  }

  if (filter?.search) {
    query = query.or(`name.ilike.%${filter.search}%,description.ilike.%${filter.search}%`);
  }

  // Apply sorting
  switch (filter?.sortBy) {
    case 'price_low':
      query = query.order('price', { ascending: true });
      break;
    case 'price_high':
      query = query.order('price', { ascending: false });
      break;
    case 'popular':
      query = query.order('stock', { ascending: false });
      break;
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false });
  }

  // Apply pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: (data as unknown as Product[]) || [],
    total: count || 0,
    page,
    limit,
    total_pages: Math.ceil((count || 0) / limit),
  };
};

/**
 * Get featured products for homepage
 */
export const getFeaturedProducts = async (limit: number = 8): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return (data as unknown as Product[]) || [];
};

/**
 * Get product by slug
 */
export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Product not found
    }
    throw new Error(error.message);
  }

  return data as unknown as Product;
};

/**
 * Get product by ID
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(error.message);
  }

  return data as unknown as Product;
};

/**
 * Get related products by category
 */
export const getRelatedProducts = async (
  categoryId: string,
  currentProductId: string,
  limit: number = 4
): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .neq('id', currentProductId)
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return (data as unknown as Product[]) || [];
};

/**
 * Search products
 */
export const searchProducts = async (query: string, limit: number = 10): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, slug, price, discount_price, images')
    .eq('is_active', true)
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return (data as unknown as Product[]) || [];
};

// ============================================
// ADMIN OPERATIONS
// ============================================

/**
 * Get all products for admin (includes inactive)
 */
export const getAllProducts = async (
  page: number = 1,
  limit: number = 100
): Promise<PaginatedResponse<Product>> => {
  let query = supabase
    .from('products')
    .select('*, categories(name, slug)', { count: 'exact' })
    .order('created_at', { ascending: false });

  // Apply pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: (data as unknown as Product[]) || [],
    total: count || 0,
    page,
    limit,
    total_pages: Math.ceil((count || 0) / limit),
  };
};

/**
 * Create new product (Admin only)
 */
export const createProduct = async (product: Omit<Product, 'id' | 'created_at'>): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .insert(product as never)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as unknown as Product;
};

/**
 * Update product (Admin only)
 */
export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .update({ ...updates, updated_at: new Date().toISOString() } as never)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as unknown as Product;
};

/**
 * Delete product (Admin only - hard delete)
 */
export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Update product stock
 */
export const updateProductStock = async (id: string, quantity: number): Promise<void> => {
  const { error } = await supabase.rpc('decrement_stock', {
    product_id: id,
    quantity: quantity,
  });

  if (error) {
    throw new Error(error.message);
  }
};
