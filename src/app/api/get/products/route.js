// src/app/api/get/products/route.js

import { NextResponse } from 'next/server';

/**
 * Handles GET requests to /api/get/products.
 * Fetches all products from FakeStoreAPI.
 * @returns {Response} A JSON response containing the list of products or an error message.
 */
export async function GET() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    
    // Check if the response was successful
    if (!res.ok) {
      // If not, throw an error with the status
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }

    const products = await res.json();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return NextResponse.json({ message: 'Error fetching products', error: error.message }, { status: 500 });
  }
}
