// src/app/api/get/users/route.js

import { NextResponse } from 'next/server';

/**
 * Handles GET requests to /api/get/users.
 * Fetches all users from FakeStoreAPI.
 * @returns {Response} A JSON response containing the list of users or an error message.
 */
export async function GET() {
  try {
    const res = await fetch('https://fakestoreapi.com/users');
    
    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
    }

    const users = await res.json();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return NextResponse.json({ message: 'Error fetching users', error: error.message }, { status: 500 });
  }
}
