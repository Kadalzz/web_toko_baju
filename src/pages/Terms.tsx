import { FileText } from 'lucide-react';

const Terms = () => {
  return (
    <div className="py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-primary-50 px-4 py-2 rounded-full mb-4">
              <FileText size={16} className="text-primary-600 mr-2" />
              <span className="text-primary-700 text-sm font-medium">Syarat dan Ketentuan</span>
            </div>
            <h1 className="heading-2 mb-4">Syarat dan Ketentuan Robby Fashion</h1>
            <p className="text-gray-600">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="prose max-w-none">
            <div className="bg-white rounded-lg shadow-card p-8">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Ketentuan Umum</h2>
                <p className="text-gray-600 mb-4">
                  Dengan menggunakan layanan Robby Fashion, Anda menyetujui syarat dan ketentuan ini. Mohon baca dengan seksama sebelum menggunakan layanan kami.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Layanan</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Kami menyediakan layanan cetak foto dan produk terkait sesuai dengan spesifikasi yang tercantum</li>
                  <li>Kualitas hasil cetak bergantung pada kualitas file foto yang diunggah</li>
                  <li>Kami berhak menolak pesanan yang melanggar hukum atau tidak sesuai dengan kebijakan kami</li>
                  <li>Waktu pengerjaan dapat berbeda-beda tergantung jenis produk dan volume pesanan</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Pemesanan dan Pembayaran</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Harga yang tercantum adalah dalam Rupiah dan sudah termasuk pajak</li>
                  <li>Pembayaran harus dilakukan sebelum pesanan diproses</li>
                  <li>Pembatalan pesanan hanya dapat dilakukan sebelum proses produksi dimulai</li>
                  <li>Biaya pengiriman ditanggung oleh pembeli</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Pengiriman</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Pengiriman dilakukan melalui jasa ekspedisi yang tersedia</li>
                  <li>Waktu pengiriman bergantung pada lokasi dan jasa ekspedisi yang dipilih</li>
                  <li>Kami tidak bertanggung jawab atas keterlambatan yang disebabkan oleh pihak ekspedisi</li>
                  <li>Kerusakan produk selama pengiriman dapat diklaim sesuai kebijakan ekspedisi</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Pengembalian dan Refund</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Pengembalian dapat dilakukan jika terdapat cacat produksi</li>
                  <li>Klaim harus diajukan dalam waktu 24 jam setelah penerimaan barang</li>
                  <li>Refund akan diproses setelah barang diterima dan diperiksa</li>
                  <li>Biaya pengiriman untuk pengembalian ditanggung oleh pembeli</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Hak Cipta</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Pelanggan bertanggung jawab atas hak cipta foto yang diunggah</li>
                  <li>Kami berhak menolak mencetak foto yang melanggar hak cipta</li>
                  <li>Pelanggan membebaskan kami dari tuntutan pelanggaran hak cipta</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Perubahan Ketentuan</h2>
                <p className="text-gray-600 mb-4">
                  Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diumumkan melalui website kami.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Kontak</h2>
                <p className="text-gray-600">
                  Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami di:
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

export default Terms;
