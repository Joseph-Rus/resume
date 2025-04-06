// components/Hero.tsx
"use client";

import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import the vanilla three.js viewer
const VanillaModelViewer = dynamic(() => import('./VanilliaModelViewer'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-6xl font-bold text-orange-500">JR</div>
    </div>
  )
});

const Hero = () => {
  return (
    <section className="py-20 md:py-28 relative">
      {/* Background elements */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute top-20 right-10 w-60 h-60 bg-gradient-to-br from-orange-500 to-red-500 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              Hello<span className="text-orange-500">.</span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              I'm Joey Russell
            </h2>
            <h3 className="text-2xl md:text-4xl font-bold mb-6 text-gray-300">
              Software Developer
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-lg">
              Passionate about creating robust software solutions and exploring new technologies. 
              Currently studying Computer Science at California Baptist University.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="#contact">
                <span className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition">
                  Got a project?
                </span>
              </Link>
              <Link href="/resume">
                <span className="border border-gray-700 hover:border-orange-500 text-white font-medium py-3 px-6 rounded-md transition">
                  My resume
                </span>
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center relative">
            {/* 3D Model Container - no borders or background */}
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <VanillaModelViewer />
            </div>
          </div>
        </div>
        
        {/* Tech stack */}
        <div className="mt-16 md:mt-24">
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {['HTML5', 'CSS', 'JavaScript', 'Node.js', 'React', 'C++', 'Java', 'Python'].map((tech) => (
              <div key={tech} className="text-gray-500 text-sm md:text-base">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;