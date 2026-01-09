/*
  # Add shipping_email to orders table
  
  Add shipping_email column to orders table so we can match orders
  with users by email when they're not linked via customer_id.
*/

-- Add shipping_email column
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_email text;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_orders_shipping_email ON orders(shipping_email);
CREATE INDEX IF NOT EXISTS idx_orders_shipping_phone ON orders(shipping_phone);

-- Add comment
COMMENT ON COLUMN orders.shipping_email IS 'Customer email for order matching and communication';
