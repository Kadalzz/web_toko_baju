import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';

const CartSidebar = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getShippingCost, getTotal } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 text-primary-600" />
            <h2 className="text-lg font-semibold">Keranjang Belanja</h2>
            <span className="bg-primary-100 text-primary-700 text-sm px-2 py-0.5 rounded-full">
              {items.length} item
            </span>
          </div>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Keranjang Kosong</h3>
              <p className="text-gray-500 mb-6">Belum ada produk di keranjang Anda</p>
              <button
                onClick={closeCart}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex space-x-4 bg-gray-50 rounded-lg p-3">
                  {/* Product Image */}
                  <Link 
                    to={`/products/clothing/${item.slug}`}
                    onClick={closeCart}
                    className="shrink-0"
                  >
                    <img
                      src={item.image || 'https://placehold.co/80x100/e2e8f0/64748b?text=No+Image'}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded-md"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/products/clothing/${item.slug}`}
                      onClick={closeCart}
                      className="font-medium text-gray-900 hover:text-primary-600 line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <div className="text-sm text-gray-500 mt-1">
                      <span>{item.size}</span>
                      <span className="mx-1">•</span>
                      <span>{item.color}</span>
                    </div>
                    <div className="font-semibold text-primary-600 mt-1">
                      {formatPrice(item.price)}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity >= item.max_stock}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            {/* Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{formatPrice(getSubtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ongkos Kirim</span>
                <span className="font-medium">
                  {getShippingCost() === 0 ? (
                    <span className="text-green-600">Gratis</span>
                  ) : (
                    formatPrice(getShippingCost())
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base pt-2 border-t">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-primary-600">{formatPrice(getTotal())}</span>
              </div>
            </div>

            {/* Free Shipping Notice */}
            {getSubtotal() < 500000 && (
              <div className="bg-yellow-50 text-yellow-800 text-sm px-3 py-2 rounded-lg">
                Tambah {formatPrice(500000 - getSubtotal())} lagi untuk gratis ongkir!
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2">
              <Link
                to="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <span>Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={closeCart}
                className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Lanjut Belanja
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
