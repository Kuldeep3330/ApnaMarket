import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const initialState = [];

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;
    case 'ADD_ITEM':
      return [...state, action.payload];
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated } = useAuth();

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await axios.get('/api/v1/cart', { withCredentials: true });
      dispatch({ type: 'SET_CART', payload: res.data });
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  const addToCart = async (productId, quantity = 1) => {  ///failing
    try {
      const res = await axios.post('/api/v1/cart', { productId, quantity }, { withCredentials: true });
      fetchCart(); // Sync with backend
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`/api/v1/cart/${itemId}`, { withCredentials: true });
      fetchCart();
    } catch (err) {
      console.error('Failed to remove from cart:', err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('/api/v1/cart', { withCredentials: true });
      dispatch({ type: 'CLEAR_CART' });
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
