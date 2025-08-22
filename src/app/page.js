// src/app/page.js
"use client"; // This component needs to be a Client Component to use useRouter

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter hook

export default function HomePageRedirect() {
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Redirect to the /products page as soon as this component mounts
    // You can change '/products' to any other default route you prefer
    router.replace('/'); 
  }, [router]); // Ensure useEffect re-runs if router object changes (though it rarely does)

  // This component will not render any visible content
  // It simply handles the redirection logic
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px', color: '#555' }}>
      <p>Redirecting to products...</p>
    </div>
  );
}
