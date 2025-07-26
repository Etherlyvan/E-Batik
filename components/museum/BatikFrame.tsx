// components/museum/BatikFrame.tsx
'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Plane } from '@react-three/drei';
import { Mesh, Texture, TextureLoader } from 'three';
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

  // Generate unique identifiers for this frame with more entropy
  const frameId = useMemo(() => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const positionHash = position.map(p => Math.round(p * 100)).join('-');
    return `frame-${batik.id}-${positionHash}-${timestamp}-${random}`;
  }, [batik.id, position]);

  // Direct texture loading
  useEffect(() => {
    if (!imageUrl) {
      setLoading(false);
      setError(true);
      return;
    }

    let isMounted = true;
    const loader = new TextureLoader();

    loader.load(
      imageUrl,
      (loadedTexture) => {
        if (isMounted) {
          // Optimize texture
          loadedTexture.generateMipmaps = true;
          loadedTexture.minFilter = 1008; // LinearMipmapLinearFilter
          loadedTexture.magFilter = 1006; // LinearFilter
          
          setTexture(loadedTexture);
          setError(false);
          setLoading(false);
        }
      },
      undefined,
      (error) => {
        console.warn('Failed to load batik texture:', imageUrl, error);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    );

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

  const frameColor = useMemo(() => isSelected ? "#FFD700" : "#8B4513", [isSelected]);
  const labelColor = useMemo(() => isSelected ? "#FFD700" : "white", [isSelected]);

  return (
    <group position={position} rotation={rotation}>
      {/* Outer Frame */}
      <Box key={`${frameId}-outer-frame`} args={[2.6, 2.6, 0.2]} position={[0, 0, -0.1]}>
        <meshStandardMaterial 
          color={frameColor}
          roughness={0.4}
          metalness={0.2}
        />
      </Box>
      
      {/* Inner Frame */}
      <Box key={`${frameId}-inner-frame`} args={[2.3, 2.3, 0.1]} position={[0, 0, -0.05]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
      
      {/* Batik Image Plane - TANPA EFEK KACA */}
      <Plane
        key={`${frameId}-image-plane`}
        ref={meshRef}
        args={[2.2, 2.2]}
        position={[0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <meshStandardMaterial 
          map={texture}
          transparent={false}
          opacity={1}
          color={texture ? "#ffffff" : error ? "#ff6b6b" : "#f0f0f0"}
          roughness={0.8}
          metalness={0.0}
          side={2}
        />
      </Plane>
      
      {/* Loading/Error Text */}
      {(loading || error) && (
        <Text
          key={`${frameId}-status-text`}
          position={[0, 0, 0.01]}
          fontSize={0.3}
          color={error ? "#ff6b6b" : "#666666"}
          anchorX="center"
          anchorY="middle"
        >
          {loading ? "Loading..." : "No Image"}
        </Text>
      )}
      
      {/* Name Label Background */}
      <Plane key={`${frameId}-label-background`} args={[2.4, 0.5]} position={[0, -1.5, 0.01]}>
        <meshStandardMaterial 
          color="#000000" 
          transparent 
          opacity={0.9}
        />
      </Plane>
      
      {/* Name Label */}
      <Text
        key={`${frameId}-name-text`}
        position={[0, -1.5, 0.02]}
        fontSize={0.18}
        color={labelColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
      >
        {batik.nama}
      </Text>
      
      {/* Artist Label */}
      {batik.seniman && (
        <Text
          key={`${frameId}-artist-text`}
          position={[0, -1.7, 0.02]}
          fontSize={0.14}
          color="lightgray"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
        >
          by {batik.seniman}
        </Text>
      )}
      
      {/* Selection Glow */}
      {isSelected && (
        <Plane key={`${frameId}-selection-glow`} args={[2.8, 2.8]} position={[0, 0, -0.15]}>
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