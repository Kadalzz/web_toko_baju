/*
  # Enable Realtime for Orders Table
  
  Enable real-time subscriptions for the orders table so customers
  can see order status updates instantly when admin makes changes.
*/

-- Enable replica identity for realtime to work
ALTER TABLE orders REPLICA IDENTITY FULL;

-- Enable realtime publication for orders table
ALTER PUBLICATION supabase_realtime ADD TABLE orders;

-- Grant necessary permissions for realtime
GRANT SELECT ON orders TO anon;
GRANT SELECT ON orders TO authenticated;

-- Add comment
COMMENT ON TABLE orders IS 'Orders table with realtime enabled for instant status updates';
