import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../../stores/cartStore';
import type { Product } from '../../types';

// Mock product for testing
const createMockProduct = (overrides?: Partial<Product>): Product => ({
  id: '1',
  name: 'Test Product',
  slug: 'test-product',
  description: 'Test description',
  price: 100000,
  discount_price: 90000,
  stock: 10,
  images: ['test.jpg'],
  category: 'test',
  is_active: true,
  created_at: '2026-01-01',
  updated_at: '2026-01-01',
  ...overrides,
});

describe('cartStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useCartStore.getState().clearCart();
  });

  it('should start with empty cart', () => {
    const { items } = useCartStore.getState();
    expect(items).toEqual([]);
  });

  it('should add item to cart', () => {
    const { addItem } = useCartStore.getState();
    const product = createMockProduct();
    
    addItem(product, 1, 'M', 'Black');

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe('Test Product');
    expect(items[0].size).toBe('M');
    expect(items[0].color).toBe('Black');
  });

  it('should increase quantity when adding same item with same size/color', () => {
    const { addItem } = useCartStore.getState();
    const product = createMockProduct();

    addItem(product, 1, 'M', 'Black');
    addItem(product, 2, 'M', 'Black');

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(3);
  });

  it('should add separate item when different size/color', () => {
    const { addItem } = useCartStore.getState();
    const product = createMockProduct();

    addItem(product, 1, 'M', 'Black');
    addItem(product, 1, 'L', 'White');

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(2);
  });

  it('should remove item from cart', () => {
    const { addItem, removeItem } = useCartStore.getState();
    const product = createMockProduct();
    
    addItem(product, 1, 'M', 'Black');

    const { items: itemsAfterAdd } = useCartStore.getState();
    const itemId = itemsAfterAdd[0].id;
    
    removeItem(itemId);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(0);
  });

  it('should update item quantity', () => {
    const { addItem, updateQuantity } = useCartStore.getState();
    const product = createMockProduct();
    
    addItem(product, 1, 'M', 'Black');

    const { items: itemsAfterAdd } = useCartStore.getState();
    const itemId = itemsAfterAdd[0].id;
    
    updateQuantity(itemId, 5);

    const { items } = useCartStore.getState();
    expect(items[0].quantity).toBe(5);
  });

  it('should not exceed max stock when updating quantity', () => {
    const { addItem, updateQuantity } = useCartStore.getState();
    const product = createMockProduct({ stock: 5 });
    
    addItem(product, 1, 'M', 'Black');

    const { items: itemsAfterAdd } = useCartStore.getState();
    const itemId = itemsAfterAdd[0].id;
    
    updateQuantity(itemId, 10); // Try to set more than stock

    const { items } = useCartStore.getState();
    expect(items[0].quantity).toBe(5); // Should be limited to max_stock
  });

  it('should calculate subtotal correctly', () => {
    const { addItem } = useCartStore.getState();
    
    const product1 = createMockProduct({ id: '1', discount_price: 100000 });
    const product2 = createMockProduct({ id: '2', discount_price: 50000 });

    addItem(product1, 2, 'M', 'Black');
    addItem(product2, 3, 'L', 'White');

    const subtotal = useCartStore.getState().getSubtotal();
    expect(subtotal).toBe(350000); // (100000 * 2) + (50000 * 3)
  });

  it('should clear cart', () => {
    const { addItem, clearCart } = useCartStore.getState();
    const product = createMockProduct();
    
    addItem(product, 1, 'M', 'Black');
    addItem(product, 1, 'L', 'White');

    clearCart();

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(0);
  });

  it('should get correct item count', () => {
    const { addItem, getItemCount } = useCartStore.getState();
    const product = createMockProduct();
    
    addItem(product, 2, 'M', 'Black');
    addItem(product, 3, 'L', 'White');

    const count = useCartStore.getState().getItemCount();
    expect(count).toBe(5); // 2 + 3
  });

  it('should toggle cart open/close', () => {
    const { toggleCart, isOpen } = useCartStore.getState();
    
    expect(isOpen).toBe(false);
    
    toggleCart();
    expect(useCartStore.getState().isOpen).toBe(true);
    
    toggleCart();
    expect(useCartStore.getState().isOpen).toBe(false);
  });
});
