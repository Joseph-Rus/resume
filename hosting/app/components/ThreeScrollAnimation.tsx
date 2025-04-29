import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// Labels for each section; use one mesh per entry
const sections = [
  { name: 'Hero', color: 0xFF6B6B },
  { name: 'About', color: 0x4ECDC4 },
  { name: 'Experience', color: 0x556270 },
  { name: 'Skills', color: 0xC7F464 },
  { name: 'Projects', color: 0xFFD166 },
  { name: 'Footer', color: 0x1A535C },
];

const ThreeScrollAnimation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    container.appendChild(renderer.domElement);

    // 2. Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // 3. Create one box per section, spaced on Z
    const meshes: THREE.Mesh[] = [];
    sections.forEach((sec, i) => {
      const geom = new THREE.BoxGeometry(1, 1, 1);
      const mat = new THREE.MeshBasicMaterial({ color: sec.color });
      const mesh = new THREE.Mesh(geom, mat);

      // position so that mesh #0 is at z=5, mesh #1 at z=2, mesh #2 at z=-1, etc.
      mesh.position.set(0, 0, 5 - i * 3);
      scene.add(mesh);
      meshes.push(mesh);
    });

    // 4. Handle resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // 5. Map scroll → camera.position.z
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollY / maxScroll;

      // total span between first and last mesh:
      const totalDistance = (sections.length - 1) * 3;
      // camera moves from z=5 down to z=5 - totalDistance
      camera.position.z = 5 - totalDistance * scrollPercent;
    };
    window.addEventListener('scroll', onScroll);

    // 6. Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // 7. Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeScrollAnimation;
