// components/museum/MuseumFloor.tsx
'use client';

import { Plane } from '@react-three/drei';

export function MuseumFloor() {
  return (
    <Plane
      args={[20, 20]}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <meshStandardMaterial 
        color="#2F2F2F" 
        roughness={0.1}
        metalness={0.1}
      />
    </Plane>
  );
}