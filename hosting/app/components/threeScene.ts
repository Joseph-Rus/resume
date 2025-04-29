// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// interface ThreeSceneOptions {
//   container: HTMLDivElement;
//   onStatusUpdate?: (status: string) => void;
//   onError?: (message: string) => void;
// }

// export function initializeThreeScene({
//   container,
//   onStatusUpdate = () => {},
//   onError = () => {},
// }: ThreeSceneOptions) {
//   if (!container) {
//     onError('Container is null');
//     console.error('Container is null');
//     return () => {};
//   }

//   // Log initialization
//   console.log('Initializing Three.js scene...');
//   onStatusUpdate('Initializing...');

//   // Create loading indicator
//   const loadingEl = document.createElement('div');
//   loadingEl.id = 'loading';
//   Object.assign(loadingEl.style, {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     background: 'rgba(0,0,0,0.7)',
//     color: 'white',
//     padding: '10px 15px',
//     borderRadius: '4px',
//     fontFamily: 'Arial, sans-serif',
//   });
//   loadingEl.textContent = 'Loading model... ';
//   const progressEl = document.createElement('span');
//   progressEl.id = 'progress';
//   progressEl.textContent = '0%';
//   loadingEl.appendChild(progressEl);
//   container.appendChild(loadingEl);

//   // Scene setup
//   const scene = new THREE.Scene();
//   scene.background = new THREE.Color(0xffffff);

//   // Camera
//   const camera = new THREE.PerspectiveCamera(
//     45,
//     container.clientWidth / container.clientHeight,
//     0.1,
//     10000
//   );
//   camera.position.set(0, 0, 100); // Initial position

//   // Renderer
//   const renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setSize(container.clientWidth, container.clientHeight);
//   renderer.setPixelRatio(window.devicePixelRatio);
//   container.appendChild(renderer.domElement);

//   // Lights
//   const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//   const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//   directionalLight.position.set(-5, 5, -5);
//   scene.add(ambientLight, directionalLight);

//   // Controls
//   const controls = new OrbitControls(camera, renderer.domElement);
//   controls.enableDamping = true;
//   controls.dampingFactor = 0.05;
//   controls.minDistance = 5;
//   controls.maxDistance = 2000;

//   // Frame-to-model helper
//   function frameCameraToModel(model: THREE.Object3D) {
//     try {
//       const box = new THREE.Box3().setFromObject(model);
//       const size = box.getSize(new THREE.Vector3());
//       const center = box.getCenter(new THREE.Vector3());

//       const maxDim = Math.max(size.x, size.y, size.z);
//       const fov = camera.fov * (Math.PI / 180);
//       const cameraZ = Math.abs(maxDim / Math.tan(fov / 2));

//       camera.position.set(center.x, center.y + size.y * 0.5, center.z + cameraZ * 1.1);
//       controls.target.copy(center);
//       camera.near = maxDim / 100;
//       camera.far = cameraZ * 10;
//       camera.updateProjectionMatrix();
//       controls.update();
//     } catch (err) {
//       console.error('Error framing camera:', err);
//       onError('Failed to frame camera');
//     }
//   }

//   // Fallback cube
//   function createFallbackCube() {
//     onStatusUpdate('Using fallback cube');
//     const geometry = new THREE.BoxGeometry(50, 50, 50);
//     const material = new THREE.MeshStandardMaterial({ color: 0x44aa88 });
//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);
//     camera.position.set(0, 0, 100);
//     controls.update();
//   }

//   // Load GLTF model
//   const loader = new GLTFLoader();
//   const modelPath = '/hosting/public/models/mainroom.glb'; // Adjust path if needed
//   console.log(`Loading model from: ${modelPath}`);
//   loader.load(
//     modelPath,
//     (gltf) => {
//       console.log('Model loaded successfully');
//       onStatusUpdate('Model loaded');
//       gltf.scene.scale.set(0.5, 0.5, 0.5);
//       scene.add(gltf.scene);
//       frameCameraToModel(gltf.scene);
//       loadingEl.style.display = 'none';
//     },
//     (xhr) => {
//       if (xhr.lengthComputable) {
//         const percentComplete = Math.round((xhr.loaded / xhr.total) * 100);
//         progressEl.textContent = `${percentComplete}%`;
//         onStatusUpdate(`Loading: ${percentComplete}%`);
//       }
//     },
//     (error: ErrorEvent) => {
//       console.error('Model loading error:', error);
//       onError(error.message || 'Failed to load model');
//       loadingEl.textContent = `Error: ${error.message || 'Loading failed'}`;
//       loadingEl.style.backgroundColor = 'rgba(255,0,0,0.7)';
//       createFallbackCube();
//       setTimeout(() => {
//         loadingEl.style.display = 'none';
//       }, 3000);
//     }
//   );

//   // Resize handler
//   const handleResize = () => {
//     camera.aspect = container.clientWidth / container.clientHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(container.clientWidth, container.clientHeight);
//   };
//   window.addEventListener('resize', handleResize);

//   // Animation loop
//   let isAnimating = true;
//   function animate() {
//     if (!isAnimating) return;
//     requestAnimationFrame(animate);
//     controls.update();
//     renderer.render(scene, camera);
//   }
//   animate();

//   // Cleanup
//   return () => {
//     console.log('Cleaning up Three.js scene...');
//     isAnimating = false;
//     window.removeEventListener('resize', handleResize);
//     if (container.contains(renderer.domElement)) {
//       container.removeChild(renderer.domElement);
//     }
//     if (container.contains(loadingEl)) {
//       container.removeChild(loadingEl);
//     }
//     renderer.dispose();
//   };
// }