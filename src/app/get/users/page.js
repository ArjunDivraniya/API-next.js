// src/app/components/AllUsers.js
"use client";

import { formatDynamicAPIAccesses } from 'next/dist/server/app-render/dynamic-rendering';
import React, { useEffect, useState } from 'react';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const res = await fetch('https://fakestoreapi.com/users');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUsers(data);
      } catch (e) {
        console.error("Failed to fetch all users:", e);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchAllUsers();
  }, []);

  if (loading) return <p>Loading all users...</p>;
  if (error) return <p>{error}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <div>
      <h2>All Users</h2>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <h3>{user.name.firstname} {user.name.lastname}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Username: {user.username}</p>
            <p>Address: {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
