import { useState, useEffect } from 'react';
import { Check, AlertCircle, FileText} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  orderId: string;
  name: string;
  email: string;
  whatsapp: string;
  address: string;
  googleDriveLink: string;
}

const OrderForm = () => {
  const [formData, setFormData] = useState<FormData>({
    orderId: '',
    name: '',
    email: '',
    whatsapp: '',
    address: '',
    googleDriveLink: '',
  });

  // WhatsApp admin number (ganti dengan nomor admin yang sebenarnya)
  const ADMIN_WHATSAPP = '+6281234567890'; // Format: 62 + nomor tanpa 0 di depan

  // Order summary data - you can pass these as props or get from context/state management
  const productType = new URLSearchParams(window.location.search).get('type') || '';
  const productSize = new URLSearchParams(window.location.search).get('size') || '';
  const quantity = new URLSearchParams(window.location.search).get('quantity') || '1';
  const unitPrice = new URLSearchParams(window.location.search).get('price') || '0';

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Function to calculate total price
  const calculateTotalPrice = (): number => {
    const price = parseInt(unitPrice) || 0;
    const qty = parseInt(quantity) || 1;
    return price * qty;
  };

  // Function to format price to IDR currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Function to get product prefix based on product type
 const getProductPrefix = (productType: string): string => {
  const productLower = productType.toLowerCase();
  
  // Pengecekan yang lebih spesifik terlebih dahulu
  if (productLower.includes('wall decor') || productLower.includes('wall-decor')) {
    return 'WD';
  } else if (productLower.includes('print photo') || productLower.includes('print-photo') || productLower.includes('cetak foto')) {
    return 'PP';
  } else if (productLower.includes('album bag') || productLower.includes('album-bag') || productLower.includes('tas album')) {
    return 'AB';
  } else if (productLower.includes('wedding book') || productLower.includes('wedding-book')) {
    return 'WB';
  } else if (productLower.includes('album foto') || productLower.includes('album')) {
    return 'AF';
  } else if (productLower.includes('flashdisk') || productLower.includes('flash disk')) {
    return 'FD';
  } else if (productLower.includes('figura')) {
    return 'FG';
  } else if (productLower.includes('foto')) {
    return 'PP'; // Fallback untuk kata 'foto' yang tidak tertangkap di atas
  } else if (productLower.includes('tas')) {
    return 'AB'; // Fallback untuk kata 'tas' yang tidak tertangkap di atas
  } else if (productLower.includes('wall') || productLower.includes('decor')) {
    return 'WD'; // Fallback untuk kata 'wall' atau 'decor' yang tidak tertangkap di atas
  } else {
    return 'ORD'; // Default prefix jika tidak ada yang cocok
  }
};

  // Function to generate random 4-digit number
  const generateRandomDigits = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Function to generate Order ID
  const generateOrderId = (productType: string): string => {
    const prefix = getProductPrefix(productType);
    const randomDigits = generateRandomDigits();
    return `${prefix}${randomDigits}`;
  };

  // Auto-generate Order ID when component mounts or productType changes
  useEffect(() => {
    if (productType && !formData.orderId) {
      const newOrderId = generateOrderId(productType);
      setFormData(prev => ({
        ...prev,
        orderId: newOrderId
      }));
    }
  }, [productType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Function to regenerate Order ID manually
  const regenerateOrderId = () => {
    const newOrderId = generateOrderId(productType);
    setFormData(prev => ({
      ...prev,
      orderId: newOrderId
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.orderId.trim()) {
      newErrors.orderId = 'Order ID wajib diisi';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'Nomor WhatsApp wajib diisi';
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Format nomor WhatsApp tidak valid';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Alamat pengiriman wajib diisi';
    }

    if (!formData.googleDriveLink.trim()) {
      newErrors.googleDriveLink = 'Link Google Drive wajib diisi';
    } else if (!formData.googleDriveLink.includes('drive.google.com') && !formData.googleDriveLink.includes('docs.google.com')) {
      newErrors.googleDriveLink = 'Link harus berupa link Google Drive yang valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitToSupabase = async (orderData: any) => {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData]);

    if (error) {
      throw new Error(error.message || 'Failed to submit order');
    }

    return data;
  };

  // Function to create WhatsApp message
  const createWhatsAppMessage = () => {
    const totalPrice = calculateTotalPrice();
    const message = `KONFIRMASI PESANAN BARU

Detail Pesanan:
• Order ID: ${formData.orderId}
• Produk: ${productType}
• Ukuran: ${productSize}
• Jumlah: ${quantity}
• Harga Satuan: ${formatPrice(parseInt(unitPrice))}
• Total Harga: ${formatPrice(totalPrice)}

Data Customer:
• Nama: ${formData.name}
• Email: ${formData.email}
• WhatsApp: ${formData.whatsapp}

Alamat Pengiriman:
${formData.address}

Link Google Drive:
${formData.googleDriveLink}

Mohon segera diproses. Terima kasih! 🙏`;

    return encodeURIComponent(message);
  };

  // Function to redirect to WhatsApp
  const redirectToWhatsApp = () => {
    const message = createWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare data for Supabase according to your schema
      const orderData = {
        order_id: formData.orderId,
        customer_details: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          address: formData.address,
        }),
        //product_details: JSON.stringify({
         // productType: productType,
          //productSize: productSize,
        //  quantity: quantity
       // }),
        drive_link: formData.googleDriveLink,
        date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
        status: 'pending'
        // created_at will be auto-generated by Supabase
        // id (uuid) will be auto-generated by Supabase
      };

      await submitToSupabase(orderData);
      
      setSubmitStatus('success');
      
      // Redirect to WhatsApp after successful submission
      setTimeout(() => {
        redirectToWhatsApp();
      }, 1500);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          orderId: '',
          name: '',
          email: '',
          whatsapp: '',
          address: '',
          googleDriveLink: '',
        });
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting order:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-full mb-4">
            <FileText size={16} className="text-blue-600 mr-2" />
            <span className="text-blue-700 text-sm font-medium">Form Pemesanan</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Formulir Pemesanan</h1>
          <p className="text-gray-600">
            Lengkapi informasi berikut untuk menyelesaikan pesanan Anda
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Order Summary */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Ringkasan Pesanan</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Produk:</p>
                <p className="font-medium">{productType}</p>
              </div>
              <div>
                <p className="text-gray-600">Ukuran:</p>
                <p className="font-medium">{productSize}</p>
              </div>
              <div>
                <p className="text-gray-600">Jumlah:</p>
                <p className="font-medium">{quantity}</p>
              </div>
              <div>
                <p className="text-gray-600">Harga Satuan:</p>
                <p className="font-medium">{formatPrice(parseInt(unitPrice))}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-900">Total Harga:</p>
                <p className="text-lg font-bold text-blue-600">{formatPrice(calculateTotalPrice())}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Order ID */}
            <div>
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                Order ID*
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="orderId"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleInputChange}
                  placeholder="Order ID akan di-generate otomatis"
                  className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.orderId ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting}
                  readOnly
                />
                <button
                  type="button"
                  onClick={regenerateOrderId}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                  title="Generate ulang Order ID"
                >
                  🔄
                </button>
              </div>
              {errors.orderId && (
                <p className="mt-1 text-sm text-red-500">{errors.orderId}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Order ID dibuat otomatis berdasarkan jenis produk yang dipilih
              </p>
            </div>

            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Informasi Pribadi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nama lengkap Anda"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="nama@email.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* WhatsApp */}
                <div className="md:col-span-2">
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                    No WhatsApp*
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="08123456789 atau +62812345678"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.whatsapp ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.whatsapp && (
                    <p className="mt-1 text-sm text-red-500">{errors.whatsapp}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Alamat Pengiriman</h3>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Lengkap*
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Masukkan alamat lengkap untuk pengiriman"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                )}
              </div>
            </div>

            {/* Google Drive Link */}
            <div>
              <label htmlFor="googleDriveLink" className="block text-sm font-medium text-gray-700 mb-2">
                Link Google Drive*
              </label>
              <input
                type="url"
                id="googleDriveLink"
                name="googleDriveLink"
                value={formData.googleDriveLink}
                onChange={handleInputChange}
                placeholder="https://drive.google.com/..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.googleDriveLink ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              {errors.googleDriveLink && (
                <p className="mt-1 text-sm text-red-500">{errors.googleDriveLink}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Pastikan link dapat diakses oleh orang lain
              </p>
            </div>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center">
                <Check className="h-5 w-5 mr-2" />
                Pesanan berhasil dikirim! Anda akan diarahkan ke WhatsApp admin untuk konfirmasi.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Terjadi kesalahan saat mengirim pesanan. Silakan coba lagi.
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Mengirim pesanan...
                </>
              ) : (
                'Konfirmasi Pesanan'
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Setelah berhasil mengirim, Anda akan diarahkan ke WhatsApp admin untuk konfirmasi pesanan
            </p>
          </div>
        </div>
      </div>
  );
};

export default OrderForm;