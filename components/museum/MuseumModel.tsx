// components/museum/MuseumModels.tsx
'use client';

import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';

export function MuseumStatue({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF('/models/statue/scene.gltf');
  const statueRef = useRef<Group>(null);

  return (
    <group ref={statueRef} position={position}>
      <primitive 
        object={scene.clone()} 
        scale={[0.06, 0.06, 0.06]} 
        position={[0, -3.2, 0]}
      />
    </group>
  );
}

export function MuseumBench({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF('/models/bench_2/scene.gltf');
  const benchRef = useRef<Group>(null);

  return (
    <group ref={benchRef} position={position}>
      <primitive 
        object={scene.clone()} 
        scale={[3, 3, 3]} 
        position={[0, -3.12, -8]}
      />
    </group>
  );
}

export function CeilingLamp({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF('/models/ceiling-lamp/scene.gltf');
  const lampRef = useRef<Group>(null);

  return (
    <group ref={lampRef} position={position}>
      <primitive 
        object={scene.clone()} 
        scale={[0.1, 0.1, 0.1]} 
        position={[0, 5.5, 0]}
      />
    </group>
  );
}

// Preload models
useGLTF.preload('/models/statue/scene.gltf');
useGLTF.preload('/models/bench_2/scene.gltf');
useGLTF.preload('/models/ceiling-lamp/scene.gltf');