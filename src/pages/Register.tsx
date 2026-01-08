import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

    if (!formData.agreeToTerms) {
      setError('Anda harus menyetujui Syarat & Ketentuan');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    setIsLoading(true);
    console.log('Starting registration for:', formData.email);

    try {
      // Cek apakah email sudah terdaftar
      console.log('Checking if email exists...');
      const { data: existingUsers, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', formData.email)
        .single();

      console.log('Check result:', { existingUsers, checkError });

      // Ignore "not found" error - it means email doesn't exist yet (good!)
      if (existingUsers && !checkError) {
        throw new Error('Email sudah terdaftar. Silakan login.');
      }

      // Simpan user baru ke database
      console.log('Attempting to insert new user...');
      const newUser = {
        email: formData.email,
        password: formData.password,
        full_name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone
      };
      
      console.log('User data to insert:', newUser);

      const { data: insertedData, error: insertError } = await supabase
        .from('users')
        .insert([newUser])
        .select();

      console.log('Insert result:', { insertedData, insertError });

      if (insertError) {
        console.error('Insert error details:', insertError);
        throw new Error(`Gagal mendaftar: ${insertError.message}`);
      }

      console.log('Registration successful!');
      alert('Akun berhasil dibuat! Silakan login.');
      navigate('/login');
    } catch (err: any) {
      console.error('Register error:', err);
      setError(err.message || 'Terjadi kesalahan. Silakan coba lagi.');
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
                Bergabunglah
                <br />
                Bersama Kami
              </h1>
              <p className="text-purple-200 text-lg">
                Daftar sekarang dan nikmati pengalaman belanja yang lebih mudah
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
                Buat Akun Baru
              </h2>
              <p className="text-taupe-600 mb-8 font-lato">
                Sudah punya akun?{' '}
                <Link
                  to="/login"
                  className="text-accent hover:text-accent-dark font-medium"
                >
                  Masuk di sini
                </Link>
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Nama Depan"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-primary-200 rounded-lg text-primary-800 placeholder-taupe-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent font-lato"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Nama Belakang"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-primary-200 rounded-lg text-primary-800 placeholder-taupe-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent font-lato"
                    />
                  </div>
                </div>

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

                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Nomor Telepon"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-primary-200 rounded-lg text-primary-800 placeholder-taupe-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent font-lato"
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password (min. 6 karakter)"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={6}
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
                    Saya setuju dengan{' '}
                    <Link to="/syarat-ketentuan" className="text-accent hover:text-accent-dark">
                      Syarat & Ketentuan
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-accent hover:bg-accent-dark text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-card hover:shadow-card-hover"
                >
                  {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
