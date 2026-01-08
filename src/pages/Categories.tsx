import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

// Dummy categories data
const dummyCategories: Category[] = [
  {
    id: '1',
    name: 'Kaos',
    slug: 'kaos',
    description: 'Koleksi kaos pria dan wanita dengan berbagai model dan...',
    image: 'public/images/model/modelkaospolos.jpeg'
  },
  {
    id: '2',
    name: 'Kemeja',
    slug: 'kemeja',
    description: 'Kemeja formal dan casual untuk tampilan profesional',
    image: 'public/images/model/modelkemeja.jpeg'
  },
  {
    id: '3',
    name: 'Celana',
    slug: 'celana',
    description: 'Celana jeans, chino, cargo, dan kulot',
    image: 'public/images/model/modeljeans.jpeg'
  },
  {
    id: '4',
    name: 'Jaket',
    slug: 'jaket',
    description: 'Jaket, hoodie, dan outerwear untuk gaya kasual',
    image: 'public/images/model/modeljaket.jpeg'
  },
  {
    id: '5',
    name: 'Dress',
    slug: 'dress',
    description: 'Koleksi dress casual dan formal untuk berbagai acara',
    image: 'public/images/model/modeldress.jpeg'
  }
];

const Categories = () => {
  const categories = dummyCategories;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-cream-100">
      {/* Header Section */}
      <div className="bg-primary-800 py-20 mb-16">
        <div className="container mx-auto px-4 text-center">
          <span className="text-accent tracking-[0.3em] uppercase text-sm font-medium">Jelajahi</span>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mt-4 mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
            Kategori Produk
          </h1>
          <p className="text-cream-200 font-lato text-lg max-w-2xl mx-auto leading-relaxed">
            Jelajahi koleksi fashion kami berdasarkan kategori. Temukan gaya yang sesuai dengan kepribadian Anda.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/kategori/${category.slug}`}
              className="group relative overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-all duration-500"
            >
              <div className="aspect-[9/16] overflow-hidden bg-cream-100">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-accent">
                    <span className="text-white text-4xl font-bold">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6 text-center border-t border-primary-100">
                <h3 className="font-montserrat text-xl text-primary-800 mb-2 group-hover:text-accent transition-colors">
                  {category.name}
                </h3>
                <p className="text-taupe-600 font-lato text-sm line-clamp-2 mb-4">
                  {category.description}
                </p>
                <div className="inline-flex items-center text-accent font-lato text-sm tracking-wide uppercase group-hover:translate-x-1 transition-transform">
                  Lihat Produk
                  <svg
                    className="w-4 h-4 ml-2"
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
            <p className="text-taupe-600 font-lato">Belum ada kategori tersedia.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
