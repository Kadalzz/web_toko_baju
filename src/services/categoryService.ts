// ============================================
// CATEGORY SERVICE - Data Access Layer
// ============================================
// Handles all category-related database operations
// ============================================

import { supabase } from '../lib/supabase';
import type { Category } from '../types';

/**
 * Get all active categories
 */
export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    throw new Error(error.message);
  }

  return (data as Category[]) || [];
};

/**
 * Get category by slug
 */
export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(error.message);
  }

  return data as Category;
};

/**
 * Get category by ID
 */
export const getCategoryById = async (id: string): Promise<Category | null> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(error.message);
  }

  return data as Category;
};

/**
 * Get parent categories (no parent_id)
 */
export const getParentCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .is('parent_id', null)
    .order('name');

  if (error) {
    throw new Error(error.message);
  }

  return (data as Category[]) || [];
};

/**
 * Get subcategories by parent ID
 */
export const getSubcategories = async (parentId: string): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .eq('parent_id', parentId)
    .order('name');

  if (error) {
    throw new Error(error.message);
  }

  return (data as Category[]) || [];
};

// ============================================
// ADMIN OPERATIONS
// ============================================

/**
 * Get all categories (for admin - includes inactive)
 */
export const getAllCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    throw new Error(error.message);
  }

  return (data as Category[]) || [];
};

/**
 * Create new category (Admin only)
 */
export const createCategory = async (category: Omit<Category, 'id' | 'created_at'>): Promise<Category> => {
  const { data, error } = await supabase
    .from('categories')
    .insert(category as never)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Category;
};

/**
 * Update category (Admin only)
 */
export const updateCategory = async (id: string, updates: Partial<Category>): Promise<Category> => {
  const { data, error } = await supabase
    .from('categories')
    .update(updates as never)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Category;
};

/**
 * Delete category (Admin only - hard delete)
 */
export const deleteCategory = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};
