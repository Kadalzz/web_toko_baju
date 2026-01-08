import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Search, Heart } from 'lucide-react';
import { NavLink as NavLinkType } from '../../types';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const { items, openCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  // Handle scroll to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        // Always show header at top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide header
        setIsVisible(false);
      } else {
        // Scrolling up - show header
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const navLinks: NavLinkType[] = [
    { name: 'Beranda', path: '/' },
    { name: 'Produk', path: '/products' },
    { name: 'Kategori', path: '/categories' },
    { name: 'Tentang', path: '/about' },
    { name: 'Kontak', path: '/contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      {/* Main Header */}
      <div className="bg-amber-50 shadow-sm border-b border-amber-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-4">
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-slate-700 hover:text-slate-900" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-slate-900 p-2 rounded-lg">
                <ShoppingBag className="h-7 w-7 md:h-8 md:w-8 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span 
                  className="text-xl md:text-2xl text-slate-900 tracking-wide leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                >
                  Alba Ganti Baju
                </span>
                <span className="text-[10px] text-slate-600 tracking-[0.2em] uppercase hidden sm:block">
                  Fashion & Lifestyle
                </span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <input
                  type="text"
                  placeholder="Cari produk fashion favoritmu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pl-11 bg-white border border-amber-200 rounded-full text-sm focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-1 md:space-x-2">
              {/* Search - Mobile */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-amber-100 rounded-full transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link 
                to="/wishlist" 
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-amber-100 rounded-full transition-colors hidden md:flex"
              >
                <Heart className="h-5 w-5" />
              </Link>

              {/* Cart */}
              <button 
                onClick={openCart}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-amber-100 rounded-full transition-colors relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* User - Desktop */}
              {isAuthenticated ? (
                <Link 
                  to="/account" 
                  className="hidden md:flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-amber-100 rounded-full transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user?.full_name?.split(' ')[0]}</span>
                </Link>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-amber-100 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    Masuk
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-amber-600 hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm font-medium"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <div className="bg-amber-100 border-t border-amber-200 hidden md:block">
          <div className="container mx-auto px-4 md:px-6">
            <nav className="flex items-center justify-center space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-5 py-3 text-sm font-medium transition-colors relative ${
                      isActive
                        ? 'text-slate-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-amber-200'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Search Bar - Mobile Expandable */}
        {isSearchOpen && (
          <div className="lg:hidden px-4 py-3 border-t border-amber-100 bg-amber-50">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 bg-white border border-amber-200 rounded-full text-sm focus:outline-none focus:border-amber-400 transition-all"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-amber-50 border-t border-amber-100">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-amber-100 text-slate-900'
                          : 'text-slate-700 hover:bg-amber-100 hover:text-slate-900'
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
              
              <div className="border-t border-amber-100 mt-4 pt-4">
                <div className="flex items-center space-x-3 px-4 mb-4">
                  <Link
                    to="/wishlist"
                    className="flex items-center space-x-2 text-slate-700 hover:text-slate-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="h-5 w-5" />
                    <span className="text-sm">Wishlist</span>
                  </Link>
                </div>
                
                {isAuthenticated ? (
                  <Link
                    to="/account"
                    className="flex items-center space-x-2 px-4 py-3 bg-amber-100 rounded-lg text-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">Akun Saya</span>
                  </Link>
                ) : (
                  <div className="flex space-x-2 px-4">
                    <Link
                      to="/login"
                      className="flex-1 text-center py-2.5 border border-slate-300 text-slate-700 rounded-full text-sm font-medium hover:bg-amber-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Masuk
                    </Link>
                    <Link
                      to="/register"
                      className="flex-1 text-center py-2.5 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Daftar
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
