import { Link } from 'react-router-dom';

const PromoBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-white">
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              🔥 Promo Spesial
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Diskon Hingga 50%
            </h2>
            <p className="text-lg text-white/90 mb-6">
              Nikmati diskon spesial untuk koleksi terbaru kami. 
              Berlaku hingga akhir bulan ini. Jangan sampai kehabisan!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products?sale=true"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Belanja Sekarang
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Lihat Semua
              </Link>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-white/80">Produk Tersedia</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-white/80">Pelanggan Puas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white">
              <div className="text-4xl font-bold mb-2">50%</div>
              <div className="text-white/80">Diskon Maksimal</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-white/80">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
