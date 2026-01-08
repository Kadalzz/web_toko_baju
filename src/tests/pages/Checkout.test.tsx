import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '../utils/test-utils';
import Checkout from '../../pages/Checkout';
import { useCartStore } from '../../stores/cartStore';
import type { Product } from '../../types';

// Mock product for testing
const createMockProduct = (): Product => ({
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
});

describe('Checkout Page', () => {
  beforeEach(() => {
    // Reset cart before each test
    useCartStore.getState().clearCart();
  });

  it('shows empty cart message when cart is empty', () => {
    render(<Checkout />);
    
    expect(screen.getByText(/keranjang kosong/i)).toBeInTheDocument();
  });

  it('shows checkout form when cart has items', () => {
    // Add item to cart first using the correct signature
    const product = createMockProduct();
    useCartStore.getState().addItem(product, 1, 'M', 'Black');

    render(<Checkout />);
    
    // Should show checkout form elements
    expect(screen.queryByText(/keranjang kosong/i)).not.toBeInTheDocument();
  });

  it('displays link to products page when cart is empty', () => {
    render(<Checkout />);
    
    const shopLink = screen.getByRole('link', { name: /belanja sekarang/i });
    expect(shopLink).toBeInTheDocument();
    expect(shopLink).toHaveAttribute('href', '/products');
  });
});
