import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, LogOut, User, Package, DollarSign, Search, Phone, Trash2, CheckCircle, Bell, ShoppingBag, FolderTree } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Order {
  id: string;
  order_number: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  total: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    checkAuth();
    loadOrders();
  }, []);

  const checkAuth = () => {
    const isAdmin = sessionStorage.getItem('adminAuth') === 'true';
    if (!isAdmin) {
      navigate('/admin/login');
    }
  };

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setOrders(data || []);
    } catch (err) {
      console.error('Error loading orders:', err);
      setError('Gagal memuat data pesanan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const updateOrderStatus = async (orderId: string, newStatus: string, orderNumber: string = '') => {
    try {
      console.log('Updating order status:', { orderId, newStatus });
      
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          order_status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select();

      if (error) {
        console.error('Update error:', error);
        throw error;
      }

      console.log('Update successful:', data);

      // Update local state
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, order_status: newStatus } : order
      );
      setOrders(updatedOrders);
      
      const statusMessages: { [key: string]: string } = {
        'confirmed': `✅ Pesanan ${orderNumber} berhasil dikonfirmasi! Customer akan melihat status ini di akun mereka.`,
        'processing': `📦 Pesanan ${orderNumber} sedang diproses.`,
        'shipped': `🚚 Pesanan ${orderNumber} telah dikirim!`,
        'delivered': `✅ Pesanan ${orderNumber} telah diterima customer.`,
        'cancelled': `❌ Pesanan ${orderNumber} dibatalkan.`
      };
      
      alert(statusMessages[newStatus] || 'Status pesanan berhasil diperbarui!');
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Gagal mengupdate status pesanan. Silakan coba lagi.');
    }
  };

  const confirmOrder = async (orderId: string, orderNumber: string) => {
    if (!confirm(`Konfirmasi pesanan ${orderNumber}?\n\nSetelah dikonfirmasi, customer akan dapat melihat pesanan ini di halaman Akun mereka.`)) {
      return;
    }
    
    await updateOrderStatus(orderId, 'confirmed', orderNumber);
  };

  const updatePaymentStatus = async (orderId: string, newStatus: string) => {
    try {
      console.log('Updating payment status:', { orderId, newStatus });
      
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          payment_status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select();

      if (error) {
        console.error('Update error:', error);
        throw error;
      }

      console.log('Update successful:', data);

      // Update local state
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, payment_status: newStatus } : order
      );
      setOrders(updatedOrders);
      
      alert('Status pembayaran berhasil diperbarui!');
    } catch (err) {
      console.error('Error updating payment status:', err);
      alert('Gagal mengupdate status pembayaran. Silakan coba lagi.');
    }
  };

  const deleteOrder = async (orderId: string, orderNumber: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus pesanan ${orderNumber}? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    try {
      console.log('Deleting order:', { orderId, orderNumber });
      
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }

      console.log('Delete successful');

      // Update local state - remove deleted order
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      
      alert('Pesanan berhasil dihapus!');
    } catch (err) {
      console.error('Error deleting order:', err);
      alert('Gagal menghapus pesanan. Silakan coba lagi.');
    }
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shipping_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shipping_phone?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.order_status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-indigo-100 text-indigo-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'returned':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'confirmed': return 'Dikonfirmasi';
      case 'processing': return 'Diproses';
      case 'shipped': return 'Dikirim';
      case 'delivered': return 'Selesai';
      case 'cancelled': return 'Dibatalkan';
      case 'returned': return 'Dikembalikan';
      default: return status;
    }
  };

  const getPaymentLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Belum Bayar';
      case 'paid': return 'Lunas';
      case 'failed': return 'Gagal';
      case 'refunded': return 'Dikembalikan';
      default: return status;
    }
  };

  const getTotalRevenue = () => {
    return orders
      .filter(o => o.payment_status === 'paid')
      .reduce((sum, order) => sum + order.total, 0);
  };

  const getPendingOrders = () => {
    return orders.filter(o => o.order_status === 'pending').length;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Kelola pesanan dan konfirmasi pembayaran customer</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>

          {/* Quick Navigation */}
          <div className="mt-4 flex space-x-3 border-t pt-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
            >
              <FileText className="w-5 h-5" />
              <span>Pesanan</span>
            </button>
            <button
              onClick={() => navigate('/admin/products')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Kelola Produk</span>
            </button>
            <button
              onClick={() => navigate('/admin/categories')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <FolderTree className="w-5 h-5" />
              <span>Kelola Kategori</span>
            </button>
            <button
              onClick={() => navigate('/admin/seed-data')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
            >
              <Package className="w-5 h-5" />
              <span>Seed Data</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Notification for Pending Orders */}
        {getPendingOrders() > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Ada {getPendingOrders()} pesanan baru menunggu konfirmasi!
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Konfirmasi pesanan agar customer dapat melihatnya di halaman akun mereka.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
            <button 
              onClick={loadOrders}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Coba lagi
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Pesanan
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {orders.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {getPendingOrders()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Revenue
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      {formatPrice(getTotalRevenue())}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by order ID, name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="w-full md:w-48">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Semua Status</option>
                  <option value="pending">Menunggu Konfirmasi</option>
                  <option value="confirmed">Dikonfirmasi</option>
                  <option value="processing">Diproses</option>
                  <option value="shipped">Dikirim</option>
                  <option value="delivered">Selesai</option>
                  <option value="cancelled">Dibatalkan</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Orders ({filteredOrders.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => {
                    return (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.order_number}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{order.shipping_name}</div>
                          <div className="text-sm text-gray-500">{order.shipping_phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatPrice(order.total)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.order_status)}`}>
                            {getStatusLabel(order.order_status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 
                            order.payment_status === 'failed' ? 'bg-red-100 text-red-800' :
                            order.payment_status === 'refunded' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {getPaymentLabel(order.payment_status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="space-y-2">
                            {/* Quick Confirm Button for Pending Orders */}
                            {order.order_status === 'pending' && (
                              <button
                                onClick={() => confirmOrder(order.id, order.order_number)}
                                className="w-full flex items-center justify-center px-3 py-2 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                title="Konfirmasi pesanan"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Konfirmasi
                              </button>
                            )}
                            
                            <select
                              value={order.order_status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value, order.order_number)}
                              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                              <option value="pending">Menunggu Konfirmasi</option>
                              <option value="confirmed">Dikonfirmasi</option>
                              <option value="processing">Diproses</option>
                              <option value="shipped">Dikirim</option>
                              <option value="delivered">Selesai</option>
                              <option value="cancelled">Dibatalkan</option>
                              <option value="returned">Dikembalikan</option>
                            </select>
                            <select
                              value={order.payment_status}
                              onChange={(e) => updatePaymentStatus(order.id, e.target.value)}
                              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                              <option value="pending">Belum Bayar</option>
                              <option value="paid">Lunas</option>
                              <option value="failed">Gagal</option>
                              <option value="refunded">Dikembalikan</option>
                            </select>
                            <button
                              onClick={() => deleteOrder(order.id, order.order_number)}
                              className="w-full flex items-center justify-center px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                              title="Hapus pesanan"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {filteredOrders.length === 0 && !isLoading && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Tidak ada pesanan yang ditemukan.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
