import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';
import { supabase } from '../lib/supabase';

interface WishlistItem {
  id: string;
  product_id: string | null;
  product_name: string;
  product_image: string;
  product_price: number;
  created_at: string;
}

const Wishlist = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { addItem } = useCartStore();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadWishlist();
  }, [isAuthenticated, navigate, user]);

  const loadWishlist = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('wishlist')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWishlistItems(data || []);
    } catch (err) {
      console.error('Error loading wishlist:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      alert('Gagal menghapus dari wishlist');
    }
  };

  const addToCart = (item: WishlistItem) => {
    addItem({
      id: item.product_id || item.id,
      name: item.product_name,
      price: item.product_price,
      image: item.product_image,
      quantity: 1,
      size: 'M', // Default size
      color: 'Default'
    });
    alert('Produk ditambahkan ke keranjang!');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Lanjut Belanja
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Wishlist Saya</h1>
                <p className="text-gray-600">{wishlistItems.length} produk favorit</p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Wishlist Masih Kosong
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Belum ada produk favorit. Tambahkan produk yang Anda sukai ke wishlist untuk memudahkan belanja nanti!
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Mulai Belanja
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.product_image || 'https://placehold.co/400x500/e2e8f0/64748b?text=No+Image'}
                    alt={item.product_name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
                    title="Hapus dari wishlist"
                  >
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </button>

                  {/* Quick View Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full flex items-center">
                      <Heart className="h-3 w-3 mr-1 fill-current" />
                      Favorit
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                    {item.product_name}
                  </h3>
                  
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-xl font-bold text-primary-600">
                      {formatPrice(item.product_price)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addToCart(item)}
                      className="flex-1 flex items-center justify-center px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Tambah</span>
                    </button>
                    
                    {item.product_id && (
                      <Link
                        to={`/products/${item.product_id}`}
                        className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        Detail
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">Siap untuk Checkout?</h3>
            <p className="text-primary-100 mb-6">
              Tambahkan produk favorit ke keranjang dan selesaikan pembelian Anda
            </p>
            <Link
              to="/checkout"
              className="inline-block px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Lihat Keranjang
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
