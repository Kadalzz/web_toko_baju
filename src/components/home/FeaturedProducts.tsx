import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import type { Product } from '../../types';
import { useCartStore } from '../../stores/cartStore';

// Dummy featured products - replace with API call
const dummyProducts: Product[] = [
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
      { name: 'Putih', hex_code: '#FFFFFF', stock: 30, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop'] }
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
  }
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

const FeaturedProducts = () => {
  const [products] = useState<Product[]>(dummyProducts);
  const { addItem } = useCartStore();

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes[0]?.name || 'M';
    const defaultColor = product.colors[0]?.name || 'Default';
    addItem(product, 1, defaultSize, defaultColor);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Produk Unggulan
            </h2>
            <p className="text-gray-600">
              Koleksi terbaik pilihan pelanggan kami
            </p>
          </div>
          <Link
            to="/products"
            className="hidden md:flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-[3/4]">
                {/* Discount Badge */}
                {product.discount_price && (
                  <div className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                    -{calculateDiscount(product.price, product.discount_price)}%
                  </div>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-white">
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>

                {/* Product Image */}
                <Link to={`/products/${product.slug}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Quick Add Button */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="w-full flex items-center justify-center space-x-2 bg-white text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Tambah</span>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4">
                <Link
                  to={`/products/${product.slug}`}
                  className="text-gray-900 font-medium hover:text-primary-600 line-clamp-2"
                >
                  {product.name}
                </Link>
                
                {/* Rating */}
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">4.8 (120)</span>
                </div>

                {/* Price */}
                <div className="mt-2">
                  {product.discount_price ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-primary-600 font-bold">
                        {formatPrice(product.discount_price)}
                      </span>
                      <span className="text-gray-400 text-sm line-through">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-primary-600 font-bold">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <span>Lihat Semua Produk</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
