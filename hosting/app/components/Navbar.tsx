'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar transition-all duration-300 ${scrolled ? 'py-3 shadow-md' : 'py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-primary-600">
            Joey<span className="text-dot">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          <Link href="/" className="text-gray-700 hover:text-primary-500 transition font-medium">
            Home
          </Link>
          <Link href="#about" className="text-gray-700 hover:text-primary-500 transition font-medium">
            About
          </Link>
          <Link href="#skills" className="text-gray-700 hover:text-primary-500 transition font-medium">
            Skills
          </Link>
          <Link href="#projects" className="text-gray-700 hover:text-primary-500 transition font-medium">
            Projects
          </Link>
          <Link href="#experience" className="text-gray-700 hover:text-primary-500 transition font-medium">
            Experience
          </Link>
          <Link href="#contact" className="text-gray-700 hover:text-primary-500 transition font-medium">
            Contact
          </Link>
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center p-2 border border-gray-300 rounded-md text-gray-700 hover:text-primary-500 hover:border-primary-500 focus:outline-none transition"
            aria-label="Toggle menu"
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
        <div className="md:hidden bg-white py-4 border-t border-gray-100 shadow-sm">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary-500 transition py-2 font-medium">
              Home
            </Link>
            <Link href="#about" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary-500 transition py-2 font-medium">
              About
            </Link>
            <Link href="#skills" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary-500 transition py-2 font-medium">
              Skills
            </Link>
            <Link href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary-500 transition py-2 font-medium">
              Projects
            </Link>
            <Link href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary-500 transition py-2 font-medium">
              Experience
            </Link>
            <Link href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary-500 transition py-2 font-medium">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
