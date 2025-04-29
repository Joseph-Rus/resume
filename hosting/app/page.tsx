// app/page.tsx
'use client';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Project';
import Experience from './components/Experience';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div
      className="
        min-h-screen
        text-gray-900
        bg-gradient-to-b
        from-[#FFFCE5]    /* very pale cream */
        via-[#F7E6D8]     /* soft peach */
        to-[#4AB2F2]      /* sky-blue to vibrant blue */
      "
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
