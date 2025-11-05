// components/museum/models/CeilingLamp.tsx
'use client';

import { useRef, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { ModelErrorBoundary } from './ModelErrorBoundary';
import * as THREE from 'three';

interface CeilingLampProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  lightIntensity?: number;
  lightColor?: string;
}

function CeilingLampModel({ 
  position, 
  rotation = [0, 0, 0], 
  lightIntensity = 1.0,
  lightColor = "#fff8dc"
}: CeilingLampProps) {
  const meshRef = useRef<THREE.Group>(null);
  
<<<<<<< HEAD
  // Always call useGLTF at the top level
  const gltf = useGLTF('/models/ceiling_lamp_-_11mb/scene.gltf');
  
  if (!gltf || !gltf.scene) {
    // Modern ceiling lamp fallback
=======
  // Always call useGLTF at top level
  const gltf = useGLTF('/models/ceiling_lamp_-_11mb/scene.gltf');
  
  // If model failed to load, render fallback
  if (!gltf?.scene) {
>>>>>>> f4dc652 (feat: japanese translation, virtual gallery, and enhance on pagination)
    return (
      <group ref={meshRef} position={position} rotation={rotation}>
        {/* Modern pendant lamp */}
        <mesh>
          <cylinderGeometry args={[0.4, 0.6, 1.2, 12]} />
          <meshStandardMaterial 
            color="#f8f9fa" 
            emissive="#fff3cd" 
            emissiveIntensity={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Lamp cord */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        
        {/* Ceiling mount */}
        <mesh position={[0, 2.1, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 8]} />
          <meshStandardMaterial color="#34495e" />
        </mesh>
        
        <pointLight
          position={[0, -0.8, 0]}
          intensity={lightIntensity}
          distance={15}
          decay={2}
          color={lightColor}
        />
        
        <spotLight
          position={[0, -0.5, 0]}
          angle={Math.PI / 2.5}
          penumbra={0.3}
          intensity={lightIntensity * 0.9}
          distance={18}
          decay={2}
          color={lightColor}
          target-position={[0, -10, 0]}
        />
      </group>
    );
  }

  const clonedScene = gltf.scene.clone();
  
  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      <primitive object={clonedScene} scale={[1, 1, 1]} />
      
      {/* Enhanced lighting for modern lamp */}
      <pointLight
        position={[0, -0.8, 0]}
        intensity={lightIntensity}
        distance={15}
        decay={2}
        color={lightColor}
      />
      
      <spotLight
        position={[0, -0.5, 0]}
        angle={Math.PI / 2.5}
        penumbra={0.3}
        intensity={lightIntensity * 0.9}
        distance={18}
        decay={2}
        color={lightColor}
        target-position={[0, -10, 0]}
      />
    </group>
  );
}

function CeilingLampFallback() {
  return (
    <mesh>
      <cylinderGeometry args={[0.4, 0.6, 1.2, 12]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

export function CeilingLamp(props: CeilingLampProps) {
  return (
    <ModelErrorBoundary modelName="ceiling-lamp-11mb">
      <Suspense fallback={<CeilingLampFallback />}>
        <CeilingLampModel {...props} />
      </Suspense>
    </ModelErrorBoundary>
  );
}

try {
  useGLTF.preload('/models/ceiling_lamp_-_11mb/scene.gltf');
} catch (error) {
  console.warn('Failed to preload ceiling lamp model:', error);
}