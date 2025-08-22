// src/app/api/get/carts/route.js

import { NextResponse } from 'next/server';

/**
 * Handles GET requests to /api/get/carts.
 * Fetches all carts from FakeStoreAPI.
 * @returns {Response} A JSON response containing the list of carts or an error message.
 */
export async function GET() {
  try {
    const res = await fetch('https://fakestoreapi.com/carts');
    
    if (!res.ok) {
      throw new Error(`Failed to fetch carts: ${res.status} ${res.statusText}`);
    }

    const carts = await res.json();
    return NextResponse.json(carts, { status: 200 });
  } catch (error) {
    console.error('Error fetching carts:', error.message);
    return NextResponse.json({ message: 'Error fetching carts', error: error.message }, { status: 500 });
  }
}
