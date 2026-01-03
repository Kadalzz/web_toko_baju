import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  sort_order: number;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container section">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat kategori...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container section">
      <div className="mb-8">
        <h1 className="heading-1 text-center mb-4">Kategori Produk</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Jelajahi koleksi fashion kami berdasarkan kategori. Temukan gaya yang sesuai dengan kepribadian Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/kategori/${category.slug}`}
            className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                  <span className="text-white text-4xl font-bold">
                    {category.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {category.description}
              </p>
              <div className="mt-4 flex items-center text-blue-600 font-medium">
                Lihat Produk
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">Belum ada kategori tersedia.</p>
        </div>
      )}
    </div>
  );
};

export default Categories;
