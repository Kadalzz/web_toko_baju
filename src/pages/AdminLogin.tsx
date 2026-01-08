import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded admin credentials
  const ADMIN_EMAIL = 'admin@albagantibaju.com';
  const ADMIN_PASSWORD = 'admin123';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isLogin) {
        // Login logic
        if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
          sessionStorage.setItem('adminAuth', 'true');
          navigate('/admin/dashboard');
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        // Register logic
        if (!formData.agreeToTerms) {
          throw new Error('Please agree to Terms & Conditions');
        }
        // In real app, would create account here
        setIsLogin(true);
        setFormData({ ...formData, password: '' });
        alert('Account created! Please log in.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert('Google login will be implemented');
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
                Back to website
              </Link>
              
              <div className="flex items-center space-x-2 mb-12">
                <ShoppingBag className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold text-white">Alba Ganti Baju</span>
              </div>
            </div>

            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                Fashion Terbaik,
                <br />
                Harga Terjangkau
              </h1>
              <p className="text-purple-200 text-lg">
                Temukan style yang sempurna untuk setiap momen
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
                {isLogin ? 'Welcome back' : 'Create an account'}
              </h2>
              <p className="text-taupe-600 mb-8 font-lato">
                {isLogin ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      onClick={() => setIsLogin(false)}
                      className="text-accent hover:text-accent-dark font-medium"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => setIsLogin(true)}
                      className="text-accent hover:text-accent-dark font-medium"
                    >
                      Log in
                    </button>
                  </>
                )}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required={!isLogin}
                        className="w-full px-4 py-3 bg-white border border-primary-200 rounded-lg text-primary-800 placeholder-taupe-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent font-lato"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required={!isLogin}
                        className="w-full px-4 py-3 bg-white border border-primary-200 rounded-lg text-primary-800 placeholder-taupe-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent font-lato"
                      />
                    </div>
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
                    placeholder="Enter your password"
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

                {!isLogin && (
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border-primary-300 bg-white text-accent focus:ring-accent"
                    />
                    <label htmlFor="agreeToTerms" className="ml-2 text-sm text-taupe-600 font-lato">
                      I agree to the{' '}
                      <Link to="/syarat-ketentuan" className="text-accent hover:text-accent-dark">
                        Terms & Conditions
                      </Link>
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-accent hover:bg-accent-dark text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-card hover:shadow-card-hover"
                >
                  {isLoading ? 'Loading...' : isLogin ? 'Log in' : 'Create account'}
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-primary-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-cream-50 text-taupe-600 font-lato">
                      Or {isLogin ? 'login' : 'register'} with
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full py-3 bg-white hover:bg-cream-100 border border-primary-200 text-primary-800 font-medium rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
