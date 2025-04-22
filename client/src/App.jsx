import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { AuthProvider } from "./context/AuthContext";
import Navbar from './components/Navbar';
import ProductsPage from './pages/allProduct/ProductsPage';
import ProductDetailPage from './pages/singleProduct/ProductDetailPage';
import CartPage from './pages/CartPage';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [cart, setCart] = useState([]);
  const handleFetchCart = async () => {
    const token = localStorage.getItem('userToken');
  
    try {
      const response = await axios.get('http://localhost:3001/api/v1/cart/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      console.log('Cart Data:', response.data);
      setCart(response.data);

    } catch (error) {
      console.error('Error fetching cart:', error);
      alert('Failed to fetch cart.');
    }
  };

  useEffect(()=>{
    handleFetchCart()

  },[])
  
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

  const handleRemoveCartItem = async (itemId) => {
    const token = localStorage.getItem('userToken');
  
    try {
      const response = await axios.delete(`http://localhost:3001/api/v1/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      console.log('Item removed from cart:', response.data);
      alert('Item removed successfully!');
    } catch (error) {
      console.error('Failed to remove item:', error);
      alert('Failed to remove item from cart.');
    }
  };

  
  const removeFromCart = (productId) => {
    handleRemoveCartItem(productId)
    setCart((prevCart) => prevCart.filter(item => item.product._id !== productId));
  };

  const handleClearCart = async () => {
    const token = localStorage.getItem('userToken');
  
    try {
      const response = await axios.delete('http://localhost:3001/api/v1/cart/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      console.log('Cart cleared:', response.data);
      alert('Cart cleared successfully!');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      alert('Failed to clear cart.');
    }
  };

  const clearCart = () => {
    handleClearCart();
    setCart([])
  }; 
  
  
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App
