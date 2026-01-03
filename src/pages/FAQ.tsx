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
      category: "Cetak Foto",
      question: "Berapa lama waktu yang dibutuhkan untuk mencetak foto?",
      answer: "Waktu cetak foto bervariasi tergantung ukuran dan jumlah. Untuk cetak foto reguler (4R-12R) biasanya selesai dalam 1-2 jam. Untuk pesanan dalam jumlah besar atau ukuran khusus, bisa memakan waktu 1-2 hari kerja."
    },
    {
      category: "Cetak Foto",
      question: "Apakah bisa mencetak foto dari handphone?",
      answer: "Ya, Anda bisa mengirimkan foto dari handphone melalui WhatsApp atau mengupload langsung di website kami. Pastikan foto memiliki resolusi yang baik untuk hasil cetak yang optimal."
    },
    {
      category: "Figura",
      question: "Apakah tersedia layanan pengiriman untuk figura?",
      answer: "Ya, kami menyediakan layanan pengiriman untuk figura ke seluruh Indonesia. Figura akan dikemas dengan aman untuk menghindari kerusakan selama pengiriman."
    },
    {
      category: "Figura",
      question: "Berapa ukuran figura yang tersedia?",
      answer: "Kami menyediakan berbagai ukuran figura mulai dari 4R hingga 24R. Ukuran populer termasuk 4R (10.2x15.2 cm), 10R (20.3x25.4 cm), dan 16R (40x50 cm)."
    },
    {
      category: "Album Foto",
      question: "Berapa minimal halaman untuk pemesanan album foto?",
      answer: "Minimal halaman untuk album foto adalah 10 halaman. Anda dapat menambah halaman sesuai kebutuhan dengan biaya tambahan per halaman."
    },
    {
      category: "Album Foto",
      question: "Apakah bisa request desain khusus untuk album?",
      answer: "Ya, kami menyediakan layanan desain khusus untuk album foto. Tim desainer kami akan membantu mewujudkan konsep album yang Anda inginkan."
    },
    {
      category: "Pembayaran",
      question: "Metode pembayaran apa saja yang tersedia?",
      answer: "Kami menerima pembayaran melalui transfer bank (BCA, Mandiri, BNI), QRIS, dan e-wallet (GoPay, OVO, DANA)."
    },
    {
      category: "Pembayaran",
      question: "Apakah ada biaya tambahan untuk pengiriman?",
      answer: "Ya, biaya pengiriman dihitung berdasarkan berat paket dan lokasi pengiriman. Anda dapat memilih jasa ekspedisi yang tersedia saat checkout."
    },
    {
      category: "Lainnya",
      question: "Bagaimana jika hasil cetak tidak sesuai dengan yang diinginkan?",
      answer: "Kami memberikan garansi kepuasan. Jika hasil cetak tidak sesuai karena kesalahan dari pihak kami, kami akan melakukan cetak ulang tanpa biaya tambahan."
    },
    {
      category: "Lainnya",
      question: "Apakah bisa melakukan pemesanan custom di luar produk yang tersedia?",
      answer: "Ya, kami terbuka untuk pemesanan custom. Silakan hubungi tim kami melalui WhatsApp atau email untuk mendiskusikan kebutuhan Anda."
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
            Temukan jawaban untuk pertanyaan umum seputar layanan cetak foto dan produk kami.
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
              href="http://wa.me/6281227626780"
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