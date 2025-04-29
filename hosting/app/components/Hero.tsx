"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Link from "next/link";

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Load scripts dynamically
    const loadScripts = async () => {
      // Function to load a script and return a promise
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => resolve(undefined);
          script.onerror = () =>
            reject(new Error(`Failed to load script: ${src}`));
          document.head.appendChild(script);
        });
      };

      try {
        // Load Three.js
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.159.0/three.min.js"
        );
        console.log("Three.js loaded");

        // Load SimplexNoise library (needed for organic deformation)
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js"
        );
        console.log("SimplexNoise loaded");

        // Load GSAP for animations
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"
        );
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"
        );
        console.log("GSAP loaded");

        // Initialize the 3D blob
        initBubble();
      } catch (error) {
        console.error("Error loading scripts:", error);
      }
    };

    // Your initBubble function with improved smoothness and color updates
    const initBubble = () => {
      if (!containerRef.current || typeof window.THREE === "undefined") {
        console.error("Container not found or THREE not loaded");
        return;
      }

      // Clear any existing canvas
      const existingCanvas = containerRef.current.querySelector("canvas");
      if (existingCanvas) {
        containerRef.current.removeChild(existingCanvas);
      }

      // Create a canvas element and append it to the container
      const canvas = document.createElement("canvas");
      canvas.id = "bubble";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.position = "absolute";
      containerRef.current.appendChild(canvas);

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
      let camera;

      const setup = () => {
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        // Update clear color to white for the light theme
        renderer.setClearColor(0xffffff, 0);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = window.THREE.PCFSoftShadowMap; // Softer shadows

        // Optional: You can tweak fog color to a very light gray
        scene.fog = new window.THREE.Fog(0xffffff, 10, 950);

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

        // Updated color to match our blue theme
        shadowLight = new window.THREE.DirectionalLight(0x0ea5e9, 0.4); // Sky blue
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

        // Slightly more lavender accent light
        light2 = new window.THREE.DirectionalLight(0x8b5cf6, 0.25); // Lavender
        light2.position.set(-600, 350, 350);

        light3 = new window.THREE.DirectionalLight(0x7dd3fc, 0.15); // Light blue
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
      const map = (
        num,
        in_min,
        in_max,
        out_min,
        out_max
      ) => {
        return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
      };

      /*--------------------
      Distance
      --------------------*/
      const distance = (
        a,
        b
      ) => {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
      };

      /*--------------------
      Mouse
      --------------------*/
      let mouse = new window.THREE.Vector2(0, 0);
      const onMouseMove = (e) => {
        let clientX, clientY;

        if ("touches" in e && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else if ("clientX" in e) {
          clientX = e.clientX;
          clientY = e.clientY;
        } else {
          return;
        }

        if (window.TweenMax) {
          window.TweenMax.to(mouse, 0.8, {
            x: clientX,
            y: clientY,
            ease: window.Power2.easeOut,
          });
        }
      };

      ["mousemove", "touchmove"].forEach((event) => {
        window.addEventListener(event, onMouseMove);
      });

      /*--------------------
      Spring
      --------------------*/
      let spring = {
        scale: 1,
      };

      const clicking = {
        down: () => {
          if (window.TweenMax) {
            window.TweenMax.to(spring, 0.7, {
              scale: 0.7,
              ease: window.Power3.easeOut,
            });
          }
        },
        up: () => {
          if (window.TweenMax) {
            window.TweenMax.to(spring, 0.9, {
              scale: 1,
              ease: window.Elastic.easeOut,
            });
          }
        },
      };

      ["mousedown", "touchstart"].forEach((event) => {
        window.addEventListener(event, clicking.down);
      });

      ["mouseup", "touchend"].forEach((event) => {
        window.addEventListener(event, clicking.up);
      });

      /*--------------------
      Resize
      --------------------*/
      let maxDist;
      const onResize = () => {
        canvas.style.width = "";
        canvas.style.height = "";
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        maxDist = distance(mouse, { x: width / 2, y: height / 2 });
        renderer.setSize(width, height);
      };

      let resizeTm;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTm);
        resizeTm = setTimeout(onResize, 200);
      });

      /*--------------------
      Bubble
      --------------------*/
      // Increase vertex count significantly for smoother appearance
      const vertex = width > 575 ? 128 : 64; // Increased from 80/40
      const bubbleGeometry = new window.THREE.SphereGeometry(120, vertex, vertex);
      let bubble;
      const createBubble = () => {
        const positionAttribute = bubbleGeometry.attributes.position;
        const bubbleMaterial = new window.THREE.MeshStandardMaterial({
          // Updated to a purplish-blue gradient that matches our color scheme
          emissive: 0x7dd3fc, // Light blue
          emissiveIntensity: 0.4,
          color: 0xbae6fd, // Very light blue
          roughness: 0.4,
          metalness: 0.1,
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
          opacity: 0.15,
        });

        const plane = new window.THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.y = -150;
        plane.position.x = 0;
        plane.position.z = 0;
        plane.rotation.x = (Math.PI / 180) * -90;
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
      const updateVertices = (time) => {
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

          // Smoother noise
          const perlin = simplex.noise3D(
            x * 0.004 + time * 0.0003,
            y * 0.004 + time * 0.0003,
            z * 0.004
          );

          const ratio = perlin * 0.2 * (dist + 0.1) + 0.9;
          positions[i] = x * ratio;
          positions[i + 1] = y * ratio;
          positions[i + 2] = z * ratio;
        }
        positionAttribute.needsUpdate = true;
      };

      /*--------------------
      Animate
      --------------------*/
      const render = (time) => {
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
        ["mousemove", "touchmove", "mousedown", "touchstart", "mouseup", "touchend", "resize"].forEach(
          (event) => {
            window.removeEventListener(
              event,
              event === "mousemove" || event === "touchmove"
                ? onMouseMove
                : event === "mousedown" || event === "touchstart"
                ? clicking.down
                : event === "mouseup" || event === "touchend"
                ? clicking.up
                : () => {}
            );
          }
        );

        if (containerRef.current && canvas) {
          containerRef.current.removeChild(canvas);
        }

        bubbleGeometry.dispose();
        (bubble.material).dispose();
        renderer.dispose();
      };
    };

    loadScripts();
  }, []);

  return (
    <section className="py-20 md:py-28 relative min-h-screen bg-transparent overflow-hidden">
      {/* Decorative blobs */}
      <div className="blob-accent-1 left-10 bottom-0"></div>
      <div className="blob-accent-2 top-20 right-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-2">
                Hello<span className="text-dot">.</span>
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-800">
                I'm Joey Russell
              </h2>
              <h3 className="text-2xl md:text-3xl font-semibold text-primary-600">
                Software Developer
              </h3>
              <p className="text-gray-600 text-lg max-w-lg">
                Passionate about creating robust software solutions and exploring new technologies.
                Currently studying Computer Science at California Baptist University.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="/josephrussellresume.pdf"
                  download="josephrussellresume.pdf"
                  className="btn btn-outline group"
                >
                  <span>My Resume</span>
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
                
                <a
                  href="#projects"
                  className="btn btn-primary group"
                >
                  <span>View Projects</span>
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
              
              {/* Social icons */}
              <div className="flex items-center space-x-5 pt-4">
                <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="mailto:your.email@example.com" className="text-gray-600 hover:text-primary-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            {/* Bubble Container with floating animation */}
            <div
              ref={containerRef}
              className="w-80 h-80 md:w-96 md:h-96 relative animate-float"
              style={{
                position: "relative",
                overflow: "hidden",
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