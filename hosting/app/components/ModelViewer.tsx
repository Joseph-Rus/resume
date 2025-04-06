// components/ModelViewer.tsx
"use client";

import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Define the GLTF type
type GLTF = {
  scene: THREE.Object3D;
  [key: string]: any;
};
import { Environment, OrbitControls, PresentationControls, Stage, Gltf } from '@react-three/drei';

// Model component that actually loads and renders the 3D model
function Model({ modelPath, scale = 40, position = [0, -1, 0], rotation = [0, 0.5, 0] }) {
  const gltf = useLoader(GLTFLoader, modelPath) as GLTF;
  const modelRef = useRef<THREE.Object3D>(null);
  
  // Slow auto-rotation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive 
      ref={modelRef}
      object={Array.isArray(gltf) ? gltf[0].scene : gltf.scene} 
      scale={scale} 
      position={position}
      rotation={rotation}
    />
  );
}

// Main component with the canvas setup
export default function ModelViewer() {
  const [loading, setLoading] = useState(true);
  
  // Path to your GLB file - update this with the actual path
  const modelPath = "/models/car.glb";
  
  return (
    <div className="w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-6xl font-bold text-orange-500">JR</div>
        </div>
      )}
      
      <Canvas
        camera={{ position: [10, 5, 10], fov: 25 }}
        onCreated={() => setLoading(false)}
        shadows
        className="bg-transparent"
      >
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        
        <PresentationControls
          global
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          snap={true}
        >
          <Model modelPath={modelPath} />
        </PresentationControls>
        
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}