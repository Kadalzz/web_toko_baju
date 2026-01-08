# 📚 API Reference - Fashion Store

Dokumentasi lengkap untuk Data Access Layer dan Supabase API.

## Daftar Isi

- [Overview](#overview)
- [Authentication](#authentication)
- [Products API](#products-api)
- [Categories API](#categories-api)
- [Orders API](#orders-api)
- [Users API](#users-api)
- [Cart API](#cart-api)

---

## Overview

### Base Configuration

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

### Response Format

Semua response mengikuti format:

```typescript
interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  count?: number;
}
```

---

## Authentication

### Register User

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword',
  options: {
    data: {
      full_name: 'John Doe',
      phone: '+6281234567890'
    }
  }
});
```

### Login

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword'
});
```

### Logout

```typescript
const { error } = await supabase.auth.signOut();
```

### Get Current User

```typescript
const { data: { user } } = await supabase.auth.getUser();
```

---

## Products API

### Get All Products

```typescript
// src/services/productService.ts

export const getProducts = async (options?: {
  category?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'created_at' | 'price' | 'name';
  sortOrder?: 'asc' | 'desc';
}) => {
  let query = supabase
    .from('products')
    .select('*, categories(name)', { count: 'exact' });

  if (options?.category) {
    query = query.eq('category_id', options.category);
  }

  if (options?.sortBy) {
    query = query.order(options.sortBy, { 
      ascending: options.sortOrder === 'asc' 
    });
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  return await query;
};
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Kaos Polos Premium",
      "slug": "kaos-polos-premium",
      "description": "Kaos polos berbahan cotton combed 30s",
      "price": 89000,
      "discount_price": 79000,
      "category_id": "uuid",
      "images": ["url1", "url2"],
      "sizes": ["S", "M", "L", "XL"],
      "colors": ["Hitam", "Putih", "Navy"],
      "stock": 100,
      "is_featured": true,
      "is_active": true,
      "created_at": "2025-01-01T00:00:00Z"
    }
  ],
  "count": 50
}
```

### Get Product by ID/Slug

```typescript
export const getProductBySlug = async (slug: string) => {
  return await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('slug', slug)
    .single();
};
```

### Create Product (Admin)

```typescript
export const createProduct = async (product: ProductInsert) => {
  return await supabase
    .from('products')
    .insert(product)
    .select()
    .single();
};
```

### Update Product (Admin)

```typescript
export const updateProduct = async (id: string, updates: ProductUpdate) => {
  return await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
};
```

### Delete Product (Admin)

```typescript
export const deleteProduct = async (id: string) => {
  return await supabase
    .from('products')
    .delete()
    .eq('id', id);
};
```

### Search Products

```typescript
export const searchProducts = async (query: string) => {
  return await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .eq('is_active', true);
};
```

---

## Categories API

### Get All Categories

```typescript
export const getCategories = async () => {
  return await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('name');
};
```

### Get Category with Products

```typescript
export const getCategoryWithProducts = async (slug: string) => {
  return await supabase
    .from('categories')
    .select('*, products(*)')
    .eq('slug', slug)
    .single();
};
```

---

## Orders API

### Create Order

```typescript
export const createOrder = async (orderData: {
  items: OrderItem[];
  shipping_address: Address;
  payment_method: string;
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User not authenticated');

  // Calculate totals
  const subtotal = orderData.items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
  const shipping = 15000;
  const total = subtotal + shipping;

  // Create order
  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      subtotal,
      shipping_cost: shipping,
      total,
      shipping_address: orderData.shipping_address,
      payment_method: orderData.payment_method,
      status: 'pending'
    })
    .select()
    .single();

  if (error) throw error;

  // Create order items
  const orderItems = orderData.items.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
    size: item.size,
    color: item.color
  }));

  await supabase.from('order_items').insert(orderItems);

  return order;
};
```

### Get User Orders

```typescript
export const getUserOrders = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  return await supabase
    .from('orders')
    .select('*, order_items(*, products(name, images))')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });
};
```

### Get Order Detail

```typescript
export const getOrderDetail = async (orderId: string) => {
  return await supabase
    .from('orders')
    .select('*, order_items(*, products(*))')
    .eq('id', orderId)
    .single();
};
```

### Update Order Status (Admin)

```typescript
export const updateOrderStatus = async (
  orderId: string, 
  status: OrderStatus
) => {
  return await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select()
    .single();
};
```

---

## Users API

### Get User Profile

```typescript
export const getUserProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  return await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single();
};
```

### Update User Profile

```typescript
export const updateUserProfile = async (updates: ProfileUpdate) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  return await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user?.id)
    .select()
    .single();
};
```

### Get User Addresses

```typescript
export const getUserAddresses = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  return await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', user?.id)
    .order('is_default', { ascending: false });
};
```

---

## Cart API

Cart dikelola secara lokal menggunakan Zustand store untuk performa yang lebih baik.

### Cart Store

```typescript
// src/stores/cartStore.ts

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}
```

### Usage Example

```typescript
import { useCartStore } from '../stores/cartStore';

// In component
const { items, addItem, removeItem, getTotal } = useCartStore();

// Add item
addItem({
  product_id: 'uuid',
  name: 'Kaos Polos',
  price: 89000,
  quantity: 1,
  size: 'L',
  color: 'Hitam',
  image: 'url'
});

// Get total
const total = getTotal(); // 89000
```

---

## Error Handling

### Standard Error Format

```typescript
interface ApiError {
  message: string;
  code: string;
  details?: string;
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `PGRST116` | Row not found |
| `23505` | Unique constraint violation |
| `23503` | Foreign key violation |
| `42501` | Permission denied |

### Error Handling Example

```typescript
try {
  const { data, error } = await getProductBySlug('kaos-polos');
  
  if (error) {
    if (error.code === 'PGRST116') {
      // Product not found
      throw new Error('Produk tidak ditemukan');
    }
    throw error;
  }
  
  return data;
} catch (error) {
  console.error('Error fetching product:', error);
  throw error;
}
```

---

## Rate Limiting

Supabase memiliki rate limiting default:
- **Anonymous requests**: 100 requests/minute
- **Authenticated requests**: 1000 requests/minute

Untuk menghindari rate limiting, implementasikan caching dan debouncing.

---

*Dokumentasi ini akan diperbarui seiring perkembangan API.*
