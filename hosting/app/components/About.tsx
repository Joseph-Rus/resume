"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const About: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      1, // Initial aspect ratio, will be updated
      0.1,
      10000
    );

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(-5, 5, -5);

    scene.add(ambientLight);
    scene.add(directionalLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 2000;
    controls.target.set(0, 0, 0);

    // Frame-to-model helper
    function frameCameraToModel(model: THREE.Object3D) {
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      // Compute the distance the camera needs to be to fit the model
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      const cameraZ = Math.abs(maxDim / Math.tan(fov / 2));

      // Position camera farther to zoom out (increased multiplier from 0.7 to 1.0)
      camera.position.set(
        center.x,
        center.y + size.y * 0.5,
        center.z + cameraZ * 1.0
      );

      // Update controls & clipping planes
      controls.target.copy(center);
      camera.near = maxDim / 100;
      camera.far = cameraZ * 10;
      camera.updateProjectionMatrix();
      controls.update();
    }

    // Update sizes function
    const updateSizes = () => {
      if (!mountRef.current) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      // Update camera
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(width, height);
    };

    // Initial size setup
    updateSizes();

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load(
      './models/mainroom.glb',
      (gltf) => {
        gltf.scene.scale.set(0.5, 0.5, 0.5);
        gltf.scene.rotation.set(15 * (Math.PI / 180), 200 * (Math.PI / 180), 0);
        scene.add(gltf.scene);
        frameCameraToModel(gltf.scene);
        setLoading(false);
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          const percentComplete = Math.round((xhr.loaded / xhr.total) * 100);
          setProgress(percentComplete);
        }
      },
      (error) => {
        console.error('Error loading model:', error);
        setLoading(false);
        const geom = new THREE.BoxGeometry(50, 50, 50);
        const mat = new THREE.MeshStandardMaterial({ color: 0x44aa88 });
        const fallback = new THREE.Mesh(geom, mat);
        scene.add(fallback);
      }
    );

    // Resize handler
    const handleResize = () => {
      updateSizes();
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="about"
      className="py-0 relative bg-transparent text-gray-800 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-10 left-0 w-48 h-48 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-20 blur-2xl" />
      <div className="absolute bottom-10 right-0 w-48 h-48 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-20 blur-2xl" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-left">
          About me
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Text Column */}
          <div className="md:w-1/2">
            <div className="bg-white bg-opacity-80 p-6 rounded-xl shadow-md">
              <p className="text-base leading-relaxed">
                I’m Joey Russell, a Computer Science major at California Baptist University (Class of 2027) driven by a lifelong curiosity for hands-on problem solving. My journey started in a local machine shop, crafting DIY gadgets and mastering CNC machinery—an experience that taught me the value of precision, persistence, and practical ingenuity. From there I transitioned into audiovisual technology on campus, ensuring seamless experiences in classrooms and events while honing my troubleshooting skills.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Today, as a Business Development Intern at VETS, LLC—a veteran-owned digital engineering and MBSE services provider supporting federal clients—I leverage GPT-driven tools to streamline RFI and proposal workflows (cutting draft time by 30%) and architect end-to-end automation pipelines integrating HigherGov, HubSpot, Zapier, and Jira for real-time deal tracking and collaboration.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Beyond internships and campus tech support, I’m passionate about full-stack and embedded systems development. I’ve designed and deployed scalable SQL database servers on AWS, built “College Study Mate” for collaborative learning, engineered a C++ battery management system for a Formula SAE EV, and developed “IGRIS” in SwiftUI—complete with Blackboard calendar sync and smart notifications. My toolkit spans C++, Java, Python, SQL, HTML/React/Node.js, Swift, Linux, Firebase, and cybersecurity platforms like Hack The Box—all united by my drive to build reliable, innovative solutions that make an impact.
              </p>
            </div>
          </div>

          {/* 3D Model Column */}
          <div className="md:w-1/2 relative h-96 md:h-auto">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 rounded-lg">
                <div className="bg-black bg-opacity-70 text-white p-4 rounded-lg">
                  Loading model... {progress}%
                </div>
              </div>
            )}
            <div
              ref={mountRef}
              className="w-full h-full rounded-lg overflow-hidden"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;