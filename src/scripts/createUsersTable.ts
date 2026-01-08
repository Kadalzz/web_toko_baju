import { supabase } from '../lib/supabase';

async function createUsersTable() {
  console.log('Creating users table...');
  
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      -- Create users table for customer accounts
      CREATE TABLE IF NOT EXISTS public.users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Create index on email for faster lookups
      CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
    `
  });

  if (error) {
    console.error('Error creating users table:', error);
    
    // Fallback: Try direct table creation
    console.log('Trying alternative method...');
    const { error: createError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (createError) {
      console.error('Table might not exist. Please create it manually in Supabase dashboard.');
      console.log(`
SQL to run in Supabase SQL Editor:

CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
      `);
    } else {
      console.log('Users table already exists!');
    }
  } else {
    console.log('Users table created successfully!');
  }
}

createUsersTable();
