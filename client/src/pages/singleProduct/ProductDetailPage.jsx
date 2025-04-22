import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Access addToCart from context

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

  const handleAddToCart = () => {
    addToCart(product._id, 1);
  };

  if (loading) return <div className="product-detail-container"><p>Loading...</p></div>;
  if (!product) return <div className="product-detail-container"><p>Product not found</p></div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img src={product.images[0]} alt={product.title} className="product-image" />
        <div className="product-info">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h3>${product.price}</h3>
          <p>Stock: {product.stock}</p>
          <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
