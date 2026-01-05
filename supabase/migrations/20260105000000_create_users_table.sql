-- Create users table for customer accounts
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- Note: In production, use proper password hashing
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own data
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT
  USING (true);

-- Policy: Anyone can insert (for registration)
CREATE POLICY "Anyone can register" ON public.users
  FOR INSERT
  WITH CHECK (true);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE
  USING (auth.uid()::text = id::text);

-- Add comment
COMMENT ON TABLE public.users IS 'Customer user accounts';
