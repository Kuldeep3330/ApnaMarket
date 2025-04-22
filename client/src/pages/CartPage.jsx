import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CartPage.css';

const CartPage = ({ cart, removeFromCart, clearCart }) => {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("userToken");
  
      const res = await axios.post(
        '/api/v1/orders',
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
  
      if (res.status >= 200 && res.status<300) {
        alert('Order placed successfully!');
        clearCart();
      } else {
        alert('Order failed');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong during checkout.');
    }
  };
    

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0).toFixed(2);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item, idx) => (
              <li key={idx} className="cart-item">
                <img
                  src={item.product.images?.[0] || '/fallback.jpg'}
                  alt={item.product.title || 'Product'}
                />
                <div>
                  <h4>{item.product.title}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.product.price}</p>
                  <button onClick={() => removeFromCart(item.product._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <h3>Total: ₹{totalPrice}</h3>

          <div className="cart-actions">
            <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
