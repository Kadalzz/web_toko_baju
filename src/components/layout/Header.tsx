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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-primary-700">Robby <span className="text-accent">Fashion</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary-600 font-medium'
                    : 'text-gray-600 hover:text-primary-600 transition-colors duration-200'
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors hidden md:block"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <button 
              onClick={openCart}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* User */}
            {isAuthenticated ? (
              <Link 
                to="/account" 
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors hidden md:flex items-center space-x-2"
              >
                <User className="h-5 w-5" />
                <span className="text-sm">{user?.full_name?.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="hidden md:block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
              >
                Masuk
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar (Expandable) */}
        {isSearchOpen && (
          <div className="py-4 border-t">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition-colors"
              >
                Cari
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-2 border-t">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-primary-600 font-medium px-2 py-1'
                      : 'text-gray-600 hover:text-primary-600 transition-colors duration-200 px-2 py-1'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="border-t pt-4 mt-4">
                {isAuthenticated ? (
                  <Link
                    to="/account"
                    className="flex items-center space-x-2 px-2 py-1 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Akun Saya</span>
                  </Link>
                ) : (
                  <div className="flex space-x-2 px-2">
                    <Link
                      to="/login"
                      className="flex-1 text-center py-2 bg-primary-600 text-white rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Masuk
                    </Link>
                    <Link
                      to="/register"
                      className="flex-1 text-center py-2 border border-primary-600 text-primary-600 rounded-lg"
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
