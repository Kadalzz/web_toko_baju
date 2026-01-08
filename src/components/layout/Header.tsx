import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Search, Heart } from 'lucide-react';
import { NavLink as NavLinkType } from '../../types';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { items, openCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

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
    <header className="bg-black text-white sticky top-0 z-50">
      {/* Main Header */}
      <div className="container mx-auto px-4 md:px-6">
        {/* Top Row - Logo Centered with Icons on Right */}
        <div className="flex items-center justify-between py-6 border-b border-gray-800">
          {/* Spacer for mobile */}
          <div className="w-10 md:w-0"></div>
          
          {/* Logo - Centered */}
          <Link to="/" className="flex items-center space-x-3">
            <ShoppingBag className="h-10 w-10 md:h-12 md:w-12 text-white" />
            <span className="text-3xl md:text-5xl font-bold text-white tracking-widest">ALBA GANTI BAJU</span>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-300 hover:text-white transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="p-2 text-gray-300 hover:text-white transition-colors hidden md:block"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <button 
              onClick={openCart}
              className="p-2 text-gray-300 hover:text-white transition-colors relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* User - Desktop */}
            {isAuthenticated ? (
              <Link 
                to="/account" 
                className="p-2 text-gray-300 hover:text-white transition-colors hidden md:flex items-center space-x-2"
              >
                <User className="h-5 w-5" />
                <span className="text-sm">{user?.full_name?.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="hidden md:block px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors text-sm font-semibold"
              >
                Masuk
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Bottom Row - Navigation Menu Centered */}
        <nav className="hidden md:flex items-center justify-center space-x-8 py-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-white font-medium text-lg border-b-2 border-white pb-1'
                  : 'text-gray-300 hover:text-white transition-colors duration-200 text-lg'
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Search Bar (Expandable) */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-800">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-black rounded-r-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                Cari
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black py-4 px-2 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-white font-medium px-2 py-1 border-l-2 border-white'
                      : 'text-gray-300 hover:text-white transition-colors duration-200 px-2 py-1'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="border-t border-gray-800 pt-4 mt-4">
                {isAuthenticated ? (
                  <Link
                    to="/account"
                    className="flex items-center space-x-2 px-2 py-1 text-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Akun Saya</span>
                  </Link>
                ) : (
                  <div className="flex space-x-2 px-2">
                    <Link
                      to="/login"
                      className="flex-1 text-center py-2 bg-white text-black rounded font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Masuk
                    </Link>
                    <Link
                      to="/register"
                      className="flex-1 text-center py-2 border border-white text-white rounded"
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
