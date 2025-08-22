// src/app/components/DeleteCart.js
"use client";

import React, { useState } from 'react';

const DeleteCart = () => {
  const [cartId, setCartId] = useState('');
  const [deleteStatus, setDeleteStatus] = useState(null); // 'success', 'error', 'loading'
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    if (!cartId) {
      setMessage("Please enter a Cart ID to delete.");
      setDeleteStatus('error');
      return;
    }

    setDeleteStatus('loading');
    setMessage('Deleting cart...');

    try {
      const res = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error(`Cart with ID ${cartId} not found.`);
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setDeleteStatus('success');
      setMessage(`Cart ID ${cartId} deleted successfully!`);
      console.log('Deleted Cart:', data);
      setCartId('');
    } catch (e) {
      console.error(`Failed to delete cart ${cartId}:`, e);
      setDeleteStatus('error');
      setMessage(`Error deleting cart: ${e.message}`);
    }
  };

  return (
    <div>
      <h2>Delete Cart by ID</h2>
      <div>
        <input
          type="number"
          value={cartId}
          onChange={(e) => setCartId(e.target.value)}
          placeholder="Enter Cart ID to delete (e.g., 1)"
        />
        <button
          onClick={handleDelete}
          disabled={deleteStatus === 'loading'}
        >
          {deleteStatus === 'loading' ? 'Deleting...' : 'Delete Cart'}
        </button>
      </div>
      {message && (
        <p>
          {message}
        </p>
      )}
    </div>
  );
};

export default DeleteCart;
