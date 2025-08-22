// src/app/components/AllProducts.js
"use client";

import React, { useEffect, useState } from 'react';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.error("Failed to fetch all products:", e);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchAllProducts();
  }, []);

  if (loading) return <p>Loading all products...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div>
      <h2>All Products</h2>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img 
              src={product.image} 
              alt={product.title} 
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/128x128/CCCCCC/000000?text=No+Image`; }}
            />
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
