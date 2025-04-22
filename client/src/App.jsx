import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { AuthProvider } from "./context/AuthContext";
import Navbar from './components/Navbar';
import ProductsPage from './pages/allProduct/ProductsPage';
import ProductDetailPage from './pages/singleProduct/ProductDetailPage';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <Router>
        <Navbar/>
        <Routes>
        {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage/>} />
          <Route path="/cart" element={<CartPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App
