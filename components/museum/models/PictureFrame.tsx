// components/museum/models/PictureFrame.tsx
'use client';

import { useRef, Suspense } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useGLTF } from '@react-three/drei';
import { ModelErrorBoundary } from './ModelErrorBoundary';
import * as THREE from 'three';

interface PictureFrameProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

function PictureFrameModel({ 
  position, 
  rotation = [0, 0, 0], 
<<<<<<< HEAD
  scale = [1, 1, 1],
}: PictureFrameProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Always call useGLTF at the top level
  const gltf = useGLTF('/models/wooden_picture_frame/scene.gltf');
  
  if (!gltf || !gltf.scene) {
=======
  scale = [1, 1, 1]
}: PictureFrameProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Always call useGLTF at top level
  const gltf = useGLTF('/models/wooden_picture_frame/scene.gltf');
  
  // If model failed to load, render fallback
  if (!gltf?.scene) {
>>>>>>> f4dc652 (feat: japanese translation, virtual gallery, and enhance on pagination)
    // Wooden frame fallback
    return (
      <RigidBody type="fixed" colliders="cuboid">
        <group ref={meshRef} position={position} rotation={rotation}>
          {/* Frame border */}
          <mesh>
            <boxGeometry args={[3.2, 2.4, 0.3]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
          
          {/* Inner frame */}
          <mesh position={[0, 0, 0.1]}>
            <boxGeometry args={[2.8, 2, 0.1]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          
          {/* Picture area */}
          <mesh position={[0, 0, 0.16]}>
            <planeGeometry args={[2.6, 1.8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          
          {/* Glass */}
          <mesh position={[0, 0, 0.17]}>
            <planeGeometry args={[2.7, 1.9]} />
            <meshStandardMaterial 
              transparent 
              opacity={0.1} 
              color="#ffffff"
            />
          </mesh>
        </group>
      </RigidBody>
    );
  }

  const clonedScene = gltf.scene.clone();
  
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <group ref={meshRef} position={position} rotation={rotation}>
        <primitive object={clonedScene} scale={scale} />
        
        {/* Ambient lighting for frame */}
        <pointLight
          position={[0, 0, 1]}
          intensity={0.4}
          distance={5}
          decay={2}
          color="#fff8dc"
        />
      </group>
    </RigidBody>
  );
}

function PictureFrameFallback() {
  return (
    <mesh>
      <boxGeometry args={[3.2, 2.4, 0.3]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

export function PictureFrame(props: PictureFrameProps) {
  return (
    <ModelErrorBoundary modelName="wooden-picture-frame">
      <Suspense fallback={<PictureFrameFallback />}>
        <PictureFrameModel {...props} />
      </Suspense>
    </ModelErrorBoundary>
  );
}

try {
  useGLTF.preload('/models/wooden_picture_frame/scene.gltf');
} catch (error) {
  console.warn('Failed to preload wooden picture frame model:', error);
}