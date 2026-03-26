"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Environment } from "@react-three/drei";
import * as THREE from "three";

function BlobSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;

      // Subtle cursor following on desktop
      const { x, y } = state.pointer;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 0.3, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 0.3, 0.05);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 128, 128]}>
      <MeshDistortMaterial
        color="#2563EB"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.1}
        metalness={0.1}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
}

function FloatingParticles() {
  const count = 50;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#60A5FA" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function LiquidBlob() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#2563EB" />
        <BlobSphere />
        <FloatingParticles />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
