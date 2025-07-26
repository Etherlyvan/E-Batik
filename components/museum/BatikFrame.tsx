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

  const frameId = useMemo(() => {
    return `frame-${batik.id}-${position.join('-')}-${Date.now()}`;
  }, [batik.id, position]);

  // Texture loading (optimized for quality)
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
          // High quality settings
          loadedTexture.generateMipmaps = false;
          loadedTexture.minFilter = 1006; // LinearFilter
          loadedTexture.magFilter = 1006; // LinearFilter
          loadedTexture.anisotropy = 16;
          loadedTexture.flipY = false;
          loadedTexture.needsUpdate = true;
          
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

  // Selection animation
  useFrame((state) => {
    if (meshRef.current && isSelected) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const frameColor = useMemo(() => isSelected ? "#FFD700" : "#8B4513", [isSelected]);
  const labelColor = useMemo(() => isSelected ? "#FFD700" : "white", [isSelected]);

  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <Box key={`${frameId}-frame`} args={[5.2, 3.2, 0.2]} position={[0, 0, -0.1]}>
        <meshBasicMaterial color={frameColor} />
      </Box>
      
      {/* Inner Frame */}
      <Box key={`${frameId}-inner`} args={[4.8, 2.8, 0.1]} position={[0, 0, -0.05]}>
        <meshBasicMaterial color="#2a2a2a" />
      </Box>
      
      {/* Batik Image */}
      <Plane
        key={`${frameId}-image`}
        ref={meshRef}
        args={[4.6, 2.6]}
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
        <meshBasicMaterial 
          map={texture}
          transparent={false}
          color={texture ? "#ffffff" : error ? "#ff6b6b" : "#f0f0f0"}
          side={2}
        />
      </Plane>
      
      {/* Loading/Error Text */}
      {(loading || error) && (
        <Text
          key={`${frameId}-status`}
          position={[0, 0, 0.01]}
          fontSize={0.3}
          color={error ? "#ff6b6b" : "#666666"}
          anchorX="center"
          anchorY="middle"
        >
          {loading ? "Loading..." : "No Image"}
        </Text>
      )}
      
      {/* Name Label */}
      <group key={`${frameId}-label`} position={[0, -2, 0.01]}>
        <Plane args={[4.8, 0.8]}>
          <meshBasicMaterial color="#000000" transparent opacity={0.8} />
        </Plane>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.25}
          color={labelColor}
          anchorX="center"
          anchorY="middle"
          maxWidth={4.4}
        >
          {batik.nama}
        </Text>
        {batik.seniman && (
          <Text
            position={[0, -0.3, 0.01]}
            fontSize={0.18}
            color="lightgray"
            anchorX="center"
            anchorY="middle"
            maxWidth={4.4}
          >
            by {batik.seniman}
          </Text>
        )}
      </group>
      
      {/* Selection Glow */}
      {isSelected && (
        <Plane key={`${frameId}-glow`} args={[5.6, 3.6]} position={[0, 0, -0.15]}>
          <meshBasicMaterial 
            color="#FFD700" 
            transparent 
            opacity={0.3}
          />
        </Plane>
      )}
    </group>
  );
}