import { Link } from 'react-router-dom';
import { ShoppingBag, Shield, RotateCcw, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left - Brand */}
            <div className="order-2 md:order-1">
              <div className="bg-black text-white px-6 py-3 inline-block mb-4 font-bold text-2xl">
                ALBA GANTI BAJU
              </div>
            </div>
            
            {/* Right - Hero Content */}
            <div className="order-1 md:order-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop"
                  alt="Fashion Hero"
                  className="rounded-2xl w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-xl">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Fashion Starts Here
                  </h1>
                  <p className="text-gray-600 mb-4">
                    Percaya style dimulai dari sini, ayo & waktunya atur wardrobe buat tampil percaya diri
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Wanita - Pria - Anak & Lihat Alle Artikel
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center text-gray-900 font-medium hover:text-primary-600 group"
                  >
                    Lihat Pilihan
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Collection Banner */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Koleksi Baru, Buat Gaya Lebih Fresh!
              </h2>
            </div>
            <Link
              to="/products"
              className="mt-4 md:mt-0 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Mencari Tahu Lebih Banyak
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Pilih Kategori Sesuai Kebutuhanmu
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Wanita', image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400', color: 'bg-red-50' },
              { name: 'Pria', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400', color: 'bg-orange-50' },
              { name: 'Anak', image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=400', color: 'bg-yellow-50' },
              { name: 'Sport', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400', color: 'bg-green-50' },
              { name: 'Luxury', image: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=400', color: 'bg-purple-50' },
            ].map((category) => (
              <Link
                key={category.name}
                to={`/kategori/${category.name.toLowerCase()}`}
                className="group"
              >
                <div className={`${category.color} rounded-xl overflow-hidden aspect-[3/4] relative`}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-bold text-lg flex items-center">
                      {category.name}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Voucher Banner */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Daftar & Dapatkan Extra Voucher
            </h2>
            <p className="text-lg mb-6">
              Voucher 25% + Cashback 5% + Gratis Ongkir*
            </p>
            <Link
              to="/login"
              className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Daftar Sini
            </Link>
          </div>
        </div>
      </section>

      {/* Sustainable Fashion Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 bg-orange-400 text-white px-4 py-2 rounded-lg font-bold">
                LATEST DROP
              </div>
              <img
                src="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=800&h=600&fit=crop"
                alt="Sustainable Fashion"
                className="rounded-2xl w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Tampil Stylish untuk Masa Depan Berkelanjutan
              </h2>
              <p className="text-gray-600 mb-6">
                Temukan koleksi fashion berkelanjutan yang tidak hanya membuat kamu tampil percaya diri, tetapi juga ramah lingkungan. Pilihan style yang bertanggung jawab untuk masa depan yang lebih baik.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Belanja Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Top Brand Alba Ganti Baju
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              'https://images.unsplash.com/photo-1622519407650-3df9883f76f3?w=400',
              'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400',
              'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400',
              'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400',
              'https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=400',
              'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400',
            ].map((image, index) => (
              <Link
                key={index}
                to="/products"
                className="aspect-square bg-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={image}
                  alt={`Brand ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Footer */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-gray-900 mb-4" />
              <h3 className="font-bold text-lg mb-2">PRODUK ORIGINAL</h3>
              <p className="text-gray-600 text-sm">100% GARANSI ASLI</p>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="h-12 w-12 text-gray-900 mb-4" />
              <h3 className="font-bold text-lg mb-2">30 HARI GRATIS</h3>
              <p className="text-gray-600 text-sm">PENGEMBALIAN</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="h-12 w-12 text-gray-900 mb-4" />
              <h3 className="font-bold text-lg mb-2">ALBA VIP</h3>
              <p className="text-gray-600 text-sm">MEMBER EKSKLUSIF</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
