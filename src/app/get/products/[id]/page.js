// src/app/components/ProductById.js
"use client";

import React, { useEffect, useState } from 'react';

const ProductById = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setError("No product ID provided.");
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        console.error(`Failed to fetch product ${productId}:`, e);
        setError(`Failed to load product ID ${productId}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading product ID {productId}...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product ID {productId} not found.</p>;

  return (
    <div>
      <h2>Product Details (ID: {productId})</h2>
      <div>
        <img 
          src={product.image} 
          alt={product.title} 
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x400/CCCCCC/000000?text=Image+Not+Available`; }}
        />
      </div>
      <h3>{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>
      <div>
        <p>Category: {product.category}</p>
        <p>Rating: {product.rating.rate} (based on {product.rating.count} reviews)</p>
      </div>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductById;
