/*
  # Fix Users Table RLS for Profile Updates
  
  Problem: Users cannot update their profile because RLS policy 
  checks auth.uid() but app uses custom users table without Supabase Auth.
  
  Solution: Allow updates to users table for authenticated and anon roles.
*/

-- Drop existing restrictive update policy
DROP POLICY IF EXISTS "Users can update own data" ON public.users;

-- Create more permissive policy for updates
CREATE POLICY "Allow profile updates"
  ON public.users FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Add comment
COMMENT ON TABLE public.users IS 'Customer user accounts with permissive RLS for profile updates';
