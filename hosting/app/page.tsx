// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Project';
import Experience from './components/Experience';
import Footer from './components/Footer';

export default function Home() {
  // State for the dynamic background color
  const [bgColor, setBgColor] = useState('rgb(224,242,254)'); // Matches --primary-100

  useEffect(() => {
    const start = { r: 224, g: 242, b: 254 };  // #E0F2FE (primary-100)
    const end   = { r:  12, g:  74, b: 110 };  // #0C4A6E (primary-900)

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const t = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      // Linear interpolate each channel
      const r = Math.round(start.r + (end.r - start.r) * t);
      const g = Math.round(start.g + (end.g - start.g) * t);
      const b = Math.round(start.b + (end.b - start.b) * t);

      setBgColor(`rgb(${r},${g},${b})`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // set initial color

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen text-white transition-colors duration-200"
      style={{ backgroundColor: bgColor }}
    >
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}
