import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, LogOut, User, Package, ExternalLink, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Order {
  id: string;
  order_id: string;
  customer_details: string;
  drive_link: string;
  date: string;
  status: string;
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

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('order_id', orderId);

      if (error) {
        throw error;
      }

      const updatedOrders = orders.map(order => 
        order.order_id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      
      console.log('Status berhasil diupdate');
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Gagal mengupdate status pesanan. Silakan coba lagi.');
    }
  };

  const parseCustomerDetails = (customerDetails: string) => {
    try {
      const parsed = JSON.parse(customerDetails);
      return {
        name: parsed.name || 'N/A',
        email: parsed.email || 'N/A',
        whatsapp: parsed.whatsapp || parsed.phone || 'N/A'
      };
    } catch {
      return {
        name: customerDetails,
        email: 'N/A',
        whatsapp: 'N/A'
      };
    }
  };

  const filteredOrders = orders.filter(order => {
    const customerData = parseCustomerDetails(order.customer_details);
    const matchesSearch = 
      order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerData.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerData.whatsapp.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUniqueCustomers = () => {
    const customerEmails = new Set();
    orders.forEach(order => {
      const customerData = parseCustomerDetails(order.customer_details);
      if (customerData.email !== 'N/A') {
        customerEmails.add(customerData.email);
      }
    });
    return customerEmails.size;
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
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Package className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Orders
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
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
                  <FileText className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Orders
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {orders.filter(order => order.status === 'pending').length}
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
                  <Package className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Processing Orders
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {orders.filter(order => order.status === 'processing').length}
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
                  <User className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Customers
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {getUniqueCustomers()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
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
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Drive Link
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => {
                    const customerData = parseCustomerDetails(order.customer_details);
                    return (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.order_id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{customerData.name}</div>
                          <div className="text-sm text-gray-500">{customerData.email}</div>
                          <div className="text-sm text-gray-500">{customerData.whatsapp}</div>
                        </td>
                        <td className="px-6 py-4">
                          {order.drive_link ? (
                            <a
                              href={order.drive_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-900 inline-flex items-center text-sm"
                            >
                              View Files
                              <ExternalLink size={14} className="ml-1" />
                            </a>
                          ) : (
                            <span className="text-gray-400 text-sm">No link</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.date || order.created_at).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.order_id, e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
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