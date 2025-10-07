// components/museum/models/Bench.tsx
'use client';

import { useRef, Suspense } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useGLTF } from '@react-three/drei';
import { ModelErrorBoundary } from './ModelErrorBoundary';
import * as THREE from 'three';

interface BenchProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

function BenchModel({ position, rotation = [0, 0, 0] }: BenchProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Always call useGLTF at the top level
  const gltf = useGLTF('/models/modern_bench_1/scene.gltf');
  
  if (!gltf || !gltf.scene) {
    // Fallback to simple geometry
    return (
      <RigidBody type="fixed" colliders="cuboid">
        <group ref={meshRef} position={position} rotation={rotation}>
          {/* Modern bench fallback */}
          <mesh>
            <boxGeometry args={[2.5, 0.1, 1]} />
            <meshStandardMaterial color="#2c3e50" />
          </mesh>
          {/* Legs */}
          <mesh position={[-1, -0.3, -0.4]}>
            <boxGeometry args={[0.1, 0.5, 0.1]} />
            <meshStandardMaterial color="#34495e" />
          </mesh>
          <mesh position={[1, -0.3, -0.4]}>
            <boxGeometry args={[0.1, 0.5, 0.1]} />
            <meshStandardMaterial color="#34495e" />
          </mesh>
          <mesh position={[-1, -0.3, 0.4]}>
            <boxGeometry args={[0.1, 0.5, 0.1]} />
            <meshStandardMaterial color="#34495e" />
          </mesh>
          <mesh position={[1, -0.3, 0.4]}>
            <boxGeometry args={[0.1, 0.5, 0.1]} />
            <meshStandardMaterial color="#34495e" />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, 0.4, -0.45]}>
            <boxGeometry args={[2.5, 0.8, 0.1]} />
            <meshStandardMaterial color="#2c3e50" />
          </mesh>
        </group>
      </RigidBody>
    );
  }

  const clonedScene = gltf.scene.clone();
  
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <group ref={meshRef} position={position} rotation={rotation}>
        <primitive object={clonedScene} scale={[1, 1, 1]} />
      </group>
    </RigidBody>
  );
}

function BenchFallback() {
  return (
    <mesh>
      <boxGeometry args={[2.5, 0.5, 1]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

export function Bench(props: BenchProps) {
  return (
    <ModelErrorBoundary modelName="modern-bench">
      <Suspense fallback={<BenchFallback />}>
        <BenchModel {...props} />
      </Suspense>
    </ModelErrorBoundary>
  );
}

// Preload model safely
try {
  useGLTF.preload('/models/modern_bench_1/scene.gltf');
} catch (error) {
  console.warn('Failed to preload modern bench model:', error);
}