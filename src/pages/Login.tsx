import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({
        email: formData.email,
        password: formData.password
      });

      alert('Login berhasil!');
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Email atau password salah. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-cream-200 to-cream-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary-100">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Hero */}
          <div className="md:w-1/2 bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 p-12 flex flex-col justify-between relative overflow-hidden">
            <div>
              <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-8">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Kembali ke website
              </Link>
              
              <div className="flex items-center space-x-2 mb-12">
                <ShoppingBag className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold text-white">Alba Ganti Baju</span>
              </div>
            </div>

            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                Selamat Datang
                <br />
                Kembali
              </h1>
              <p className="text-purple-200 text-lg">
                Login untuk melanjutkan belanja Anda
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full -mr-32 -mb-32"></div>
            <div className="absolute top-1/2 right-0 w-48 h-48 bg-accent/10 rounded-full -mr-24"></div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-1/2 p-8 md:p-12 bg-cream-50">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-primary-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Masuk ke Akun Anda
              </h2>
              <p className="text-taupe-600 mb-8 font-lato">
                Belum punya akun?{' '}
                <Link
                  to="/register"
                  className="text-accent hover:text-accent-dark font-medium"
                >
                  Daftar sekarang
                </Link>
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-primary-200 rounded-lg text-primary-800 placeholder-taupe-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent font-lato"
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-primary-200 rounded-lg text-primary-800 placeholder-taupe-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent font-lato"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-taupe-500 hover:text-primary-800"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-primary-300 bg-white text-accent focus:ring-accent"
                    />
                    <span className="ml-2 text-sm text-taupe-600 font-lato">Ingat saya</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-accent hover:text-accent-dark font-lato">
                    Lupa password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-accent hover:bg-accent-dark text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-card hover:shadow-card-hover"
                >
                  {isLoading ? 'Memproses...' : 'Masuk'}
                </button>

                <div className="text-center mt-6">
                  <p className="text-taupe-600 text-sm font-lato">
                    Admin?{' '}
                    <Link to="/admin/login" className="text-accent hover:text-accent-dark font-medium">
                      Login sebagai Admin
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
