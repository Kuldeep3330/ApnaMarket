import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { AuthProvider } from "./context/AuthContext";
import Navbar from './components/Navbar';
import ProductsPage from './pages/allProduct/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage/>} />
          <Route path="/cart" element={<CartPage />} />
          {/* Add your protected and home routes here */}
        </Routes>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App
