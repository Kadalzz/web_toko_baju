import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Heart, 
  ShoppingBag, 
  Minus, 
  Plus, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  Check,
  Share2
} from 'lucide-react';
import type { Product } from '../types';
import { useCartStore } from '../stores/cartStore';

// Dummy products data - same as Products page
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Kaos Polos Premium Cotton',
    slug: 'kaos-polos-premium-cotton',
    description: 'Kaos polos berbahan cotton combed 30s yang nyaman dipakai sehari-hari. Material berkualitas tinggi dengan jahitan yang rapi dan tahan lama. Cocok untuk aktivitas casual maupun semi-formal.',
    price: 129000,
    discount_price: 89000,
    category_id: '1',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&h=1000&fit=crop',
    ],
    sizes: [{ name: 'S', stock: 10 }, { name: 'M', stock: 15 }, { name: 'L', stock: 20 }, { name: 'XL', stock: 10 }],
    colors: [
      { 
        name: 'Hitam', 
        hex_code: '#000000', 
        stock: 25,
        images: [
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=1000&fit=crop'
        ]
      },
      { 
        name: 'Putih', 
        hex_code: '#FFFFFF', 
        stock: 30,
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=1000&fit=crop'
        ]
      },
      { 
        name: 'Navy', 
        hex_code: '#1E3A5F', 
        stock: 20,
        images: [
          'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&h=1000&fit=crop'
        ]
      },
      { 
        name: 'Abu-abu', 
        hex_code: '#6B7280', 
        stock: 15,
        images: [
          'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1622519407650-3df9883f76f3?w=800&h=1000&fit=crop'
        ]
      }
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
    description: 'Kemeja flanel dengan motif kotak-kotak yang stylish. Bahan flanel berkualitas yang lembut dan hangat. Perfect untuk tampilan casual yang trendy.',
    price: 189000,
    category_id: '2',
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop',
    ],
    sizes: [{ name: 'M', stock: 10 }, { name: 'L', stock: 15 }, { name: 'XL', stock: 10 }],
    colors: [
      { 
        name: 'Merah', 
        hex_code: '#EF4444', 
        stock: 20,
        images: [
          'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop'
        ]
      },
      { 
        name: 'Biru', 
        hex_code: '#3B82F6', 
        stock: 15,
        images: [
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&h=1000&fit=crop'
        ]
      },
      { 
        name: 'Hijau', 
        hex_code: '#22C55E', 
        stock: 12,
        images: [
          'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1608748010899-18f300247112?w=800&h=1000&fit=crop'
        ]
      }
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
    description: 'Celana chino dengan potongan slim fit yang modern. Bahan katun stretch yang nyaman dan tidak mudah kusut. Cocok untuk tampilan smart casual.',
    price: 259000,
    discount_price: 199000,
    category_id: '3',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=1000&fit=crop',
    ],
    sizes: [{ name: '30', stock: 10 }, { name: '32', stock: 15 }, { name: '34', stock: 10 }, { name: '36', stock: 8 }],
    colors: [
      { name: 'Khaki', hex_code: '#C4A35A', stock: 20 },
      { name: 'Navy', hex_code: '#1E3A5F', stock: 15 },
      { name: 'Hitam', hex_code: '#000000', stock: 18 }
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
    description: 'Jaket bomber dengan bahan premium yang tahan lama. Desain klasik dengan detail modern. Dilengkapi dengan kantong samping dan ritsleting berkualitas.',
    price: 359000,
    category_id: '4',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop',
    ],
    sizes: [{ name: 'M', stock: 8 }, { name: 'L', stock: 12 }, { name: 'XL', stock: 8 }],
    colors: [
      { name: 'Hitam', hex_code: '#000000', stock: 15 },
      { name: 'Army', hex_code: '#4B5320', stock: 13 }
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
    description: 'Hoodie dengan potongan oversize yang trendy. Bahan fleece tebal yang hangat dan nyaman. Dilengkapi hoodie dan kantong depan.',
    price: 279000,
    discount_price: 229000,
    category_id: '4',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop',
    ],
    sizes: [{ name: 'M', stock: 10 }, { name: 'L', stock: 15 }, { name: 'XL', stock: 12 }],
    colors: [
      { 
        name: 'Abu-abu', 
        hex_code: '#6B7280', 
        stock: 20,
        images: [
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop'
        ]
      },
      { 
        name: 'Hitam', 
        hex_code: '#000000', 
        stock: 17,
        images: [
          'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop',
          'https://images.unsplash.com/photo-1614252368530-9ebdb1d90c63?w=800&h=1000&fit=crop'
        ]
      }
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
    description: 'Dress casual yang cocok untuk musim panas. Bahan katun ringan yang adem dan nyaman. Desain simpel namun elegan untuk berbagai kesempatan.',
    price: 249000,
    category_id: '5',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800&h=1000&fit=crop',
    ],
    sizes: [{ name: 'S', stock: 8 }, { name: 'M', stock: 12 }, { name: 'L', stock: 8 }],
    colors: [
      { name: 'Floral', hex_code: '#EC4899', stock: 15 },
      { name: 'Putih', hex_code: '#FFFFFF', stock: 13 }
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
    description: 'Polo shirt dengan desain classic yang timeless. Bahan pique cotton yang breathable dan tahan lama. Ideal untuk tampilan smart casual.',
    price: 179000,
    discount_price: 149000,
    category_id: '1',
    images: [
      'https://images.unsplash.com/photo-1625910513413-5fc45e80b2d1?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop',
    ],
    sizes: [{ name: 'M', stock: 15 }, { name: 'L', stock: 20 }, { name: 'XL', stock: 15 }],
    colors: [
      { name: 'Navy', hex_code: '#1E3A5F', stock: 25 },
      { name: 'Putih', hex_code: '#FFFFFF', stock: 25 }
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
    description: 'Jeans denim dengan bahan stretch yang nyaman. Potongan modern yang flattering untuk berbagai bentuk tubuh. Warna yang tidak mudah luntur.',
    price: 299000,
    category_id: '3',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&h=1000&fit=crop',
    ],
    sizes: [{ name: '30', stock: 10 }, { name: '32', stock: 15 }, { name: '34', stock: 12 }],
    colors: [
      { name: 'Blue Wash', hex_code: '#4A90D9', stock: 20 },
      { name: 'Black', hex_code: '#1F2937', stock: 17 }
    ],
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

const ClothingProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    // Find product by slug
    const foundProduct = allProducts.find(p => p.slug === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0]?.name || '');
      setSelectedColor(foundProduct.colors[0]?.name || '');
      // Set initial images from first color or default images
      const initialColor = foundProduct.colors[0];
      setCurrentImages(initialColor?.images || foundProduct.images);
    }
  }, [productId]);

  // Handle color change to update images
  useEffect(() => {
    if (product && selectedColor) {
      const color = product.colors.find(c => c.name === selectedColor);
      if (color?.images && color.images.length > 0) {
        setCurrentImages(color.images);
        setSelectedImage(0); // Reset to first image
      } else {
        setCurrentImages(product.images);
      }
    }
  }, [selectedColor, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Produk tidak ditemukan</h2>
          <Link to="/products" className="text-primary-600 hover:underline">
            Kembali ke halaman produk
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Pilih ukuran dan warna terlebih dahulu');
      return;
    }
    
    addItem(product, quantity, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    openCart();
  };

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= product.stock) {
      setQuantity(newQty);
    }
  };

  const currentPrice = product.discount_price || product.price;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary-600">Beranda</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link to="/products" className="text-gray-500 hover:text-primary-600">Produk</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={currentImages[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {currentImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary-600' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:py-4">
            {/* Title & Price */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.8 (128 ulasan)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary-600">
                  {formatPrice(currentPrice)}
                </span>
                {product.discount_price && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-full">
                      -{calculateDiscount(product.price, product.discount_price)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-900">Warna</span>
                <span className="text-sm text-gray-500">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? 'border-primary-600 ring-2 ring-primary-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex_code }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                      <Check className={`absolute inset-0 m-auto h-5 w-5 ${
                        color.hex_code === '#FFFFFF' || color.hex_code === '#F5F5DC' 
                          ? 'text-gray-900' 
                          : 'text-white'
                      }`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-900">Ukuran</span>
                <button className="text-sm text-primary-600 hover:underline">
                  Panduan Ukuran
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    disabled={size.stock === 0}
                    className={`min-w-[48px] px-4 py-2.5 rounded-lg border font-medium transition-all ${
                      selectedSize === size.name
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : size.stock === 0
                        ? 'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <span className="font-medium text-gray-900 block mb-3">Jumlah</span>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2.5 border rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= 1 && val <= product.stock) setQuantity(val);
                  }}
                  className="w-16 text-center py-2.5 border-t border-b focus:outline-none"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="p-2.5 border rounded-r-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <span className="ml-4 text-sm text-gray-500">
                  Stok: {product.stock} tersedia
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold transition-all ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5" />
                    Ditambahkan!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" />
                    Tambah ke Keranjang
                  </>
                )}
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-3.5 rounded-lg border transition-colors ${
                  isWishlisted
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl mb-8">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary-600" />
                <p className="text-xs text-gray-600">Gratis Ongkir min. Rp500rb</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary-600" />
                <p className="text-xs text-gray-600">Garansi Produk Original</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary-600" />
                <p className="text-xs text-gray-600">Retur dalam 7 Hari</p>
              </div>
            </div>

            {/* Description */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Deskripsi Produk</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-gray-900">Detail Produk:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Bahan berkualitas tinggi</li>
                  <li>• Jahitan rapi dan tahan lama</li>
                  <li>• Nyaman dipakai seharian</li>
                  <li>• Mudah dicuci dan dirawat</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 pt-8 border-t">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produk Terkait</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {allProducts
              .filter(p => p.id !== product.id && p.category_id === product.category_id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-primary-600 text-sm">
                        {formatPrice(relatedProduct.discount_price || relatedProduct.price)}
                      </span>
                      {relatedProduct.discount_price && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(relatedProduct.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothingProductDetail;
