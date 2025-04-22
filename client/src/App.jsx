import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { AuthProvider } from "./context/AuthContext";
import Navbar from './components/Navbar';
import ProductsPage from './pages/allProduct/ProductsPage';
import ProductDetailPage from './pages/singleProduct/ProductDetailPage';
// import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import { useState } from 'react';







function App() {
  const [cart, setCart] = useState([]);
  const addToCart = (product, quantity) => {
    
  
    setCart((prevCart) => {
      const index = prevCart.findIndex(item => item.product._id === product._id);
      if (index !== -1) {
        const updated = [...prevCart];
        updated[index].quantity += quantity;
        return updated;
      }
      return [...prevCart, { product, quantity }];
    });
  };
  
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.product._id !== productId));
  };
  
  const clearCart = () => setCart([]);
  return (
    <AuthProvider>
      {/* <CartProvider> */}
      <Router>
        <Navbar/>
        <Routes>
        {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<ProductsPage />} />
           
          <Route path="/products/:id" element={
          <ProductDetailPage addToCart={addToCart} />
          } />
          <Route path="/cart" element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          } />
          
          
        </Routes>
      </Router>
      {/* </CartProvider> */}
    </AuthProvider>
  );
}

export default App
