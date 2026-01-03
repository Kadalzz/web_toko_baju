import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Frame, ArrowRight, Check, Image, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { FiguraSize } from '../types';

const Figura = () => {
  const [selectedSize, setSelectedSize] = useState<string>('8r');
  const [selectedFrame, setSelectedFrame] = useState<string>('classic-black');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const productType = 'figura';

  const figuraSizes: FiguraSize[] = [
    {
      id: '4r',
      name: '4R',
      dimensions: '10.2 x 15.2 cm',
      priceRange: 'Rp 11.000 - Rp 32.500',
      minPrice: 11000,
      maxPrice: 32500,
      images: [
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/4R/4R1.webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/4R/4R2.webp'
      ]
    },
    {
      id: '5r',
      name: '5R',
      dimensions: '12.7 x 17.8 cm',
      priceRange: 'Rp 14.000 - Rp 25.000',
      minPrice: 14000,
      maxPrice: 25000,
      images: [
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/5R/5R%20(1).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/5R/5R%20(2).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/PIGURA%20KAYU%203D%205R%2C%2010R%20%26%2010RW/3D%205R.webp'
      ]
    },
    {
      id: '6r',
      name: '6R',
      dimensions: '15.2 x 20.3 cm',
      priceRange: 'Rp 20.000',
      minPrice: 20000,
      images: [
        'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg',
        'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'
      ]
    },
    {
      id: '10r',
      name: '10R',
      dimensions: '20.3 x 25.4 cm',
      priceRange: 'Rp 20.000 - Rp 30.000',
      minPrice: 23000,
      maxPrice: 70000,
      withFrame: true,
      images: [
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/PIGURA%20KAYU%20MAHAR%20%20UKURAN%2010R%20%26%2010RW/MAHAR%2010R.webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/PIGURA%20KAYU%203D%205R%2C%2010R%20%26%2010RW/3D%2010RW.webp'
      ]
    },
    {
      id: '10rw',
      name: '10RW',
      dimensions: '20.3 x 30.5 cm',
      priceRange: 'Rp 23.000 - Rp 70.000',
      minPrice: 23000,
      maxPrice: 70000,
      withFrame: true,
      images: [
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/PIGURA%20KAYU%203D%205R%2C%2010R%20%26%2010RW/3D%2010RW.webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/PIGURA%20KAYU%20MAHAR%20%20UKURAN%2010R%20%26%2010RW/MAHAR%2010RW.webp'
      ]
    },
    {
      id: '12r',
      name: '12R',
      dimensions: '30.5 x 40.5 cm',
      priceRange: 'Rp 47.500 - Rp 140.000',
      minPrice: 47500,
      maxPrice: 140000,
      withFrame: true,
      images: [
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/LPD%20PUTIH%20TERSEDIA%20UKURAN%2012R%2C%2012RW%20%26%2016RW/produk_optimized/LPD%2012R.webp',
        'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'
      ]
    },
    {
      id: '12rw',
      name: '12RW',
      dimensions: '30.5 x 45 cm',
      priceRange: 'Rp 53.000 - Rp 155.000',
      minPrice: 53000,
      maxPrice: 155000,
      withFrame: true,
      images: [
        'https://raw.githubusercontent.com/anjengk/photo/main/12RW/12RW%20(1).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/12RW/12RW%20(2).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/12RW/12RW%20(3).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/12RW/12RW%20(4).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/12RW/12RW%20(5).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/12RW/12RW%20(6).webp'
      ]
    },
    {
      id: '16r',
      name: '16R',
      dimensions: '40 x 50 cm',
      priceRange: 'Rp 130.000 - Rp 185.000',
      minPrice: 130000,
      maxPrice: 185000,
      withFrame: true,
      images: [
        'https://raw.githubusercontent.com/anjengk/photo/main/16R/16R%20(1).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16R/16R%20(2).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16R/16R%20(3).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16R/16R%20(4).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16R/16R%20(5).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16R/16R%20(6).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16R/16R%20(7).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16R/16R%20(8).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16R/16R%20(9).webp'
      ]
    },
    {
      id: '16rw',
      name: '16RW',
      dimensions: '40 x 60 cm',
      priceRange: 'Rp 125.000 - Rp 215.000',
      minPrice: 125000,
      maxPrice: 215000,
      withFrame: true,
      images: [
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(1).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(2).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(3).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(4).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(5).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(6).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(7).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(8).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(9).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(10).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(11).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(12).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(13).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(14).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(15).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(16).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(17).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(18).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(19).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(20).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(21).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(22).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(23).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(24).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(25).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(26).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(27).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(28).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(29).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/16RW/16RW%20(30).webp'
      ]
    },
    {
      id: '20r',
      name: '20R',
      dimensions: '50 x 60 cm',
      priceRange: 'Rp 175.000 - Rp 220.000',
      minPrice: 175000,
      maxPrice: 220000,
      withFrame: true,
      images: [
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(1).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(16).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(2).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(3).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(4).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(5).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(6).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(7).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(8).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(9).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(10).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(11).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(12).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(13).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(14).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(14).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20R/20R%20(15).webp'
      ]
    },
    {
      id: '20rw',
      name: '20RW',
      dimensions: '50 x 75 cm',
      priceRange: 'Rp 205.000 - Rp 255.000',
      minPrice: 205000,
      maxPrice: 255000,
      withFrame: true,
      images: [
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20RW/20RW%20(1).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20RW/20RW%20(10).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20RW/20RW%20(11).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20RW/20RW%20(12).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20RW/20RW%20(2).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20RW/20RW%20(3).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20RW/20RW%20(4).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20RW/20RW%20(5).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20RW/20RW%20(6).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20RW/20RW%20(7).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20RW/20RW%20(8).webp',
        'https://raw.githubusercontent.com/anjengk/photo/refs/heads/main/20RW/20RW%20(9).webp',
      ]
    },
    {
      id: '24r',
      name: '24R',
      dimensions: '60 x 90 cm',
      priceRange: 'Rp 270.000 - Rp 355.000',
      minPrice: 270000,
      maxPrice: 355000,
      withFrame: true,
      images: [
        'https://raw.githubusercontent.com/anjengk/photo/main/24R/24R%20(1).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/24R/24R%20(2).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/24R/24R%20(3).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/24R/24R%20(4).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/24R/24R%20(5).webp',
        'https://raw.githubusercontent.com/anjengk/photo/main/24R/24R%20(6).webp'
      ]
    }
  ];

  const frameStyles = {
    'classic-black': {
      name: 'Classic Black',
      description: 'Bingkai klasik dengan warna hitam elegan',
      price: 0
    },
    'modern-white': {
      name: 'Modern White',
      description: 'Bingkai modern dengan warna putih minimalis',
      price: 50000
    },
    'wooden-brown': {
      name: 'Wooden Brown',
      description: 'Bingkai kayu alami dengan finishing coklat',
      price: 75000
    }
  };

  const selectedOption = figuraSizes.find(option => option.id === selectedSize);
  const totalPrice = selectedOption ? (selectedOption.maxPrice || selectedOption.minPrice) + frameStyles[selectedFrame].price : 0;

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedSize]);

  const nextImage = () => {
    if (selectedOption?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedOption.images!.length);
    }
  };

  const prevImage = () => {
    if (selectedOption?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedOption.images!.length) % selectedOption.images!.length);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
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
          <span className="text-gray-900">Figura Custom</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary-50 px-4 py-2 rounded-full mb-4">
            <Frame size={16} className="text-primary-600 mr-2" />
            <span className="text-primary-700 text-sm font-medium">Figura Premium</span>
          </div>
          <h1 className="heading-2 mb-4">Figura Custom Berkualitas Tinggi</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Abadikan momen berharga Anda dengan figura premium yang dirancang khusus sesuai keinginan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Preview Image with Navigation */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg relative group">
              <img 
                src={selectedOption?.images?.[currentImageIndex] || selectedOption?.images?.[0]}
                alt="Preview Figura"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Image Navigation Buttons */}
              {selectedOption?.images && selectedOption.images.length > 1 && (
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
              {selectedOption?.images && selectedOption.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {selectedOption.images.length}
                </div>
              )}
            </div>

            {selectedOption?.withFrame && (
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
                    <Frame size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tersedia dengan Bingkai</p>
                    <p className="text-xs text-gray-500">Pilihan Bingkai Premium</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Configuration Options */}
          <div>
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-2xl font-semibold mb-6">Kustomisasi Figura Anda</h2>
              
              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Pilih Ukuran</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {figuraSizes.map((option) => (
                    <button
                      key={option.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedSize === option.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                      onClick={() => setSelectedSize(option.id)}
                    >
                      <div className="text-left">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{option.name}</span>
                          {selectedSize === option.id && (
                            <Check size={16} className="text-primary-600" />
                          )}
                        </div>
                        <span className="text-xs text-gray-600 block mb-2">{option.dimensions}</span>
                        <span className="text-sm text-primary-600 font-medium">{option.priceRange}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame Style Selection */}
              {selectedOption?.withFrame && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Pilih Bingkai</h3>
                  <div className="space-y-4">
                    {Object.entries(frameStyles).map(([id, style]) => (
                      <button
                        key={id}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                          selectedFrame === id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-200'
                        }`}
                        onClick={() => setSelectedFrame(id)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-left">
                            <div className="font-medium mb-1">{style.name}</div>
                            <div className="text-sm text-gray-600">{style.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-primary-600 font-medium">
                              {style.price > 0 ? `+Rp ${style.price.toLocaleString()}` : 'Included'}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Jumlah</h3>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="p-2 border border-gray-300 rounded-l-lg hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <div className="px-4 py-2 border-t border-b border-gray-300">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-r-lg hover:bg-gray-100"
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
                      Rp {(totalPrice * quantity).toLocaleString()}
                    </p>
                  </div>
                  <Link 
                    to={`/order?type=${productType}&size=${selectedSize}&frame=${selectedFrame}&quantity=${quantity}`}
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
              <Frame size={24} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Bingkai Premium</h3>
            <p className="text-gray-600">
              Bingkai berkualitas tinggi dengan berbagai pilihan gaya dan warna yang elegan.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <Check size={24} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Kualitas Terjamin</h3>
            <p className="text-gray-600">
              Menggunakan material terbaik dan proses produksi yang teliti untuk hasil maksimal.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <Image size={24} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Hasil Sempurna</h3>
            <p className="text-gray-600">
              Cetak foto dengan resolusi tinggi dan warna yang akurat untuk hasil terbaik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Figura;