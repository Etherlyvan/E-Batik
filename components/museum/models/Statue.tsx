// components/museum/models/Statue.tsx
'use client';

import { useRef, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useGLTF, Html } from '@react-three/drei';
import { ModelErrorBoundary } from './ModelErrorBoundary';
import * as THREE from 'three';

interface StatueProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  title?: string;
  description?: string;
}

function StatueModel({ 
  position, 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1],
  title = "Aphrodite Kallipygos",
  description = "Ancient Greek statue of Aphrodite"
}: StatueProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
<<<<<<< HEAD
  // Always call useGLTF at the top level
  const gltf = useGLTF('/models/aphrodite_kallipygos_statue/scene.gltf');
  
  // Always call useFrame at the top level
  useFrame((state) => {
    if (meshRef.current && hovered) {
=======
  // Always call useGLTF at top level
  const gltf = useGLTF('/models/aphrodite_kallipygos_statue/scene.gltf');
  
  // Animation hook must be called before any early returns
  useFrame((state) => {
    if (meshRef.current && hovered && gltf?.scene) {
>>>>>>> f4dc652 (feat: japanese translation, virtual gallery, and enhance on pagination)
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });
  
<<<<<<< HEAD
  if (!gltf || !gltf.scene) {
    // Classical statue fallback
=======
  // If model failed to load, render fallback
  if (!gltf?.scene) {
>>>>>>> f4dc652 (feat: japanese translation, virtual gallery, and enhance on pagination)
    return (
      <RigidBody type="fixed" colliders="cuboid">
        <group 
          ref={meshRef} 
          position={position} 
          rotation={rotation}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {/* Classical statue base */}
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.8, 1, 0.3, 8]} />
            <meshStandardMaterial color="#e8e8e8" />
          </mesh>
          
          {/* Main body */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.4, 0.5, 2, 12]} />
            <meshStandardMaterial color="#f5f5f5" />
          </mesh>
          
          {/* Head */}
          <mesh position={[0, 1.8, 0]}>
            <sphereGeometry args={[0.35, 12, 8]} />
            <meshStandardMaterial color="#f5f5f5" />
          </mesh>
          
          {/* Arms */}
          <mesh position={[-0.6, 1, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.1, 0.12, 1.2, 8]} />
            <meshStandardMaterial color="#f5f5f5" />
          </mesh>
          <mesh position={[0.6, 1, 0]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.1, 0.12, 1.2, 8]} />
            <meshStandardMaterial color="#f5f5f5" />
          </mesh>
          
          {hovered && (
            <Html position={[0, 3, 0]} center>
              <div className="bg-black/80 text-white p-3 rounded-lg max-w-xs">
                <h3 className="font-bold text-amber-300">{title}</h3>
                <p className="text-sm text-gray-200">{description}</p>
              </div>
            </Html>
          )}
          
          <pointLight
            position={[0, 2, 2]}
            intensity={0.6}
            distance={10}
            decay={2}
            color="#ffd700"
          />
        </group>
      </RigidBody>
    );
  }

  const clonedScene = gltf.scene.clone();
  
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <group 
        ref={meshRef} 
        position={position} 
        rotation={rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <primitive object={clonedScene} scale={scale} />
        
        {hovered && (
          <Html position={[0, 4, 0]} center>
            <div className="bg-black/80 text-white p-4 rounded-lg max-w-sm shadow-2xl border border-amber-500">
              <h3 className="font-bold text-amber-300 text-lg mb-2">{title}</h3>
              <p className="text-sm text-gray-200 leading-relaxed">{description}</p>
              <div className="mt-2 text-xs text-amber-400">
                🏛️ Classical Greek Art
              </div>
            </div>
          </Html>
        )}
        
        {/* Enhanced statue lighting */}
        <pointLight
          position={[0, 3, 2]}
          intensity={0.8}
          distance={12}
          decay={2}
          color="#ffd700"
        />
        
        <spotLight
          position={[2, 4, 2]}
          angle={Math.PI / 4}
          penumbra={0.5}
          intensity={0.6}
          distance={15}
          decay={2}
          color="#ffffff"
          target-position={position}
        />
      </group>
    </RigidBody>
  );
}

function StatueFallback() {
  return (
    <mesh>
      <cylinderGeometry args={[0.5, 0.3, 2.5, 12]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

export function Statue(props: StatueProps) {
  return (
    <ModelErrorBoundary modelName="aphrodite-statue">
      <Suspense fallback={<StatueFallback />}>
        <StatueModel {...props} />
      </Suspense>
    </ModelErrorBoundary>
  );
}

try {
  useGLTF.preload('/models/aphrodite_kallipygos_statue/scene.gltf');
} catch (error) {
  console.warn('Failed to preload Aphrodite statue model:', error);
}