import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, Instagram, Twitter, Mail, Phone, MapPin, CreditCard, Truck, Shield, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Features Bar */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <Truck className="h-8 w-8 text-primary-500" />
              <div>
                <h4 className="font-semibold text-white">Gratis Ongkir</h4>
                <p className="text-sm">Min. belanja Rp 500rb</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary-500" />
              <div>
                <h4 className="font-semibold text-white">Garansi Kualitas</h4>
                <p className="text-sm">100% produk original</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="h-8 w-8 text-primary-500" />
              <div>
                <h4 className="font-semibold text-white">Pembayaran Aman</h4>
                <p className="text-sm">Berbagai metode bayar</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-primary-500" />
              <div>
                <h4 className="font-semibold text-white">Support 24/7</h4>
                <p className="text-sm">Siap membantu Anda</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <ShoppingBag className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold text-white">Fashion<span className="text-accent">Store</span></span>
            </Link>
            <p className="text-gray-400 mb-4 text-sm">
              Toko fashion online terpercaya dengan koleksi terlengkap dan harga terbaik. 
              Temukan style terbaikmu bersama kami.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Semua Produk
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Kategori
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Bantuan</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/cara-pemesanan" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Cara Pemesanan
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Pengiriman
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Pengembalian
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-primary-500 shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Jl. Fashion Street No. 123<br />
                  Jakarta Pusat, 10110
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-primary-500" />
                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                >
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-primary-500" />
                <a 
                  href="mailto:hello@fashionstore.com"
                  className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                >
                  hello@fashionstore.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white font-medium mb-2">Newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm focus:outline-none focus:border-primary-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition-colors text-sm"
                >
                  Daftar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Fashion Store. Hak Cipta Dilindungi.
            </p>
            <div className="flex items-center space-x-4">
              <img src="https://placehold.co/40x25/2563eb/white?text=VISA" alt="Visa" className="h-6" />
              <img src="https://placehold.co/40x25/2563eb/white?text=MC" alt="Mastercard" className="h-6" />
              <img src="https://placehold.co/40x25/2563eb/white?text=BCA" alt="BCA" className="h-6" />
              <img src="https://placehold.co/40x25/2563eb/white?text=OVO" alt="OVO" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
