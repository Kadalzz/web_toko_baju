import { Link } from 'react-router-dom';
import type { Category } from '../../types';

// Dummy categories data - replace with API call
const categories: Category[] = [
  {
    id: '1',
    name: 'Kaos',
    slug: 'kaos',
    description: 'Kaos casual untuk sehari-hari',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Kemeja',
    slug: 'kemeja',
    description: 'Kemeja formal dan casual',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&h=400&fit=crop',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Celana',
    slug: 'celana',
    description: 'Celana panjang dan pendek',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Jaket',
    slug: 'jaket',
    description: 'Jaket dan outerwear',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Dress',
    slug: 'dress',
    description: 'Dress untuk berbagai occasion',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Aksesoris',
    slug: 'aksesoris',
    description: 'Aksesoris fashion',
    image: 'https://images.unsplash.com/photo-1611923134239-b9be5816e23c?w=400&h=400&fit=crop',
    is_active: true,
    created_at: new Date().toISOString()
  }
];

const Categories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Belanja Berdasarkan Kategori
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan produk favorit Anda dari berbagai kategori pilihan
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-200">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
