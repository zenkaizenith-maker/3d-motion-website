"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { HeadphoneModel, SimpleModel } from "@/components/HeadphoneModel";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
  shellColor: string;
  cushionColor: string;
  autoRotate: boolean;
};

export default function ViewerCanvas({ product, shellColor, cushionColor, autoRotate }: Props) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      // Distance 6.2 (not 5.2): the model is ~4.3 wide, and at 5.2 the
      // earcups cropped out of frame in narrower viewer columns.
      camera={{ position: [0, 0.8, 6.2], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      aria-label={`Interactive 3D viewer for ${product.name}`}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 6, 4]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-6, 2, -4]} intensity={1.2} color="#ffffff" />
      <pointLight position={[0, 1, 6]} intensity={12} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={16} color="#2f6bff" />
      <pointLight position={[4, 3, -3]} intensity={10} color="#e8e2d6" />
      {product.viewer === "headphone" ? (
        <HeadphoneModel shellColor={shellColor} cushionColor={cushionColor} autoRotate={autoRotate} />
      ) : (
        <SimpleModel color={shellColor} />
      )}
      <OrbitControls
        enablePan={false}
        minDistance={3.5}
        maxDistance={9}
        autoRotate={false}
        makeDefault
      />
    </Canvas>
  );
}
