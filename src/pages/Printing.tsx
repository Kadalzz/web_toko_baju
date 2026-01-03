import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Upload, Camera, Database, Instagram } from 'lucide-react';

const Printing = () => {
  const [searchParams] = useSearchParams();
  const defaultType = searchParams.get('type') || 'figura';
  
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [selectedPrintType, setSelectedPrintType] = useState<string>(defaultType);

  const printTypes = [
    { id: 'figura', name: 'Figura', price: 'Mulai Rp 150.000' },
    { id: 'album', name: 'Album Foto', price: 'Mulai Rp 250.000' },
    { id: 'wedding-book', name: 'Wedding Book', price: 'Mulai Rp 500.000' },
    { id: 'album-bag', name: 'Tas Album', price: 'Mulai Rp 75.000' },
    { id: 'print', name: 'Cetak Foto', price: 'Mulai Rp 3.000' },
    { id: 'flashdisk', name: 'Flashdisk', price: 'Mulai Rp 100.000' },
    { id: 'wall-decor', name: 'Wall Decor', price: 'Mulai Rp 200.000' }
  ];

  return (
    <div className="py-10">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="heading-2 mb-4">Pilih Produk Cetak</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pilih jenis produk, unggah foto Anda, dan kami akan memprosesnya dengan kualitas terbaik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Product Selection */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-card p-4 sticky top-24">
              <h3 className="font-semibold text-lg mb-4 pb-2 border-b">Pilih Produk</h3>
              <div className="space-y-2">
                {printTypes.map((type) => (
                  <button
                    key={type.id}
                    className={`w-full text-left p-3 rounded-md transition-colors ${
                      selectedPrintType === type.id
                        ? 'bg-primary-50 text-primary-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    onClick={() => setSelectedPrintType(type.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{type.name}</span>
                      <span className="text-xs text-gray-500">{type.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b">
                <button
                  className={`flex-1 py-4 px-6 font-medium text-center ${
                    activeTab === 'upload'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('upload')}
                >
                  1. Unggah Foto
                </button>
                <button
                  className={`flex-1 py-4 px-6 font-medium text-center ${
                    activeTab === 'edit'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('edit')}
                >
                  2. Edit & Preview
                </button>
                <button
                  className={`flex-1 py-4 px-6 font-medium text-center ${
                    activeTab === 'checkout'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('checkout')}
                >
                  3. Checkout
                </button>
              </div>

              {/* Upload Content */}
              {activeTab === 'upload' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Unggah Foto Anda</h2>
                  <p className="text-gray-600 mb-6">
                    Pilih sumber foto Anda. Anda dapat mengunggah dari perangkat, Google Drive, atau Instagram.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="font-medium mb-2">Unggah dari Perangkat</h3>
                      <p className="text-sm text-gray-500 mb-4">Drag & drop file atau klik untuk memilih</p>
                      <button className="btn btn-primary py-2 px-4 text-sm">Pilih File</button>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer">
                      <Database className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="font-medium mb-2">Google Drive</h3>
                      <p className="text-sm text-gray-500 mb-4">Impor langsung dari Google Drive Anda</p>
                      <button className="btn btn-secondary py-2 px-4 text-sm">Hubungkan Drive</button>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer">
                      <Instagram className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="font-medium mb-2">Instagram</h3>
                      <p className="text-sm text-gray-500 mb-4">Impor dari feed Instagram Anda</p>
                      <button className="btn btn-secondary py-2 px-4 text-sm">Hubungkan Instagram</button>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 mb-4">
                      Format yang didukung: JPG, PNG, HEIF dengan ukuran maksimal 20MB per file
                    </p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setActiveTab('edit')}
                      disabled
                    >
                      Lanjutkan ke Edit
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Content - Placeholder */}
              {activeTab === 'edit' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Edit & Preview</h2>
                  <p className="text-gray-600 mb-6">
                    Sesuaikan dan edit foto Anda sebelum dicetak.
                  </p>
                  <div className="bg-gray-100 rounded-lg p-8 text-center min-h-[400px] flex items-center justify-center">
                    <div>
                      <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-500">Unggah foto terlebih dahulu untuk mulai mengedit</p>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button 
                      className="btn btn-secondary"
                      onClick={() => setActiveTab('upload')}
                    >
                      Kembali
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setActiveTab('checkout')}
                      disabled
                    >
                      Lanjutkan ke Checkout
                    </button>
                  </div>
                </div>
              )}

              {/* Checkout Content - Placeholder */}
              {activeTab === 'checkout' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Checkout</h2>
                  <p className="text-gray-600 mb-6">
                    Lengkapi pesanan Anda dan pilih metode pengiriman.
                  </p>
                  <div className="bg-gray-100 rounded-lg p-8 text-center min-h-[400px] flex items-center justify-center">
                    <div>
                      <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-500">Silakan unggah dan edit foto terlebih dahulu</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <button 
                      className="btn btn-secondary"
                      onClick={() => setActiveTab('edit')}
                    >
                      Kembali
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Printing;