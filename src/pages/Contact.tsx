import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
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
          to_name: 'Aneka Warna Indah',
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
    <div className="py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="heading-2 mb-4">Hubungi Kami</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ada pertanyaan atau butuh bantuan? Jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Alamat</h3>
            <p className="text-gray-600">
              Jl. Parangtritis No.33, Brontokusuman,<br />
              Kec. Mergangsan, Kota Yogyakarta,<br />
              Daerah Istimewa Yogyakarta 55153
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Telepon & WhatsApp</h3>
            <p className="text-gray-600">
              <a className="hover:text-primary-600">+62 122 7626 780</a><br />
              <a href="http://wa.me/6281227626780" className="hover:text-primary-600">Chat via WhatsApp</a>
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Jam Operasional</h3>
            <p className="text-gray-600">
              Senin - Minggu: 08:00 - 21:00</p>
            <p>(Setiap Hari)</p>
            
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-card">
            <h2 className="text-2xl font-semibold mb-6">Kirim Pesan</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Pesan
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 text-green-700 rounded-md">
                  Pesan Anda telah berhasil terkirim. Kami akan segera menghubungi Anda.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-md">
                  Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami melalui WhatsApp.
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="bg-white p-8 rounded-lg shadow-card">
            <h2 className="text-2xl font-semibold mb-6">Lokasi Kami</h2>
            <div className="aspect-square rounded-lg overflow-hidden">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d39890.920286467044!2d110.3611107137347!3d-7.813300805497132!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57987417d3eb%3A0x266bf49d58c3fcd5!2sJl.%20Parangtritis%20No.33%2C%20Brontokusuman%2C%20Kec.%20Mergangsan%2C%20Kota%20Yogyakarta%2C%20Daerah%20Istimewa%20Yogyakarta%2055143!5e0!3m2!1sid!2sid!4v1748593897291!5m2!1sid!2sid"
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
    </div>
  );
};

export default Contact;