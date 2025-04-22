// // import { createContext, useContext, useReducer, useEffect } from 'react';
// // import axios from 'axios';
// // import { useAuth } from './AuthContext';

// // const CartContext = createContext();
// // export const useCart = () => useContext(CartContext);

// // const initialState = [];

// // const cartReducer = (state, action) => {
// //   switch (action.type) {
// //     case 'SET_CART':
// //       return action.payload;

// //     case 'ADD_ITEM':
// //       const existingIndex = state.findIndex(
// //         (item) => item.productId === action.payload.productId
// //       );
// //       if (existingIndex !== -1) {
// //         const updatedCart = [...state];
// //         updatedCart[existingIndex].quantity += action.payload.quantity;
// //         return updatedCart;
// //       } else {
// //         return [...state, action.payload];
// //       }

// //     case 'REMOVE_ITEM':
// //       return state.filter((item) => item._id !== action.payload);

// //     case 'CLEAR_CART':
// //       return [];

// //     default:
// //       return state;
// //   }
// // };

// // export const CartProvider = ({ children }) => {
// //   const [cart, dispatch] = useReducer(cartReducer, initialState);
// //   const { isAuthenticated } = useAuth();

// //   const fetchCart = async () => {
// //     if (!isAuthenticated) return;
// //     try {
// //       const res = await axios.get('/api/v1/cart', { withCredentials: true });
// //       dispatch({ type: 'SET_CART', payload: res.data });
// //     } catch (err) {
// //       console.error('Failed to fetch cart:', err);
// //     }
// //   };

// //   const addToCart = async (productId, quantity = 1) => {
// //     try {
// //       const res = await axios.post(
// //         '/api/v1/cart',
// //         { productId, quantity },
// //         { withCredentials: true }
// //       );
// //       fetchCart(); // Always fetch fresh copy from server
// //     } catch (err) {
// //       console.error('Failed to add to cart:', err);
// //     }
// //   };

// //   const removeFromCart = async (itemId) => {
// //     try {
// //       await axios.delete(`/api/v1/cart/${itemId}`, { withCredentials: true });
// //       dispatch({ type: 'REMOVE_ITEM', payload: itemId });
// //     } catch (err) {
// //       console.error('Failed to remove item from cart:', err);
// //     }
// //   };

// //   const clearCart = async () => {
// //     try {
// //       await axios.delete('/api/v1/cart', { withCredentials: true });
// //       dispatch({ type: 'CLEAR_CART' });
// //     } catch (err) {
// //       console.error('Failed to clear cart:', err);
// //     }
// //   };

// //   useEffect(() => {
// //     if (isAuthenticated) {
// //       fetchCart();
// //     } else {
// //       dispatch({ type: 'CLEAR_CART' });
// //     }
// //   }, [isAuthenticated]);

// //   return (
// //     <CartContext.Provider
// //       value={{ cart, fetchCart, addToCart, removeFromCart, clearCart }}
// //     >
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };


// import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useAuth } from './AuthContext';

// const CartContext = createContext();

// const initialState = {
//     items: [],
//     loading: false,
//     error: null,
// };

// const cartReducer = (state, action) => {
//     switch (action.type) {
//         case 'SET_CART':
//             return { ...state, items: action.payload, loading: false, error: null };
//         case 'ADD_ITEM':
//             return { ...state, items: [...state.items, action.payload], loading: false, error: null };
//         case 'REMOVE_ITEM':
//             return { ...state, items: state.items.filter(item => item._id !== action.payload), loading: false, error: null };
//         case 'CLEAR_CART':
//             return { ...state, items: [], loading: false, error: null };
//         case 'REQUEST_START':
//             return { ...state, loading: true, error: null };
//         case 'REQUEST_FAILURE':
//             return { ...state, loading: false, error: action.payload };
//         default:
//             return state;
//     }
// };

// export const CartProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(cartReducer, initialState);
//     const { isAuthenticated, user } = useAuth();

//     const fetchCart = useCallback(async () => {
//         if (!isAuthenticated || !user) return;
//         dispatch({ type: 'REQUEST_START' });
//         try {
//             const res = await axios.get('/api/v1/cart', { withCredentials: true });
//             dispatch({ type: 'SET_CART', payload: res.data.cartItems }); // Assuming the cart items are in res.data.cartItems
//         } catch (err) {
//             console.error('Failed to fetch cart:', err);
//             dispatch({ type: 'REQUEST_FAILURE', payload: err.message || 'Failed to fetch cart.' });
//         }
//     }, [isAuthenticated, user]);

//     const addToCart = async (productId, quantity) => {
//         if (!isAuthenticated || !user) {
//             console.error('User not authenticated. Cannot add to cart.');
//             return;
//         }
//         dispatch({ type: 'REQUEST_START' });
//         try {
//             const res = await axios.post('/api/v1/cart', { productId, quantity }, { withCredentials: true });
//             dispatch({ type: 'ADD_ITEM', payload: res.data.cartItem }); // Assuming the added cart item is in res.data.cartItem
//             fetchCart(); // Refresh cart to get updated items
//         } catch (err) {
            
//             console.error('Failed to add to cart:  why you are not working', err);
//             dispatch({ type: 'REQUEST_FAILURE', payload: err.message || 'Failed to add to cart.' });
//         }
//     };

//     const removeFromCart = async (itemId) => {
//         if (!isAuthenticated || !user) {
//             console.error('User not authenticated. Cannot remove from cart.');
//             return;
//         }
//         dispatch({ type: 'REQUEST_START' });
//         try {
//             await axios.delete(`/api/v1/cart/${itemId}`, { withCredentials: true });
//             dispatch({ type: 'REMOVE_ITEM', payload: itemId });
//             fetchCart(); // Refresh cart to get updated items
//         } catch (err) {
//             console.error('Failed to remove from cart:', err);
//             dispatch({ type: 'REQUEST_FAILURE', payload: err.message || 'Failed to remove from cart.' });
//         }
//     };

//     const clearCart = async () => {
//         if (!isAuthenticated || !user) {
//             console.error('User not authenticated. Cannot clear cart.');
//             return;
//         }
//         dispatch({ type: 'REQUEST_START' });
//         try {
//             await axios.delete('/api/v1/cart', { withCredentials: true });
//             dispatch({ type: 'CLEAR_CART' });
//         } catch (err) {
//             console.error('Failed to clear cart:', err);
//             dispatch({ type: 'REQUEST_FAILURE', payload: err.message || 'Failed to clear cart.' });
//         }
//     };

//     useEffect(() => {
//         fetchCart();
//     }, [isAuthenticated, fetchCart]);

//     return (
       
//         // console.log('authenatced status',isAuthenticated, user)
        
//         <CartContext.Provider value={{
//             items: state.items,
//             loading: state.loading,
//             error: state.error,
//             addToCart,
//             removeFromCart,
//             clearCart,
//             fetchCart,       
         


//         }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => useContext(CartContext);




// CartPage.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './CartPage.css';

// const CartPage = ({ cart, removeFromCart, clearCart }) => {
//   const navigate = useNavigate();

//   const handleCheckout = async () => {
//     try {
//       const res = await fetch('/api/v1/orders', {
//         method: 'POST',
//         credentials: 'include',
//       });

//       if (res.ok) {
//         alert('Order placed successfully!');
//         clearCart();
//         navigate('/');
//       } else {
//         alert('Order failed');
//       }
//     } catch (err) {
//       console.error('Checkout error:', err);
//       alert('Something went wrong during checkout.');
//     }
//   };

//   const totalPrice = cart.reduce((acc, item) => {
//     return acc + item.product.price * item.quantity;
//   }, 0);

//   return (
//     <div className="cart-page">
//       <h2>Your Cart</h2>

//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <ul className="cart-items">
//             {cart.map((item, idx) => (
//               <li key={idx} className="cart-item">
//                 <img
//                   src={item.product.images?.[0] || '/fallback.jpg'}
//                   alt={item.product.title || 'Product'}
//                 />
//                 <div>
//                   <h4>{item.product.title}</h4>
//                   <p>Quantity: {item.quantity}</p>
//                   <p>Price: ₹{item.product.price}</p>
//                   <button onClick={() => removeFromCart(item.product._id)}>Remove</button>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           <h3>Total: ₹{totalPrice}</h3>

//           <div className="cart-actions">
//             <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
//             <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartPage;
