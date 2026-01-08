// Mock data for testing

export const mockProducts = [
  {
    id: '1',
    name: 'Kaos Polos Premium',
    slug: 'kaos-polos-premium',
    description: 'Kaos polos berkualitas tinggi dengan bahan cotton combed 30s',
    category_id: '1',
    price: 89000,
    discount_price: 75000,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'],
    variants: [
      { name: 'S', price: 75000 },
      { name: 'M', price: 75000 },
      { name: 'L', price: 80000 },
      { name: 'XL', price: 85000 },
    ],
    stock: 50,
    is_active: true,
  },
  {
    id: '2',
    name: 'Kemeja Formal Pria',
    slug: 'kemeja-formal-pria',
    description: 'Kemeja formal untuk acara resmi',
    category_id: '2',
    price: 195000,
    discount_price: null,
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf'],
    variants: [
      { name: 'S', price: 195000 },
      { name: 'M', price: 195000 },
      { name: 'L', price: 200000 },
      { name: 'XL', price: 205000 },
    ],
    stock: 30,
    is_active: true,
  },
];

export const mockCategories = [
  {
    id: '1',
    name: 'Kaos',
    slug: 'kaos',
    description: 'Koleksi kaos pria dan wanita',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    parent_id: null,
    is_active: true,
    sort_order: 1,
  },
  {
    id: '2',
    name: 'Kemeja',
    slug: 'kemeja',
    description: 'Kemeja formal dan casual',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf',
    parent_id: null,
    is_active: true,
    sort_order: 2,
  },
  {
    id: '3',
    name: 'Celana',
    slug: 'celana',
    description: 'Celana jeans, chino, dan cargo',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a',
    parent_id: null,
    is_active: true,
    sort_order: 3,
  },
];

export const mockCustomer = {
  id: '1',
  user_id: 'user-123',
  full_name: 'John Doe',
  email: 'john@example.com',
  phone: '08123456789',
};

export const mockAddress = {
  id: '1',
  customer_id: '1',
  address: 'Jl. Contoh No. 123',
  city: 'Jakarta',
  province: 'DKI Jakarta',
  postal_code: '12345',
  is_default: true,
};

export const mockOrder = {
  id: '1',
  order_number: 'ORD202601010001',
  customer_id: '1',
  shipping_address_id: '1',
  subtotal: 150000,
  shipping_cost: 15000,
  discount: 0,
  total: 165000,
  payment_method: 'transfer',
  payment_status: 'pending',
  order_status: 'pending',
  notes: '',
};

export const mockOrderItems = [
  {
    id: '1',
    order_id: '1',
    product_id: '1',
    product_name: 'Kaos Polos Premium',
    product_image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    variant: 'M',
    quantity: 2,
    unit_price: 75000,
    total_price: 150000,
    uploaded_images: [],
  },
];

export const mockCartItems = [
  {
    id: '1',
    name: 'Kaos Polos Premium',
    price: 75000,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    variant: 'M',
  },
  {
    id: '2',
    name: 'Kemeja Formal Pria',
    price: 195000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf',
    variant: 'L',
  },
];

export const mockUser = {
  id: 'user-123',
  email: 'john@example.com',
  user_metadata: {
    full_name: 'John Doe',
  },
};
