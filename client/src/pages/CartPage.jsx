import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, fetchCart } = useCart();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart().finally(() => setLoading(false));
  }, []);

  const handleRemove = async (itemId) => {
    await fetch(`/api/v1/cart/${itemId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    fetchCart();
  };

  const handleClearCart = async () => {
    await fetch('/api/v1/cart', {
      method: 'DELETE',
      credentials: 'include',
    });
    fetchCart();
  };

  const handleCheckout = async () => {
    const res = await fetch('/api/v1/orders', {
      method: 'POST',
      credentials: 'include',
    });

    if (res.ok) {
      alert('Order placed successfully!');
      fetchCart();
      navigate('/');
    } else {
      alert('Order failed');
    }
  };

  if (loading) return <div>Loading...</div>;

  // Handle cart not loaded properly
  if (!Array.isArray(cart)) return <div>Cart failed to load.</div>;

  const totalPrice = cart.reduce((acc, item) => {
    if (item?.productId && item.productId.price != null) {
      return acc + item.quantity * item.productId.price;
    }
    return acc;
  }, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item) =>
              item?.productId ? (
                <li key={item._id} className="cart-item">
                  <img
                    src={item.productId.images?.[0]}
                    alt={item.productId.title}
                  />
                  <div>
                    <h4>{item.productId.title}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.productId.price}</p>
                    <button onClick={() => handleRemove(item._id)}>Remove</button>
                  </div>
                </li>
              ) : null
            )}
          </ul>
          <h3>Total: ₹{totalPrice}</h3>
          <div className="cart-actions">
            <button className="clear-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
