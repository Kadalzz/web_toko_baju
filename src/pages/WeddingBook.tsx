import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Album, ArrowRight, Check, ChevronLeft, ChevronRight, Image as ImageIcon, Home } from 'lucide-react';

interface WeddingBookSize {
  id: string;
  name: string;
  dimensions: string;
  price: number;
  type: 'sambung' | 'pisah';
}

interface SuitcaseOption {
  id: string;
  name: string;
  dimensions?: string;
  material?: string;
  price: number;
}

interface WeddingBookData {
  name: string;
  description: string;
  price: string;
  image: string;
  gallery: string[];
  specs: {
    name: string;
    value: string;
  }[];
  sizes: WeddingBookSize[];
  suitcases: SuitcaseOption[];
}

const weddingBookData: WeddingBookData = {
  name: 'Wedding Book',
  description: 'Album pernikahan eksklusif dengan desain elegan dan kualitas premium. Sempurna untuk mengabadikan momen spesial pernikahan Anda.',
  price: 'Rp 500.000 - Rp 2.000.000',
  image: 'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/DSC00689.webp',
  gallery: [
    'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/DSC00689.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/DSC00709.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/DSC00857.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/DSC00898 (1).webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/DSC00901 (1).webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/Untitled-2_0001_k.JPG.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/Untitled-2_0002_l.JPG.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/wedding book/Untitled-2_0003_m.JPG.webp'
  ],
  specs: [
    { name: 'Material', value: 'Premium Leather, Silk' },
    { name: 'Ukuran', value: '30x30 cm, 35x35 cm' },
    { name: 'Jumlah Halaman', value: '50, 80, 100 halaman' },
    { name: 'Finishing', value: 'Gold Foil, Emboss' }
  ],
  sizes: [
    {
      id: '6r',
      name: '6R',
      dimensions: '15.2 x 20.3 cm',
      price: 90000,
      type: 'sambung'
    },
    {
      id: '10r-vertical',
      name: '10R Vertical',
      dimensions: '25.4 x 30.5 cm',
      price: 120000,
      type: 'sambung'
    },
    {
      id: '10r-horizontal',
      name: '10R Horizontal',
      dimensions: '30.5 x 25.4 cm',
      price: 170000,
      type: 'sambung'
    },
    {
      id: '20x30-custom-sambung',
      name: '20x30 Cover Custom',
      dimensions: '20 x 30 cm',
      price: 320000,
      type: 'sambung'
    },
    {
      id: '20x30-vinyl-sambung',
      name: '20x30 Cover Vinyl/Bludru',
      dimensions: '20 x 30 cm',
      price: 330000,
      type: 'sambung'
    },
    {
      id: '30x30-custom-sambung',
      name: '30x30 Cover Custom',
      dimensions: '30 x 30 cm',
      price: 350000,
      type: 'sambung'
    },
    {
      id: '30x30-vinyl-sambung',
      name: '30x30 Cover Vinyl/Bludru',
      dimensions: '30 x 30 cm',
      price: 360000,
      type: 'sambung'
    },
    {
      id: '20x30-custom-pisah',
      name: '20x30 Cover Custom',
      dimensions: '20 x 30 cm',
      price: 270000,
      type: 'pisah'
    },
    {
      id: '20x30-vinyl-pisah',
      name: '20x30 Cover Vinyl/Bludru',
      dimensions: '20 x 30 cm',
      price: 280000,
      type: 'pisah'
    }
  ],
  suitcases: [
    {
      id: 'wooden-box',
      name: 'Kotak Kayu',
      dimensions: '20 x 30 cm',
      price: 150000
    },
    {
      id: 'wooden-box-acrylic',
      name: 'Kotak Kayu Tutup Acrylic',
      dimensions: '20 x 30 cm',
      price: 180000
    },
    {
      id: 'vinyl-suitcase',
      name: 'Koper Jahit Coklat Tua',
      material: 'Vinyl',
      price: 100000
    },
    {
      id: 'wallpaper-suitcase',
      name: 'Koper Bunga',
      material: 'Wallpaper',
      price: 140000
    }
  ]
};

const WeddingBook = () => {
  const [selectedType, setSelectedType] = useState<'sambung' | 'pisah'>('sambung');
  const [selectedSize, setSelectedSize] = useState<string>('6r');
  const [selectedSuitcase, setSelectedSuitcase] = useState<string>('');
  const [additionalSheets, setAdditionalSheets] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [customerName, setCustomerName] = useState<string>('');

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % weddingBookData.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + weddingBookData.gallery.length) % weddingBookData.gallery.length);
  };

  const calculateTotalPrice = () => {
    const size = weddingBookData.sizes.find(s => s.id === selectedSize);
    if (!size) return 0;

    let totalPrice = size.price;

    if (additionalSheets > 0) {
      const sheetPrice = size.dimensions.includes('30x30') ? 35000 : 30000;
      totalPrice += additionalSheets * sheetPrice;
    }

    if (selectedSuitcase) {
      const suitcase = weddingBookData.suitcases.find(s => s.id === selectedSuitcase);
      if (suitcase) {
        totalPrice += suitcase.price;
      }
    }

    return totalPrice * quantity;
  };

  const totalPrice = calculateTotalPrice();

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
          <span className="text-gray-900">{weddingBookData.name}</span>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary-50 px-4 py-2 rounded-full mb-4">
            <Album size={16} className="text-primary-600 mr-2" />
            <span className="text-primary-700 text-sm font-medium">Album Pernikahan Premium</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{weddingBookData.name}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {weddingBookData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg relative group">
              <img 
                src={weddingBookData.gallery[currentImageIndex]}
                alt="Preview Wedding Book"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {weddingBookData.gallery.length > 1 && (
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
              {weddingBookData.gallery.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {weddingBookData.gallery.length}
                </div>
              )}
              <div className="absolute bottom-6 right-6 bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
                    <Album size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{weddingBookData.name}</p>
                    <p className="text-xs text-gray-500">Kualitas Premium</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-2xl font-semibold mb-6">Konfigurasi Wedding Book</h2>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Pilih Jenis Album</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedType === 'sambung'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                    onClick={() => setSelectedType('sambung')}
                  >
                    <div className="text-left">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Sambung</span>
                        {selectedType === 'sambung' && (
                          <Check size={16} className="text-primary-600" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600">
                        Album dengan halaman yang tersambung secara premium
                      </p>
                    </div>
                  </button>
                  <button
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedType === 'pisah'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                    onClick={() => setSelectedType('pisah')}
                  >
                    <div className="text-left">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Pisah</span>
                        {selectedType === 'pisah' && (
                          <Check size={16} className="text-primary-600" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600">
                        Album dengan halaman yang dapat dipisahkan
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Pilih Ukuran</h3>
                <div className="grid grid-cols-1 gap-4">
                  {weddingBookData.sizes
                    .filter(size => size.type === selectedType)
                    .map(size => (
                      <button
                        key={size.id}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedSize === size.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-200'
                        }`}
                        onClick={() => setSelectedSize(size.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-left">
                            <span className="font-medium">{size.name}</span>
                            <p className="text-sm text-gray-600">{size.dimensions}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-primary-600 font-medium">
                              Rp {size.price.toLocaleString()}
                            </p>
                            {selectedSize === size.id && (
                              <Check size={16} className="text-primary-600 ml-auto mt-1" />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Tambahan Sheet</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Album includes 11 sheets (22 pages). Add up to 5 additional sheets.
                </p>
                <div className="flex items-center space-x-4">
                  <button
                    className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50"
                    onClick={() => setAdditionalSheets(Math.max(0, additionalSheets - 1))}
                  >
                    -
                  </button>
                  <div className="mx-4 text-lg font-medium">{additionalSheets} sheet(s)</div>
                  <button
                    className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50"
                    onClick={() => setAdditionalSheets(Math.min(5, additionalSheets + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Pilih Suitcase (Opsional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weddingBookData.suitcases.map(suitcase => (
                    <button
                      key={suitcase.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedSuitcase === suitcase.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                      onClick={() => setSelectedSuitcase(suitcase.id === selectedSuitcase ? '' : suitcase.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-left">
                          <span className="font-medium">{suitcase.name}</span>
                          {suitcase.dimensions && (
                            <p className="text-sm text-gray-600">{suitcase.dimensions}</p>
                          )}
                          {suitcase.material && (
                            <p className="text-sm text-gray-600">Bahan: {suitcase.material}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-primary-600 font-medium">
                            Rp {suitcase.price.toLocaleString()}
                          </p>
                          {selectedSuitcase === suitcase.id && (
                            <Check size={16} className="text-primary-600 ml-auto mt-1" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Pasangan
                </label>
                <input
                  id="customerName"
                  type="text"
                  placeholder="Masukkan nama pasangan"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

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

              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Total Harga</p>
                    <p className="text-2xl font-semibold text-primary-600">
                      Rp {totalPrice.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {quantity} x {weddingBookData.sizes.find(s => s.id === selectedSize)?.name}
                      {additionalSheets > 0 && ` + ${additionalSheets} sheet tambahan`}
                      {selectedSuitcase && ` + ${weddingBookData.suitcases.find(s => s.id === selectedSuitcase)?.name}`}
                    </p>
                  </div>
                  <Link 
                    to={`/order?product=wedding-book&type=${selectedType}&size=${selectedSize}&sheets=${additionalSheets}&suitcase=${selectedSuitcase}&quantity=${quantity}&name=${encodeURIComponent(customerName)}&price=${totalPrice}`}
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {weddingBookData.specs.map((spec, index) => (
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

export default WeddingBook;