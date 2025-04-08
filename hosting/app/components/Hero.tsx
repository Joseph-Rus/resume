// components/Hero.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Link from 'next/link';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load scripts dynamically
    const loadScripts = async () => {
      // Function to load a script and return a promise
      const loadScript = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
          document.head.appendChild(script);
        });
      };

      try {
        // Load Three.js
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/0.159.0/three.min.js');
        console.log('Three.js loaded');
        
        // Load SimplexNoise library (needed for organic deformation)
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js');
        console.log('SimplexNoise loaded');
        
        // Load GSAP for animations
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js');
        console.log('GSAP loaded');
        
        // Initialize the 3D blob
        initBubble();
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    // Your initBubble function with improved smoothness
    const initBubble = () => {
      if (!containerRef.current || typeof window.THREE === 'undefined') {
        console.error('Container not found or THREE not loaded');
        return;
      }

      // Clear any existing canvas
      const existingCanvas = containerRef.current.querySelector('canvas');
      if (existingCanvas) {
        containerRef.current.removeChild(existingCanvas);
      }

      // Create a canvas element and append it to the container
      const canvas = document.createElement('canvas');
      canvas.id = 'bubble';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.position = 'absolute';
      containerRef.current.appendChild(canvas);

      // Start Bubble code
      console.clear();
      let width = canvas.offsetWidth;
      let height = canvas.offsetHeight;
      const renderer = new window.THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
      });
      const scene = new window.THREE.Scene();

      // Declare camera
      let camera: THREE.PerspectiveCamera;

      const setup = () => {
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        renderer.setClearColor(0xebebeb, 0);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = window.THREE.PCFSoftShadowMap; // Softer shadows

        scene.fog = new window.THREE.Fog(0x000000, 10, 950);

        const aspectRatio = width / height;
        const fieldOfView = 100;
        const nearPlane = 0.1;
        const farPlane = 10000;
        camera = new window.THREE.PerspectiveCamera(
          fieldOfView,
          aspectRatio,
          nearPlane,
          farPlane
        );
        camera.position.set(0, 0, 300);
      };
      setup();

      /*--------------------
      Lights
      --------------------*/
      let hemisphereLight, shadowLight, light2, light3;
      const createLights = () => {
        hemisphereLight = new window.THREE.HemisphereLight(0xffffff, 0x000000, 0.5);

        shadowLight = new window.THREE.DirectionalLight(0xff8f16, 0.4);
        shadowLight.position.set(0, 450, 350);
        shadowLight.castShadow = true;

        shadowLight.shadow.camera.left = -650;
        shadowLight.shadow.camera.right = 650;
        shadowLight.shadow.camera.top = 650;
        shadowLight.shadow.camera.bottom = -650;
        shadowLight.shadow.camera.near = 1;
        shadowLight.shadow.camera.far = 1000;

        shadowLight.shadow.mapSize.width = 4096;
        shadowLight.shadow.mapSize.height = 4096;

        light2 = new window.THREE.DirectionalLight(0xfff150, 0.25);
        light2.position.set(-600, 350, 350);

        light3 = new window.THREE.DirectionalLight(0xfff150, 0.15);
        light3.position.set(0, -250, 300);

        // Add an additional rim light for better contour definition
        const rimLight = new window.THREE.DirectionalLight(0x8844ff, 0.2);
        rimLight.position.set(0, 0, -400);

        scene.add(hemisphereLight);
        scene.add(shadowLight);
        scene.add(light2);
        scene.add(light3);
        scene.add(rimLight);
      };
      createLights();

      /*--------------------
      Map
      --------------------*/
      const map = (num: number, in_min: number, in_max: number, out_min: number, out_max: number): number => {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
      };

      /*--------------------
      Distance
      --------------------*/
      const distance = (a: {x: number, y: number}, b: {x: number, y: number}): number => {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
      };

      /*--------------------
      Mouse
      --------------------*/
      let mouse = new window.THREE.Vector2(0, 0);
      const onMouseMove = (e: MouseEvent | TouchEvent) => {
        let clientX, clientY;
        
        if ('touches' in e && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else if ('clientX' in e) {
          clientX = e.clientX;
          clientY = e.clientY;
        } else {
          return;
        }
        
        if (window.TweenMax) {
          window.TweenMax.to(mouse, 0.8, {
            x: clientX,
            y: clientY,
            ease: window.Power2.easeOut
          });
        }
      };
      
      ['mousemove', 'touchmove'].forEach(event => {
        window.addEventListener(event, onMouseMove as EventListener);
      });

      /*--------------------
      Spring
      --------------------*/
      let spring = {
        scale: 1
      };
      
      const clicking = {
        down: () => {
          if (window.TweenMax) {
            window.TweenMax.to(spring, 0.7, {
              scale: 0.7,
              ease: window.Power3.easeOut
            });
          }
        },
        up: () => {
          if (window.TweenMax) {
            window.TweenMax.to(spring, 0.9, {
              scale: 1,
              ease: window.Elastic.easeOut
            });
          }
        }
      };
      
      ['mousedown', 'touchstart'].forEach(event => {
        window.addEventListener(event, clicking.down);
      });
      
      ['mouseup', 'touchend'].forEach(event => {
        window.addEventListener(event, clicking.up);
      });

      /*--------------------
      Resize
      --------------------*/
      let maxDist: number;
      const onResize = () => {
        canvas.style.width = '';
        canvas.style.height = '';
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        maxDist = distance(mouse, { x: width / 2, y: height / 2 });
        renderer.setSize(width, height);
      };
      
      let resizeTm: NodeJS.Timeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTm as unknown as number);
        resizeTm = setTimeout(onResize, 200) as unknown as NodeJS.Timeout;
      });

      /*--------------------
      Bubble
      --------------------*/
      // Increase vertex count significantly for smoother appearance
      const vertex = width > 575 ? 128 : 64; // Increased from 80/40
      const bubbleGeometry = new window.THREE.SphereGeometry(120, vertex, vertex);
      let bubble: THREE.Mesh;
      const createBubble = () => {
        const positionAttribute = bubbleGeometry.attributes.position;
        const bubbleMaterial = new window.THREE.MeshStandardMaterial({
          emissive: 0xbd4be3,
          emissiveIntensity: 0.5,
          roughness: 0.4, // Lower for more shine (was 0.61)
          metalness: 0.1, // Lower for less metallic look (was 0.21)
          side: window.THREE.FrontSide,
        });
        bubble = new window.THREE.Mesh(bubbleGeometry, bubbleMaterial);
        bubble.castShadow = true;
        bubble.receiveShadow = false;
        scene.add(bubble);

        // Store original positions
        const originalPositions = positionAttribute.array.slice();
        bubbleGeometry.userData.originalPositions = originalPositions;
      };
      createBubble();

      /*--------------------
      Plane
      --------------------*/
      const createPlane = () => {
        const planeGeometry = new window.THREE.PlaneGeometry(2000, 2000);
        const planeMaterial = new window.THREE.ShadowMaterial({
          opacity: 0.15
        });
        
        const plane = new window.THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.y = -150;
        plane.position.x = 0;
        plane.position.z = 0;
        plane.rotation.x = Math.PI / 180 * -90;
        plane.receiveShadow = true;
        scene.add(plane);
      };
      createPlane();

      /*--------------------
      Noise
      --------------------*/
      const simplex = new window.SimplexNoise();
      maxDist = distance(mouse, { x: width / 2, y: height / 2 });
      let dist = 0;
      const updateVertices = (time: number) => {
        dist = distance(mouse, { x: width / 2, y: height / 2 });
        dist /= maxDist;
        dist = map(dist, 1, 0, 0, 1);
        
        const positionAttribute = bubbleGeometry.attributes.position;
        const originalPositions = bubbleGeometry.userData.originalPositions;
        const positions = positionAttribute.array;

        for (let i = 0; i < positions.length; i += 3) {
          const x = originalPositions[i];
          const y = originalPositions[i + 1];
          const z = originalPositions[i + 2];

          // Smoother noise - lower frequency, gentler animation
          const perlin = simplex.noise3D(
            x * 0.004 + time * 0.0003, // Lower frequency noise (was 0.006, 0.0005)
            y * 0.004 + time * 0.0003,
            z * 0.004
          );
          
          // Smoother deformation with less extreme changes
          const ratio = ((perlin * 0.2 * (dist + 0.1)) + 0.9); // Less extreme deformation

          positions[i] = x * ratio;
          positions[i + 1] = y * ratio;
          positions[i + 2] = z * ratio;
        }
        positionAttribute.needsUpdate = true;
      };

      /*--------------------
      Animate
      --------------------*/
      const render = (time: number) => {
        requestAnimationFrame(render);
        
        bubble.rotation.y = -4 + map(mouse.x, 0, width, 0, 4);
        bubble.rotation.z = 4 + map(mouse.y, 0, height, 0, -4);
        bubble.scale.set(spring.scale, spring.scale, spring.scale);
        
        updateVertices(time);
        
        renderer.clear();
        renderer.render(scene, camera);
      };
      
      requestAnimationFrame(render);
      renderer.render(scene, camera);

      // Return cleanup function
      return () => {
        ['mousemove', 'touchmove', 'mousedown', 'touchstart', 'mouseup', 'touchend', 'resize'].forEach(event => {
          window.removeEventListener(event, 
            event === 'mousemove' || event === 'touchmove' ? onMouseMove as EventListener : 
            event === 'mousedown' || event === 'touchstart' ? clicking.down : 
            event === 'mouseup' || event === 'touchend' ? clicking.up : 
            () => {}
          );
        });
        
        if (containerRef.current && canvas) {
          containerRef.current.removeChild(canvas);
        }
        
        bubbleGeometry.dispose();
        (bubble.material as THREE.Material).dispose();
        renderer.dispose();
      };
    };

    loadScripts();
  }, []);

  return (
    <section className="py-20 md:py-28 relative min-h-screen">
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
            
            {/* Tech stack */}
            <div className="mt-16">
              <div className="flex flex-wrap gap-6">
                {['HTML5', 'CSS', 'JavaScript', 'Node.js', 'React', 'C++', 'Java', 'Python'].map((tech) => (
                  <div key={tech} className="text-gray-500 text-sm md:text-base">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            {/* Bubble Container */}
            <div 
              ref={containerRef}
              className="w-80 h-80 md:w-96 md:h-96 relative"
              style={{
                position: 'relative',
                overflow: 'hidden'
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Add declarations for global variables
declare global {
  interface Window {
    THREE: any;
    SimplexNoise: any;
    gsap: any;
    TweenMax: any;
    Power2: any;
    Power3: any;
    Elastic: any;
    noise: any;
  }
}

export default Hero;