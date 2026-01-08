import { Camera, Award, Users, Clock, MapPin, Phone } from 'lucide-react';

const About = () => {
  const stats = [
    {
      icon: <Camera className="w-8 h-8 text-primary-600" />,
      value: "50.000+",
      label: "Foto Dicetak"
    },
    {
      icon: <Award className="w-8 h-8 text-primary-600" />,
      value: "15+",
      label: "Tahun Pengalaman"
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      value: "10.000+",
      label: "Pelanggan Puas"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary-600" />,
      value: "24 Jam",
      label: "Layanan"
    }
  ];

  return (
    <div className="py-12">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="heading-2 mb-6">Tentang Alba Ganti Baju</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sejak 2008, kami telah membantu ribuan pelanggan mengabadikan momen berharga mereka melalui cetakan foto berkualitas tinggi dan layanan desain profesional.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="/foto.jpeg"
              alt="Studio Foto Kami"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="heading-3 mb-6">Cerita Kami</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Alba Ganti Baju berawal dari semangat untuk menghadirkan produk fashion yang stylish, nyaman, dan terjangkau bagi semua kalangan. Kami percaya bahwa setiap orang berhak tampil percaya diri dengan pakaian yang sesuai dengan gaya dan kepribadiannya.
              </p>
              <p>
                Berawal dari penjualan sederhana, Alba Ganti Baju terus berkembang dengan mengikuti tren fashion terkini tanpa mengesampingkan kualitas bahan dan kenyamanan pemakaian. Setiap produk yang kami tawarkan dipilih dengan teliti agar dapat memenuhi kebutuhan pelanggan, baik untuk aktivitas sehari-hari maupun acara khusus.
              </p>
              <p>
                Dengan mengutamakan kepuasan pelanggan, kami berkomitmen memberikan pelayanan terbaik, mulai dari pemilihan produk, proses pemesanan, hingga pengiriman. Alba Ganti Baju hadir sebagai solusi belanja pakaian online yang mudah, aman, dan terpercaya.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-16">
          <h2 className="heading-3 text-center mb-12">Nilai-Nilai Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kualitas Produk</h3>
              <p className="text-gray-600">
                Kami menyediakan produk fashion dengan bahan pilihan yang nyaman, awet, dan berkualitas.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pelayanan Prima</h3>
              <p className="text-gray-600">
                Kami berkomitmen memberikan pelayanan yang ramah, responsif, dan profesional kepada setiap pelanggan.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ketepatan Waktu</h3>
              <p className="text-gray-600">
                Kami memastikan proses pemesanan dan pengiriman dilakukan dengan cepat dan tepat waktu.
              </p>
            </div>
          </div>
        </div>

        {/* Locations Section */}
        <div>
          <h2 className="heading-3 text-center mb-12">Lokasi Toko Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Toko Utama */}
            <div className="bg-primary-50 p-8 rounded-xl border-2 border-primary-100">
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-lg text-primary-700">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">Alba Ganti Baju</h3>
                    <span className="text-sm bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                      Toko Utama
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Jl. Parangtritis No.33, Brontokusuman,<br />
                    Kec. Mergangsan, Kota Yogyakarta,<br />
                    Daerah Istimewa Yogyakarta 55153
                  </p>
                  <div className="space-y-2">
                    <a 
                      href="http://wa.me/6282142388292"
                      className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
                    >
                      <Phone size={16} />
                      +62 122 7626 780
                    </a>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Clock size={16} />
                      Buka Setiap Hari: 08:00 - 21:00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Toko Cabang */}
            <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-100">
              <div className="flex items-start gap-4">
                <div className="bg-gray-200 p-3 rounded-lg text-gray-700">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">Aneka Digital Imaging</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Jl. Prof. Dr. Ir. Herman Johannes No.988,<br />
                    Samirono, Caturtunggal, Kec. Depok,<br />
                    Kabupaten Sleman, Yogyakarta 55223
                  </p>
                  <div className="space-y-2">
                    <a 
                      href="http://wa.me/+6282142388292"
                      className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2"
                    >
                      <Phone size={16} />
                      +62 821 4238 8292
                    </a>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Clock size={16} />
                      Buka Setiap Hari: 09:00 - 21:00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
