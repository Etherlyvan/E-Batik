// components/museum/BatikFrame.tsx
'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Plane } from '@react-three/drei';
import { Mesh, Texture } from 'three';
import { TextureManager } from '@/lib/utils/TextureManager';
import type { Batik } from '@/lib/types';

interface BatikFrameProps {
  batik: Batik;
  position: [number, number, number];
  rotation: [number, number, number];
  isSelected: boolean;
  onClick: () => void;
}

export function BatikFrame({ batik, position, rotation, isSelected, onClick }: BatikFrameProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<Texture | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const imageUrl = useMemo(() => {
    return batik.foto[0]?.link || '';
  }, [batik.foto]);

  // Load texture using TextureManager
  useEffect(() => {
    if (!imageUrl) {
      setLoading(false);
      setError(true);
      return;
    }

    let isMounted = true;
    const textureManager = TextureManager.getInstance();

    textureManager.loadTexture(imageUrl).then((loadedTexture) => {
      if (isMounted) {
        if (loadedTexture) {
          setTexture(loadedTexture);
          setError(false);
        } else {
          setError(true);
        }
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [imageUrl]);

  // Floating animation for selected frame
  useFrame((state) => {
    if (meshRef.current && isSelected) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  // Memoize colors
  const frameColor = useMemo(() => isSelected ? "#FFD700" : "#654321", [isSelected]);
  const labelColor = useMemo(() => isSelected ? "#FFD700" : "white", [isSelected]);

  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <Box args={[2.4, 2.4, 0.15]} position={[0, 0, -0.08]}>
        <meshStandardMaterial 
          color={frameColor}
          roughness={0.3}
          metalness={0.1}
        />
      </Box>
      
      {/* Inner frame */}
      <Box args={[2.1, 2.1, 0.05]} position={[0, 0, -0.02]}>
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
        <meshStandardMaterial 
          map={texture}
          transparent
          opacity={hovered ? 0.9 : 1}
          color={texture ? "#ffffff" : error ? "#ff6b6b" : "#f0f0f0"}
          roughness={0.1}
          metalness={0.0}
        />
      </Plane>
      
      {/* Loading/Error indicator */}
      {(loading || error) && (
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.2}
          color={error ? "#ff6b6b" : "#666666"}
          anchorX="center"
          anchorY="middle"
        >
          {loading ? "Loading..." : "Image Error"}
        </Text>
      )}
      
      {/* Label background */}
      <Plane args={[2.2, 0.4]} position={[0, -1.4, 0.01]}>
        <meshStandardMaterial 
          color="#000000" 
          transparent 
          opacity={0.8}
        />
      </Plane>
      
      {/* Label text */}
      <Text
        position={[0, -1.4, 0.02]}
        fontSize={0.15}
        color={labelColor}
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
        <Plane args={[2.6, 2.6]} position={[0, 0, -0.15]}>
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