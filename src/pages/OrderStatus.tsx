import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Package, Clock, CheckCircle, XCircle, Truck, MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string;
  variant_size?: string;
  variant_color?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_province: string;
  shipping_postal_code: string;
  subtotal: number;
  shipping_cost: number;
  discount: number;
  total: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  notes?: string;
  created_at: string;
  order_items?: OrderItem[];
}

const OrderStatus = () => {
  const [searchParams] = useSearchParams();
  const orderIdFromUrl = searchParams.get('id');
  
  const [orderNumber, setOrderNumber] = useState(orderIdFromUrl || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (orderIdFromUrl) {
      handleSearch();
    }
  }, [orderIdFromUrl]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Menunggu Pembayaran', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      paid: { label: 'Dibayar', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
      confirmed: { label: 'Dikonfirmasi', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      processing: { label: 'Diproses', color: 'bg-indigo-100 text-indigo-800', icon: Package },
      shipped: { label: 'Dikirim', color: 'bg-purple-100 text-purple-800', icon: Truck },
      delivered: { label: 'Selesai', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { label: 'Dibatalkan', color: 'bg-red-100 text-red-800', icon: XCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-4 h-4 mr-1" />
        {config.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Menunggu Pembayaran', color: 'bg-yellow-100 text-yellow-800' },
      paid: { label: 'Sudah Dibayar', color: 'bg-green-100 text-green-800' },
      failed: { label: 'Gagal', color: 'bg-red-100 text-red-800' },
      refunded: { label: 'Dikembalikan', color: 'bg-gray-100 text-gray-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleSearch = async () => {
    if (!orderNumber.trim()) {
      setError('Masukkan nomor pesanan');
      return;
    }

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      // Fetch order with items
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('order_number', orderNumber.trim())
        .single();

      if (orderError || !orderData) {
        setError('Pesanan tidak ditemukan. Periksa kembali nomor pesanan Anda.');
        return;
      }

      setOrder(orderData as Order);
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const whatsappNumber = '6282142388292'; // Ganti dengan nomor WhatsApp admin
  const whatsappMessage = `Halo Robby Fashion! 👋\n\nSaya ingin menanyakan status pesanan saya:\n\n📦 *Nomor Pesanan:* ${order?.order_number}\n\nMohon info update status pesanan. Terima kasih!`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Lacak Pesanan</h1>
          <p className="text-gray-600 mt-2">Masukkan nomor pesanan Anda untuk melihat status</p>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex gap-3">
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Masukkan nomor pesanan (contoh: ORD123456)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Mencari...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Cari
                  </>
                )}
              </button>
            </div>
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
          </div>
        </div>

        {/* Order Details */}
        {order && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Order Status Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Pesanan #{order.order_number}
                  </h2>
                  <p className="text-gray-600">Dibuat: {formatDate(order.created_at)}</p>
                </div>
                <div className="mt-4 md:mt-0 space-y-2">
                  {getStatusBadge(order.order_status)}
                  <div className="mt-2">
                    {getPaymentStatusBadge(order.payment_status)}
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-6">
                  <div className="relative flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      ['pending', 'paid', 'confirmed', 'processing', 'shipped', 'delivered'].includes(order.order_status)
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}>
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">Pesanan Dibuat</p>
                      <p className="text-sm text-gray-600">{formatDate(order.created_at)}</p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      ['paid', 'confirmed', 'processing', 'shipped', 'delivered'].includes(order.order_status)
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}>
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">Pembayaran Dikonfirmasi</p>
                      <p className="text-sm text-gray-600">
                        {order.payment_status === 'paid' ? 'Sudah dibayar' : 'Menunggu pembayaran'}
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      ['processing', 'shipped', 'delivered'].includes(order.order_status)
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}>
                      <Package className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">Pesanan Diproses</p>
                      <p className="text-sm text-gray-600">Sedang dikemas</p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      ['shipped', 'delivered'].includes(order.order_status)
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}>
                      <Truck className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">Pesanan Dikirim</p>
                      <p className="text-sm text-gray-600">Dalam pengiriman</p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      order.order_status === 'delivered'
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}>
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">Pesanan Diterima</p>
                      <p className="text-sm text-gray-600">Sampai tujuan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary-600" />
                Alamat Pengiriman
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">{order.shipping_name}</p>
                <p>{order.shipping_address}</p>
                <p>{order.shipping_city}, {order.shipping_province} {order.shipping_postal_code}</p>
                <div className="flex items-center mt-3 text-sm">
                  <Phone className="h-4 w-4 mr-2" />
                  {order.shipping_phone}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Produk</h3>
              <div className="space-y-4">
                {order.order_items?.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                    <img
                      src={item.product_image || '/placeholder.jpg'}
                      alt={item.product_name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.product_name}</h4>
                      {(item.variant_size || item.variant_color) && (
                        <p className="text-sm text-gray-600">
                          {item.variant_size && `Ukuran: ${item.variant_size}`}
                          {item.variant_size && item.variant_color && ' • '}
                          {item.variant_color && `Warna: ${item.variant_color}`}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">Jumlah: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatPrice(item.total_price)}</p>
                      <p className="text-sm text-gray-600">{formatPrice(item.unit_price)} × {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Ongkir</span>
                  <span>{formatPrice(order.shipping_cost)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Diskon</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Contact Admin */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Butuh Bantuan?</h3>
              <p className="text-blue-800 text-sm mb-4">
                Hubungi admin kami via WhatsApp untuk informasi lebih lanjut tentang pesanan Anda
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hubungi Admin
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
