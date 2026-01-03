// ============================================
// USER SERVICE - Data Access Layer
// ============================================
// Handles all user-related database operations
// ============================================

import { supabase } from '../lib/supabase';
import type { User, Address, LoginCredentials, RegisterData } from '../types';

// ============================================
// AUTHENTICATION
// ============================================

/**
 * Register new user
 */
export const registerUser = async (data: RegisterData): Promise<User> => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.full_name,
        phone: data.phone,
      },
    },
  });

  if (authError) {
    throw new Error(authError.message);
  }

  if (!authData.user) {
    throw new Error('Registration failed');
  }

  // Create profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user.id,
      email: data.email,
      full_name: data.full_name,
      phone: data.phone,
      role: 'customer',
      is_active: true,
    })
    .select()
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  return profile as User;
};

/**
 * Login user
 */
export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('Login failed');
  }

  // Get profile
  const profile = await getUserProfile();
  if (!profile) {
    throw new Error('User profile not found');
  }

  return profile;
};

/**
 * Logout user
 */
export const logoutUser = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }

  return getUserProfile();
};

/**
 * Reset password
 */
export const resetPassword = async (email: string): Promise<void> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Update password
 */
export const updatePassword = async (newPassword: string): Promise<void> => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error(error.message);
  }
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
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() } as never)
    .eq('id', user.id)
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
