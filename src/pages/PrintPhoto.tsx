import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, ArrowRight, Check, ChevronLeft, ChevronRight, Printer, Info, Home } from 'lucide-react';

interface PhotoSize {
  id: string;
  name: string;
  dimensions: string;
  price: number;
  notes?: string;
}

interface PhotoPrintData {
  name: string;
  description: string;
  price: string;
  image: string;
  gallery: string[];
  specs: {
    name: string;
    value: string;
  }[];
  sizes: PhotoSize[];
}

const photoPrintData: PhotoPrintData = {
  name: 'Cetak Foto',
  description: 'Cetak foto berkualitas tinggi dengan berbagai ukuran dan jenis kertas. Hasil cetakan tajam dengan warna yang akurat.',
  price: 'Mulai Rp 1.500',
  image: 'https://raw.githubusercontent.com/anjengk/photo/main/cetak foto/DSC08021.webp',
  gallery: [
    'https://raw.githubusercontent.com/anjengk/photo/main/cetak foto/DSC08021.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/cetak foto/DSC08314.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/cetak foto/DSC08315.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/cetak foto/Edit 19.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/cetak foto/Untitled-2_0012_15.JPG.webp',
    'https://raw.githubusercontent.com/anjengk/photo/main/cetak foto/DSC08022.webp'
  ],
  specs: [
    { name: 'Ukuran', value: '2R hingga 24R' },
    { name: 'Jenis Kertas', value: 'Glossy, Doff, Pearl' },
    { name: 'Kualitas', value: 'HD Premium' },
    { name: 'Waktu Proses', value: '1-2 hari kerja' }
  ],
  sizes: [
    {
      id: '2r',
      name: '2R',
      dimensions: '6 x 9 cm',
      price: 3000,
      notes: '1 sheet bisa isi 2 foto'
    },
    {
      id: '3r',
      name: '3R',
      dimensions: '8.9 x 12.7 cm',
      price: 1500
    },
    {
      id: '4r',
      name: '4R',
      dimensions: '10.2 x 15.2 cm',
      price: 1800
    },
    {
      id: '5r',
      name: '5R',
      dimensions: '12.7 x 17.8 cm',
      price: 3500
    },
    {
      id: '6r',
      name: '6R',
      dimensions: '15.2 x 20.3 cm',
      price: 4000
    },
    {
      id: '8r',
      name: '8R',
      dimensions: '20.3 x 25.4 cm',
      price: 8000
    },
    {
      id: '8rw',
      name: '8RW',
      dimensions: '20.3 x 30.5 cm',
      price: 10000
    },
    {
      id: '12r',
      name: '12R',
      dimensions: '30.5 x 40.5 cm',
      price: 22000
    },
    {
      id: '12rw',
      name: '12RW',
      dimensions: '30.5 x 45 cm',
      price: 24000
    },
    {
      id: '16r',
      name: '16R',
      dimensions: '40 x 50 cm',
      price: 60000
    },
    {
      id: '16rw',
      name: '16RW',
      dimensions: '40 x 60 cm',
      price: 68000
    },
    {
      id: '20r',
      name: '20R',
      dimensions: '50 x 60 cm',
      price: 84000
    },
    {
      id: '20rw',
      name: '20RW',
      dimensions: '50 x 75 cm',
      price: 105000
    },
    {
      id: '24r',
      name: '24R',
      dimensions: '60 x 90 cm',
      price: 151000
    }
  ]
};

const PhotoPrint = () => {
  const [selectedSize, setSelectedSize] = useState<string>('4r');
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [customerName, setCustomerName] = useState<string>('');
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const productType = 'photo';

  const selectedPhotoSize = photoPrintData.sizes.find(size => size.id === selectedSize) || photoPrintData.sizes[0];
  const totalPrice = (selectedPhotoSize.price * quantity);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % photoPrintData.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + photoPrintData.gallery.length) % photoPrintData.gallery.length);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setPhotoFiles(files);
    }
  };

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
          <span className="text-gray-900">{photoPrintData.name}</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary-50 px-4 py-2 rounded-full mb-4">
            <Printer size={16} className="text-primary-600 mr-2" />
            <span className="text-primary-700 text-sm font-medium">Cetak Foto Premium</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{photoPrintData.name}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {photoPrintData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Preview Image with Navigation */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg relative group">
              <img 
                src={photoPrintData.gallery[currentImageIndex]}
                alt="Preview Cetak Foto"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Image Navigation Buttons */}
              {photoPrintData.gallery.length > 1 && (
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
              {photoPrintData.gallery.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {photoPrintData.gallery.length}
                </div>
              )}
              {/* Updated Floating Element positioning */}
              <div className="absolute bottom-6 right-6 bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
                    <Printer size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{photoPrintData.name}</p>
                    <p className="text-xs text-gray-500">Kualitas HD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Options */}
          <div>
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-2xl font-semibold mb-6">Pilih Cetakan Foto Anda</h2>

              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Pilih Ukuran Foto</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photoPrintData.sizes.map((size) => (
                    <button
                      key={size.id}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedSize === size.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                      onClick={() => setSelectedSize(size.id)}
                    >
                      <div className="text-left">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{size.name}</span>
                          {selectedSize === size.id && (
                            <Check size={16} className="text-primary-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{size.dimensions}</p>
                        <p className="text-sm font-medium text-primary-600">
                          Rp {size.price.toLocaleString()}
                        </p>
                        {size.notes && (
                          <p className="text-xs text-gray-500 mt-1">{size.notes}</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4 flex items-center">
                  <Info size={16} className="inline-block mr-1" />
                  Cetak 4R pakai album magnetic jumbo/custom dihitung @1.500
                </p>
              </div>

              {/* Quantity Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Jumlah Cetakan</h3>
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
                      {quantity} x {selectedPhotoSize.name} ({selectedPhotoSize.dimensions})
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
          {photoPrintData.specs.map((spec, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-card">
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <Printer size={24} className="text-primary-600" />
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

export default PhotoPrint;