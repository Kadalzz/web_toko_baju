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
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import OrderForm from './pages/OrderForm';
import OrderGuide from './pages/OrderGuide';
import PrintPhoto from './pages/PrintPhoto';
import Printing from './pages/Printing';
import Album from './pages/Album';
import AlbumBag from './pages/AlbumBag';
import Figura from './pages/Figura';
import Flashdisk from './pages/Flashdisk';
import WallDecor from './pages/WallDecor';
import WeddingBook from './pages/WeddingBook';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        
        {/* Products */}
        <Route path="products" element={<Products />} />
        <Route path="products/:productId" element={<ProductDetail />} />
        <Route path="products/clothing/:productId" element={<ClothingProductDetail />} />
        
        {/* Photo Services */}
        <Route path="cetak-foto" element={<PrintPhoto />} />
        <Route path="printing" element={<Printing />} />
        
        {/* Product Categories */}
        <Route path="album" element={<Album />} />
        <Route path="album-bag" element={<AlbumBag />} />
        <Route path="figura" element={<Figura />} />
        <Route path="flashdisk" element={<Flashdisk />} />
        <Route path="wall-decor" element={<WallDecor />} />
        <Route path="wedding-book" element={<WeddingBook />} />
        
        {/* Order */}
        <Route path="order" element={<OrderForm />} />
        <Route path="panduan-order" element={<OrderGuide />} />
        <Route path="checkout" element={<Checkout />} />
        
        {/* Info Pages */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="kebijakan-privasi" element={<Privacy />} />
        <Route path="syarat-ketentuan" element={<Terms />} />
      </Route>
      
      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
