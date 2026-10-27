"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function useReducedMotion() {
  return useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
}

function Sculpture() {
  const knot = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const orb = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  useFrame((state, delta) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    if (knot.current) {
      knot.current.rotation.x = t * 0.18;
      knot.current.rotation.y = t * 0.28;
      // Mouse parallax — halka, cinematic, zyada nahi.
      knot.current.rotation.y += state.pointer.x * delta * 0.6;
      knot.current.rotation.x += -state.pointer.y * delta * 0.4;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.12;
      ring.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.4) * 0.08;
    }
    if (orb.current) {
      orb.current.position.y = Math.sin(t * 0.8) * 0.25;
    }
  });

  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={1.1}>
        <mesh ref={knot} position={[0, 0, 0]}>
          <torusKnotGeometry args={[1.15, 0.34, 220, 36]} />
          <meshStandardMaterial
            color="#8ea2ff"
            metalness={0.85}
            roughness={0.22}
            emissive="#1d2a6b"
            emissiveIntensity={0.35}
          />
        </mesh>
      </Float>
      <mesh ref={ring} position={[0, 0, 0]}>
        <torusGeometry args={[2.15, 0.02, 16, 128]} />
        <meshStandardMaterial color="#22d3ee" metalness={0.9} roughness={0.2} />
      </mesh>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1.6}>
        <mesh ref={orb} position={[1.9, 1.1, -0.6]}>
          <icosahedronGeometry args={[0.32, 1]} />
          <meshStandardMaterial color="#a78bfa" metalness={0.7} roughness={0.25} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={1.2}>
        <mesh position={[-2.1, -1.2, -0.4]}>
          <octahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.15} />
        </mesh>
      </Float>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={18} color="#4f7cff" />
      <pointLight position={[4, 3, -3]} intensity={12} color="#22d3ee" />
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      aria-label="Interactive 3D sculpture — mouse se ghumao"
    >
      <Lights />
      <Sculpture />
    </Canvas>
  );
}

export function MiniScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      aria-label="Small interactive 3D shape"
    >
      <Lights />
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 180, 32]} />
          <meshStandardMaterial
            color="#8ea2ff"
            metalness={0.85}
            roughness={0.22}
            emissive="#1d2a6b"
            emissiveIntensity={0.35}
          />
        </mesh>
      </Float>
    </Canvas>
  );
}
