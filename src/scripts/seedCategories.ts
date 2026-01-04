// Script untuk insert data kategori ke Supabase
// Jalankan: npm run dev lalu buka browser console dan jalankan seedCategories()

import { supabase } from '../lib/supabase';

export const seedCategories = async () => {
  console.log('🌱 Starting to seed categories...');

  const categories = [
    {
      name: 'Kaos',
      slug: 'kaos',
      description: 'Koleksi kaos pria dan wanita dengan berbagai model dan warna',
      sort_order: 1,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      is_active: true
    },
    {
      name: 'Kemeja',
      slug: 'kemeja',
      description: 'Kemeja formal dan casual untuk tampilan profesional',
      sort_order: 2,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
      is_active: true
    },
    {
      name: 'Celana',
      slug: 'celana',
      description: 'Celana jeans, chino, cargo, dan kulot',
      sort_order: 3,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      is_active: true
    },
    {
      name: 'Jaket',
      slug: 'jaket',
      description: 'Jaket, hoodie, dan outerwear untuk gaya kasual',
      sort_order: 4,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      is_active: true
    },
    {
      name: 'Dress',
      slug: 'dress',
      description: 'Dress wanita untuk berbagai acara dan kesempatan',
      sort_order: 5,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
      is_active: true
    },
    {
      name: 'Aksesoris',
      slug: 'aksesoris',
      description: 'Topi, tas, dompet, dan aksesoris pelengkap',
      sort_order: 6,
      image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400',
      is_active: true
    }
  ];

  try {
    // Check existing categories
    const { data: existing, error: checkError } = await supabase
      .from('categories')
      .select('slug');

    if (checkError) {
      console.error('❌ Error checking categories:', checkError);
      return;
    }

    const existingSlugs = new Set(existing?.map(c => c.slug) || []);
    const newCategories = categories.filter(c => !existingSlugs.has(c.slug));

    if (newCategories.length === 0) {
      console.log('✅ All categories already exist!');
      return;
    }

    // Insert new categories
    const { data, error } = await supabase
      .from('categories')
      .insert(newCategories)
      .select();

    if (error) {
      console.error('❌ Error inserting categories:', error);
      return;
    }

    console.log(`✅ Successfully inserted ${data.length} categories!`);
    console.log('Categories:', data);
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

// Export untuk digunakan di console browser
if (typeof window !== 'undefined') {
  (window as any).seedCategories = seedCategories;
}
