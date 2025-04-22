import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetailPage.css';
import axios from 'axios';

const ProductDetailPage = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/v1/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

 

const handleAddToCartAPICall = async (productId,quantity ) => {
  const token = localStorage.getItem('userToken');

  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/cart/',
      {
        productId, 
        quantity
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      }
    );

    console.log('Item added to cart:', response.data);
    alert('Item added to cart!');
  } catch (error) {
    console.error('Failed to add to cart:', error);
    alert('Failed to add item to cart.');
  }
};


  const handleAddToCart = () => {
    if (product && quantity <= product.stock) {

      handleAddToCartAPICall(product, quantity)

      addToCart(product, quantity);
      alert(`${quantity} item(s) added to cart!`);
    } else {
      alert("Not enough stock available!");
    }
  };

  const increaseQty = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQty = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) return <div className="product-detail-container"><p>Loading...</p></div>;
  if (!product) return <div className="product-detail-container"><p>Product not found</p></div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="product-images">
          {product.images?.map((img, idx) => (
            <img key={idx} src={img} alt={`${product.title} ${idx + 1}`} className="product-image" />
          ))}
        </div>

        <div className="product-info">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h3>₹{product.price}</h3>
          <p>Stock: {product.stock}</p>

          <div className="quantity-controls">
            <button onClick={decreaseQty}>−</button>
            <span>{quantity}</span>
            <button onClick={increaseQty}>+</button>
          </div>

          <button onClick={handleAddToCart} className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
