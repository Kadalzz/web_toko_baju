/*
  # Schema Toko Baju Online - Robby Fashion
  
  Database schema untuk aplikasi e-commerce toko baju dengan fitur:
  - Manajemen produk dan kategori
  - Sistem pesanan dan pembayaran
  - Manajemen pelanggan dan alamat
  - Upload gambar untuk custom design

  ## Tables Created:
  1. categories - Kategori produk
  2. products - Produk baju
  3. customers - Data pelanggan
  4. addresses - Alamat pengiriman
  5. orders - Pesanan
  6. order_items - Detail item pesanan
  7. payments - Pembayaran

  ## Security:
  - Row Level Security (RLS) enabled
  - Public read untuk produk aktif
  - User hanya bisa akses data sendiri
  - Admin bisa akses semua data
*/

-- ============================================
-- CLEANUP: DROP EXISTING TABLES
-- ============================================
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS images CASCADE;

-- Drop functions if exist
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS generate_order_number() CASCADE;

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image text,
  parent_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_is_active ON categories(is_active);

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  price numeric NOT NULL CHECK (price >= 0),
  discount_price numeric CHECK (discount_price >= 0 AND discount_price < price),
  images jsonb DEFAULT '[]'::jsonb,
  variants jsonb DEFAULT '[]'::jsonb,
  stock integer DEFAULT 0 CHECK (stock >= 0),
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- ============================================
-- CUSTOMERS TABLE
-- ============================================
CREATE TABLE customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE SET NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_customers_user_id ON customers(user_id);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_phone ON customers(phone);

-- ============================================
-- ADDRESSES TABLE
-- ============================================
CREATE TABLE addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
  label text DEFAULT 'Rumah',
  recipient_name text NOT NULL,
  recipient_phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  postal_code text NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_addresses_customer_id ON addresses(customer_id);
CREATE INDEX idx_addresses_is_default ON addresses(is_default);

-- ============================================
-- ORDERS TABLE
-- ============================================
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id) ON DELETE RESTRICT NOT NULL,
  
  -- Shipping Info
  shipping_name text NOT NULL,
  shipping_phone text NOT NULL,
  shipping_address text NOT NULL,
  shipping_city text NOT NULL,
  shipping_province text NOT NULL,
  shipping_postal_code text NOT NULL,
  
  -- Pricing
  subtotal numeric NOT NULL CHECK (subtotal >= 0),
  shipping_cost numeric NOT NULL DEFAULT 0 CHECK (shipping_cost >= 0),
  discount numeric NOT NULL DEFAULT 0 CHECK (discount >= 0),
  total numeric NOT NULL CHECK (total >= 0),
  
  -- Payment & Status
  payment_method text NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending',
  order_status text NOT NULL DEFAULT 'pending',
  
  -- Additional Info
  notes text,
  tracking_number text,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_payment_method CHECK (payment_method IN ('bank_transfer', 'cod', 'ewallet', 'credit_card')),
  CONSTRAINT valid_payment_status CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  CONSTRAINT valid_order_status CHECK (order_status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'))
);

CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_order_status ON orders(order_status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- ============================================
-- ORDER ITEMS TABLE
-- ============================================
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  
  -- Product snapshot (for historical record)
  product_name text NOT NULL,
  product_image text,
  
  -- Variant & Quantity
  variant_size text,
  variant_color text,
  quantity integer NOT NULL CHECK (quantity > 0),
  
  -- Pricing
  unit_price numeric NOT NULL CHECK (unit_price >= 0),
  total_price numeric NOT NULL CHECK (total_price >= 0),
  
  -- Custom images uploaded by customer
  custom_images jsonb DEFAULT '[]'::jsonb,
  custom_notes text,
  
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- ============================================
-- PAYMENTS TABLE
-- ============================================
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  
  amount numeric NOT NULL CHECK (amount >= 0),
  payment_method text NOT NULL,
  payment_proof_url text,
  
  status text NOT NULL DEFAULT 'pending',
  verified_by uuid REFERENCES auth.users ON DELETE SET NULL,
  verified_at timestamptz,
  rejection_reason text,
  
  transaction_id text,
  paid_at timestamptz,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_payment_status CHECK (status IN ('pending', 'verified', 'rejected', 'expired'))
);

CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at DESC);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function untuk update updated_at otomatis
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function untuk generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
DECLARE
  new_number text;
  date_part text;
  seq_part text;
  counter integer;
BEGIN
  date_part := to_char(now(), 'YYYYMMDD');
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 12) AS INTEGER)), 0) + 1
  INTO counter
  FROM orders
  WHERE order_number LIKE 'ORD' || date_part || '%';
  
  seq_part := LPAD(counter::text, 4, '0');
  new_number := 'ORD' || date_part || seq_part;
  
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at
  BEFORE UPDATE ON addresses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - CATEGORIES
-- ============================================

-- Semua orang (anonymous + authenticated) bisa lihat kategori aktif
CREATE POLICY "Anyone can view active categories"
  ON categories FOR SELECT
  TO public
  USING (is_active = true);

-- Admin bisa kelola semua kategori
CREATE POLICY "Admin can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- ============================================
-- RLS POLICIES - PRODUCTS
-- ============================================

-- Semua orang (anonymous + authenticated) bisa lihat produk aktif
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  TO public
  USING (is_active = true);

-- Admin bisa kelola semua produk
CREATE POLICY "Admin can manage products"
  ON products FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- ============================================
-- RLS POLICIES - CUSTOMERS
-- ============================================

-- User bisa lihat data customer sendiri
CREATE POLICY "Users can view own customer data"
  ON customers FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Siapa saja bisa create customer (untuk guest checkout)
CREATE POLICY "Anyone can create customer"
  ON customers FOR INSERT
  WITH CHECK (true);

-- User bisa update data customer sendiri
CREATE POLICY "Users can update own customer data"
  ON customers FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Admin bisa lihat semua customer
CREATE POLICY "Admin can view all customers"
  ON customers FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================
-- RLS POLICIES - ADDRESSES
-- ============================================

-- User bisa lihat alamat sendiri
CREATE POLICY "Users can view own addresses"
  ON addresses FOR SELECT
  TO authenticated
  USING (customer_id IN (
    SELECT id FROM customers WHERE user_id = auth.uid()
  ));

-- Siapa saja bisa create address (untuk guest checkout)
CREATE POLICY "Anyone can create address"
  ON addresses FOR INSERT
  WITH CHECK (true);

-- User bisa update alamat sendiri
CREATE POLICY "Users can update own addresses"
  ON addresses FOR UPDATE
  TO authenticated
  USING (customer_id IN (
    SELECT id FROM customers WHERE user_id = auth.uid()
  ))
  WITH CHECK (customer_id IN (
    SELECT id FROM customers WHERE user_id = auth.uid()
  ));

-- User bisa delete alamat sendiri
CREATE POLICY "Users can delete own addresses"
  ON addresses FOR DELETE
  TO authenticated
  USING (customer_id IN (
    SELECT id FROM customers WHERE user_id = auth.uid()
  ));

-- Admin bisa kelola semua alamat
CREATE POLICY "Admin can manage all addresses"
  ON addresses FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- ============================================
-- RLS POLICIES - ORDERS
-- ============================================

-- User bisa lihat order sendiri
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (customer_id IN (
    SELECT id FROM customers WHERE user_id = auth.uid()
  ));

-- Siapa saja bisa create order (untuk guest checkout)
CREATE POLICY "Anyone can create order"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Admin bisa lihat semua order
CREATE POLICY "Admin can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Admin bisa update order
CREATE POLICY "Admin can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- ============================================
-- RLS POLICIES - ORDER ITEMS
-- ============================================

-- User bisa lihat order items sendiri
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (order_id IN (
    SELECT o.id FROM orders o
    JOIN customers c ON o.customer_id = c.id
    WHERE c.user_id = auth.uid()
  ));

-- Siapa saja bisa create order items
CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  WITH CHECK (true);

-- Admin bisa lihat semua order items
CREATE POLICY "Admin can view all order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================
-- RLS POLICIES - PAYMENTS
-- ============================================

-- User bisa lihat payment sendiri
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (order_id IN (
    SELECT o.id FROM orders o
    JOIN customers c ON o.customer_id = c.id
    WHERE c.user_id = auth.uid()
  ));

-- Siapa saja bisa create payment
CREATE POLICY "Anyone can create payment"
  ON payments FOR INSERT
  WITH CHECK (true);

-- User bisa update payment sendiri yang masih pending
CREATE POLICY "Users can update own pending payments"
  ON payments FOR UPDATE
  TO authenticated
  USING (
    status = 'pending' AND
    order_id IN (
      SELECT o.id FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE c.user_id = auth.uid()
    )
  )
  WITH CHECK (
    status = 'pending' AND
    order_id IN (
      SELECT o.id FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE c.user_id = auth.uid()
    )
  );

-- Admin bisa kelola semua payment
CREATE POLICY "Admin can manage all payments"
  ON payments FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- ============================================
-- SEED DATA - CATEGORIES
-- ============================================

INSERT INTO categories (name, slug, description, sort_order, image) VALUES
  ('Kaos', 'kaos', 'Koleksi kaos pria dan wanita dengan berbagai model dan warna', 1, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'),
  ('Kemeja', 'kemeja', 'Kemeja formal dan casual untuk tampilan profesional', 2, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400'),
  ('Celana', 'celana', 'Celana jeans, chino, cargo, dan kulot', 3, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400'),
  ('Jaket', 'jaket', 'Jaket, hoodie, dan outerwear untuk gaya kasual', 4, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'),
  ('Dress', 'dress', 'Dress wanita untuk berbagai acara dan kesempatan', 5, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'),
  ('Aksesoris', 'aksesoris', 'Topi, tas, dompet, dan aksesoris pelengkap', 6, 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SEED DATA - SAMPLE PRODUCTS
-- ============================================

INSERT INTO products (name, slug, description, category_id, price, discount_price, images, variants, stock, is_featured) VALUES
  (
    'Basic White T-Shirt',
    'basic-white-tshirt',
    'Kaos putih basic dengan bahan cotton combed 30s yang nyaman dan breathable. Cocok untuk daily wear atau dijadikan base outfit.',
    (SELECT id FROM categories WHERE slug = 'kaos'),
    89000,
    69000,
    '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800", "https://images.unsplash.com/photo-1622445275576-721325763afe?w=800"]'::jsonb,
    '[{"size": "S", "stock": 10}, {"size": "M", "stock": 15}, {"size": "L", "stock": 20}, {"size": "XL", "stock": 10}]'::jsonb,
    55,
    true
  ),
  (
    'Denim Jacket Premium',
    'denim-jacket-premium',
    'Jaket denim premium dengan detail vintage wash. Bahan denim tebal dan berkualitas tinggi. Perfect untuk gaya kasual.',
    (SELECT id FROM categories WHERE slug = 'jaket'),
    349000,
    299000,
    '["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800", "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800"]'::jsonb,
    '[{"size": "M", "stock": 8}, {"size": "L", "stock": 12}, {"size": "XL", "stock": 6}]'::jsonb,
    26,
    true
  ),
  (
    'Floral Midi Dress',
    'floral-midi-dress',
    'Dress midi dengan motif floral yang feminine dan elegan. Bahan rayon premium yang adem dan flowy. Cocok untuk berbagai acara.',
    (SELECT id FROM categories WHERE slug = 'dress'),
    279000,
    NULL,
    '["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800", "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800"]'::jsonb,
    '[{"size": "S", "stock": 5}, {"size": "M", "stock": 8}, {"size": "L", "stock": 4}]'::jsonb,
    17,
    true
  ),
  (
    'Slim Fit Jeans',
    'slim-fit-jeans',
    'Celana jeans slim fit dengan warna dark blue. Bahan denim stretch yang nyaman dan tidak kaku. Model timeless yang cocok untuk segala usia.',
    (SELECT id FROM categories WHERE slug = 'celana'),
    199000,
    159000,
    '["https://images.unsplash.com/photo-1542272604-787c3835535d?w=800"]'::jsonb,
    '[{"size": "28", "stock": 6}, {"size": "29", "stock": 10}, {"size": "30", "stock": 12}, {"size": "31", "stock": 8}, {"size": "32", "stock": 5}]'::jsonb,
    41,
    false
  )
ON CONFLICT (slug) DO NOTHING;
