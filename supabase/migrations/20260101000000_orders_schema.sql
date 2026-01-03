/*
  # Orders and Checkout Schema

  1. New Tables
    - `customers`
      - `id` (uuid, primary key)
      - `user_id` (uuid, optional, references auth.users for registered users)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `addresses`
      - `id` (uuid, primary key)
      - `customer_id` (uuid, references customers)
      - `address` (text)
      - `city` (text)
      - `province` (text)
      - `postal_code` (text)
      - `is_default` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `orders`
      - `id` (uuid, primary key)
      - `order_number` (text, unique)
      - `customer_id` (uuid, references customers)
      - `shipping_address_id` (uuid, references addresses)
      - `subtotal` (numeric)
      - `shipping_cost` (numeric)
      - `discount` (numeric)
      - `total` (numeric)
      - `payment_method` (text)
      - `payment_status` (text)
      - `order_status` (text)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, references orders)
      - `product_id` (uuid)
      - `product_name` (text)
      - `product_image` (text)
      - `variant` (text)
      - `quantity` (integer)
      - `unit_price` (numeric)
      - `total_price` (numeric)
      - `uploaded_images` (jsonb)
      - `created_at` (timestamp)

    - `payments`
      - `id` (uuid, primary key)
      - `order_id` (uuid, references orders)
      - `amount` (numeric)
      - `payment_method` (text)
      - `payment_proof` (text)
      - `status` (text)
      - `paid_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `category` (text)
      - `price` (numeric)
      - `discount_price` (numeric)
      - `images` (jsonb)
      - `variants` (jsonb)
      - `stock` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `image` (text)
      - `parent_id` (uuid, self-reference)
      - `is_active` (boolean)
      - `sort_order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public and authenticated access
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE SET NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  postal_code text NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
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

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  price numeric NOT NULL CHECK (price >= 0),
  discount_price numeric CHECK (discount_price >= 0),
  images jsonb DEFAULT '[]'::jsonb,
  variants jsonb DEFAULT '[]'::jsonb,
  stock integer DEFAULT 0 CHECK (stock >= 0),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id) ON DELETE RESTRICT NOT NULL,
  shipping_address_id uuid REFERENCES addresses(id) ON DELETE RESTRICT NOT NULL,
  subtotal numeric NOT NULL CHECK (subtotal >= 0),
  shipping_cost numeric NOT NULL DEFAULT 0 CHECK (shipping_cost >= 0),
  discount numeric NOT NULL DEFAULT 0 CHECK (discount >= 0),
  total numeric NOT NULL CHECK (total >= 0),
  payment_method text NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending',
  order_status text NOT NULL DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_payment_method CHECK (payment_method IN ('transfer', 'cod', 'ewallet')),
  CONSTRAINT valid_payment_status CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  CONSTRAINT valid_order_status CHECK (order_status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'))
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  product_image text,
  variant text,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric NOT NULL CHECK (unit_price >= 0),
  total_price numeric NOT NULL CHECK (total_price >= 0),
  uploaded_images jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL CHECK (amount >= 0),
  payment_method text NOT NULL,
  payment_proof text,
  status text NOT NULL DEFAULT 'pending',
  paid_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_payment_status CHECK (status IN ('pending', 'verified', 'rejected'))
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_addresses_customer_id ON addresses(customer_id);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_order_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read)
CREATE POLICY "Anyone can view active categories"
  ON categories
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Products policies (public read)
CREATE POLICY "Anyone can view active products"
  ON products
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Customers policies
CREATE POLICY "Users can view own customer record"
  ON customers
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Anyone can create customer record"
  ON customers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own customer record"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all customers"
  ON customers
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Addresses policies
CREATE POLICY "Users can view own addresses"
  ON addresses
  FOR SELECT
  TO authenticated
  USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));

CREATE POLICY "Anyone can create address"
  ON addresses
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own addresses"
  ON addresses
  FOR UPDATE
  TO authenticated
  USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));

CREATE POLICY "Admins can view all addresses"
  ON addresses
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Orders policies
CREATE POLICY "Users can view own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));

CREATE POLICY "Anyone can create order"
  ON orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Order items policies
CREATE POLICY "Users can view own order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (order_id IN (
    SELECT o.id FROM orders o 
    JOIN customers c ON o.customer_id = c.id 
    WHERE c.user_id = auth.uid()
  ));

CREATE POLICY "Anyone can create order items"
  ON order_items
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Payments policies
CREATE POLICY "Users can view own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (order_id IN (
    SELECT o.id FROM orders o 
    JOIN customers c ON o.customer_id = c.id 
    WHERE c.user_id = auth.uid()
  ));

CREATE POLICY "Anyone can create payment"
  ON payments
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own pending payments"
  ON payments
  FOR UPDATE
  TO authenticated
  USING (
    status = 'pending' AND
    order_id IN (
      SELECT o.id FROM orders o 
      JOIN customers c ON o.customer_id = c.id 
      WHERE c.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all payments"
  ON payments
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Add triggers for updated_at
CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at
  BEFORE UPDATE ON addresses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
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

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
DECLARE
  new_number text;
  date_part text;
  seq_part text;
BEGIN
  date_part := to_char(now(), 'YYYYMMDD');
  
  SELECT LPAD((COALESCE(MAX(CAST(SUBSTRING(order_number FROM 12) AS INTEGER)), 0) + 1)::text, 4, '0')
  INTO seq_part
  FROM orders
  WHERE order_number LIKE 'ORD' || date_part || '%';
  
  new_number := 'ORD' || date_part || seq_part;
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Insert default categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('Cetak Foto', 'cetak-foto', 'Layanan cetak foto berkualitas tinggi', 1),
  ('Album', 'album', 'Berbagai pilihan album foto', 2),
  ('Album Bag', 'album-bag', 'Tas album stylish', 3),
  ('Figura', 'figura', 'Bingkai foto berkualitas', 4),
  ('Flashdisk', 'flashdisk', 'Flashdisk custom untuk menyimpan foto', 5),
  ('Wall Decor', 'wall-decor', 'Dekorasi dinding dengan foto', 6),
  ('Wedding Book', 'wedding-book', 'Buku pernikahan eksklusif', 7),
  ('Printing', 'printing', 'Layanan printing profesional', 8)
ON CONFLICT (slug) DO NOTHING;
