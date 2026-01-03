import { Shield } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-primary-50 px-4 py-2 rounded-full mb-4">
              <Shield size={16} className="text-primary-600 mr-2" />
              <span className="text-primary-700 text-sm font-medium">Kebijakan Privasi</span>
            </div>
            <h1 className="heading-2 mb-4">Kebijakan Privasi Aneka Warna Indah</h1>
            <p className="text-gray-600">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="prose max-w-none">
            <div className="bg-white rounded-lg shadow-card p-8">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Informasi yang Kami Kumpulkan</h2>
                <p className="text-gray-600 mb-4">
                  Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, termasuk:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Nama lengkap</li>
                  <li>Alamat email</li>
                  <li>Nomor telepon</li>
                  <li>Alamat pengiriman</li>
                  <li>Informasi pembayaran</li>
                  <li>Foto-foto yang Anda unggah untuk dicetak</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Penggunaan Informasi</h2>
                <p className="text-gray-600 mb-4">
                  Kami menggunakan informasi yang dikumpulkan untuk:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Memproses dan mengirimkan pesanan Anda</li>
                  <li>Berkomunikasi dengan Anda tentang pesanan</li>
                  <li>Mengirimkan informasi tentang produk dan promosi</li>
                  <li>Meningkatkan layanan kami</li>
                  <li>Mendeteksi dan mencegah penipuan</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Penyimpanan dan Keamanan Data</h2>
                <p className="text-gray-600 mb-4">
                  Kami mengambil langkah-langkah keamanan yang sesuai untuk melindungi informasi Anda:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Enkripsi data sensitif</li>
                  <li>Akses terbatas ke informasi pribadi</li>
                  <li>Pemantauan keamanan secara regular</li>
                  <li>Backup data berkala</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Berbagi Informasi</h2>
                <p className="text-gray-600 mb-4">
                  Kami tidak akan menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Informasi hanya dibagikan dengan:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Penyedia layanan pengiriman</li>
                  <li>Processor pembayaran</li>
                  <li>Layanan pendukung operasional</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Hak-Hak Anda</h2>
                <p className="text-gray-600 mb-4">
                  Anda memiliki hak untuk:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Mengakses informasi pribadi Anda</li>
                  <li>Memperbarui atau mengoreksi informasi</li>
                  <li>Meminta penghapusan data</li>
                  <li>Membatasi penggunaan data</li>
                  <li>Menarik persetujuan penggunaan data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Kontak</h2>
                <p className="text-gray-600">
                  Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di:
                </p>
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Email: awi33adima20@gmail.com</p>
                  <p className="text-gray-600">Telepon: +62 812 2762 6780</p>
                  <p className="text-gray-600">Alamat: Jl. Parangtritis No.33, Brontokusuman, Kec. Mergangsan, Kota Yogyakarta</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;