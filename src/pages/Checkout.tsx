import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, MapPin, Check, AlertCircle, Smartphone } from 'lucide-react';
import { useCartStore, CartItem } from '../stores/cartStore';
import { supabase } from '../lib/supabase';

interface CheckoutForm {
  // Info Pembeli
  fullName: string;
  email: string;
  phone: string;
  
  // Alamat Pengiriman
  address: string;
  city: string;
  province: string;
  postalCode: string;
  notes: string;
  
  // Metode Pembayaran
  paymentMethod: 'transfer' | 'cod' | 'ewallet';
}

const Checkout = () => {
  const { items, getSubtotal, getShippingCost, getTotal, clearCart } = useCartStore();
  
  const [formData, setFormData] = useState<CheckoutForm>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    notes: '',
    paymentMethod: 'transfer'
  });
  
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutForm> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Nama lengkap wajib diisi';
    if (!formData.email.trim()) newErrors.email = 'Email wajib diisi';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Format email tidak valid';
    if (!formData.phone.trim()) newErrors.phone = 'Nomor telepon wajib diisi';
    else if (!/^[0-9+]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Nomor telepon tidak valid';
    if (!formData.address.trim()) newErrors.address = 'Alamat wajib diisi';
    if (!formData.city.trim()) newErrors.city = 'Kota wajib diisi';
    if (!formData.province.trim()) newErrors.province = 'Provinsi wajib diisi';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Kode pos wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateOrderId = () => {
    const prefix = 'ORD';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const newOrderId = generateOrderId();
      const subtotal = getSubtotal();
      const shippingCost = getShippingCost();
      const total = getTotal();
      
      // Prepare customer data
      const customerData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone
      };

      console.log('Creating customer...', customerData);

      // Insert customer first
      const { data: customerResult, error: customerError } = await supabase
        .from('customers')
        .insert([customerData])
        .select()
        .single();

      if (customerError) {
        console.error('Customer error:', customerError);
        throw new Error(`Gagal membuat customer: ${customerError.message}`);
      }

      console.log('Customer created:', customerResult);

      // Prepare order data
      const orderData = {
        order_number: newOrderId,
        customer_id: customerResult.id,
        shipping_name: formData.fullName,
        shipping_phone: formData.phone,
        shipping_address: formData.address,
        shipping_city: formData.city,
        shipping_province: formData.province,
        shipping_postal_code: formData.postalCode,
        subtotal: subtotal,
        shipping_cost: shippingCost,
        discount: 0,
        total: total,
        payment_method: formData.paymentMethod === 'transfer' ? 'bank_transfer' : formData.paymentMethod,
        payment_status: 'pending',
        order_status: 'pending',
        notes: formData.notes || null
      };

      console.log('Creating order...', orderData);

      // Insert order
      const { data: orderResult, error: orderError } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (orderError) {
        console.error('Order error:', orderError);
        throw new Error(`Gagal membuat order: ${orderError.message}`);
      }

      console.log('Order created:', orderResult);

      // Insert order items
      const orderItems = items.map(item => ({
        order_id: orderResult.id,
        product_id: null, // We don't have product_id from cart
        product_name: item.name,
        product_image: item.image,
        variant_size: item.size,
        variant_color: item.color,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
        custom_images: '[]',
        custom_notes: null
      }));

      console.log('Creating order items...', orderItems);

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Order items error:', itemsError);
        throw new Error(`Gagal membuat order items: ${itemsError.message}`);
      }

      console.log('Order items created successfully');

      // Success
      setOrderId(newOrderId);
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan. Silakan coba lagi.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Redirect if cart is empty
  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Kosong</h2>
              <p className="text-gray-600 mb-6">
                Tambahkan produk ke keranjang untuk melanjutkan checkout
              </p>
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Belanja Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Order Success
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pesanan Berhasil!</h2>
              <p className="text-gray-600 mb-2">
                Terima kasih telah berbelanja di toko kami
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500">Nomor Pesanan</p>
                <p className="text-xl font-bold text-primary-600">{orderId}</p>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Detail pesanan telah dikirim ke email Anda. Silakan lakukan pembayaran sesuai metode yang dipilih.
              </p>
              <div className="space-y-3">
                <Link
                  to="/products"
                  className="block w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Lanjut Belanja
                </Link>
                <Link
                  to="/"
                  className="block w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          </div>
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
            Kembali Belanja
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Info Pembeli */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Smartphone className="h-5 w-5 mr-2 text-primary-600" />
                  Informasi Pembeli
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan nama lengkap"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nomor Telepon/WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="08xxxxxxxxxx"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Alamat Pengiriman */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary-600" />
                  Alamat Pengiriman
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alamat Lengkap *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kota/Kabupaten *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Kota"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Provinsi *
                      </label>
                      <input
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          errors.province ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Provinsi"
                      />
                      {errors.province && (
                        <p className="text-red-500 text-sm mt-1">{errors.province}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kode Pos *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          errors.postalCode ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="12345"
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Catatan (Opsional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Patokan, instruksi khusus, dll."
                    />
                  </div>
                </div>
              </div>

              {/* Metode Pembayaran */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-primary-600" />
                  Metode Pembayaran
                </h2>
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.paymentMethod === 'transfer' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={formData.paymentMethod === 'transfer'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                      formData.paymentMethod === 'transfer' ? 'border-primary-600' : 'border-gray-300'
                    }`}>
                      {formData.paymentMethod === 'transfer' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Transfer Bank</p>
                      <p className="text-sm text-gray-500">BCA, Mandiri, BNI, BRI</p>
                    </div>
                  </label>

                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.paymentMethod === 'ewallet' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ewallet"
                      checked={formData.paymentMethod === 'ewallet'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                      formData.paymentMethod === 'ewallet' ? 'border-primary-600' : 'border-gray-300'
                    }`}>
                      {formData.paymentMethod === 'ewallet' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">E-Wallet</p>
                      <p className="text-sm text-gray-500">GoPay, OVO, DANA, ShopeePay</p>
                    </div>
                  </label>

                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.paymentMethod === 'cod' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                      formData.paymentMethod === 'cod' ? 'border-primary-600' : 'border-gray-300'
                    }`}>
                      {formData.paymentMethod === 'cod' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">COD (Bayar di Tempat)</p>
                      <p className="text-sm text-gray-500">Bayar saat barang sampai</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-primary-600" />
                  Ringkasan Pesanan
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item: CartItem) => (
                    <div key={item.id} className="flex space-x-3">
                      <img
                        src={item.image || 'https://placehold.co/60x80/e2e8f0/64748b?text=No+Image'}
                        alt={item.name}
                        className="w-16 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.size} • {item.color}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-primary-600">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal ({items.length} item)</span>
                    <span className="font-medium">{formatPrice(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
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
                  <div className="mt-4 bg-yellow-50 text-yellow-800 text-sm px-3 py-2 rounded-lg">
                    Tambah {formatPrice(500000 - getSubtotal())} lagi untuk gratis ongkir!
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Memproses...
                    </>
                  ) : (
                    'Buat Pesanan'
                  )}
                </button>

                <p className="mt-4 text-xs text-gray-500 text-center">
                  Dengan menekan tombol di atas, Anda menyetujui{' '}
                  <Link to="/syarat-ketentuan" className="text-primary-600 hover:underline">
                    Syarat & Ketentuan
                  </Link>{' '}
                  serta{' '}
                  <Link to="/kebijakan-privasi" className="text-primary-600 hover:underline">
                    Kebijakan Privasi
                  </Link>{' '}
                  kami.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
