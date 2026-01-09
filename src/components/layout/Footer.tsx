import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-800 text-cream-100">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <h3 className="font-montserrat text-3xl text-white tracking-wider">
                Alba Ganti Baju
              </h3>
              <span className="text-xs text-cream-300 tracking-[0.3em] uppercase">
                Premium Fashion
              </span>
            </Link>
            <p className="text-cream-300 font-lato text-sm leading-relaxed mb-6">
              Toko fashion premium dengan koleksi terlengkap dan kualitas terbaik. 
              Temukan style yang mencerminkan kepribadian Anda.
            </p>
          </div>

          {/* Popular */}
          <div>
            <h4 className="font-montserrat text-xl text-white mb-6 tracking-wide">Populer</h4>
            <ul className="space-y-3">
              {['Dress', 'Kemeja', 'Celana', 'Jaket', 'Aksesoris'].map((item) => (
                <li key={item}>
                  <Link 
                    to="/products" 
                    className="text-cream-300 hover:text-accent transition-colors text-sm font-lato tracking-wide"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Services */}
          <div>
            <h4 className="font-montserrat text-xl text-white mb-6 tracking-wide">Layanan</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-cream-300 hover:text-accent transition-colors text-sm font-lato tracking-wide">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-cream-300 hover:text-accent transition-colors text-sm font-lato tracking-wide">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat text-xl text-white mb-6 tracking-wide">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span className="text-cream-300 text-sm font-lato leading-relaxed">
                  Jl. Kusuma No.815, Baciro,<br />
                  Kec. Gondokusuman, Kota Yogyakarta,<br />
                  Daerah Istimewa Yogyakarta 55225
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-accent" />
                <a 
                  href="https://wa.me/6282142388292" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cream-300 hover:text-accent transition-colors text-sm font-lato"
                >
                  +62 821-4238-8292
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-accent" />
                <a 
                  href="mailto:hello@albagantibaju.com"
                  className="text-cream-300 hover:text-accent transition-colors text-sm font-lato"
                >
                  hello@albagantibaju.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-700">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex justify-center items-center">
            <p className="text-cream-400 text-sm font-lato tracking-wide">
              © {new Date().getFullYear()} Alba Ganti Baju. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
