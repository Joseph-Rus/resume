// components/Navbar.tsx
"use client";
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 py-6 border-b border-gray-800">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-2xl font-bold text-white">Joey Russell</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          <Link href="/" className="text-gray-300 hover:text-orange-500 transition">
            Home
          </Link>
          <Link href="#about" className="text-gray-300 hover:text-orange-500 transition">
            About
          </Link>
          <Link href="#projects" className="text-gray-300 hover:text-orange-500 transition">
            Projects
          </Link>
          <Link href="#experience" className="text-gray-300 hover:text-orange-500 transition">
            Experience
          </Link>
          <Link href="#contact" className="text-gray-300 hover:text-orange-500 transition">
            Contact
          </Link>
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link href="/" className="text-gray-300 hover:text-orange-500 transition py-2" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="#about" className="text-gray-300 hover:text-orange-500 transition py-2" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="#projects" className="text-gray-300 hover:text-orange-500 transition py-2" onClick={() => setMobileMenuOpen(false)}>
              Projects
            </Link>
            <Link href="#experience" className="text-gray-300 hover:text-orange-500 transition py-2" onClick={() => setMobileMenuOpen(false)}>
              Experience
            </Link>
            <Link href="#contact" className="text-gray-300 hover:text-orange-500 transition py-2" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;