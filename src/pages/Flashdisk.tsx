import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Usb, ArrowRight, Check, ChevronLeft, ChevronRight, ArrowLeft, Home } from 'lucide-react';

interface FlashdiskVariant {
  name: string;
  prices: {
    [key: string]: number;
  };
  features: string[];
  hasPrintOptions?: boolean;
}

interface FlashdiskData {
  name: string;
  description: string;
  price: string;
  image: string;
  gallery: string[];
  specs: {
    name: string;
    value: string;
  }[];
  variants: {
    [key: string]: FlashdiskVariant;
  };
}

const flashdiskData = {
  name: 'Flashdisk',
  description: 'Simpan foto digital Anda dalam flashdisk eksklusif dengan desain unik. Tersedia dalam bentuk kartu atau kayu dengan pilihan kapasitas yang beragam.',
  price: 'Mulai Rp 50.000',
  image: 'https://raw.githubusercontent.com/anjengk/photo/main/flashdisk/DSC00890%20(1).webp', 
  gallery: [
    'https://raw.githubusercontent.com/anjengk/photo/main/flashdisk/DSC00890%20(1).webp', 
    'https://raw.githubusercontent.com/anjengk/photo/main/flashdisk/DSC00894%20(1).webp', 
    'https://raw.githubusercontent.com/anjengk/photo/main/flashdisk/DSC00895%20(1).webp' 
  ],
  specs: [
    { name: 'Jenis', value: 'Flashdisk Kartu, Flashdisk Kayu' },
    { name: 'Kapasitas', value: '8GB, 16GB, 32GB' },
    { name: 'Kecepatan', value: 'USB 3.0' },
    { name: 'Bonus', value: 'Box Premium' }
  ],
  variants: {
    'card': {
      name: 'Flashdisk Kartu',
      prices: {
        '8gb': 50000,
        '16gb': 57000,
        '32gb': 64000
      },
      features: ['Dapat dicetak tulisan atau foto', 'Harga sudah termasuk print'],
      hasPrintOptions: false
    },
    'wood': {
      name: 'Flashdisk Kayu',
      prices: {
        '8gb': 52000,
        '16gb': 59000,
        '32gb': 66000
      },
      features: ['Dapat dicetak tulisan atau logo', 'Biaya print +Rp 5.000/sisi'],
      hasPrintOptions: true
    }
  }
};

const Flashdisk = () => {
  const [selectedVariant, setSelectedVariant] = useState<string>('card');
  const [selectedSize, setSelectedSize] = useState<string>('8gb');
  const [printSides, setPrintSides] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [customerName, setCustomerName] = useState<string>('');
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    const sizes = Object.keys(flashdiskData.variants[selectedVariant].prices);
    if (!sizes.includes(selectedSize)) {
      setSelectedSize(sizes[0]);
    }
    setPrintSides(0);
  }, [selectedVariant]);

  const selectedOption = flashdiskData.variants[selectedVariant];
  const basePrice = selectedOption.prices[selectedSize];
  const printCost = selectedOption.hasPrintOptions ? printSides * 5000 : 0;
  const totalPrice = (basePrice + printCost) * quantity;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % flashdiskData.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + flashdiskData.gallery.length) % flashdiskData.gallery.length);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link 
                to="/" 
                className="flex items-center text-gray-500 hover:text-primary-600 transition-colors"
              >
                <Home size={16} className="mr-1" />
                Beranda
              </Link>
            </li>
            <li>
              <ChevronRight size={16} className="text-gray-400" />
            </li>
            <li>
              <Link 
                to="/produk" 
                className="text-gray-500 hover:text-primary-600 transition-colors"
              >
                Produk
              </Link>
            </li>
            <li>
              <ChevronRight size={16} className="text-gray-400" />
            </li>
            <li>
              <span className="text-gray-900 font-medium">Flashdisk</span>
            </li>
          </ol>
        </nav>

      
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary-50 px-4 py-2 rounded-full mb-4">
            <Usb size={16} className="text-primary-600 mr-2" />
            <span className="text-primary-700 text-sm font-medium">Flashdisk Premium</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{flashdiskData.name}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {flashdiskData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Preview Image with Navigation */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg relative group">
              <img 
                src={flashdiskData.gallery[currentImageIndex]}
                alt="Preview Flashdisk"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Image Navigation Buttons */}
              {flashdiskData.gallery.length > 1 && (
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
              {flashdiskData.gallery.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {flashdiskData.gallery.length}
                </div>
              )}
              {/* Floating Element - Inside frame but fully visible */}
              <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
                    <Usb size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{flashdiskData.name}</p>
                    <p className="text-xs text-gray-500">Kualitas Terbaik</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Options */}
          <div>
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-2xl font-semibold mb-6">Pilih Flashdisk Anda</h2>

              {/* Variant Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Pilih Jenis</h3>
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(flashdiskData.variants).map(([id, variant]) => (
                    <button
                      key={id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedVariant === id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                      onClick={() => setSelectedVariant(id)}
                    >
                      <div className="text-left">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{variant.name}</span>
                          {selectedVariant === id && (
                            <Check size={16} className="text-primary-600" />
                          )}
                        </div>
                        <ul className="text-xs text-gray-600 list-disc pl-5 mb-2">
                          {variant.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Pilih Kapasitas</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.keys(flashdiskData.variants[selectedVariant].prices).map((size) => (
                    <button
                      key={size}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedSize === size
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      <div className="text-center">
                        <div className="font-medium mb-1">{size.toUpperCase()}</div>
                        <div className="text-sm text-primary-600">
                          Rp {flashdiskData.variants[selectedVariant].prices[size].toLocaleString()}
                        </div>
                        {selectedSize === size && (
                          <Check size={16} className="text-primary-600 mx-auto mt-1" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>


            
              {/* Print Side Selection (only for wood variant) */}
              {selectedOption.hasPrintOptions && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Pilih Sisi Print (+Rp 5.000/sisi)</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      className={`p-3 rounded-lg border-2 transition-all ${
                        printSides === 0
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                      onClick={() => setPrintSides(0)}
                    >
                      <div className="text-center">
                        <div className="font-medium mb-1">Tanpa Print</div>
                        <div className="text-sm text-gray-600">Rp 0</div>
                        {printSides === 0 && (
                          <Check size={16} className="text-primary-600 mx-auto mt-1" />
                        )}
                      </div>
                    </button>
                    <button
                      className={`p-3 rounded-lg border-2 transition-all ${
                        printSides === 1
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                      onClick={() => setPrintSides(1)}
                    >
                      <div className="text-center">
                        <div className="font-medium mb-1">1 Sisi</div>
                        <div className="text-sm text-primary-600">+Rp 5.000</div>
                        {printSides === 1 && (
                          <Check size={16} className="text-primary-600 mx-auto mt-1" />
                        )}
                      </div>
                    </button>
                    <button
                      className={`p-3 rounded-lg border-2 transition-all ${
                        printSides === 2
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                      onClick={() => setPrintSides(2)}
                    >
                      <div className="text-center">
                        <div className="font-medium mb-1">2 Sisi</div>
                        <div className="text-sm text-primary-600">+Rp 10.000</div>
                        {printSides === 2 && (
                          <Check size={16} className="text-primary-600 mx-auto mt-1" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              )}

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
                      {quantity} x {selectedOption.name} {selectedSize.toUpperCase()}
                      {printSides > 0 && ` + Print ${printSides} sisi`}
                    </p>
                  </div>
                  <Link 
                    to={`/order?type=flashdisk&size=${selectedSize}&quantity=${quantity}`}
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
          {flashdiskData.specs.map((spec, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-card">
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <Usb size={24} className="text-primary-600" />
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

export default Flashdisk;