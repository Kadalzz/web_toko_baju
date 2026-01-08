# Setup Tabel Users

Untuk mengaktifkan fitur register dan login user, Anda perlu membuat tabel `users` di database Supabase.

## Cara 1: Melalui Supabase SQL Editor (RECOMMENDED)

1. Buka dashboard Supabase Anda
2. Klik menu **SQL Editor** di sidebar kiri
3. Klik **New Query**
4. Copy dan paste SQL berikut:

```sql
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
```

5. Klik **Run** untuk mengeksekusi query

## Cara 2: Melalui Script (Alternative)

Jalankan command berikut di terminal:

```bash
npm run tsx src/scripts/createUsersTable.ts
```

## Verifikasi

Setelah tabel dibuat, Anda bisa verifikasi dengan:

1. Buka **Table Editor** di Supabase dashboard
2. Cari tabel `users`
3. Pastikan tabel memiliki kolom: id, email, password, full_name, phone, created_at, updated_at

## Catatan Keamanan

⚠️ **PENTING**: Implementasi saat ini menyimpan password dalam plain text. Untuk production, HARUS menggunakan password hashing (bcrypt, argon2, dll).

## Setelah Setup

Sekarang user bisa:
- **Register** di `/register` - Membuat akun baru
- **Login** di `/login` - Masuk dengan akun yang sudah dibuat
- Admin tetap login di `/admin/login` dengan kredensial hardcoded
