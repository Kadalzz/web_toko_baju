// ============================================
// TYPES INDEX - Fashion Store
// ============================================
// Central export for all TypeScript types
// ============================================

// Navigation
export interface NavLink {
  name: string;
  path: string;
  icon?: string;
}

// ============================================
// PRODUCT TYPES
// ============================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount_price?: number;
  category_id: string;
  category?: Category;
  images: string[];
  sizes: ProductSize[];
  colors: ProductColor[];
  stock: number;
  sku?: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface ProductSize {
  name: string;
  stock: number;
}

export interface ProductColor {
  name: string;
  hex_code: string;
  stock: number;
  images?: string[]; // Optional images specific to this color
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size: string;
  color: string;
  stock: number;
  sku: string;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  sortBy?: 'newest' | 'price_low' | 'price_high' | 'popular';
  search?: string;
}

// ============================================
// CATEGORY TYPES
// ============================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent_id?: string;
  is_active: boolean;
  created_at: string;
}

// ============================================
// CART TYPES
// ============================================

export interface CartItem {
  id: string;
  product_id: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

// ============================================
// ORDER TYPES
// ============================================

export type OrderStatus = 
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 
  | 'bank_transfer'
  | 'e_wallet'
  | 'cod'
  | 'credit_card';

export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded';

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping_cost: number;
  total: number;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  shipping_address: Address;
  notes?: string;
  tracking_number?: string;
  created_at: string;
  updated_at?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  size: string;
  color: string;
  price: number;
  subtotal: number;
}

// ============================================
// USER TYPES
// ============================================

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  role: 'customer' | 'admin';
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface UserProfile extends User {
  addresses: Address[];
  orders_count: number;
}

export interface Address {
  id: string;
  user_id: string;
  label: string; // 'Rumah', 'Kantor', etc.
  recipient_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  province: string;
  postal_code: string;
  is_default: boolean;
}

// ============================================
// AUTH TYPES
// ============================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ============================================
// UI TYPES
// ============================================

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta_text: string;
  cta_link: string;
}

export interface ServiceStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

// ============================================
// API TYPES
// ============================================

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  count?: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

// ============================================
// FORM TYPES
// ============================================

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface CheckoutForm {
  shipping_address: Address;
  payment_method: PaymentMethod;
  notes?: string;
  promo_code?: string;
}
