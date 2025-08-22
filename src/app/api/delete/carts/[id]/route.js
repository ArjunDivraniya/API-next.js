// src/app/api/delete/carts/[id]/route.js

import { NextResponse } from 'next/server';

/**
 * Handles DELETE requests to /api/delete/carts/[id].
 * Deletes a specific cart by its ID from FakeStoreAPI.
 * @param {Object} request The incoming request object.
 * @param {Object} { params } The dynamic route parameters, containing the cart 'id'.
 * @returns {Response} A JSON response confirming deletion or an error message.
 */
export async function DELETE(request, { params }) {
  const { id } = params; // Extract the cart ID from the URL

  try {
    // FakeStoreAPI's DELETE operation returns the deleted item.
    // In a real application, you might expect a 204 No Content for successful deletion.
    const res = await fetch(`https://fakestoreapi.com/carts/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ message: `Cart with ID ${id} not found.` }, { status: 404 });
      }
      throw new Error(`Failed to delete cart: ${res.status} ${res.statusText}`);
    }

    const deletedCart = await res.json();
    return NextResponse.json({ message: `Cart with ID ${id} deleted successfully.`, deletedCart }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting cart ${id}:`, error.message);
    return NextResponse.json({ message: `Error deleting cart with ID ${id}`, error: error.message }, { status: 500 });
  }
}
