import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Heart, ShoppingBag, Filter, X, ChevronDown, Star } from 'lucide-react';
import type { Product, Category } from '../types';
import { useCartStore } from '../stores/cartStore';

// Dummy products data
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Kaos Polos Premium Cotton',
    slug: 'kaos-polos-premium-cotton',
    description: 'Kaos polos berbahan cotton combed 30s yang nyaman dipakai sehari-hari',
    price: 129000,
    discount_price: 89000,
    category_id: '1',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop'],
    sizes: [{ name: 'S', stock: 10 }, { name: 'M', stock: 15 }, { name: 'L', stock: 20 }, { name: 'XL', stock: 10 }],
    colors: [
      { name: 'Hitam', hex_code: '#000000', stock: 25, images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop'] },
      { name: 'Putih', hex_code: '#FFFFFF', stock: 30, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop'] },
      { name: 'Navy', hex_code: '#1E3A5F', stock: 20, images: ['https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=500&fit=crop'] },
      { name: 'Abu-abu', hex_code: '#6B7280', stock: 15, images: ['https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&h=500&fit=crop'] }
    ],
    stock: 55,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Kemeja Flanel Kotak Premium',
    slug: 'kemeja-flanel-kotak-premium',
    description: 'Kemeja flanel dengan motif kotak-kotak yang stylish',
    price: 189000,
    category_id: '2',
    images: ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&h=500&fit=crop'],
    sizes: [{ name: 'M', stock: 10 }, { name: 'L', stock: 15 }, { name: 'XL', stock: 10 }],
    colors: [{ name: 'Merah', hex_code: '#EF4444', stock: 20 }, { name: 'Biru', hex_code: '#3B82F6', stock: 15 }],
    stock: 35,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Celana Chino Slim Fit',
    slug: 'celana-chino-slim-fit',
    description: 'Celana chino dengan potongan slim fit yang modern',
    price: 259000,
    discount_price: 199000,
    category_id: '3',
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop'],
    sizes: [{ name: '30', stock: 10 }, { name: '32', stock: 15 }, { name: '34', stock: 10 }],
    colors: [{ name: 'Khaki', hex_code: '#C4A35A', stock: 20 }, { name: 'Navy', hex_code: '#1E3A5F', stock: 15 }],
    stock: 35,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Jaket Bomber Premium',
    slug: 'jaket-bomber-premium',
    description: 'Jaket bomber dengan bahan premium yang tahan lama',
    price: 359000,
    category_id: '4',
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop'],
    sizes: [{ name: 'M', stock: 8 }, { name: 'L', stock: 12 }, { name: 'XL', stock: 8 }],
    colors: [{ name: 'Hitam', hex_code: '#000000', stock: 15 }, { name: 'Army', hex_code: '#4B5320', stock: 13 }],
    stock: 28,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Hoodie Basic Oversize',
    slug: 'hoodie-basic-oversize',
    description: 'Hoodie dengan potongan oversize yang trendy',
    price: 279000,
    discount_price: 229000,
    category_id: '4',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop'],
    sizes: [{ name: 'M', stock: 10 }, { name: 'L', stock: 15 }, { name: 'XL', stock: 12 }],
    colors: [{ name: 'Abu-abu', hex_code: '#6B7280', stock: 20 }, { name: 'Hitam', hex_code: '#000000', stock: 17 }],
    stock: 37,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Dress Casual Summer',
    slug: 'dress-casual-summer',
    description: 'Dress casual yang cocok untuk musim panas',
    price: 249000,
    category_id: '5',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop'],
    sizes: [{ name: 'S', stock: 8 }, { name: 'M', stock: 12 }, { name: 'L', stock: 8 }],
    colors: [{ name: 'Floral', hex_code: '#EC4899', stock: 15 }, { name: 'Putih', hex_code: '#FFFFFF', stock: 13 }],
    stock: 28,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Polo Shirt Classic',
    slug: 'polo-shirt-classic',
    description: 'Polo shirt dengan desain classic yang timeless',
    price: 179000,
    discount_price: 149000,
    category_id: '1',
    images: ['https://images.unsplash.com/photo-1625910513413-5fc45e80b2d1?w=400&h=500&fit=crop'],
    sizes: [{ name: 'M', stock: 15 }, { name: 'L', stock: 20 }, { name: 'XL', stock: 15 }],
    colors: [{ name: 'Navy', hex_code: '#1E3A5F', stock: 25 }, { name: 'Putih', hex_code: '#FFFFFF', stock: 25 }],
    stock: 50,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Jeans Denim Stretch',
    slug: 'jeans-denim-stretch',
    description: 'Jeans denim dengan bahan stretch yang nyaman',
    price: 299000,
    category_id: '3',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop'],
    sizes: [{ name: '30', stock: 10 }, { name: '32', stock: 15 }, { name: '34', stock: 12 }],
    colors: [{ name: 'Blue Wash', hex_code: '#4A90D9', stock: 20 }, { name: 'Black', hex_code: '#1F2937', stock: 17 }],
    stock: 37,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Cardigan Rajut Wanita',
    slug: 'cardigan-rajut-wanita',
    description: 'Cardigan rajut lembut untuk tampilan kasual yang chic',
    price: 199000,
    category_id: '4',
    images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop'],
    sizes: [{ name: 'S', stock: 10 }, { name: 'M', stock: 15 }, { name: 'L', stock: 10 }],
    colors: [{ name: 'Cream', hex_code: '#F5F5DC', stock: 18 }, { name: 'Pink', hex_code: '#FFC0CB', stock: 17 }],
    stock: 35,
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '10',
    name: 'Rok Mini Plisket',
    slug: 'rok-mini-plisket',
    description: 'Rok mini dengan detail plisket yang feminin',
    price: 159000,
    discount_price: 129000,
    category_id: '5',
    images: ['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=500&fit=crop'],
    sizes: [{ name: 'S', stock: 12 }, { name: 'M', stock: 15 }, { name: 'L', stock: 8 }],
    colors: [{ name: 'Hitam', hex_code: '#000000', stock: 20 }, { name: 'Navy', hex_code: '#1E3A5F', stock: 15 }],
    stock: 35,
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '11',
    name: 'Sweater Crewneck Basic',
    slug: 'sweater-crewneck-basic',
    description: 'Sweater crewneck dengan bahan fleece yang hangat',
    price: 219000,
    category_id: '4',
    images: ['https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=500&fit=crop'],
    sizes: [{ name: 'M', stock: 10 }, { name: 'L', stock: 15 }, { name: 'XL', stock: 12 }],
    colors: [{ name: 'Maroon', hex_code: '#800000', stock: 20 }, { name: 'Navy', hex_code: '#1E3A5F', stock: 17 }],
    stock: 37,
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '12',
    name: 'Celana Jogger Casual',
    slug: 'celana-jogger-casual',
    description: 'Celana jogger nyaman untuk aktivitas sehari-hari',
    price: 179000,
    discount_price: 149000,
    category_id: '3',
    images: ['https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=500&fit=crop'],
    sizes: [{ name: 'M', stock: 15 }, { name: 'L', stock: 20 }, { name: 'XL', stock: 10 }],
    colors: [{ name: 'Abu-abu', hex_code: '#6B7280', stock: 25 }, { name: 'Hitam', hex_code: '#000000', stock: 20 }],
    stock: 45,
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString()
  }
];

const categories: Category[] = [
  { id: '1', name: 'Kaos', slug: 'kaos', is_active: true, created_at: '' },
  { id: '2', name: 'Kemeja', slug: 'kemeja', is_active: true, created_at: '' },
  { id: '3', name: 'Celana', slug: 'celana', is_active: true, created_at: '' },
  { id: '4', name: 'Jaket & Sweater', slug: 'jaket', is_active: true, created_at: '' },
  { id: '5', name: 'Dress & Rok', slug: 'dress', is_active: true, created_at: '' },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

const calculateDiscount = (original: number, discounted: number) => {
  return Math.round(((original - discounted) / original) * 100);
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const { addItem, openCart } = useCartStore();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by category
    if (selectedCategory) {
      const category = categories.find(c => c.slug === selectedCategory);
      if (category) {
        result = result.filter(p => p.category_id === category.id);
      }
    }

    // Filter by price
    result = result.filter(p => {
      const price = p.discount_price || p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    switch (sortBy) {
      case 'price_low':
        result.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
        break;
      case 'price_high':
        result.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
        break;
      case 'popular':
        result.sort((a, b) => b.stock - a.stock);
        break;
      default: // newest
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [selectedCategory, priceRange, sortBy]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes[0]?.name || '';
    const defaultColor = product.colors[0]?.name || '';
    addItem(product, 1, defaultSize, defaultColor);
    openCart();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Semua Produk</h1>
          <p className="text-gray-600">Temukan koleksi fashion terbaik untuk gaya Anda</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Filter</h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Kategori</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('')}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      !selectedCategory ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    Semua Kategori
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat.slug ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Rentang Harga</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-primary-600"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setPriceRange([0, 500000]);
                  setSearchParams({});
                }}
                className="w-full py-2 text-sm text-primary-600 hover:text-primary-700"
              >
                Reset Filter
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <p className="text-sm text-gray-600">
                Menampilkan <span className="font-medium">{filteredProducts.length}</span> produk
              </p>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2 bg-white border rounded-lg hover:bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="newest">Terbaru</option>
                    <option value="popular">Terpopuler</option>
                    <option value="price_low">Harga Terendah</option>
                    <option value="price_high">Harga Tertinggi</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Link to={`/products/${product.slug}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    
                    {/* Discount Badge */}
                    {product.discount_price && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        -{calculateDiscount(product.price, product.discount_price)}%
                      </div>
                    )}

                    {/* Wishlist & Quick Add */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                        <Heart className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Quick Add Button */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleQuickAdd(product)}
                        className="w-full flex items-center justify-center gap-2 py-2 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Tambah ke Keranjang
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <Link to={`/products/${product.slug}`}>
                      <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors mb-1">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-500">4.8 (120)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary-600">
                        {formatPrice(product.discount_price || product.price)}
                      </span>
                      {product.discount_price && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>

                    {/* Colors */}
                    <div className="flex items-center gap-1.5 mt-3">
                      {product.colors.slice(0, 4).map((color) => (
                        <div
                          key={color.name}
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: color.hex_code }}
                          title={color.name}
                        />
                      ))}
                      {product.colors.length > 4 && (
                        <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-4">Tidak ada produk yang ditemukan</p>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setPriceRange([0, 500000]);
                    setSearchParams({});
                  }}
                  className="text-primary-600 hover:text-primary-700"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setShowFilters(false)} />
          <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-white z-50 lg:hidden overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Filter</h3>
                <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Kategori</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => { handleCategoryChange(''); setShowFilters(false); }}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      !selectedCategory ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    Semua Kategori
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { handleCategoryChange(cat.slug); setShowFilters(false); }}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat.slug ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Rentang Harga</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-primary-600"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={() => setShowFilters(false)}
                className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Terapkan Filter
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
