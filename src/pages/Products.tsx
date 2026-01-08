import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Filter, X, ChevronDown, Star } from 'lucide-react';
import type { Product, Category } from '../types';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../lib/supabase';

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
    gender_category: 'both',
    images: ['/images/products/kaospolosputih.jpeg'],
    sizes: [{ name: 'S', stock: 10 }, { name: 'M', stock: 15 }, { name: 'L', stock: 20 }, { name: 'XL', stock: 10 }],
    colors: [
      { name: 'Hitam', hex_code: '#000000', stock: 25, images: ['/images/products/kaospoloshitam.jpeg'] },
      { name: 'Putih', hex_code: '#FFFFFF', stock: 30, images: ['/images/products/kaospolosputih.jpeg'] },
      { name: 'Navy', hex_code: '#1E3A5F', stock: 20, images: ['/images/products/kaospolosnavy.jpeg'] },
      { name: 'Abu-abu', hex_code: '#6B7280', stock: 15, images: ['/images/products/kaospolosabu.jpeg'] }
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
    gender_category: 'pria',
    images: ['/images/products/kemejabu.jpeg'],
    sizes: [{ name: 'M', stock: 10 }, { name: 'L', stock: 15 }, { name: 'XL', stock: 10 }],
    colors: [
      { name: 'Biru', hex_code: '#3B82F6', stock: 15, images: ['/images/products/kemejabu.jpeg'] },
      { name: 'Putih', hex_code: '#FFFFFF', stock: 20, images: ['/images/products/kemejaputih.jpeg'] },
      { name: 'Cream', hex_code: '#F5F5DC', stock: 18, images: ['/images/products/kemejacream.jpeg'] }
    ],
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
    gender_category: 'pria',
    images: ['/images/products/celanachinoabu.jpeg'],
    sizes: [{ name: '30', stock: 10 }, { name: '32', stock: 15 }, { name: '34', stock: 10 }],
    colors: [
      { name: 'Abu-abu', hex_code: '#6B7280', stock: 20, images: ['/images/products/celanachinoabu.jpeg'] },
      { name: 'Cream', hex_code: '#F5F5DC', stock: 18, images: ['/images/products/celanachinocream.jpeg'] },
      { name: 'Hitam', hex_code: '#000000', stock: 15, images: ['/images/products/celanachinohitam.jpeg'] }
    ],
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
    gender_category: 'both',
    images: ['/images/products/jaketbomberhitam.jpeg'],
    sizes: [{ name: 'M', stock: 8 }, { name: 'L', stock: 12 }, { name: 'XL', stock: 8 }],
    colors: [
      { name: 'Hitam', hex_code: '#000000', stock: 15, images: ['/images/products/jaketbomberhitam.jpeg'] },
      { name: 'Army', hex_code: '#4B5320', stock: 13, images: ['/images/products/jaketbomberhijau.jpeg'] }
    ],
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
    gender_category: 'pria',
    images: ['/images/products/hoodieabu.jpeg'],
    sizes: [{ name: 'M', stock: 10 }, { name: 'L', stock: 15 }, { name: 'XL', stock: 12 }],
    colors: [
      { name: 'Abu-abu', hex_code: '#6B7280', stock: 20, images: ['/images/products/hoodieabu.jpeg'] },
      { name: 'Hitam', hex_code: '#000000', stock: 17, images: ['/images/products/hoodiehitam.jpeg'] }
    ],
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
    gender_category: 'wanita',
    images: ['/images/products/dressfloral.jpeg'],
    sizes: [{ name: 'S', stock: 8 }, { name: 'M', stock: 12 }, { name: 'L', stock: 8 }],
    colors: [
      { name: 'Floral', hex_code: '#EC4899', stock: 15, images: ['/images/products/dressfloral.jpeg'] },
      { name: 'Putih', hex_code: '#FFFFFF', stock: 13, images: ['/images/products/dressputih.jpeg'] }
    ],
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
    gender_category: 'pria',
    images: ['/images/products/polonavy.jpeg'],
    sizes: [{ name: 'M', stock: 15 }, { name: 'L', stock: 20 }, { name: 'XL', stock: 15 }],
    colors: [
      { name: 'Navy', hex_code: '#1E3A5F', stock: 25, images: ['/images/products/polonavy.jpeg'] },
      { name: 'Putih', hex_code: '#FFFFFF', stock: 25, images: ['/images/products/poloputih.jpeg'] }
    ],
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
    gender_category: 'both',
    images: ['/images/products/denimbiru.jpeg'],
    sizes: [{ name: '30', stock: 10 }, { name: '32', stock: 15 }, { name: '34', stock: 12 }],
    colors: [
      { name: 'Blue Wash', hex_code: '#4A90D9', stock: 20, images: ['/images/products/denimbiru.jpeg'] },
      { name: 'Hitam', hex_code: '#1F2937', stock: 17, images: ['/images/products/denimhitam.jpeg'] }
    ],
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
    gender_category: 'wanita',
    images: ['/images/products/cardiganabu.jpeg'],
    sizes: [{ name: 'S', stock: 10 }, { name: 'M', stock: 15 }, { name: 'L', stock: 10 }],
    colors: [
      { name: 'Abu-abu', hex_code: '#6B7280', stock: 17, images: ['/images/products/cardiganabu.jpeg'] },
      { name: 'Cream', hex_code: '#F5F5DC', stock: 18, images: ['/images/products/cardigancream.jpeg'] }
    ],
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
    gender_category: 'wanita',
    images: ['/images/products/rokminibiru.jpeg'],
    sizes: [{ name: 'S', stock: 12 }, { name: 'M', stock: 15 }, { name: 'L', stock: 8 }],
    colors: [
      { name: 'Biru', hex_code: '#3B82F6', stock: 15, images: ['/images/products/rokminibiru.jpeg'] },
      { name: 'Hitam', hex_code: '#000000', stock: 20, images: ['/images/products/rokminihitam.jpeg'] }
    ],
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
    gender_category: 'wanita',
    images: ['/images/products/crewneckputih.jpeg'],
    sizes: [{ name: 'M', stock: 10 }, { name: 'L', stock: 15 }, { name: 'XL', stock: 12 }],
    colors: [
      { name: 'Putih', hex_code: '#FFFFFF', stock: 20, images: ['/images/products/crewneckputih.jpeg'] },
      { name: 'Hitam', hex_code: '#000000', stock: 17, images: ['/images/products/crewneckhitam.jpeg'] }
    ],
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
    gender_category: 'wanita',
    images: ['/images/products/jogerhitam.jpeg'],
    sizes: [{ name: 'M', stock: 15 }, { name: 'L', stock: 20 }, { name: 'XL', stock: 10 }],
    colors: [
      { name: 'Hitam', hex_code: '#000000', stock: 20, images: ['/images/products/jogerhitam.jpeg'] },
      { name: 'Abu-abu', hex_code: '#6B7280', stock: 25, images: ['/images/products/jogerabu.jpeg'] }
    ],
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
  { id: 'wanita', name: 'Wanita', slug: 'wanita', is_active: true, created_at: '' },
  { id: 'pria', name: 'Pria', slug: 'pria', is_active: true, created_at: '' },
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
  const { categorySlug } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const { addItem, openCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();

  // Load wishlist IDs
  useEffect(() => {
    if (isAuthenticated && user) {
      loadWishlist();
    }
  }, [isAuthenticated, user]);

  const loadWishlist = async () => {
    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id, product_name')
        .eq('user_id', user?.id);

      if (!error && data) {
        const ids = new Set(data.map(item => item.product_id || item.product_name));
        setWishlistIds(ids);
      }
    } catch (err) {
      console.error('Error loading wishlist:', err);
    }
  };

  const toggleWishlist = async (product: Product) => {
    if (!isAuthenticated) {
      alert('Silakan login terlebih dahulu untuk menambahkan ke wishlist');
      return;
    }

    const productIdentifier = product.id;
    const isInWishlist = wishlistIds.has(productIdentifier);

    try {
      if (isInWishlist) {
        // Remove from wishlist
        const { error } = await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', user?.id)
          .or(`product_id.eq.${product.id},product_name.eq.${product.name}`);

        if (error) throw error;

        setWishlistIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(productIdentifier);
          return newSet;
        });
      } else {
        // Add to wishlist
        const { error } = await supabase
          .from('wishlist')
          .insert({
            user_id: user?.id,
            product_id: product.id,
            product_name: product.name,
            product_image: product.images[0],
            product_price: product.discount_price || product.price
          });

        if (error) throw error;

        setWishlistIds(prev => new Set(prev).add(productIdentifier));
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
      alert('Gagal memperbarui wishlist');
    }
  };

  // Set selected category from URL parameter or query string
  useEffect(() => {
    if (categorySlug) {
      setSelectedCategory(categorySlug);
    } else {
      setSelectedCategory(searchParams.get('category') || '');
    }
    // Scroll to top when category changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categorySlug, searchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by category
    if (selectedCategory) {
      const category = categories.find(c => c.slug === selectedCategory);
      if (category) {
        // Check if it's a gender category (wanita or pria)
        if (category.id === 'wanita' || category.id === 'pria') {
          result = result.filter(p => 
            (p as any).gender_category === category.id || 
            (p as any).gender_category === 'both'
          );
        } else {
          // Regular category filter
          result = result.filter(p => p.category_id === category.id);
        }
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
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      if (window.confirm('Anda harus login terlebih dahulu untuk menambahkan produk ke keranjang. Login sekarang?')) {
        navigate('/login');
      }
      return;
    }

    const defaultSize = product.sizes[0]?.name || '';
    const defaultColor = product.colors[0]?.name || '';
    addItem(product, 1, defaultSize, defaultColor);
    openCart();
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-primary-800 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="text-accent tracking-[0.3em] uppercase text-sm font-medium">Koleksi</span>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mt-4 mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
            Semua Produk
          </h1>
          <p className="text-cream-200 font-lato text-lg max-w-2xl mx-auto leading-relaxed">
            Temukan koleksi fashion terbaik untuk gaya Anda
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white border border-primary-100 p-6 sticky top-24">
              <h3 className="font-montserrat text-xl text-primary-800 mb-4">Filter</h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-taupe-600 tracking-wider uppercase mb-3">Kategori</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('')}
                    className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                      !selectedCategory ? 'bg-primary-50 text-primary-700 border-l-2 border-accent' : 'hover:bg-cream-100 text-taupe-600'
                    }`}
                  >
                    Semua Kategori
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                        selectedCategory === cat.slug ? 'bg-primary-50 text-primary-700 border-l-2 border-accent' : 'hover:bg-cream-100 text-taupe-600'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-taupe-600 tracking-wider uppercase mb-3">Rentang Harga</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-accent"
                  />
                  <div className="flex items-center justify-between text-sm text-taupe-500">
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
                className="w-full py-2 text-sm text-accent hover:text-accent-dark tracking-wider uppercase"
              >
                Reset Filter
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-primary-100">
              <p className="text-sm text-taupe-600">
                Menampilkan <span className="font-medium text-primary-700">{filteredProducts.length}</span> produk
              </p>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-primary-200 hover:border-primary-400 transition-colors"
                >
                  <Filter className="h-4 w-4 text-primary-700" />
                  <span className="text-primary-700 text-sm tracking-wider">Filter</span>
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2 bg-white border border-primary-200 hover:border-primary-400 cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent text-sm text-primary-700 tracking-wider"
                  >
                    <option value="newest">Terbaru</option>
                    <option value="popular">Terpopuler</option>
                    <option value="price_low">Harga Terendah</option>
                    <option value="price_high">Harga Tertinggi</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-taupe-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group">
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-cream-100 border border-primary-100 hover:border-primary-300 transition-all duration-500">
                    <Link to={`/products/clothing/${product.slug}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </Link>
                    
                    {/* Discount Badge */}
                    {product.discount_price && (
                      <div className="absolute top-4 left-4 bg-accent text-white text-xs tracking-wider uppercase px-3 py-1">
                        -{calculateDiscount(product.price, product.discount_price)}%
                      </div>
                    )}

                    {/* Wishlist & Quick Add */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={() => toggleWishlist(product)}
                        className={`p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                          wishlistIds.has(product.id)
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-white/90 hover:bg-white border border-primary-100'
                        }`}
                      >
                        <Heart 
                          className={`h-5 w-5 transition-all duration-300 ${
                            wishlistIds.has(product.id)
                              ? 'text-white fill-current'
                              : 'text-accent hover:text-red-500'
                          }`} 
                        />
                      </button>
                    </div>

                    {/* Quick Add Button */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={() => handleQuickAdd(product)}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-primary-700 text-white tracking-wider uppercase text-xs hover:bg-primary-800 transition-colors"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Tambah ke Keranjang
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-4 text-center">
                    <Link to={`/products/clothing/${product.slug}`}>
                      <h3 className="font-montserrat text-lg text-primary-800 hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                      ))}
                      <span className="text-xs text-taupe-500 ml-1">(120)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="font-lato text-primary-700 font-medium">
                        {formatPrice(product.discount_price || product.price)}
                      </span>
                      {product.discount_price && (
                        <span className="text-sm text-taupe-400 line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>

                    {/* Colors */}
                    <div className="flex items-center justify-center gap-1.5 mt-3">
                      {product.colors.slice(0, 4).map((color) => (
                        <div
                          key={color.name}
                          className="w-4 h-4 border border-primary-200"
                          style={{ backgroundColor: color.hex_code }}
                          title={color.name}
                        />
                      ))}
                      {product.colors.length > 4 && (
                        <span className="text-xs text-taupe-500">+{product.colors.length - 4}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-taupe-500 mb-4 font-lato">Tidak ada produk yang ditemukan</p>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setPriceRange([0, 500000]);
                    setSearchParams({});
                  }}
                  className="text-accent hover:text-accent-dark tracking-wider uppercase text-sm"
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
          <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-cream-50 z-50 lg:hidden overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary-100">
                <h3 className="font-montserrat text-xl text-primary-800">Filter</h3>
                <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-cream-100 transition-colors">
                  <X className="h-5 w-5 text-primary-700" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-taupe-600 tracking-wider uppercase mb-3">Kategori</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => { handleCategoryChange(''); setShowFilters(false); }}
                    className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                      !selectedCategory ? 'bg-primary-50 text-primary-700 border-l-2 border-accent' : 'hover:bg-cream-100 text-taupe-600'
                    }`}
                  >
                    Semua Kategori
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { handleCategoryChange(cat.slug); setShowFilters(false); }}
                      className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                        selectedCategory === cat.slug ? 'bg-primary-50 text-primary-700 border-l-2 border-accent' : 'hover:bg-cream-100 text-taupe-600'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-taupe-600 tracking-wider uppercase mb-3">Rentang Harga</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-accent"
                  />
                  <div className="flex items-center justify-between text-sm text-taupe-500">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={() => setShowFilters(false)}
                className="w-full py-3 bg-primary-700 text-white tracking-wider uppercase text-sm hover:bg-primary-800 transition-colors"
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
