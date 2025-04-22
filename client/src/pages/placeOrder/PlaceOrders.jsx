import React from 'react'

const PlaceOrders = () => {
    const[order, setOrder]=useState()

    const handleCheckout = async () => {
        try {
          const res = await fetch('/api/v1/orders', {
            method: 'POST',
            credentials: 'include',
          });
    
          if (res.ok) {
            alert('Order placed successfully!');
            clearCart();
            navigate('/');
          } else {
            alert('Order failed');
          }
        } catch (err) {
          console.error('Checkout error:', err);
          alert('Something went wrong during checkout.');
        }
      };

  return (
    <div>PlaceOrders</div>
  )
}

export default PlaceOrders