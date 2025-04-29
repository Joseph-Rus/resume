import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// DOM Elements
const loadingEl  = document.getElementById('loading');
const progressEl = document.getElementById('progress');

// Scene
const scene = new THREE.Scene();
scene.background = null;

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight     = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(-5, 5, -5);

scene.add(ambientLight);
scene.add(directionalLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping   = true;
controls.dampingFactor    = 0.05;
controls.minDistance      = 5;     // how close you can zoom
controls.maxDistance      = 2000;  // how far you can zoom
controls.target.set(0, 0, 0);

// Frame-to-model helper
function frameCameraToModel(model) {
  const box    = new THREE.Box3().setFromObject(model);
  const size   = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  // compute the distance the camera needs to be to fit the model
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov    = camera.fov * (Math.PI / 180);
  const cameraZ = Math.abs(maxDim / Math.tan(fov / 2));

  // position camera a bit above and behind the center
  camera.position.set(
    center.x,
    center.y + size.y * 0.2,
    center.z + cameraZ * 1.4
  );

  // update controls & clipping planes
  controls.target.copy(center);
  camera.near = maxDim / 100;
  camera.far  = cameraZ * 10;
  camera.updateProjectionMatrix();
  controls.update();
}

// Load GLTF model
const loader = new GLTFLoader();
loader.load(
  './models/mainroomv2.glb',
  (gltf) => {
    // 1. Scale
    gltf.scene.scale.set(0.5, 0.5, 0.5);

    // 2. Rotate to show the front
    gltf.scene.rotation.set(
      0,                // X-axis (no tilt)
      0,                // Y-axis (no rotation, try Math.PI if back is still visible)
      0                 // Z-axis (no roll)
    );

    // 3. Add to scene
    scene.add(gltf.scene);

    // 4. Re-frame camera
    frameCameraToModel(gltf.scene);

    // 5. Hide loading UI
    loadingEl.style.display = 'none';
  },

  // onProgress
  (xhr) => {
    if (xhr.lengthComputable) {
      const percentComplete = Math.round((xhr.loaded / xhr.total) * 100);
      progressEl.textContent  = `${percentComplete}%`;
    }
  },

  // onError
  (error) => {
    console.error('Error loading model:', error);
    loadingEl.textContent          = `Error: ${error.message}`;
    loadingEl.style.backgroundColor = 'rgba(255,0,0,0.7)';

    // fallback cube
    const geom     = new THREE.BoxGeometry(50, 50, 50);
    const mat      = new THREE.MeshStandardMaterial({ color: 0x44aa88 });
    const fallback = new THREE.Mesh(geom, mat);
    scene.add(fallback);

    setTimeout(() => loadingEl.style.display = 'none', 3000);
  }
);

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();