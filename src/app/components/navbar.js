// src/app/components/Navbar.js
"use client"; // This component needs to be a Client Component for interactivity (e.g., hover effects, active links)

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook to get the current path

const Navbar = () => {
  const pathname = usePathname(); // Get the current active path

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Products', href: '/get/products' },
    { name: 'Get Product by ID', href: '/get/products/1' }, // Example ID, user can change via input on home
    { name: 'All Carts', href: '/get/carts' },
    { name: 'All Users', href: '/get/users' },
    { name: 'Delete Cart', href: '/delete/1' },
  ];

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Brand/Logo Link - Clicking this will redirect to the home route ('/') */}
        <Link href="/" passHref>
          <span className="text-white text-2xl font-bold hover:text-gray-300 transition-colors cursor-pointer">
            Fake Store App
          </span>
        </Link>

        {/* Navigation Links - Each of these will redirect to their respective routes */}
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} passHref>
              <span
                // Apply a different style if the link is active
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${pathname === link.href
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } cursor-pointer`}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
