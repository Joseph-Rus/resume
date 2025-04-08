// // Import Three.js using ES modules
// import * as THREE from 'three';
// // If you're using other libraries, import them too
// import { gsap } from 'gsap';
// // You'd need to install these packages via npm first

// export class BubbleSphere {
//   private container: HTMLElement;
//   private scene: THREE.Scene;
//   private camera: THREE.PerspectiveCamera;
//   private renderer: THREE.WebGLRenderer;
//   private bubble: THREE.Mesh;

//   constructor(container: HTMLElement) {
//     this.container = container;
    
//     // Initialize
//     this.scene = new THREE.Scene();
//     this.camera = new THREE.PerspectiveCamera(
//       100, 
//       container.clientWidth / container.clientHeight, 
//       0.1, 
//       10000
//     );
//     this.camera.position.z = 500;
    
//     // Create renderer
//     this.renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       alpha: true
//     });
//     this.renderer.setSize(container.clientWidth, container.clientHeight);
//     this.renderer.setClearColor(0x000000, 0);
//     this.container.appendChild(this.renderer.domElement);
    
//     // Create sphere
//     const geometry = new THREE.SphereGeometry(120, 64, 64);
//     const material = new THREE.MeshStandardMaterial({
//       color: 0xbd4be3,
//       emissive: 0xbd4be3,
//       emissiveIntensity: 0.5,
//       roughness: 0.61,
//       metalness: 0.21
//     });
    
//     this.bubble = new THREE.Mesh(geometry, material);
//     this.scene.add(this.bubble);
    
//     // Add lights
//     this.addLights();
    
//     // Start animation
//     this.animate();
    
//     // Handle resize
//     window.addEventListener('resize', this.onResize.bind(this));
//   }
  
//   private addLights(): void {
//     const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.5);
//     this.scene.add(hemisphereLight);
    
//     const directionalLight = new THREE.DirectionalLight(0xff8f16, 0.4);
//     directionalLight.position.set(0, 450, 350);
//     this.scene.add(directionalLight);
//   }
  
//   private animate(): void {
//     requestAnimationFrame(this.animate.bind(this));
    
//     this.bubble.rotation.y += 0.005;
    
//     this.renderer.render(this.scene, this.camera);
//   }
  
//   private onResize(): void {
//     const width = this.container.clientWidth;
//     const height = this.container.clientHeight;
    
//     this.camera.aspect = width / height;
//     this.camera.updateProjectionMatrix();
    
//     this.renderer.setSize(width, height);
//   }
  
//   public dispose(): void {
//     window.removeEventListener('resize', this.onResize.bind(this));
//     this.container.removeChild(this.renderer.domElement);
//     this.renderer.dispose();
//   }
// }