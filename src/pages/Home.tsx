import { Link } from 'react-router-dom';
import { Star, ArrowRight, Truck, Shield, Award, Clock } from 'lucide-react';

const Home = () => {
  // Featured products for the homepage
  const featuredProducts = [
    {
      id: 1,
      name: 'Kemeja Flanel Premium',
      price: 189000,
      image: '/images/model/modelkemejaflanel.jpeg',
      slug: 'kemeja-flanel-kotak-premium'
    },
    {
      id: 2,
      name: 'Dress Casual Summer',
      price: 249000,
      image: '/images/model/modeldress.jpeg',
      slug: 'dress-casual-summer'
    },
    {
      id: 3,
      name: 'Jaket Bomber Premium',
      price: 359000,
      image: '/images/model/modeljaket1.jpeg',
      slug: 'jaket-bomber-premium'
    },
    {
      id: 4,
      name: 'Cardigan Rajut Wanita',
      price: 219000,
      image: '/images/model/modelcardigan.jpeg',
      slug: 'cardigan-rajut-wanita'
    }
  ];

  // New arrivals
  const newArrivals = [
    {
      id: 1,
      name: 'Kaos Polos Premium',
      price: 129000,
      originalPrice: 89000,
      image: '/images/model/modelkaospolos.jpeg',
      slug: 'kaos-polos-premium-cotton',
      rating: 5
    },
    {
      id: 2,
      name: 'Rok Mini Plisket',
      price: 169000,
      image: '/images/model/modelrok.jpeg',
      slug: 'rok-mini-plisket',
      rating: 4
    },
    {
      id: 3,
      name: 'Sweater Crewneck',
      price: 199000,
      image: '/images/model/modelsweter.jpeg',
      slug: 'sweater-crewneck-basic',
      rating: 5
    }
  ];

  // Categories
  const categories = [
    { name: 'Wanita', image: '/images/model/modelwanita.jpeg', slug: 'wanita' },
    { name: 'Pria', image: '/images/model/modelpria.jpeg', slug: 'pria' },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-cream-50">
      {/* Hero Section - Luxury Style */}
      <section className="relative">
        <div className="grid lg:grid-cols-2">
          {/* Left - Hero Image */}
          <div className="relative h-[500px] lg:h-[700px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=800&fit=crop"
              alt="Fashion Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-transparent" />
          </div>

          {/* Right - Content */}
          <div className="flex items-center justify-center bg-cream-100 p-8 lg:p-16">
            <div className="max-w-lg">
              <span className="text-accent tracking-[0.3em] uppercase text-sm font-medium">Koleksi Terbaru 2026</span>
              <h1 className="font-montserrat text-5xl lg:text-7xl font-medium text-primary-800 mt-4 mb-6 leading-tight">
                Discover Your
                <br />
                <span className="italic">Signature Style</span>
              </h1>
              <p className="text-taupe-600 text-lg mb-8 leading-relaxed font-lato">
                Temukan koleksi fashion premium yang menghadirkan keanggunan dan kenyamanan. 
                Setiap detail dibuat untuk menyempurnakan penampilanmu.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center bg-primary-700 text-white px-8 py-4 tracking-[0.2em] uppercase text-sm hover:bg-primary-800 transition-all duration-300 group"
              >
                Jelajahi Koleksi
                <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-primary-700 text-cream-100 py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Truck className="h-5 w-5" />
              <span className="text-sm tracking-wide">Gratis Ongkir</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm tracking-wide">100% Original</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Award className="h-5 w-5" />
              <span className="text-sm tracking-wide">Premium Quality</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm tracking-wide">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights - Luxury Rating Section */}
      <section className="py-16 bg-cream-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Perfect Fitting Clothes', desc: 'Setiap produk dirancang dengan presisi untuk kenyamanan maksimal', rating: 5 },
              { title: 'Great Body Wearing Style', desc: 'Koleksi yang menonjolkan keanggunan dan style unik Anda', rating: 5 },
              { title: 'Exquisite Craftsmanship', desc: 'Material premium dan jahitan berkualitas tinggi', rating: 5 }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  {[...Array(feature.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <h3 className="font-montserrat text-2xl text-primary-800 mb-3">{feature.title}</h3>
                <p className="text-taupe-600 font-lato text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-20 bg-gradient-to-br from-cream-50 via-cream-100 to-cream-50 relative">
        <div className="absolute inset-0 border-t border-b border-accent/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 pb-8 border-b-2 border-accent/30 max-w-2xl mx-auto">
            <span className="text-accent tracking-[0.3em] uppercase text-sm font-medium">Pilihan Terbaik</span>
            <h2 className="text-4xl md:text-5xl text-primary-800 mt-2 pb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontStyle: 'italic' }}>
              Featured Collection
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/clothing/${product.slug}`}
                className="group"
              >
                <div className="bg-white overflow-hidden border border-primary-100 hover:border-primary-300 transition-all duration-500">
                  <div className="aspect-[3/4] overflow-hidden bg-cream-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-montserrat text-lg text-primary-800 group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-taupe-600 font-lato text-sm mt-1">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center border border-primary-700 text-primary-700 px-8 py-3 tracking-[0.2em] uppercase text-sm hover:bg-primary-700 hover:text-white transition-all duration-300 group"
            >
              Lihat Semua Koleksi
              <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-cream-100 via-cream-200 to-cream-100 relative">
        <div className="absolute inset-0 border-t border-b border-accent/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 pb-8 border-b-2 border-accent/30 max-w-2xl mx-auto">
            <span className="text-accent tracking-[0.3em] uppercase text-sm font-medium">Kategori</span>
            <h2 className="font-montserrat text-4xl md:text-5xl text-primary-800 mt-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontStyle: 'italic' }}>
              Shop By Category
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/kategori/${category.slug}`}
                className="group relative overflow-hidden"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                  <h3 className="font-montserrat text-3xl text-white mb-2">{category.name}</h3>
                  <span className="inline-flex items-center text-cream-100 text-sm tracking-wider uppercase group-hover:text-accent transition-colors">
                    Lihat Koleksi
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals - Product Grid with Ratings */}
      <section className="py-20 bg-gradient-to-br from-cream-50 via-cream-100 to-cream-50 relative">
        <div className="absolute inset-0 border-t border-b border-accent/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 pb-8 border-b-2 border-accent/30 max-w-2xl mx-auto">
            <span className="text-accent tracking-[0.3em] uppercase text-sm font-medium">Terbaru</span>
            <h2 className="font-montserrat text-4xl md:text-5xl text-primary-800 mt-2 pb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontStyle: 'italic' }}>
              New Arrivals
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {newArrivals.map((product) => (
              <Link
                key={product.id}
                to={`/products/clothing/${product.slug}`}
                className="group"
              >
                <div className="bg-white overflow-hidden border border-primary-100 hover:shadow-xl transition-all duration-500">
                  <div className="aspect-[3/4] overflow-hidden bg-cream-100 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {product.originalPrice && (
                      <span className="absolute top-4 left-4 bg-accent text-white px-3 py-1 text-xs tracking-wider uppercase">
                        Sale
                      </span>
                    )}
                  </div>
                  <div className="p-6 text-center">
                    {/* Rating */}
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < product.rating ? 'fill-accent text-accent' : 'text-taupe-300'}`}
                        />
                      ))}
                    </div>
                    <h3 className="font-montserrat text-xl text-primary-800 group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <div className="mt-2">
                      <span className="text-taupe-600 font-lato">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-taupe-400 line-through ml-2 text-sm">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-20 bg-primary-700">
        <div className="container mx-auto px-4 text-center">
          <span className="text-accent tracking-[0.3em] uppercase text-sm">Special Offer</span>
          <h2 className="font-montserrat text-4xl md:text-6xl text-white mt-4 mb-6">
            Dapatkan Diskon 25%
          </h2>
          <p className="text-cream-200 font-lato text-lg mb-8 max-w-2xl mx-auto">
            Daftar sekarang dan nikmati penawaran eksklusif untuk member baru. 
            Gratis ongkir untuk pembelian pertama Anda.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center bg-white text-primary-800 px-10 py-4 tracking-[0.2em] uppercase text-sm hover:bg-cream-100 transition-all duration-300 group"
          >
            Daftar Sekarang
            <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Lookbook / Inspiration Section */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-accent tracking-[0.3em] uppercase text-sm">Lookbook 2026</span>
              <h2 className="font-montserrat text-4xl md:text-5xl text-primary-800 mt-2 mb-6">
                Sustainable Fashion
                <br />
                <span className="italic">for Tomorrow</span>
              </h2>
              <p className="text-taupe-600 font-lato text-lg mb-8 leading-relaxed">
                Temukan koleksi fashion berkelanjutan kami yang tidak hanya membuat Anda tampil elegan, 
                tetapi juga ramah lingkungan. Setiap pembelian adalah langkah menuju masa depan yang lebih baik.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center bg-primary-700 text-white px-8 py-4 tracking-[0.2em] uppercase text-sm hover:bg-primary-800 transition-all duration-300 group"
              >
                Explore Collection
                <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop"
                  alt="Sustainable Fashion"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute -bottom-4 -left-4 bg-accent text-white px-6 py-3 tracking-wider uppercase text-sm">
                  Latest Drop
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-cream-100 border-t border-primary-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center border border-primary-300 mb-4">
                <Shield className="h-8 w-8 text-primary-700" />
              </div>
              <h3 className="font-montserrat text-xl text-primary-800 mb-2">Produk Original</h3>
              <p className="text-taupe-600 font-lato text-sm">100% Garansi Keaslian</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center border border-primary-300 mb-4">
                <Truck className="h-8 w-8 text-primary-700" />
              </div>
              <h3 className="font-montserrat text-xl text-primary-800 mb-2">Gratis Pengembalian</h3>
              <p className="text-taupe-600 font-lato text-sm">30 Hari Tanpa Pertanyaan</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center border border-primary-300 mb-4">
                <Award className="h-8 w-8 text-primary-700" />
              </div>
              <h3 className="font-montserrat text-xl text-primary-800 mb-2">Alba VIP</h3>
              <p className="text-taupe-600 font-lato text-sm">Member Eksklusif</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
