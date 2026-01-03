// ============================================
// AUTH STORE - State Management
// ============================================
// Manages authentication state using Zustand
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LoginCredentials, RegisterData } from '../types';
import * as userService from '../services/userService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const user = await userService.loginUser(credentials);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          const user = await userService.registerUser(data);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await userService.logoutUser();
          set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Logout failed',
            isLoading: false,
          });
        }
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const user = await userService.getCurrentUser();
          set({
            user,
            isAuthenticated: !!user,
            isLoading: false,
          });
        } catch (error) {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      updateProfile: async (updates: Partial<User>) => {
        set({ isLoading: true, error: null });
        try {
          const user = await userService.updateUserProfile(updates);
          set({ user, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Update failed',
            isLoading: false,
          });
          throw error;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
