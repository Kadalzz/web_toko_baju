import { Heart, Award, Users, Star, MapPin, Phone, Mail, Clock, Package, Truck, Shield } from 'lucide-react';

const About = () => {
  const stats = [
    {
      icon: <Package className="w-8 h-8 text-accent" />,
      value: "10.000+",
      label: "Produk Terjual"
    },
    {
      icon: <Award className="w-8 h-8 text-accent" />,
      value: "5+",
      label: "Tahun Pengalaman"
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      value: "5.000+",
      label: "Pelanggan Setia"
    },
    {
      icon: <Star className="w-8 h-8 text-accent" />,
      value: "4.9/5",
      label: "Rating Kepuasan"
    }
  ];

  return (
    <div className="bg-cream-50">
      {/* Hero Section with Image */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=600&fit=crop"
          alt="Alba Ganti Baju Store"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-900/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <span className="text-accent tracking-[0.3em] uppercase text-sm font-medium">Tentang Kami</span>
            <h1 className="text-5xl md:text-6xl font-semibold mt-4 mb-6 leading-tight text-accent" style={{ fontFamily: "'Playfair Display', serif" }}>
              Alba Ganti Baju
            </h1>
            <p className="text-lg md:text-xl text-cream-100 leading-relaxed font-lato">
              Menghadirkan Fashion Premium untuk Gaya Hidup Modern Anda
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-cream-100 via-cream-200 to-cream-100 border-y border-accent/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-card border border-primary-100">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-primary-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.value}</div>
                <div className="text-taupe-600 font-lato text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-accent tracking-[0.3em] uppercase text-sm font-medium">Cerita Kami</span>
              <h2 className="text-4xl md:text-5xl text-primary-800 mt-4 mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                Perjalanan Menuju
                <br />
                <span className="italic">Fashion Excellence</span>
              </h2>
              <div className="space-y-5 text-taupe-600 font-lato leading-relaxed">
                <p>
                  <strong className="text-primary-800">Alba Ganti Baju</strong> berawal dari semangat untuk menghadirkan produk fashion yang stylish, nyaman, dan terjangkau bagi semua kalangan. Kami percaya bahwa setiap orang berhak tampil percaya diri dengan pakaian yang sesuai dengan gaya dan kepribadiannya.
                </p>
                <p>
                  Berawal dari penjualan sederhana, Alba Ganti Baju terus berkembang dengan mengikuti tren fashion terkini tanpa mengesampingkan kualitas bahan dan kenyamanan pemakaian. Setiap produk yang kami tawarkan dipilih dengan teliti agar dapat memenuhi kebutuhan pelanggan, baik untuk aktivitas sehari-hari maupun acara khusus.
                </p>
                <p>
                  Dengan mengutamakan kepuasan pelanggan, kami berkomitmen memberikan <strong className="text-primary-800">pelayanan terbaik</strong>, mulai dari pemilihan produk, proses pemesanan, hingga pengiriman. Alba Ganti Baju hadir sebagai solusi belanja pakaian online yang mudah, aman, dan terpercaya.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop"
                  alt="Fashion Collection"
                  className="w-full h-[500px] object-cover shadow-card-hover"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-white px-8 py-4 shadow-lg">
                  <p className="text-sm tracking-wider uppercase font-medium">Est. 2019</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-cream-100 via-cream-200 to-cream-100 relative">
        <div className="absolute inset-0 border-t border-b border-accent/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <span className="text-accent tracking-[0.3em] uppercase text-sm font-medium">Nilai-Nilai Kami</span>
            <h2 className="text-4xl md:text-5xl text-primary-800 mt-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
              Komitmen Kami
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 text-center shadow-card hover:shadow-card-hover transition-all duration-500 border border-primary-100">
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 border-2 border-accent/30 rounded-full">
                <Award className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-primary-800" style={{ fontFamily: "'Playfair Display', serif" }}>Kualitas Premium</h3>
              <p className="text-taupe-600 font-lato leading-relaxed">
                Kami menyediakan produk fashion dengan bahan pilihan yang nyaman, awet, dan berkualitas tinggi untuk kepuasan maksimal Anda.
              </p>
            </div>
            <div className="bg-white p-8 text-center shadow-card hover:shadow-card-hover transition-all duration-500 border border-primary-100">
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 border-2 border-accent/30 rounded-full">
                <Heart className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-primary-800" style={{ fontFamily: "'Playfair Display', serif" }}>Pelayanan Prima</h3>
              <p className="text-taupe-600 font-lato leading-relaxed">
                Kami berkomitmen memberikan pelayanan yang ramah, responsif, dan profesional kepada setiap pelanggan dengan sepenuh hati.
              </p>
            </div>
            <div className="bg-white p-8 text-center shadow-card hover:shadow-card-hover transition-all duration-500 border border-primary-100">
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 border-2 border-accent/30 rounded-full">
                <Truck className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-primary-800" style={{ fontFamily: "'Playfair Display', serif" }}>Pengiriman Cepat</h3>
              <p className="text-taupe-600 font-lato leading-relaxed">
                Kami memastikan proses pemesanan dan pengiriman dilakukan dengan cepat, aman, dan tepat waktu ke seluruh Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-accent tracking-[0.3em] uppercase text-sm font-medium">Keunggulan Kami</span>
              <h2 className="text-4xl md:text-5xl text-primary-800 mt-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                Mengapa Memilih Kami?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 bg-white p-6 border border-primary-100 hover:border-accent/50 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>100% Original</h3>
                  <p className="text-taupe-600 font-lato text-sm leading-relaxed">
                    Semua produk dijamin keasliannya dengan sertifikat resmi dari brand terpercaya.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-white p-6 border border-primary-100 hover:border-accent/50 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Packaging Premium</h3>
                  <p className="text-taupe-600 font-lato text-sm leading-relaxed">
                    Setiap produk dikemas dengan rapi dan elegan untuk menjaga kualitas hingga ke tangan Anda.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-white p-6 border border-primary-100 hover:border-accent/50 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Garansi Kepuasan</h3>
                  <p className="text-taupe-600 font-lato text-sm leading-relaxed">
                    Kami menjamin kepuasan Anda dengan kebijakan pengembalian 30 hari tanpa ribet.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-white p-6 border border-primary-100 hover:border-accent/50 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Customer Support 24/7</h3>
                  <p className="text-taupe-600 font-lato text-sm leading-relaxed">
                    Tim kami siap membantu Anda kapan saja melalui WhatsApp, email, atau live chat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
            Siap untuk Upgrade<br />Gaya Fashion Anda?
          </h2>
          <p className="text-cream-200 font-lato text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Jelajahi koleksi terbaru kami dan temukan pakaian yang sempurna untuk setiap momen Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center bg-white text-primary-800 px-10 py-4 tracking-[0.2em] uppercase text-sm hover:bg-cream-100 transition-all duration-300 font-medium"
            >
              Belanja Sekarang
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-white text-white px-10 py-4 tracking-[0.2em] uppercase text-sm hover:bg-white hover:text-primary-800 transition-all duration-300 font-medium"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
