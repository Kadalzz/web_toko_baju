import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqItems: FAQItem[] = [
    {
      category: "Produk & Katalog",
      question: "Apa saja jenis produk yang dijual di Alba Ganti Baju?",
      answer: "Produk fashion kami mencakup berbagai kategori seperti pakaian wanita (dress, blouse, celana), pakaian pria (kemeja, kaos, celana), sepatu, tas, dan aksesoris fashion lainnya. Semua produk dipilih dengan kualitas terbaik."
    },
    {
      category: "Produk & Katalog",
      question: "Apakah produk yang dijual original?",
      answer: "Ya, semua produk yang kami jual dijamin 100% original dan berkualitas. Kami hanya bekerja sama dengan supplier terpercaya dan brand ternama."
    },
    {
      category: "Pemesanan & Pengiriman",
      question: "Bagaimana cara memesan produk?",
      answer: "Anda bisa memesan dengan menambahkan produk ke keranjang, lalu lanjutkan ke checkout. Atau hubungi kami langsung via WhatsApp untuk pemesanan dan konsultasi produk."
    },
    {
      category: "Pemesanan & Pengiriman",
      question: "Berapa lama waktu pengiriman?",
      answer: "Waktu pengiriman bervariasi tergantung lokasi. Untuk area Jabodetabek biasanya 1-3 hari kerja, sedangkan untuk luar kota 3-7 hari kerja. Pengiriman express juga tersedia dengan estimasi lebih cepat."
    },
    {
      category: "Pemesanan & Pengiriman",
      question: "Apakah ada gratis ongkir?",
      answer: "Ya, kami menyediakan gratis ongkir untuk pembelian dengan minimum tertentu atau untuk member baru. Cek promo terbaru kami di halaman utama."
    },
    {
      category: "Ukuran & Pengembalian",
      question: "Bagaimana cara mengetahui ukuran yang tepat?",
      answer: "Setiap produk dilengkapi dengan panduan ukuran (size chart) yang detail. Anda juga bisa menghubungi customer service kami untuk konsultasi ukuran yang sesuai dengan body type Anda."
    },
    {
      category: "Ukuran & Pengembalian",
      question: "Apakah bisa tukar/return jika ukuran tidak pas?",
      answer: "Ya, kami menerima penukaran dalam waktu 7 hari setelah produk diterima, dengan syarat produk masih dalam kondisi sempurna dengan tag dan kemasan asli. Untuk detail kebijakan return, silakan cek halaman Terms & Conditions."
    },
    {
      category: "Pembayaran",
      question: "Metode pembayaran apa saja yang tersedia?",
      answer: "Kami menerima pembayaran melalui transfer bank (BCA, Mandiri, BRI, BNI), e-wallet (GoPay, OVO, DANA, ShopeePay), dan QRIS. Pembayaran COD juga tersedia untuk area tertentu."
    },
    {
      category: "Pembayaran",
      question: "Apakah aman berbelanja di Alba Ganti Baju?",
      answer: "Sangat aman! Kami menggunakan sistem pembayaran yang terenkripsi dan tidak menyimpan informasi kartu kredit Anda. Semua transaksi dilindungi dengan sistem keamanan terbaik."
    },
    {
      category: "Membership & Promo",
      question: "Apa keuntungan menjadi member Alba Ganti Baju?",
      answer: "Member kami mendapatkan berbagai benefit seperti diskon eksklusif hingga 50%, poin reward setiap pembelian, akses early sale, gratis ongkir, dan newsletter dengan update produk terbaru."
    },
    {
      category: "Membership & Promo",
      question: "Bagaimana cara mendaftar menjadi member?",
      answer: "Sangat mudah! Klik tombol 'Daftar' di pojok kanan atas, isi form registrasi dengan email dan data diri Anda, lalu verifikasi email. Setelah itu Anda sudah bisa menikmati semua benefit member."
    },
    {
      category: "Lainnya",
      question: "Bagaimana cara melacak pesanan saya?",
      answer: "Setelah pesanan dikirim, Anda akan menerima nomor resi via email dan WhatsApp. Anda bisa tracking pesanan melalui halaman 'Status Pesanan' di akun Anda atau langsung melalui website ekspedisi."
    },
    {
      category: "Lainnya",
      question: "Apakah bisa request produk yang tidak ada di katalog?",
      answer: "Tentu! Kami terbuka untuk request produk. Silakan hubungi customer service kami via WhatsApp atau email dengan detail produk yang Anda inginkan, dan kami akan berusaha mencarinya untuk Anda."
    }
  ];

  const categories = Array.from(new Set(faqItems.map(item => item.category)));

  return (
    <div className="py-12">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary-50 px-4 py-2 rounded-full mb-4">
            <HelpCircle size={16} className="text-primary-600 mr-2" />
            <span className="text-primary-700 text-sm font-medium">Bantuan</span>
          </div>
          <h1 className="heading-2 mb-4">Pertanyaan yang Sering Diajukan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum seputar produk fashion, pemesanan, pengiriman, dan layanan kami.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{category}</h2>
              <div className="space-y-4">
                {faqItems
                  .filter(item => item.category === category)
                  .map((item, index) => {
                    const itemIndex = categoryIndex * 10 + index;
                    const isOpen = openItems.includes(itemIndex);
                    
                    return (
                      <div 
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          className={`w-full text-left p-4 flex items-center justify-between transition-colors ${
                            isOpen ? 'bg-primary-50' : 'hover:bg-gray-50'
                          }`}
                          onClick={() => toggleItem(itemIndex)}
                        >
                          <span className="font-medium">{item.question}</span>
                          {isOpen ? (
                            <ChevronUp className="text-primary-600 shrink-0" />
                          ) : (
                            <ChevronDown className="text-gray-400 shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="p-4 bg-white border-t border-gray-200">
                            <p className="text-gray-600">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-12 text-center">
          <div className="bg-primary-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Masih memiliki pertanyaan?</h3>
            <p className="text-gray-600 mb-4">
              Jangan ragu untuk menghubungi tim kami. Kami siap membantu Anda.
            </p>
            <a 
              href="http://wa.me/6282142388292"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
