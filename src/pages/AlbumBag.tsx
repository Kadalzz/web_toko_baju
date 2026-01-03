import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Check, Image, ChevronLeft, ChevronRight, Home } from 'lucide-react';

interface AlbumBagSize {
  id: string;
  name: string;
  dimensions: string;
  material: string;
  color: string;
  price: number;
  description: string;
}

const AlbumBag = () => {
  const [selectedSize, setSelectedSize] = useState<string>('vinyl-20x30');
  const [customName, setCustomName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const bagSizes: AlbumBagSize[] = [
    {
      id: 'vinyl-20x30',
      name: 'Vinyl',
      dimensions: '20 x 30 cm',
      material: 'Vinyl',
      color: 'Coklat',
      price: 40000,
      description: 'Tas album vinyl berkualitas dengan warna coklat elegan'
    },
    {
      id: 'vinyl-wood-20x30',
      name: 'Vinyl Kayu',
      dimensions: '20 x 30 cm',
      material: 'Vinyl Kayu',
      color: 'Coklat',
      price: 70000,
      description: 'Tas album vinyl kayu premium dengan tampilan natural'
    },
    {
      id: 'vinyl-30x30',
      name: 'Vinyl',
      dimensions: '30 x 30 cm',
      material: 'Vinyl',
      color: 'Coklat',
      price: 50000,
      description: 'Tas album vinyl ukuran besar dengan kualitas terbaik'
    },
    {
      id: 'vinyl-wood-30x30',
      name: 'Vinyl Kayu',
      dimensions: '30 x 30 cm',
      material: 'Vinyl Kayu',
      color: 'Coklat',
      price: 100000,
      description: 'Tas album vinyl kayu premium ukuran besar'
    }
  ];

  const images = [
    'https://raw.githubusercontent.com/anjengk/photo/main/tas album/Untitled-2_0007_e.JPG.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/tas album/Untitled-2_0008_d.JPG.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/tas album/Untitled-2_0009_c.JPG.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/tas album/Untitled-2_0006_i.JPG.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/tas album/Untitled-2_0005_h.JPG.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/tas album/Untitled-2_0000_f.JPG.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/tas album/Untitled-2_0004_g.JPG.webp'
  ];

  const selectedOption = bagSizes.find(option => option.id === selectedSize);
  const customNamePrice = customName.trim() ? 10000 : 0;
  const totalPrice = (selectedOption ? selectedOption.price + customNamePrice : 0) * quantity;
  const productType = 'album-bag';

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="py-12">
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm mb-8">
          <Link to="/" className="text-gray-500 hover:text-primary-600 flex items-center">
            <Home size={16} className="mr-1" />
            Beranda
          </Link>
          <ChevronRight size={16} className="text-gray-400" />
          <Link to="/products" className="text-gray-500 hover:text-primary-600">Produk</Link>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-900">Tas Album</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary-50 px-4 py-2 rounded-full mb-4">
            <ShoppingBag size={16} className="text-primary-600 mr-2" />
            <span className="text-primary-700 text-sm font-medium">Tas Album Premium</span>
          </div>
          <h1 className="heading-2 mb-4">Tas Album Berkualitas</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lindungi album foto berharga Anda dengan tas album premium yang tahan lama dan stylish. 
            Tersedia dalam bahan vinyl dan vinyl kayu dengan warna coklat elegan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Preview Image with Navigation */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg relative group">
              <img 
                src={images[currentImageIndex]}
                alt="Preview Tas Album"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Image Navigation Buttons */}
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

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Updated Floating Element positioning */}
              <div className="absolute bottom-6 right-6 bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tas Album Premium</p>
                    <p className="text-xs text-gray-500">Kualitas Terbaik</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Options */}
          <div>
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-2xl font-semibold mb-6">Pilih Tas Album Anda</h2>

              {/* Product Info */}
              <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Spesifikasi Produk:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Bahan: Vinyl dan Vinyl Kayu premium</li>
                  <li>• Warna: Coklat elegan</li>
                  <li>• Jahitan: Kualitas terbaik</li>
                  <li>• Tersedia ukuran: 20x30 cm dan 30x30 cm</li>
                </ul>
              </div>
              
              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Pilih Jenis Tas</h3>
                <div className="grid grid-cols-2 gap-4">
                  {bagSizes.map((option) => (
                    <button
                      key={option.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedSize === option.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                      onClick={() => setSelectedSize(option.id)}
                    >
                      <div className="text-center">
                        <div className="font-medium mb-2">{option.name}</div>
                        <div className="text-sm text-gray-600">{option.dimensions}</div>
                        {selectedSize === option.id && (
                          <Check size={16} className="mx-auto mt-2 text-primary-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Name */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Custom Nama (+Rp 10.000)</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Masukkan nama untuk dicetak"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-sm text-gray-500">
                    Nama akan dicetak pada tas album
                  </p>
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
                    <div className="text-xs text-gray-500 mt-1">
                      <p>{quantity} x {selectedOption?.name} {selectedOption?.dimensions}</p>
                      {customName && <p>Custom nama: +Rp 10.000</p>}
                    </div>
                  </div>
                  <Link 
                    to={`/order?type=${productType}&size=${selectedSize}&quantity=${quantity}`}
                    className="btn btn-primary inline-flex items-center"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag size={24} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Material Berkualitas</h3>
            <p className="text-gray-600">
              Dibuat dengan bahan vinyl premium untuk melindungi album foto Anda.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <Check size={24} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tahan Lama</h3>
            <p className="text-gray-600">
              Dirancang untuk penggunaan jangka panjang dengan jahitan yang kuat.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <Image size={24} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Desain Stylish</h3>
            <p className="text-gray-600">
              Tampilan modern dan elegan yang sesuai dengan berbagai gaya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AlbumBag;