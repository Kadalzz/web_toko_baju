import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ClothingProductDetail from './pages/ClothingProductDetail';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import OrderForm from './pages/OrderForm';
import OrderGuide from './pages/OrderGuide';
import Categories from './pages/Categories';
import OrderStatus from './pages/OrderStatus';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        
        {/* Products */}
        <Route path="products" element={<Products />} />
        <Route path="products/:productId" element={<ProductDetail />} />
        <Route path="products/clothing/:productId" element={<ClothingProductDetail />} />
        
        {/* Categories */}
        <Route path="categories" element={<Categories />} />
        <Route path="categorize" element={<Categories />} />
        <Route path="kategori/:categorySlug" element={<Products />} />
        
        {/* Order */}
        <Route path="order" element={<OrderForm />} />
        <Route path="panduan-order" element={<OrderGuide />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-status" element={<OrderStatus />} />
        <Route path="lacak-pesanan" element={<OrderStatus />} />
        
        {/* Info Pages */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="kebijakan-privasi" element={<Privacy />} />
        <Route path="syarat-ketentuan" element={<Terms />} />
        
        {/* Account */}
        <Route path="account" element={<Account />} />
      </Route>
      
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
