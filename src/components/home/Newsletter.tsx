import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-16 bg-primary-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dapatkan Info Terbaru
          </h2>
          <p className="text-gray-600 mb-8">
            Daftarkan email Anda untuk mendapatkan info promo, diskon eksklusif, 
            dan update koleksi terbaru dari Fashion Store.
          </p>

          {isSubmitted ? (
            <div className="flex items-center justify-center space-x-3 text-green-600 bg-green-50 py-4 px-6 rounded-lg">
              <CheckCircle className="h-6 w-6" />
              <span className="font-medium">Terima kasih! Anda telah berlangganan newsletter kami.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Daftar</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-sm text-gray-500 mt-4">
            Dengan mendaftar, Anda menyetujui{' '}
            <a href="/privacy" className="text-primary-600 hover:underline">
              Kebijakan Privasi
            </a>{' '}
            kami.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
