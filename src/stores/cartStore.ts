// ============================================
// CART STORE - State Management
// ============================================
// Manages shopping cart state using Zustand
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types';

export interface CartItem {
  id: string; // Unique ID: product_id + size + color
  product_id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  max_stock: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (product: Product, quantity: number, size: string, color: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Computed
  getItemCount: () => number;
  getSubtotal: () => number;
  getShippingCost: () => number;
  getTotal: () => number;
}

// Generate unique cart item ID
const generateCartItemId = (productId: string, size: string, color: string): string => {
  return `${productId}-${size}-${color}`;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity: number, size: string, color: string) => {
        const id = generateCartItemId(product.id, size, color);
        const { items } = get();
        
        const existingItem = items.find((item) => item.id === id);
        
        if (existingItem) {
          // Update quantity if item exists
          set({
            items: items.map((item) =>
              item.id === id
                ? { ...item, quantity: Math.min(item.quantity + quantity, item.max_stock) }
                : item
            ),
          });
        } else {
          // Add new item
          const newItem: CartItem = {
            id,
            product_id: product.id,
            name: product.name,
            slug: product.slug,
            image: product.images[0] || '',
            price: product.discount_price || product.price,
            quantity,
            size,
            color,
            max_stock: product.stock,
          };
          
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.min(quantity, item.max_stock) }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getShippingCost: () => {
        const subtotal = get().getSubtotal();
        if (subtotal >= 500000) return 0; // Free shipping for orders >= 500k
        if (subtotal >= 200000) return 10000;
        return 15000;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getShippingCost();
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);

// Helper hooks
export const useCartItemCount = () => useCartStore((state) => state.getItemCount());
export const useCartSubtotal = () => useCartStore((state) => state.getSubtotal());
export const useCartTotal = () => useCartStore((state) => state.getTotal());
