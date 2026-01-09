import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, MapPin, Heart, Settings, LogOut, Edit2, Trash2, Plus, Check } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../lib/supabase';

interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  is_default: boolean;
}

interface Order {
  id: string;
  order_number: string;
  total: number;
  order_status: string;
  payment_status: string;
  created_at: string;
}

type TabType = 'profile' | 'orders' | 'addresses' | 'wishlist' | 'settings';

const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  
  // Profile state
  const [profileData, setProfileData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderFilter, setOrderFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  
  // Addresses state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  
  // Wishlist state
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      loadOrders();
      loadAddresses();
      loadWishlist();
    }
  }, [user]);

  // Auto-refresh orders setiap 15 detik ketika di tab orders
  useEffect(() => {
    if (activeTab !== 'orders' || !user) return;

    const interval = setInterval(() => {
      loadOrders();
    }, 15000); // 15 detik

    return () => clearInterval(interval);
  }, [activeTab, user]);

  // Real-time subscription untuk order updates
  useEffect(() => {
    if (!user) return;

    console.log('🔔 Setting up real-time subscription for orders');

    // Subscribe to changes in orders table
    const channel = supabase
      .channel('orders-changes-' + Date.now())
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          console.log('🔔 Order changed:', payload);
          console.log('Event type:', payload.eventType);
          console.log('New data:', payload.new);
          console.log('Old data:', payload.old);
          
          // Force reload orders when any change occurs
          console.log('⚡ Triggering order reload...');
          loadOrders().then(() => {
            setLastUpdate(new Date());
            console.log('✅ Orders reloaded successfully');
          });
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
        if (status === 'SUBSCRIBED') {
          console.log('✅ Real-time subscription active!');
        }
      });

    // Cleanup subscription on unmount
    return () => {
      console.log('🔕 Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [user]);

  const loadOrders = async () => {
    try {
      setIsRefreshing(true);
      
      console.log('=== LOADING ORDERS ===');
      console.log('User from store:', user);
      
      // Try to get auth user
      const { data: { user: authUser } } = await supabase.auth.getUser();
      console.log('Auth user:', authUser);
      
      // Use store user if auth fails
      const currentUser = authUser || user;
      
      if (!currentUser) {
        console.error('No user found in auth or store');
        setOrders([]);
        return;
      }

      console.log('Using user:', currentUser.id, currentUser.email);

      // Strategy 1: Try to find customer by user_id
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', currentUser.id)
        .single();

      if (!customerError && customerData) {
        console.log('✅ Found customer by user_id:', customerData.id);
        
        // Load orders by customer_id
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('customer_id', customerData.id)
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          console.log('✅ Loaded orders:', data.length, data);
          // Force new array reference to trigger re-render
          setOrders([...data]);
          setLastUpdate(new Date());
          return;
        }
      }

      console.log('⚠️ No customer found by user_id, trying fallback...');

      // Strategy 2: Find customer by email/phone and try to link
      const { data: customerByContact, error: contactError } = await supabase
        .from('customers')
        .select('id, user_id')
        .or(`email.eq.${user?.email},phone.eq.${user?.phone}`)
        .single();

      if (!contactError && customerByContact) {
        console.log('Found customer by contact:', customerByContact);
        
        // If customer exists but no user_id, link it
        if (!customerByContact.user_id && currentUser.id) {
          console.log('🔗 Linking customer to user...');
          const { error: updateError } = await supabase
            .from('customers')
            .update({ user_id: currentUser.id })
            .eq('id', customerByContact.id);
          
          if (updateError) {
            console.error('Failed to link customer:', updateError);
          } else {
            console.log('✅ Successfully linked customer to user');
          }
        }
        
        // Load orders by customer_id
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('customer_id', customerByContact.id)
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          console.log('✅ Loaded orders via contact:', data.length, data);
          // Force new array reference to trigger re-render
          setOrders([...data]);
          setLastUpdate(new Date());
          return;
        }
      }

      console.log('⚠️ No customer found, trying direct phone/email match...');

      // Strategy 3: Direct match with shipping phone/email (last resort)
      if (user?.phone || user?.email) {
        const conditions = [];
        if (user?.phone) conditions.push(`shipping_phone.eq.${user.phone}`);
        if (user?.email) conditions.push(`shipping_email.eq.${user.email}`);
        
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .or(conditions.join(','))
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          console.log('✅ Loaded orders via direct match:', data.length, data);
          // Force new array reference to trigger re-render
          setOrders([...data]);
          setLastUpdate(new Date());
          return;
        } else {
          console.error('Direct match error:', error);
        }
      }

      console.log('❌ No orders found with any strategy');
      setOrders([]);
      
    } catch (err) {
      console.error('Error loading orders:', err);
      setOrders([]);
    } finally {
      setIsRefreshing(false);
    }
  };

  const loadAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user?.id)
        .order('is_default', { ascending: false });
      
      if (!error && data) {
        setAddresses(data);
      }
    } catch (err) {
      console.error('Error loading addresses:', err);
    }
  };

  const loadWishlist = async () => {
    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select('*, product:products(*)')
        .eq('user_id', user?.id);
      
      if (!error && data) {
        setWishlist(data);
      }
    } catch (err) {
      console.error('Error loading wishlist:', err);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: profileData.full_name,
          phone: profileData.phone
        })
        .eq('id', user?.id);

      if (error) throw error;

      await updateProfile(profileData);
      setIsEditingProfile(false);
      alert('Profil berhasil diperbarui!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Gagal memperbarui profil');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orderFilter === 'all' 
    ? orders 
    : orders.filter(o => o.order_status === orderFilter);

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'orders', label: 'Pesanan', icon: Package },
    { id: 'addresses', label: 'Alamat', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Akun Saya</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-center pb-4 border-b">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{user?.full_name}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              
              <nav className="mt-4 space-y-1">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Informasi Profil</h2>
                    {!isEditingProfile && (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="flex items-center text-primary-600 hover:text-primary-700"
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={profileData.full_name}
                        onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                        disabled={!isEditingProfile}
                        className={`w-full px-4 py-2 border rounded-lg ${
                          isEditingProfile ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        disabled
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        disabled={!isEditingProfile}
                        className={`w-full px-4 py-2 border rounded-lg ${
                          isEditingProfile ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                      />
                    </div>

                    {isEditingProfile && (
                      <div className="flex space-x-3 pt-4">
                        <button
                          onClick={handleSaveProfile}
                          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                          Simpan
                        </button>
                        <button
                          onClick={() => {
                            setIsEditingProfile(false);
                            setProfileData({
                              full_name: user?.full_name || '',
                              email: user?.email || '',
                              phone: user?.phone || ''
                            });
                          }}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          Batal
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Riwayat Pesanan</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Pesanan akan muncul di sini setelah dikonfirmasi oleh admin
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Terakhir diperbarui: {lastUpdate.toLocaleTimeString('id-ID')}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {isRefreshing && (
                        <span className="text-sm text-gray-500 flex items-center">
                          <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Memperbarui...
                        </span>
                      )}
                      <button
                        onClick={loadOrders}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        🔄 Refresh
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4 flex space-x-2 overflow-x-auto pb-2">
                    {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                      <button
                        key={status}
                        onClick={() => setOrderFilter(status)}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                          orderFilter === status
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {status === 'all' ? 'Semua' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {filteredOrders.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium mb-2">
                          {orders.length === 0 ? 'Belum ada pesanan' : 'Tidak ada pesanan dengan filter ini'}
                        </p>
                        {orders.length === 0 && (
                          <div className="mt-4 text-sm text-gray-600 space-y-2">
                            <p>📱 Pesanan melalui WhatsApp akan muncul di sini setelah:</p>
                            <ol className="list-decimal list-inside space-y-1 mt-2">
                              <li>Anda menyelesaikan checkout dan mengirim pesan ke WhatsApp</li>
                              <li>Admin mengonfirmasi pesanan Anda</li>
                            </ol>
                            <p className="mt-3 text-primary-600">Halaman ini diperbarui otomatis setiap 15 detik</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      filteredOrders.map(order => (
                        <div key={`${order.id}-${order.order_status}-${order.payment_status}`} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold text-gray-900">{order.order_number}</p>
                              <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                            </div>
                            <div className="text-right space-y-1">
                              <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.order_status)}`}>
                                  {order.order_status}
                                </span>
                              </div>
                              <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                  order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.payment_status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t">
                            <span className="text-sm text-gray-600">Total:</span>
                            <span className="font-bold text-primary-600">{formatPrice(order.total)}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Alamat Saya</h2>
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Tambah Alamat
                    </button>
                  </div>

                  <div className="space-y-4">
                    {addresses.length === 0 ? (
                      <div className="text-center py-12">
                        <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Belum ada alamat tersimpan</p>
                      </div>
                    ) : (
                      addresses.map(address => (
                        <div key={address.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-900">{address.label}</span>
                              {address.is_default && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-primary-600 hover:text-primary-700">
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-900">{address.name}</p>
                          <p className="text-sm text-gray-600">{address.phone}</p>
                          <p className="text-sm text-gray-600 mt-2">
                            {address.address}, {address.city}, {address.province} {address.postal_code}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Produk Favorit</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.length === 0 ? (
                      <div className="col-span-full text-center py-12">
                        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Belum ada produk favorit</p>
                      </div>
                    ) : (
                      wishlist.map(item => (
                        <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <img
                            src={item.product?.image || 'https://placehold.co/300x400'}
                            alt={item.product?.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900">{item.product?.name}</h3>
                            <p className="text-primary-600 font-bold mt-2">
                              {formatPrice(item.product?.price)}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Pengaturan</h2>
                  
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Akun</h3>
                      <button
                        onClick={handleLogout}
                        className="flex items-center text-red-600 hover:text-red-700"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Keluar dari Akun
                      </button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Notifikasi</h3>
                      <div className="space-y-2">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Email Pesanan</span>
                          <input type="checkbox" className="rounded" defaultChecked />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Promosi & Penawaran</span>
                          <input type="checkbox" className="rounded" defaultChecked />
                        </label>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Bahasa</h3>
                      <select className="w-full px-4 py-2 border rounded-lg">
                        <option>Indonesia</option>
                        <option>English</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
