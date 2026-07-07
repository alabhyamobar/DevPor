import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const getSkill3DProps = (tag) => {
  switch (tag) {
    case "FRONTEND": 
      return {
        geo: new THREE.TorusGeometry(0.7, 0.15, 16, 32),
        color: 0x38bdf8,
        speed: 0.02
      };
    case "BACKEND": 
      return {
        geo: new THREE.CylinderGeometry(0.7, 0.7, 0.8, 6),
        color: 0x22c55e,
        speed: 0.015
      };
    case "DATABASE": 
      return {
        geo: new THREE.ConeGeometry(0.8, 1.4, 4),
        color: 0x10b981,
        speed: 0.018
      };
    case "STYLING": 
      return {
        geo: new THREE.TorusKnotGeometry(0.5, 0.15, 32, 8),
        color: 0x06b6d4,
        speed: 0.02
      };
    case "GENAI": 
      return {
        geo: new THREE.DodecahedronGeometry(0.8, 0),
        color: 0xa855f7,
        speed: 0.025
      };
    case "EMBEDDINGS": 
      return {
        geo: new THREE.OctahedronGeometry(0.8, 0),
        color: 0xec4899,
        speed: 0.02
      };
    case "AGENTS": 
      return {
        geo: new THREE.IcosahedronGeometry(0.8, 0),
        color: 0xf43f5e,
        speed: 0.022
      };
    case "NEURAL": 
      return {
        geo: new THREE.SphereGeometry(0.7, 8, 8),
        color: 0x8b5cf6,
        speed: 0.015
      };
    case "WEBGL": 
      return {
        geo: new THREE.IcosahedronGeometry(0.85, 1),
        color: 0xf59e0b,
        speed: 0.03
      };
    case "MOTION": 
      return {
        geo: new THREE.TorusGeometry(0.65, 0.2, 12, 24),
        color: 0xeab308,
        speed: 0.025
      };
    default:
      return {
        geo: new THREE.BoxGeometry(0.8, 0.8, 0.8),
        color: 0x00f0ff,
        speed: 0.02
      };
  }
};

const ThreeSkillIcon = ({ tag, isHovered = false }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = 48;
    const height = 48;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 10);
    camera.position.z = 2.4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const { geo, color, speed } = getSkill3DProps(tag);

    const wireMat = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });

    const mesh = new THREE.Mesh(geo, wireMat);
    scene.add(mesh);

    const innerGeo = new THREE.SphereGeometry(0.3, 8, 8);
    const innerMat = new THREE.MeshBasicMaterial({ color });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    let animId;
    const animate = () => {
      const rotSpeed = isHovered ? speed * 2.5 : speed;
      mesh.rotation.x += rotSpeed;
      mesh.rotation.y += rotSpeed * 1.2;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      geo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [tag, isHovered]);

  return (
    <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center shadow-inner overflow-hidden relative group-hover:border-cyan-400/80 transition-colors">
      <div ref={mountRef} className="w-12 h-12 flex items-center justify-center" />
    </div>
  );
};

export default ThreeSkillIcon;
