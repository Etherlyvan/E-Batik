// components/museum/BatikFrame.tsx
'use client';

import { useRef, useState, Suspense } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text, Box, Plane } from '@react-three/drei';
import { Mesh, TextureLoader, Texture } from 'three';
import type { Batik } from '@/lib/types';

interface BatikFrameProps {
  batik: Batik;
  position: [number, number, number];
  rotation: [number, number, number];
  isSelected: boolean;
  onClick: () => void;
}

// Komponen untuk loading texture dengan fallback
function BatikTexture({ imageUrl, onLoad }: { imageUrl: string; onLoad: (texture: Texture | null) => void }) {
  try {
    const texture = useLoader(TextureLoader, imageUrl);
    onLoad(texture);
    return null;
  } catch (error) {
    console.warn('Failed to load texture:', imageUrl);
    onLoad(null);
    return null;
  }
}

export function BatikFrame({ batik, position, rotation, isSelected, onClick }: BatikFrameProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<Texture | null>(null);
  const [textureLoaded, setTextureLoaded] = useState(false);
  
  const imageUrl = batik.foto[0]?.link || '';
  
  // Floating animation for selected frame
  useFrame((state) => {
    if (meshRef.current && isSelected) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const handleTextureLoad = (loadedTexture: Texture | null) => {
    setTexture(loadedTexture);
    setTextureLoaded(true);
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Frame dengan warna yang lebih kontras */}
      <Box
        args={[2.4, 2.4, 0.15]}
        position={[0, 0, -0.08]}
      >
        <meshStandardMaterial 
          color={isSelected ? "#FFD700" : "#654321"} 
          roughness={0.3}
          metalness={0.1}
        />
      </Box>
      
      {/* Inner frame */}
      <Box
        args={[2.1, 2.1, 0.05]}
        position={[0, 0, -0.02]}
      >
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
      
      {/* Batik Image */}
      <Plane
        ref={meshRef}
        args={[2, 2]}
        position={[0, 0, 0]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {imageUrl ? (
          <Suspense fallback={null}>
            <BatikTexture imageUrl={imageUrl} onLoad={handleTextureLoad} />
          </Suspense>
        ) : null}
        
        <meshStandardMaterial 
          map={texture}
          transparent
          opacity={hovered ? 0.9 : 1}
          color={texture ? "#ffffff" : "#f0f0f0"} // Putih untuk texture, abu terang untuk fallback
          roughness={0.1}
          metalness={0.0}
        />
      </Plane>
      
      {/* Placeholder jika gambar tidak ada */}
      {!textureLoaded && imageUrl && (
        <Plane
          args={[2, 2]}
          position={[0, 0, 0.001]}
        >
          <meshStandardMaterial 
            color="#e0e0e0" 
            transparent 
            opacity={0.8}
          />
        </Plane>
      )}
      
      {/* Loading indicator */}
      {!textureLoaded && imageUrl && (
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.3}
          color="#666666"
          anchorX="center"
          anchorY="middle"
        >
          Loading...
        </Text>
      )}
      
      {/* Label dengan background */}
      <Plane
        args={[2.2, 0.4]}
        position={[0, -1.4, 0.01]}
      >
        <meshStandardMaterial 
          color="#000000" 
          transparent 
          opacity={0.7}
        />
      </Plane>
      
      <Text
        position={[0, -1.4, 0.02]}
        fontSize={0.15}
        color={isSelected ? "#FFD700" : "white"}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {batik.nama}
      </Text>
      
      {/* Artist */}
      {batik.seniman && (
        <Text
          position={[0, -1.6, 0.02]}
          fontSize={0.12}
          color="lightgray"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {batik.seniman}
        </Text>
      )}
      
      {/* Selection Glow */}
      {isSelected && (
        <Plane
          args={[2.6, 2.6]}
          position={[0, 0, -0.15]}
        >
          <meshStandardMaterial 
            color="#FFD700" 
            transparent 
            opacity={0.3}
            emissive="#FFD700"
            emissiveIntensity={0.2}
          />
        </Plane>
      )}
    </group>
  );
}