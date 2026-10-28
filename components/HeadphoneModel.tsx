"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  /** Hex color for the earcup shells. */
  shellColor: string;
  /** Hex color for the cushions. */
  cushionColor: string;
  autoRotate?: boolean;
};

/**
 * PROCEDURAL 3D HEADPHONE — built from real geometry, not an image.
 *
 * Why procedural: public/models/ was empty on audit (no GLB/GLTF file
 * existed), and no legally usable external model was bundled with the
 * project. This model is therefore constructed here from primitives:
 * - Curved headband: a torus arc, padded underneath.
 * - Two earcups: flattened cylinders for outer shells.
 * - Ear cushions: torus rings facing inward.
 * - Hinges / connecting arms: small cylinders + yokes.
 * - Accent ring + logo dot on the outer shell.
 *
 * Materials: metallic shells (metalness high, roughness low) with matte
 * cushions (roughness high). Lighting/shadows come from the viewer.
 */
export function HeadphoneModel({ shellColor, cushionColor, autoRotate = true }: Props) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!autoRotate || !group.current) return;
    if (state.clock.elapsedTime < 0.1) return;
    group.current.rotation.y += delta * 0.25;
  });

  const shell = new THREE.Color(shellColor);
  const cushion = new THREE.Color(cushionColor);

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.35}>
        {/* Grounding platform disc — stops the model reading as floating parts */}
        <mesh position={[0, -1.18, 0]}>
          <cylinderGeometry args={[1.95, 1.95, 0.08, 64]} />
          <meshStandardMaterial color="#232329" metalness={0.2} roughness={0.6} />
        </mesh>
        {/* Headband arc */}
        <mesh position={[0, 1.35, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[1.55, 0.11, 16, 64, Math.PI]} />
          <meshStandardMaterial color={shell} metalness={0.45} roughness={0.35} />
        </mesh>
        {/* Headband padding (inner arc, matte) */}
        <mesh position={[0, 1.28, 0]}>
          <torusGeometry args={[1.42, 0.09, 12, 48, Math.PI]} />
          <meshStandardMaterial color={cushion} metalness={0.05} roughness={0.9} />
        </mesh>

        {/* Left + right assemblies */}
        {([-1, 1] as const).map((side) => (
          <group key={side} position={[side * 1.55, 0, 0]}>
            {/* Yoke / connecting arm — tall enough to actually meet the
                headband endpoint at y=1.35 (previously a visible gap). */}
            <mesh position={[0, 0.95, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.85, 16]} />
              <meshStandardMaterial color="#9a9da3" metalness={0.9} roughness={0.25} />
            </mesh>
            {/* Hinge */}
            <mesh position={[0, 0.58, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.09, 0.09, 0.12, 16]} />
              <meshStandardMaterial color="#9a9da3" metalness={0.9} roughness={0.25} />
            </mesh>
            {/* Outer shell: flattened cylinder facing outward.
                Metalness kept moderate — without an environment map, high
                metalness renders as flat black on a dark background. */}
            <mesh position={[side * 0.12, 0, 0]} rotation={[0, side * (Math.PI / 2), 0]}>
              <cylinderGeometry args={[0.62, 0.62, 0.28, 48]} />
              <meshStandardMaterial color={shell} metalness={0.45} roughness={0.35} />
            </mesh>
            {/* Accent ring on outer shell */}
            <mesh position={[side * 0.27, 0, 0]} rotation={[0, side * (Math.PI / 2), 0]}>
              <torusGeometry args={[0.42, 0.02, 12, 48]} />
              <meshStandardMaterial color="#2f6bff" metalness={0.6} roughness={0.3} emissive="#1a3a8a" emissiveIntensity={0.4} />
            </mesh>
            {/* Cushion: torus facing inward */}
            <mesh position={[-side * 0.08, 0, 0]} rotation={[0, side * (Math.PI / 2), 0]}>
              <torusGeometry args={[0.42, 0.16, 16, 48]} />
              <meshStandardMaterial color={cushion} metalness={0.05} roughness={0.95} />
            </mesh>
            {/* Inner driver cover */}
            <mesh position={[-side * 0.02, 0, 0]} rotation={[0, side * (Math.PI / 2), 0]}>
              <cylinderGeometry args={[0.4, 0.4, 0.06, 32]} />
              <meshStandardMaterial color="#0a0a0b" metalness={0.2} roughness={0.8} />
            </mesh>
          </group>
        ))}
      </Float>
    </group>
  );
}

/** Simple accessory presentation: a clean geometric stand-in, honestly labelled. */
export function SimpleModel({ color }: { color: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.4;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.5}>
      <mesh ref={mesh}>
        <boxGeometry args={[1.6, 0.9, 0.9]} />
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.5} />
      </mesh>
    </Float>
  );
}
