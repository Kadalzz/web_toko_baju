import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          from_name: name,
          from_email: email,
          message: message,
          to_name: 'Alba Ganti Baju',
        },
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      setSubmitStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cream-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full -ml-32 -mb-32"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-accent tracking-[0.3em] uppercase text-sm font-medium">Hubungi</span>
          <h1 className="text-5xl md:text-6xl font-semibold text-white mt-4 mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Kami Siap Membantu Anda
          </h1>
          <p className="text-cream-200 font-lato text-lg max-w-2xl mx-auto leading-relaxed">
            Punya pertanyaan? Tim customer service kami siap memberikan solusi terbaik untuk kebutuhan fashion Anda.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 -mt-12 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-8 shadow-card-hover border border-primary-100 text-center transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent/20">
                <MapPin className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-800" style={{ fontFamily: "'Playfair Display', serif" }}>Lokasi Toko</h3>
              <p className="text-taupe-600 font-lato leading-relaxed text-sm">
                Jl. Kusuma No.815, Baciro,<br />
                Kec. Gondokusuman, Kota Yogyakarta,<br />
                Daerah Istimewa Yogyakarta 55225
              </p>
            </div>

            <div className="bg-white p-8 shadow-card-hover border border-primary-100 text-center transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent/20">
                <Phone className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-800" style={{ fontFamily: "'Playfair Display', serif" }}>Hubungi Kami</h3>
              <p className="text-taupe-600 font-lato leading-relaxed text-sm mb-3">
                +62 821 4238 8292
              </p>
              <a 
                href="http://wa.me/6282142388292" 
                className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-medium text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat via WhatsApp
              </a>
            </div>

            <div className="bg-white p-8 shadow-card-hover border border-primary-100 text-center transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent/20">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-800" style={{ fontFamily: "'Playfair Display', serif" }}>Jam Operasional</h3>
              <p className="text-taupe-600 font-lato leading-relaxed text-sm">
                Senin - Minggu<br />
                08:00 - 21:00 WIB<br />
                <span className="text-accent font-medium">(Setiap Hari)</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="py-16 bg-gradient-to-br from-cream-100 via-cream-200 to-cream-100 border-y border-accent/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white p-10 shadow-card border border-primary-100">
              <div className="mb-8">
                <span className="text-accent tracking-[0.3em] uppercase text-sm font-medium">Kontak</span>
                <h2 className="text-3xl md:text-4xl font-semibold mt-2 text-primary-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Kirim Pesan
                </h2>
                <p className="text-taupe-600 font-lato mt-3 leading-relaxed">
                  Isi formulir di bawah ini dan kami akan segera merespons pesan Anda.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary-800 mb-2 font-lato">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-cream-50 border border-primary-200 rounded-lg text-primary-800 placeholder-taupe-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent font-lato transition-all duration-300"
                    placeholder="Masukkan nama Anda"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary-800 mb-2 font-lato">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-cream-50 border border-primary-200 rounded-lg text-primary-800 placeholder-taupe-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent font-lato transition-all duration-300"
                    placeholder="nama@email.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary-800 mb-2 font-lato">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 bg-cream-50 border border-primary-200 rounded-lg text-primary-800 placeholder-taupe-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent font-lato transition-all duration-300 resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 font-lato text-sm">
                    ✓ Pesan Anda telah berhasil terkirim. Kami akan segera menghubungi Anda.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 font-lato text-sm">
                    ✗ Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami melalui WhatsApp.
                  </div>
                )}

                <button 
                  type="submit" 
                  className="w-full py-4 bg-accent hover:bg-accent-dark text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-card hover:shadow-card-hover flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Mengirim...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-white p-10 shadow-card border border-primary-100">
              <div className="mb-8">
                <span className="text-accent tracking-[0.3em] uppercase text-sm font-medium">Lokasi</span>
                <h2 className="text-3xl md:text-4xl font-semibold mt-2 text-primary-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Kunjungi Toko Kami
                </h2>
                <p className="text-taupe-600 font-lato mt-3 leading-relaxed">
                  Temukan lokasi toko kami di peta dan kunjungi langsung untuk pengalaman belanja yang lebih personal.
                </p>
              </div>
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-primary-100 shadow-soft">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.030475968934!2d110.39001187501724!3d-7.786893892221944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59f2e5e3b0e3%3A0x5e4b6e8f2a1c3d4f!2sJl.%20Kusuma%20No.815%2C%20Baciro%2C%20Kec.%20Gondokusuman%2C%20Kota%20Yogyakarta%2C%20Daerah%20Istimewa%20Yogyakarta%2055225!5e0!3m2!1sid!2sid!4v1736424000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-primary-800 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Punya Pertanyaan Lain?
          </h2>
          <p className="text-taupe-600 font-lato text-lg mb-8 leading-relaxed">
            Jangan ragu untuk menghubungi kami kapan saja. Tim kami siap membantu Anda dengan cepat dan profesional.
          </p>
          <a
            href="http://wa.me/6282142388292"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-lg font-medium transition-all duration-300 shadow-card hover:shadow-card-hover transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            Chat via WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
