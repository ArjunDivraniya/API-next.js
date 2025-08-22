// src/app/components/AllCarts.js
"use client";

import React, { useEffect, useState } from 'react';

const AllCarts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllCarts() {
      try {
        const res = await fetch('https://fakestoreapi.com/carts');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCarts(data);
      } catch (e) {
        console.error("Failed to fetch all carts:", e);
        setError("Failed to load carts. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchAllCarts();
  }, []);

  if (loading) return <p>Loading all carts...</p>;
  if (error) return <p>{error}</p>;
  if (carts.length === 0) return <p>No carts found.</p>;

  return (
    <div>
      <h2>All Carts</h2>
      <div>
        {carts.map((cart) => (
          <div key={cart.id}>
            <h3>Cart ID: {cart.id}</h3>
            <p>User ID: {cart.userId}</p>
            <p>Date: {new Date(cart.date).toLocaleDateString()}</p>
            <h4>Products:</h4>
            <ul>
              {cart.products.map((item, index) => (
                <li key={index}>Product ID: {item.productId}, Quantity: {item.quantity}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCarts;
