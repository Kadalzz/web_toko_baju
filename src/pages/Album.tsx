import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Album, ArrowRight, Check, ChevronLeft, ChevronRight, Image as ImageIcon, Home } from 'lucide-react';

interface AlbumSize {
  id: string;
  name: string;
  dimensions: string;
  priceRange?: string;
  price?: string;
  minPrice: number;
  maxPrice?: number;
  features: string[];
}

interface AlbumData {
  name: string;
  description: string;
  price: string;
  image: string;
  gallery: string[];
  specs: {
    name: string;
    value: string;
  }[];
  sizes: AlbumSize[];
}

const albumData: AlbumData = {
  name: 'Album Foto',
  description: 'Album foto premium dengan kualitas terbaik untuk menyimpan kenangan berharga. Tersedia dalam berbagai ukuran dan jumlah halaman dengan pilihan custom cover.',
  price: 'Mulai Rp 76.000',
  image: 'https://raw.githubusercontent.com/anjengk/photo/main/album/DSC00871.webp',
  gallery: [
    'https://raw.githubusercontent.com/anjengk/photo/main/album/DSC00871.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/album/DSC00867.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/album/DSC00857.webp'
  ],
  specs: [
    { name: 'Material', value: 'Hard Cover Premium, Magnetic Sheet' },
    { name: 'Ukuran', value: '35x35 cm' },
    { name: 'Jumlah Halaman', value: '10, 15, 20 sheet' },
    { name: 'Custom Cover', value: 'Tersedia dengan biaya tambahan' }
  ],
  sizes: [
    {
      id: 'magnetic-10',
      name: 'Album Magnetik Jumbo 10 Sheet',
      dimensions: '35x35 cm',
      priceRange: 'Rp 76.000 - Rp 110.000',
      minPrice: 76000,
      maxPrice: 110000,
      features: ['Free Box Kardus', 'Free Tas Hitam']
    },
    {
      id: 'magnetic-15',
      name: 'Album Magnetik Jumbo 15 Sheet',
      dimensions: '35x35 cm',
      priceRange: 'Rp 93.000 - Rp 128.000',
      minPrice: 93000,
      maxPrice: 128000,
      features: ['Free Box Kardus', 'Free Tas Hitam']
    },
    {
      id: 'magnetic-20',
      name: 'Album Magnetik Jumbo 20 Sheet',
      dimensions: '35x35 cm',
      priceRange: 'Rp 130.000 - Rp 150.000',
      minPrice: 130000,
      maxPrice: 150000,
      features: ['Free Box Kardus', 'Free Tas Hitam']
    },
    {
      id: 'custom-10',
      name: 'Album Custom Magnetik 10 Sheet',
      dimensions: '35x35 cm',
      price: 'Rp 240.000',
      minPrice: 240000,
      features: ['Cover Custom Foto/Tulisan', 'Free Design', 'Free Tas Vinyl', 'Free Tas Hitam']
    },
    {
      id: 'custom-15',
      name: 'Album Custom Magnetik 15 Sheet',
      dimensions: '35x35 cm',
      price: 'Rp 250.000',
      minPrice: 250000,
      features: ['Cover Custom Foto/Tulisan', 'Free Design', 'Free Tas Vinyl', 'Free Tas Hitam']
    },
    {
      id: 'custom-20',
      name: 'Album Custom Magnetik 20 Sheet',
      dimensions: '35x35 cm',
      price: 'Rp 260.000',
      minPrice: 260000,
      features: ['Cover Custom Foto/Tulisan', 'Free Design', 'Free Tas Vinyl', 'Free Tas Hitam']
    }
  ]
};

const AlbumDetail = () => {
  const [selectedSize, setSelectedSize] = useState<string>('magnetic-10');
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [customerName, setCustomerName] = useState<string>('');
  const [coverDesign, setCoverDesign] = useState<File | null>(null);
  const [additionalSheets, setAdditionalSheets] = useState<number>(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % albumData.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + albumData.gallery.length) % albumData.gallery.length);
  };

  const handleCoverDesignChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverDesign(e.target.files[0]);
    }
  };

  const selectedAlbum = albumData.sizes.find(size => size.id === selectedSize) || albumData.sizes[0];
  const basePrice = selectedAlbum.minPrice;
  const additionalSheetsCost = additionalSheets * 30000; // Rp 30.000 per tambahan sheet
  const totalPrice = (basePrice + additionalSheetsCost) * quantity;
  const productType = 'album';

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm mb-8">
          <Link to="/" className="text-gray-500 hover:text-primary-600 flex items-center">
            <Home size={16} className="mr-1" />
            Beranda
          </Link>
          <ChevronRight size={16} className="text-gray-400" />
          <Link to="/products" className="text-gray-500 hover:text-primary-600">Produk</Link>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-900">{albumData.name}</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary-50 px-4 py-2 rounded-full mb-4">
            <Album size={16} className="text-primary-600 mr-2" />
            <span className="text-primary-700 text-sm font-medium">Album Premium</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{albumData.name}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {albumData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Preview Image with Navigation */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg relative group">
              <img 
                src={albumData.gallery[currentImageIndex]}
                alt="Preview Album"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Image Navigation Buttons */}
              {albumData.gallery.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={prevImage}
                    className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white hover:text-primary-600 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white hover:text-primary-600 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              )}
              {/* Image Counter */}
              {albumData.gallery.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {albumData.gallery.length}
                </div>
              )}
              {/* Updated Floating Element positioning */}
              <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
                    <Album size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{albumData.name}</p>
                    <p className="text-xs text-gray-500">Kualitas Terbaik</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Options */}
          <div>
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-2xl font-semibold mb-6">Pilih Album Anda</h2>

              {/* Album Type Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Pilih Jenis Album</h3>
                <div className="grid grid-cols-1 gap-4">
                  {albumData.sizes.map((size) => (
                    <button
                      key={size.id}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedSize === size.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                      onClick={() => setSelectedSize(size.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">{size.name}</span>
                        {selectedSize === size.id && (
                          <Check size={16} className="text-primary-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{size.dimensions}</p>
                      <p className="text-sm font-medium text-primary-600">
                        {size.priceRange || size.price}
                      </p>
                      <ul className="text-xs text-gray-600 list-disc pl-5 mt-2">
                        {size.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Sheets */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Tambahan Sheet (+Rp 30.000/sheet)</h3>
                <div className="flex items-center">
                  <button
                    className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50"
                    onClick={() => setAdditionalSheets(Math.max(0, additionalSheets - 1))}
                  >
                    -
                  </button>
                  <div className="mx-4 text-lg font-medium">{additionalSheets} sheet</div>
                  <button
                    className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50"
                    onClick={() => setAdditionalSheets(additionalSheets + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Jumlah</h3>
                <div className="flex items-center">
                  <button
                    className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <div className="mx-4 text-lg font-medium">{quantity}</div>
                  <button
                    className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price & Action */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Total Harga</p>
                    <p className="text-2xl font-semibold text-primary-600">
                      Rp {totalPrice.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {quantity} x {selectedAlbum.name}
                      {additionalSheets > 0 && ` + ${additionalSheets} sheet tambahan`}
                    </p>
                  </div>
                  <Link 
                    to={`/order?type=${productType}&size=${selectedSize}&quantity=${quantity}`}
                    className="btn btn-primary inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Pesan Sekarang
                    <ArrowRight size={20} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {albumData.specs.map((spec, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-card">
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <Album size={24} className="text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{spec.name}</h3>
              <p className="text-gray-600">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;