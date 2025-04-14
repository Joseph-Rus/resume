// // components/AIAssistant.tsx
// "use client";
// import { useState, useEffect, useRef } from 'react';
// import * as THREE from 'three';

// const AIAssistant = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [question, setQuestion] = useState('');
//   const [response, setResponse] = useState('');
//   const [isActive, setIsActive] = useState(false);
//   const [sceneInitialized, setSceneInitialized] = useState(false);
  
//   // Store scene elements in refs to access them across renders
//   const sceneRef = useRef<{
//     scene?: THREE.Scene;
//     camera?: THREE.PerspectiveCamera;
//     renderer?: THREE.WebGLRenderer;
//     bubble?: THREE.Mesh;
//     outerShell?: THREE.Mesh;
//     pulsingLight?: THREE.PointLight;
//     particles?: {
//       mesh: THREE.Points;
//       speeds: Array<{x: number, y: number, z: number}>;
//     };
//     originalVertices?: THREE.Vector3[];
//     noiseScale?: number;
//     mousePos?: {x: number, y: number};
//     spring?: {scale: number};
//     activityIntensity?: number;
//     animationFrameId?: number;
//   }>({
//     mousePos: {x: 0, y: 0},
//     spring: {scale: 1},
//     activityIntensity: 0,
//     noiseScale: 0.01
//   });
  
//   // Initialize the 3D scene
//   useEffect(() => {
//     if (!canvasRef.current || sceneInitialized) return;
    
//     const width = containerRef.current?.clientWidth || 300;
//     const height = containerRef.current?.clientHeight || 300;
    
//     // Setup renderer
//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       antialias: true,
//       alpha: true
//     });
//     renderer.setSize(width, height);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setClearColor(0x000000, 0); // Transparent background
    
//     // Create scene
//     const scene = new THREE.Scene();
    
//     // Create camera
//     const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//     camera.position.z = 300;
    
//     // Add lights
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(ambientLight);
    
//     const mainLight = new THREE.DirectionalLight(0xff8f16, 0.4);
//     mainLight.position.set(0, 450, 350);
//     scene.add(mainLight);
    
//     const secondaryLight = new THREE.DirectionalLight(0xfff150, 0.25);
//     secondaryLight.position.set(-600, 350, 350);
//     scene.add(secondaryLight);
    
//     const thirdLight = new THREE.DirectionalLight(0xfff150, 0.15);
//     thirdLight.position.set(0, -250, 300);
//     scene.add(thirdLight);
    
//     // Add pulsing point light
//     const pulsingLight = new THREE.PointLight(0xf97316, 1, 400); // Orange color to match theme
//     pulsingLight.position.set(0, 0, 0);
//     scene.add(pulsingLight);
    
//     // Create bubble geometry with good vertex count for smooth deformation
//     const vertexDetail = width > 575 ? 80 : 40;
//     const bubbleGeometry = new THREE.SphereGeometry(120, vertexDetail, vertexDetail);
    
//     // Store original vertices for animation
//     const originalVertices: THREE.Vector3[] = [];
//     const positionAttribute = bubbleGeometry.attributes.position;
    
//     for (let i = 0; i < positionAttribute.count; i++) {
//       const vertex = new THREE.Vector3();
//       vertex.fromBufferAttribute(positionAttribute, i);
//       originalVertices.push(vertex.clone());
//     }
    
//     // Create bubble material to match site theme
//     const bubbleMaterial = new THREE.MeshPhysicalMaterial({
//       color: 0xf97316, // Orange color matching theme
//       emissive: 0xf97316,
//       emissiveIntensity: 0.5,
//       roughness: 0.41,
//       metalness: 0.31,
//       reflectivity: 0.5,
//       clearcoat: 0.5,
//       clearcoatRoughness: 0.2,
//       transparent: true,
//       opacity: 0.9
//     });
    
//     // Create bubble mesh
//     const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
//     bubble.castShadow = true;
//     bubble.receiveShadow = false;
//     scene.add(bubble);
    
//     // Create outer shell
//     const outerGeometry = new THREE.SphereGeometry(130, vertexDetail/2, vertexDetail/2);
//     const outerMaterial = new THREE.MeshPhysicalMaterial({
//       color: 0xffffff,
//       emissive: 0xf97316,
//       emissiveIntensity: 0.1,
//       roughness: 0.7,
//       metalness: 0.1,
//       reflectivity: 0.3,
//       clearcoat: 0.5,
//       transparent: true,
//       opacity: 0.15,
//       side: THREE.DoubleSide,
//       wireframe: true
//     });
    
//     const outerShell = new THREE.Mesh(outerGeometry, outerMaterial);
//     scene.add(outerShell);
    
//     // Create particles
//     const particlesCount = 300;
//     const particleGeometry = new THREE.BufferGeometry();
//     const particleMaterial = new THREE.PointsMaterial({
//       color: 0xffffff,
//       size: 2,
//       transparent: true,
//       opacity: 0.6,
//       sizeAttenuation: true
//     });
    
//     const particlePositions = new Float32Array(particlesCount * 3);
//     const particleSpeeds: Array<{x: number, y: number, z: number}> = [];
    
//     for (let i = 0; i < particlesCount; i++) {
//       // Random position inside sphere
//       const radius = Math.random() * 100;
//       const theta = Math.random() * Math.PI * 2;
//       const phi = Math.random() * Math.PI;
      
//       const x = radius * Math.sin(phi) * Math.cos(theta);
//       const y = radius * Math.sin(phi) * Math.sin(theta);
//       const z = radius * Math.cos(phi);
      
//       particlePositions[i * 3] = x;
//       particlePositions[i * 3 + 1] = y;
//       particlePositions[i * 3 + 2] = z;
      
//       // Random speed
//       particleSpeeds.push({
//         x: (Math.random() - 0.5) * 0.2,
//         y: (Math.random() - 0.5) * 0.2,
//         z: (Math.random() - 0.5) * 0.2
//       });
//     }
    
//     particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
//     const particles = {
//       mesh: new THREE.Points(particleGeometry, particleMaterial),
//       speeds: particleSpeeds
//     };
    
//     scene.add(particles.mesh);
    
//     // Store all elements in the ref
//     sceneRef.current = {
//       scene,
//       camera,
//       renderer,
//       bubble,
//       outerShell,
//       pulsingLight,
//       particles,
//       originalVertices,
//       mousePos: {x: width / 2, y: height / 2},
//       spring: {scale: 1},
//       activityIntensity: 0
//     };
    
//     setSceneInitialized(true);
    
//     // Handle window resize
//     const handleResize = () => {
//       if (!containerRef.current || !sceneRef.current.camera || !sceneRef.current.renderer) return;
      
//       const width = containerRef.current.clientWidth;
//       const height = containerRef.current.clientHeight;
      
//       sceneRef.current.camera.aspect = width / height;
//       sceneRef.current.camera.updateProjectionMatrix();
//       sceneRef.current.renderer.setSize(width, height);
//     };
    
//     window.addEventListener('resize', handleResize);
    
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       if (sceneRef.current.animationFrameId) {
//         cancelAnimationFrame(sceneRef.current.animationFrameId);
//       }
//     };
//   }, [sceneInitialized]);
  
//   // Animation loop
//   useEffect(() => {
//     if (!sceneInitialized) return;
    
//     const {
//       scene,
//       camera,
//       renderer,
//       bubble,
//       outerShell,
//       pulsingLight,
//       particles,
//       originalVertices
//     } = sceneRef.current;
    
//     if (!scene || !camera || !renderer || !bubble || !outerShell || 
//         !pulsingLight || !particles || !originalVertices) return;
    
//     // Noise implementation (simplified)
//     const simplex3 = (x: number, y: number, z: number) => {
//       return (Math.sin(x) + Math.sin(y) + Math.sin(z)) / 3;
//     };
    
//     // Helper function to map values
//     const map = (num: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
//       return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
//     };
    
//     // Animation function
//     const animate = () => {
//       const time = Date.now();
      
//       // Update bubble rotation based on mouse position
//       const { mousePos, spring, activityIntensity } = sceneRef.current;
      
//       // Width and height of container
//       const width = containerRef.current?.clientWidth || 300;
//       const height = containerRef.current?.clientHeight || 300;
      
//       if (mousePos && bubble) {
//         bubble.rotation.y = -4 + map(mousePos.x, 0, width, 0, 4);
//         bubble.rotation.z = 4 + map(mousePos.y, 0, height, 0, -4);
//       }
      
//       // Apply spring effect
//       if (spring && bubble) {
//         bubble.scale.set(spring.scale, spring.scale, spring.scale);
//       }
      
//       // Update outer shell rotation (counter to main bubble)
//       if (mousePos && outerShell) {
//         outerShell.rotation.y = 2 - map(mousePos.x, 0, width, 0, 4);
//         outerShell.rotation.z = -2 - map(mousePos.y, 0, height, 0, -4);
//       }
      
//       // Update activity intensity
//       if (isActive && sceneRef.current.activityIntensity !== undefined && 
//           sceneRef.current.activityIntensity < 1) {
//         sceneRef.current.activityIntensity += 0.01;
//       } else if (!isActive && sceneRef.current.activityIntensity !== undefined && 
//                 sceneRef.current.activityIntensity > 0) {
//         sceneRef.current.activityIntensity -= 0.005;
//       }
      
//       if (sceneRef.current.activityIntensity !== undefined) {
//         sceneRef.current.activityIntensity = Math.max(0, Math.min(1, sceneRef.current.activityIntensity));
//       }
      
//       // Update pulsing light
//       if (isActive && pulsingLight) {
//         pulsingLight.intensity = 1 + Math.sin(time * 0.003) * (sceneRef.current.activityIntensity || 0);
//         pulsingLight.color.setHex(0x4f7bff); // Blue when active
//       } else if (pulsingLight) {
//         pulsingLight.intensity = 0.5 + Math.sin(time * 0.001) * 0.3;
//         pulsingLight.color.setHex(0xf97316); // Orange when inactive
//       }
      
//       // Change bubble color based on activity
//       if (isActive && bubble) {
//         (bubble.material as THREE.MeshPhysicalMaterial).color.setHex(0x4f7bff); // Blue when active
//         (bubble.material as THREE.MeshPhysicalMaterial).emissive.setHex(0x4f7bff);
//         (bubble.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.5 + (sceneRef.current.activityIntensity || 0) * 0.5;
        
//         if (particles) {
//           // Update particles color
//           (particles.mesh.material as THREE.PointsMaterial).color.setHex(0x4f7bff);
//           (particles.mesh.material as THREE.PointsMaterial).size = 2 + (sceneRef.current.activityIntensity || 0) * 3;
//         }
//       } else if (bubble) {
//         (bubble.material as THREE.MeshPhysicalMaterial).color.setHex(0xf97316); // Orange when inactive
//         (bubble.material as THREE.MeshPhysicalMaterial).emissive.setHex(0xf97316);
//         (bubble.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.5;
        
//         if (particles) {
//           // Reset particles
//           (particles.mesh.material as THREE.PointsMaterial).color.setHex(0xffffff);
//           (particles.mesh.material as THREE.PointsMaterial).size = 2;
//         }
//       }
      
//       // Update vertices
//       if (bubble && originalVertices) {
//         updateVertices(time);
//       }
      
//       // Render the scene
//       renderer.render(scene, camera);
      
//       // Continue animation loop
//       sceneRef.current.animationFrameId = requestAnimationFrame(animate);
//     };
    
//     // Update vertices function
//     const updateVertices = (time: number) => {
//       if (!bubble || !originalVertices || !particles) return;
      
//       // Width and height for mouse distance calculation
//       const width = containerRef.current?.clientWidth || 300;
//       const height = containerRef.current?.clientHeight || 300;
      
//       // Calculate mouse distance influence
//       const centerX = width / 2;
//       const centerY = height / 2;
//       const mouseX = sceneRef.current.mousePos?.x || centerX;
//       const mouseY = sceneRef.current.mousePos?.y || centerY;
      
//       const dx = mouseX - centerX;
//       const dy = mouseY - centerY;
//       const dist = Math.sqrt(dx * dx + dy * dy);
//       const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
      
//       // Normalize distance (closer = higher value)
//       const distanceInfluence = 1 - (dist / maxDist);
      
//       // Total influence combines mouse and activity
//       const totalInfluence = distanceInfluence * 0.3 + (sceneRef.current.activityIntensity || 0) * 0.7;
      
//       // Update bubble vertices
//       const positionAttribute = bubble.geometry.attributes.position;
      
//       for (let i = 0; i < positionAttribute.count; i++) {
//         const original = originalVertices[i];
        
//         // Generate noise based on position and time
//         const noise1 = simplex3(
//           original.x * 0.01 + time * 0.0003,
//           original.y * 0.01 + time * 0.0003,
//           original.z * 0.01
//         );
        
//         const noise2 = simplex3(
//           original.x * 0.02 + time * 0.0006,
//           original.y * 0.02 + time * 0.0006,
//           original.z * 0.02
//         );
        
//         // Combine noise layers
//         const combinedNoise = (noise1 * 0.7 + noise2 * 0.3);
        
//         // Create wave pattern
//         const wave = Math.sin(original.x * 0.05 + time * 0.001) * 
//                      Math.cos(original.y * 0.05 + time * 0.001) * 
//                      (0.05 + totalInfluence * 0.2);
        
//         // Add radial pulse when active
//         let pulse = 0;
//         if (isActive) {
//           pulse = Math.sin(time * 0.003) * 5 * (sceneRef.current.activityIntensity || 0);
//         }
        
//         // Calculate distortion ratio
//         const ratio = ((combinedNoise * 0.3 * (totalInfluence + 0.1)) + 0.8);
        
//         // Apply distortion to vertex
//         const distortedX = original.x * ratio + wave;
//         const distortedY = original.y * ratio + wave;
//         const distortedZ = original.z * ratio + wave;
        
//         // Calculate normalized direction for pulse
//         const length = Math.sqrt(distortedX*distortedX + distortedY*distortedY + distortedZ*distortedZ);
//         const nx = distortedX / length;
//         const ny = distortedY / length;
//         const nz = distortedZ / length;
        
//         // Set new position with pulse
//         positionAttribute.setXYZ(
//           i,
//           distortedX + nx * pulse,
//           distortedY + ny * pulse,
//           distortedZ + nz * pulse
//         );
//       }
      
//       positionAttribute.needsUpdate = true;
      
//       // Update outer shell
//       if (outerShell) {
//         const outerPositionAttribute = outerShell.geometry.attributes.position;
        
//         for (let i = 0; i < outerPositionAttribute.count; i++) {
//           const x = outerPositionAttribute.getX(i);
//           const y = outerPositionAttribute.getY(i);
//           const z = outerPositionAttribute.getZ(i);
          
//           const length = Math.sqrt(x*x + y*y + z*z);
//           const nx = x / length;
//           const ny = y / length;
//           const nz = z / length;
          
//           const noise = simplex3(
//             nx * 4 + time * 0.0001,
//             ny * 4 + time * 0.0001,
//             nz * 4
//           );
          
//           const outerRadius = 130 + noise * 10 * totalInfluence;
          
//           outerPositionAttribute.setXYZ(
//             i,
//             nx * outerRadius,
//             ny * outerRadius,
//             nz * outerRadius
//           );
//         }
        
//         outerPositionAttribute.needsUpdate = true;
//       }
      
//       // Update particles
//       const particlePositions = particles.mesh.geometry.attributes.position.array;
      
//       for (let i = 0; i < particles.speeds.length; i++) {
//         // Get current position
//         let x = particlePositions[i * 3];
//         let y = particlePositions[i * 3 + 1];
//         let z = particlePositions[i * 3 + 2];
        
//         // Move according to speed, faster when active
//         x += particles.speeds[i].x * (1 + (sceneRef.current.activityIntensity || 0) * 2);
//         y += particles.speeds[i].y * (1 + (sceneRef.current.activityIntensity || 0) * 2);
//         z += particles.speeds[i].z * (1 + (sceneRef.current.activityIntensity || 0) * 2);
        
//         // Check if outside sphere and bounce
//         const distance = Math.sqrt(x*x + y*y + z*z);
//         if (distance > 110) {
//           // Bounce direction with damping
//           const nx = x / distance;
//           const ny = y / distance;
//           const nz = z / distance;
          
//           const damping = 0.8;
//           particles.speeds[i].x = -particles.speeds[i].x * damping;
//           particles.speeds[i].y = -particles.speeds[i].y * damping;
//           particles.speeds[i].z = -particles.speeds[i].z * damping;
          
//           // Place back on sphere boundary
//           x = nx * 110;
//           y = ny * 110;
//           z = nz * 110;
//         }
        
//         // Update position
//         particlePositions[i * 3] = x;
//         particlePositions[i * 3 + 1] = y;
//         particlePositions[i * 3 + 2] = z;
//       }
      
//       particles.mesh.geometry.attributes.position.needsUpdate = true;
//     };
    
//     // Start animation
//     animate();
    
//     return () => {
//       if (sceneRef.current.animationFrameId) {
//         cancelAnimationFrame(sceneRef.current.animationFrameId);
//       }
//     };
//   }, [sceneInitialized, isActive]);
  
//   // Handle mouse movements
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (sceneRef.current.mousePos) {
//         sceneRef.current.mousePos.x = e.clientX;
//         sceneRef.current.mousePos.y = e.clientY;
//       }
//     };
    
//     window.addEventListener('mousemove', handleMouseMove);
    
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);
  
//   // Handle click effects
//   useEffect(() => {
//     const handleMouseDown = () => {
//       if (sceneRef.current.spring) {
//         // Animate spring compression
//         gsap.to(sceneRef.current.spring, {
//           scale: 0.7,
//           duration: 0.7,
//           ease: "power3.out"
//         });
//       }
//     };
    
//     const handleMouseUp = () => {
//       if (sceneRef.current.spring) {
//         // Animate spring release
//         gsap.to(sceneRef.current.spring, {
//           scale: 1,
//           duration: 0.9,
//           ease: "elastic.out(1, 0.3)"
//         });
//       }
//     };
    
//     window.addEventListener('mousedown', handleMouseDown);
//     window.addEventListener('mouseup', handleMouseUp);
    
//     return () => {
//       window.removeEventListener('mousedown', handleMouseDown);
//       window.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, []);
  
//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!question.trim()) return;
    
//     // Activate the sphere
//     setIsActive(true);
//     setResponse('Thinking...');
    
//     // Simulate API call
//     setTimeout(() => {
//       setResponse(`This is a simulated response to: "${question}"\n\nThe sphere has been integrated into your portfolio website with matching theme colors. It responds to mouse movements and clicks, and shows animation effects when "thinking" about a response.`);
      
//       // Deactivate sphere after a delay
//       setTimeout(() => {
//         setIsActive(false);
//       }, 3000);
//     }, 2000);
//   };
  
//   return (
//     <section id="ai-assistant" className="py-20 bg-gray-900 bg-opacity-50">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">AI Assistant</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           {/* 3D Sphere */}
//           <div ref={containerRef} className="relative w-full h-96 flex items-center justify-center">
//             <canvas 
//               ref={canvasRef} 
//               className="w-full h-full"
//             />
//           </div>
          
//           {/* Interface */}
//           <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8">
//             <h3 className="text-2xl font-bold mb-6 text-orange-500">Ask Me Anything</h3>
            
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="question" className="block text-sm font-medium text-gray-400 mb-2">
//                   Your Question
//                 </label>
//                 <input
//                   type="text"
//                   id="question"
//                   value={question}
//                   onChange={(e) => setQuestion(e.target.value)}
//                   className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   placeholder="What would you like to know?"
//                   required
//                 />
//               </div>
              
//               {response && (
//                 <div className="bg-gray-700 rounded-md p-4 text-gray-300">
//                   {response}
//                 </div>
//               )}
              
//               <button
//                 type="submit"
//                 className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition w-full"
//               >
//                 Ask AI
//               </button>
//             </form>
            
//             <div className="mt-6 text-sm text-gray-400">
//               <p>This interactive 3D sphere responds to your questions, visualizing the AI assistant's thinking process with dynamic animations.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Add missing gsap type
// declare const gsap: any;

// export default AIAssistant;