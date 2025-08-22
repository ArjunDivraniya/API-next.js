// src/app/api/get/products/[id]/route.js

import { NextResponse } from 'next/server';

/**
 * Handles GET requests to /api/get/products/[id].
 * Fetches a single product by its ID from FakeStoreAPI.
 * @param {Object} request The incoming request object.
 * @param {Object} { params } The dynamic route parameters, containing the product 'id'.
 * @returns {Response} A JSON response containing the product, or an error if not found/failed.
 */
export async function GET(request, { params }) {
  const { id } = params; // Extract the product ID from the URL

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!res.ok) {
      // If the product is not found (e.g., 404), or other server error
      if (res.status === 404) {
        return NextResponse.json({ message: `Product with ID ${id} not found.` }, { status: 404 });
      }
      throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
    }

    const product = await res.json();
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error.message);
    return NextResponse.json({ message: `Error fetching product with ID ${id}`, error: error.message }, { status: 500 });
  }
}
