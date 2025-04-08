// // components/VanillaModelViewer.tsx
// "use client";

// import React, { useEffect, useRef, useState } from 'react';

// const VanillaModelViewer = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const loadingRef = useRef<HTMLDivElement>(null);
//   const [isScriptLoaded, setIsScriptLoaded] = useState(false);
//   const [hasRenderedModel, setHasRenderedModel] = useState(false);

//   useEffect(() => {
//     // Only run once to prevent duplicate renderings
//     if (hasRenderedModel) return;
//     if (!containerRef.current) return;
    
//     // Track when scripts are loaded
//     const loadScript = (src: string) => {
//       // Skip if script is already loaded
//       if (document.querySelector(`script[src="${src}"]`)) {
//         return Promise.resolve();
//       }
      
//       return new Promise((resolve, reject) => {
//         const script = document.createElement('script');
//         script.src = src;
//         script.onload = resolve;
//         script.onerror = reject;
//         document.head.appendChild(script);
//       });
//     };

//     // Load necessary scripts and setup the viewer
//     const setupViewer = async () => {
//       try {
//         // Load Three.js library and needed modules from CDN - using specific version
//         console.log("Loading Three.js scripts...");
        
//         // Change to a more reliable CDN source for all needed scripts
//         await loadScript('https://unpkg.com/three@0.128.0/build/three.min.js');
        
//         // Wait a moment to ensure Three.js is fully loaded
//         await new Promise(resolve => setTimeout(resolve, 100));
        
//         // Make sure Three.js was loaded correctly
//         if (!window.THREE) {
//           console.error('THREE not found on window object after loading script');
//           return;
//         }
        
//         // Load GLTFLoader
//         await loadScript('https://unpkg.com/three@0.128.0/examples/js/loaders/GLTFLoader.js');
        
//         // Wait a moment to ensure loader is attached
//         await new Promise(resolve => setTimeout(resolve, 100));
        
//         // Load OrbitControls
//         await loadScript('https://unpkg.com/three@0.128.0/examples/js/controls/OrbitControls.js');
        
//         // Wait a moment to ensure controls are attached
//         await new Promise(resolve => setTimeout(resolve, 100));
        
//         console.log("Scripts loaded. THREE:", !!window.THREE, 
//                    "GLTFLoader:", !!window.THREE.GLTFLoader, 
//                    "OrbitControls:", !!window.THREE.OrbitControls);
        
//         setIsScriptLoaded(true);
        
//         // Verify all required classes are available
//         if (!window.THREE || !window.THREE.GLTFLoader || !window.THREE.OrbitControls) {
//           console.error('Required Three.js classes not found after loading scripts');
//           // Let's use a simple display if 3D fails to load
//           if (loadingRef.current) {
//             loadingRef.current.innerHTML = '<div class="text-6xl font-bold text-orange-500" style="opacity: 1;">JR</div>';
//           }
//           return;
//         }
        
//         // Create a unique ID for this instance
//         const instanceId = `model-container-${Date.now()}`;
//         containerRef.current.id = instanceId;
        
//         // Now we can use Three.js globals
//         const THREE = window.THREE;
        
//         // Verify all our classes are available again
//         if (!THREE.Scene || !THREE.PerspectiveCamera || !THREE.WebGLRenderer ||
//             !THREE.GLTFLoader || !THREE.OrbitControls) {
//           console.error('Some Three.js classes still missing, aborting');
//           return;
//         }
        
//         // Create 3D scene
//         const scene = new THREE.Scene();
//         scene.background = null; // Transparent background
        
//         // Camera setup - adjusted for a front view
//         const camera = new THREE.PerspectiveCamera(
//           40, // Reduced FOV for tighter framing
//           containerRef.current.clientWidth / containerRef.current.clientHeight, 
//           0.1, 
//           1000
//         );
//         // Position camera more toward the front of the model
//         camera.position.set(0, 0.5, 4); // Lower camera height, move closer
        
//         // Renderer setup
//         const renderer = new THREE.WebGLRenderer({ 
//           antialias: true,
//           alpha: true // Enable transparency
//         });
//         renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
//         renderer.setPixelRatio(window.devicePixelRatio);
//         renderer.setClearColor(0x000000, 0); // Transparent background
        
//         // Check for existing renderer
//         const rendererAttr = 'data-threejs-renderer';
//         renderer.domElement.setAttribute(rendererAttr, instanceId);
//         const existingRenderer = containerRef.current.querySelector(`[${rendererAttr}]`);
//         if (existingRenderer) {
//           console.log('Renderer already exists in container, skipping');
//           return;
//         }
//         containerRef.current.appendChild(renderer.domElement);
        
//         // Improved lighting with reduced intensity to minimize glare
//         const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Reduced intensity
//         scene.add(ambientLight);
        
//         // Main light from front-right - softer
//         const mainLight = new THREE.DirectionalLight(0xffffff, 0.7); // Reduced intensity
//         mainLight.position.set(2, 1, 2); // Move to side slightly to reduce direct glare
//         scene.add(mainLight);
        
//         // Fill light from left side
//         const fillLight = new THREE.DirectionalLight(0xffffff, 0.3); // Softer fill
//         fillLight.position.set(-2, 0, -1); // Position for softer lighting
//         scene.add(fillLight);
        
//         // Subtle top light
//         const topLight = new THREE.DirectionalLight(0xffffff, 0.2);
//         topLight.position.set(0, 3, 0);
//         scene.add(topLight);
        
//         // Add a subtle rotation to the entire scene for floating effect
//         const modelGroup = new THREE.Group();
//         scene.add(modelGroup);
        
//         // Controls - using OrbitControls
//         console.log("Creating controls with:", THREE.OrbitControls);
//         const controls = new THREE.OrbitControls(camera, renderer.domElement);
//         controls.enableDamping = true;
//         controls.dampingFactor = 0.05;
//         controls.enableZoom = false;
//         controls.autoRotate = true;
//         controls.autoRotateSpeed = 2.0; // Moderate rotation speed
        
//         // Set custom rotation pivot point in scene
//         const rotationPivot = new THREE.Object3D();
//         scene.add(rotationPivot);
        
//         // Fix rotation to be directly around the Y-axis
//         // Remove the polar angle constraints as they were causing rotation issues
        
//         // Keep track of the animation frame
//         let animationFrame: number;
                
//         // Load the model
//         console.log("Loading model using GLTFLoader...");
//         const loader = new THREE.GLTFLoader();
//         loader.load(
//           '/models/car.glb', // Path to your model in the public folder
//           (gltf) => {
//             console.log('Model loaded successfully!');
//             setHasRenderedModel(true);
            
//             const model = gltf.scene;
            
//             // Significantly reduce scale to fit better in frame
//             model.scale.set(0.35, 0.35, 0.35); // Even smaller scale to ensure it fits perfectly
            
//             // Clear the model group and add to our pivot point
//             modelGroup.clear();
//             rotationPivot.add(model);
            
//             // Get model dimensions
//             const box = new THREE.Box3().setFromObject(model);
//             const center = box.getCenter(new THREE.Vector3());
//             const size = box.getSize(new THREE.Vector3());
            
//             // Calculate true model center and update rotation pivot
//             rotationPivot.position.set(0, 0, 0);
            
//             // Position model to rotate around its exact center
//             model.position.x = -center.x;
//             model.position.y = -center.y;
//             model.position.z = -center.z;
            
//             // Add the rotation pivot to our model group (which is in the scene)
//             modelGroup.add(rotationPivot);
            
//             // Rotate model to show its best angle 
//             model.rotation.y = Math.PI * 0.75; // 135 degree rotation
            
//             // Make camera and controls target the exact center of the rotation pivot
//             const targetPosition = new THREE.Vector3(0, 0, 0);
//             camera.lookAt(targetPosition);
//             controls.target.copy(targetPosition);
            
//             // Update camera to look slightly down at the model
//             camera.position.set(0, 1.5, 4);
//             camera.updateProjectionMatrix();
//             controls.update();
            
//             // Hide loading indicator
//             if (loadingRef.current) {
//               loadingRef.current.style.opacity = '0';
//               setTimeout(() => {
//                 if (loadingRef.current) {
//                   loadingRef.current.style.display = 'none';
//                 }
//               }, 500);
//             }
            
//             // Animation loop
//             const animate = () => {
//               animationFrame = requestAnimationFrame(animate);
              
//               try {
//                 // Update controls
//                 controls.update();
//               } catch (e) {
//                 console.error('Error updating controls:', e);
//               }
              
//               renderer.render(scene, camera);
//             };
//             animate();
//           },
//           (progress) => {
//             // Loading progress
//             const percentComplete = (progress.loaded / progress.total) * 100;
//             console.log(`Loading model: ${Math.round(percentComplete)}%`);
//           },
//           (error) => {
//             // Error handling
//             console.error('Error loading model:', error);
//             // Show error in loading element
//             if (loadingRef.current) {
//               loadingRef.current.innerHTML = '<div class="text-6xl font-bold text-orange-500" style="opacity: 1;">JR</div>';
//             }
//           }
//         );
        
//         // Handle window resize
//         const handleResize = () => {
//           if (!containerRef.current) return;
          
//           camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
//           camera.updateProjectionMatrix();
//           renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
//         };
//         window.addEventListener('resize', handleResize);
        
//         // Cleanup function
//         return () => {
//           window.removeEventListener('resize', handleResize);
//           if (animationFrame) {
//             cancelAnimationFrame(animationFrame);
//           }
//           if (containerRef.current && renderer.domElement.parentElement === containerRef.current) {
//             containerRef.current.removeChild(renderer.domElement);
//           }
//           try {
//             controls.dispose();
//           } catch (e) {
//             console.log('Error disposing controls:', e);
//           }
//           renderer.dispose();
//         };
//       } catch (error) {
//         console.error('Error setting up 3D viewer:', error);
//         // Show error message
//         if (loadingRef.current) {
//           loadingRef.current.innerHTML = '<div class="text-6xl font-bold text-orange-500" style="opacity: 1;">JR</div>';
//         }
//       }
//     };
    
//     setupViewer();
//   }, [hasRenderedModel]);

//   return (
//     <div className="relative w-full h-full">
//       <div ref={containerRef} className="w-full h-full"></div>
//       <div 
//         ref={loadingRef}
//         className="absolute inset-0 flex items-center justify-center z-10 bg-transparent transition-opacity duration-500"
//       >
//         <div className="text-6xl font-bold text-orange-500">JR</div>
//       </div>
      
//       {/* Attribution notice - only show one */}
//       <div className="absolute bottom-0 right-0 text-xs text-gray-500 opacity-70 p-1">
//         Car by cuadot.fbx
//       </div>
//     </div>
//   );
// };

// // Add type declaration for global THREE
// declare global {
//   interface Window {
//     THREE: any;
//   }
// }

// export default VanillaModelViewer;