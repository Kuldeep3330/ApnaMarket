import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { isAuthenticated } = useAuth();

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await axios.get('/api/v1/cart', { withCredentials: true });
      setCartItems(res.data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await axios.post(
        '/api/v1/cart',
        { productId, quantity },
        { withCredentials: true }
      );
      fetchCart();
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('/api/v1/cart', { withCredentials: true });
      setCartItems([]);
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  return (
    <CartContext.Provider value={{ cartItems, fetchCart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
