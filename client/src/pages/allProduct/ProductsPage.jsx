import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/v1/products');
        const data = await res.json();
        console.log(data);        
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <h2>All Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <Link
              to={`/products/${product._id}`}
              className="product-card"
              key={product._id}
            >
              <img src={product.images[0]} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p><strong>${product.price}</strong></p>
              <p>Stock: {product.stock}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
