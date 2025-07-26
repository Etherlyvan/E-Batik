// components/museum/MuseumWalls.tsx
'use client';

import { Plane } from '@react-three/drei';

export function MuseumWalls() {
  return (
    <group>
      {/* Front Wall */}
      <Plane
        args={[20, 8]}
        position={[0, 4, -10]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial color="#1a1a1a" />
      </Plane>
      
      {/* Back Wall */}
      <Plane
        args={[20, 8]}
        position={[0, 4, 10]}
        rotation={[0, Math.PI, 0]}
      >
        <meshStandardMaterial color="#1a1a1a" />
      </Plane>
      
      {/* Left Wall */}
      <Plane
        args={[20, 8]}
        position={[-10, 4, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshStandardMaterial color="#1a1a1a" />
      </Plane>
      
      {/* Right Wall */}
      <Plane
        args={[20, 8]}
        position={[10, 4, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <meshStandardMaterial color="#1a1a1a" />
      </Plane>
    </group>
  );
}