// ============================================
// USER SERVICE - Data Access Layer
// ============================================
// Handles all user-related database operations
// ============================================

import { supabase } from '../lib/supabase';
import type { User, Address, LoginCredentials, RegisterData } from '../types';

// ============================================
// AUTHENTICATION (Custom Users Table)
// ============================================

/**
 * Register new user (using custom users table)
 */
export const registerUser = async (data: RegisterData): Promise<User> => {
  // Check if email already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('email')
    .eq('email', data.email)
    .single();

  if (existingUser) {
    throw new Error('Email sudah terdaftar');
  }

  // Insert new user
  const { data: newUser, error } = await supabase
    .from('users')
    .insert({
      email: data.email,
      password: data.password, // Note: Should be hashed in production!
      full_name: data.full_name,
      phone: data.phone,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return newUser as User;
};

/**
 * Login user (using custom users table)
 */
export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', credentials.email)
    .eq('password', credentials.password) // Note: Should use hashed password in production!
    .single();

  if (error || !data) {
    throw new Error('Email atau password salah');
  }

  return data as User;
};

/**
 * Logout user (clear local storage)
 */
export const logoutUser = async (): Promise<void> => {
  // No server-side logout needed for custom auth
  // Just clear local storage (handled by store)
  return Promise.resolve();
};

/**
 * Get current authenticated user from localStorage
 */
export const getCurrentUser = async (): Promise<User | null> => {
  // User data is stored in localStorage by authStore
  // This is just a placeholder - actual data comes from store
  return null;
};

// ============================================
// PROFILE MANAGEMENT
// ============================================

/**
 * Get user profile
 */
export const getUserProfile = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(error.message);
  }

  return data as User;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (updates: Partial<User>): Promise<User> => {
  // Get user ID from updates (passed from store which has the user object)
  if (!updates.id) {
    throw new Error('User ID is required for profile update');
  }

  const { data, error } = await supabase
    .from('users')
    .update({ 
      full_name: updates.full_name,
      phone: updates.phone,
      updated_at: new Date().toISOString() 
    })
    .eq('id', updates.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as User;
};

/**
 * Upload avatar
 */
export const uploadAvatar = async (file: File): Promise<string> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, file);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName);

  // Update profile with new avatar URL
  await updateUserProfile({ avatar_url: publicUrl });

  return publicUrl;
};

// ============================================
// ADDRESS MANAGEMENT
// ============================================

/**
 * Get user addresses
 */
export const getUserAddresses = async (): Promise<Address[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as Address[]) || [];
};

/**
 * Add new address
 */
export const addAddress = async (address: Omit<Address, 'id' | 'user_id'>): Promise<Address> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  // If this is default, unset other defaults
  if (address.is_default) {
    await supabase
      .from('addresses')
      .update({ is_default: false } as never)
      .eq('user_id', user.id);
  }

  const { data, error } = await supabase
    .from('addresses')
    .insert({ ...address, user_id: user.id } as never)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Address;
};

/**
 * Update address
 */
export const updateAddress = async (id: string, updates: Partial<Address>): Promise<Address> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  // If setting as default, unset other defaults first
  if (updates.is_default) {
    await supabase
      .from('addresses')
      .update({ is_default: false } as never)
      .eq('user_id', user.id)
      .neq('id', id);
  }

  const { data, error } = await supabase
    .from('addresses')
    .update(updates as never)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Address;
};

/**
 * Delete address
 */
export const deleteAddress = async (id: string): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('addresses')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Get default address
 */
export const getDefaultAddress = async (): Promise<Address | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_default', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(error.message);
  }

  return data as Address;
};
