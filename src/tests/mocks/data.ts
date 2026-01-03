// Mock data for testing

export const mockProducts = [
  {
    id: '1',
    name: 'Album Foto Premium',
    slug: 'album-foto-premium',
    description: 'Album foto berkualitas tinggi',
    category_id: '1',
    price: 250000,
    discount_price: 200000,
    images: ['https://example.com/album1.jpg'],
    variants: [],
    stock: 10,
    is_active: true,
  },
  {
    id: '2',
    name: 'Figura Kayu',
    slug: 'figura-kayu',
    description: 'Bingkai kayu berkualitas',
    category_id: '2',
    price: 150000,
    discount_price: null,
    images: ['https://example.com/figura1.jpg'],
    variants: [
      { name: '4x6', price: 150000 },
      { name: '5x7', price: 180000 },
    ],
    stock: 25,
    is_active: true,
  },
];

export const mockCategories = [
  {
    id: '1',
    name: 'Cetak Foto',
    slug: 'cetak-foto',
    description: 'Layanan cetak foto berkualitas tinggi',
    image: 'https://example.com/cetak-foto.jpg',
    parent_id: null,
    is_active: true,
    sort_order: 1,
  },
  {
    id: '2',
    name: 'Album',
    slug: 'album',
    description: 'Berbagai pilihan album foto',
    image: 'https://example.com/album.jpg',
    parent_id: null,
    is_active: true,
    sort_order: 2,
  },
  {
    id: '3',
    name: 'Figura',
    slug: 'figura',
    description: 'Bingkai foto berkualitas',
    image: 'https://example.com/figura.jpg',
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
  subtotal: 400000,
  shipping_cost: 15000,
  discount: 0,
  total: 415000,
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
    product_name: 'Album Foto Premium',
    product_image: 'https://example.com/album1.jpg',
    variant: null,
    quantity: 2,
    unit_price: 200000,
    total_price: 400000,
    uploaded_images: [],
  },
];

export const mockCartItems = [
  {
    id: '1',
    name: 'Album Foto Premium',
    price: 200000,
    quantity: 2,
    image: 'https://example.com/album1.jpg',
    variant: null,
  },
  {
    id: '2',
    name: 'Figura Kayu 4x6',
    price: 150000,
    quantity: 1,
    image: 'https://example.com/figura1.jpg',
    variant: '4x6',
  },
];

export const mockUser = {
  id: 'user-123',
  email: 'john@example.com',
  user_metadata: {
    full_name: 'John Doe',
  },
};
