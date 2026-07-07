import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeSkillCanvas = ({ category = "mern" }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 240;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00f0ff, 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xa855f7, 3, 10);
    pointLight.position.set(-3, -2, 2);
    scene.add(pointLight);

    let geometry;
    let mainColor = 0x00f0ff;

    if (category === "genai") {
      geometry = new THREE.IcosahedronGeometry(1.6, 1);
      mainColor = 0xc084fc; 
    } else if (category === "mern") {
      geometry = new THREE.TorusKnotGeometry(1.2, 0.35, 64, 16);
      mainColor = 0x38bdf8; 
    } else {
      geometry = new THREE.OctahedronGeometry(1.6, 1);
      mainColor = 0xf59e0b; 
    }

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: mainColor,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const mainMesh = new THREE.Mesh(geometry, wireframeMat);
    scene.add(mainMesh);

    const coreGeo = new THREE.SphereGeometry(0.8, 16, 16);
    const coreMat = new THREE.MeshStandardMaterial({
      color: mainColor,
      roughness: 0.2,
      metalness: 0.8,
      emissive: mainColor,
      emissiveIntensity: 0.4
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 40;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.5 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: mainColor,
      transparent: true,
      opacity: 0.8
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - rect.width / 2) * 0.001;
      mouseY = (e.clientY - rect.top - rect.height / 2) * 0.001;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animId;
    const animate = () => {
      mainMesh.rotation.x += 0.006 + mouseY * 0.5;
      mainMesh.rotation.y += 0.008 + mouseX * 0.5;

      coreMesh.rotation.y -= 0.01;

      particleSystem.rotation.y += 0.003;
      particleSystem.rotation.x += 0.002;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      geometry.dispose();
      wireframeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [category]);

  return (
    <div className="relative w-full h-full min-h-[220px] flex items-center justify-center overflow-hidden">
      <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />
    </div>
  );
};

export default ThreeSkillCanvas;
