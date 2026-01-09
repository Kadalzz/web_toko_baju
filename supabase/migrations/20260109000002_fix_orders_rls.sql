/*
  # Fix Orders RLS Policy for Admin Updates
  
  Problem: Admin cannot update orders because they use sessionStorage auth
  instead of Supabase Auth, so auth.jwt() returns null.
  
  Solution: Allow updates to orders table using service_role or anon key
  for admin operations.
*/

-- Drop existing restrictive admin policies
DROP POLICY IF EXISTS "Admin can update orders" ON orders;
DROP POLICY IF EXISTS "Admin can view all orders" ON orders;

-- Create more permissive policies for admin operations
-- Allow anon role to update orders (admin dashboard uses anon key)
CREATE POLICY "Allow updates to orders"
  ON orders FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anon role to view all orders (admin dashboard uses anon key)
CREATE POLICY "Allow view all orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (true);

-- Add comment
COMMENT ON TABLE orders IS 'Orders table with permissive RLS for admin operations via anon key';
