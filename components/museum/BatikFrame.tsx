// components/museum/BatikFrame.tsx (Fixed)
'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Box } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useMuseumStore } from '@/lib/stores/museumStore';
import * as THREE from 'three';
import type { Batik } from '@/lib/types';

interface BatikFrameProps {
  batik: Batik;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

interface ClickEvent {
  stopPropagation?: () => void;
  detail?: number;
  shiftKey?: boolean;
}

export function BatikFrame({ batik, position, rotation = [0, 0, 0], scale = 1 }: BatikFrameProps) {
  const meshRef = useRef<THREE.Group>(null);
  const frameRef = useRef<THREE.Mesh>(null);

  const { camera } = useThree();
  const {
    setSelectedBatik,
    selectedBatik,
    quality,
    bookmarkedBatiks,
    toggleBookmark
  } = useMuseumStore();

  const [isHovered, setIsHovered] = useState(false);
  const [isNearby, setIsNearby] = useState(false);
  const [distance, setDistance] = useState(100);
  const [batikTexture, setBatikTexture] = useState<THREE.Texture | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);

  const isSelected = selectedBatik?.id === batik.id;
  const isBookmarked = bookmarkedBatiks.includes(batik.id);

  // Load batik texture with optimization
  useEffect(() => {
    // Cleanup previous texture
    if (textureRef.current) {
      textureRef.current.dispose();
      textureRef.current = null;
    }

    if (batik.foto && batik.foto.length > 0) {
      const loader = new THREE.TextureLoader();
      loader.load(
        batik.foto[0].link,
        (texture) => {
          // Optimize texture based on quality
          if (quality === 'low') {
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;
          } else {
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = true;
          }

          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.flipY = false;

          textureRef.current = texture;
          setBatikTexture(texture);
        },
        undefined,
        (error) => {
          console.error('Failed to load batik texture:', error);
          setBatikTexture(null);
        }
      );
    }
  }, [batik.foto, quality]);

  // Distance calculation (optimized)
  useFrame(() => {
    if (!meshRef.current) return;

    const dist = camera.position.distanceTo(meshRef.current.position);
    setDistance(dist);
    setIsNearby(dist < 8);

    // Simple frame animation only when needed
    if (frameRef.current && (isSelected || isHovered) && quality !== 'low') {
      const time = performance.now() * 0.001;
      frameRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.01);
    } else if (frameRef.current) {
      frameRef.current.scale.setScalar(1);
    }
  });

  // Simplified materials
  const materials = useMemo(() => {
    const frameMaterial = new THREE.MeshLambertMaterial({
      color: isBookmarked ? 0xffd700 : 0x8b4513,
    });

    const fabricMaterial = new THREE.MeshLambertMaterial({
      map: batikTexture,
      color: 0xffffff,
    });

    return { frameMaterial, fabricMaterial };
  }, [isBookmarked, batikTexture]);

  // Handle interactions - Fixed event type
  const handleClick = (event: ClickEvent) => {
    if (event.stopPropagation) {
      event.stopPropagation();
    }

    if (event.detail === 2) {
      setSelectedBatik(batik);
    } else if (event.shiftKey) {
      toggleBookmark(batik.id);
    } else {
      setSelectedBatik(isSelected ? null : batik);
    }
  };

  const handlePointerOver = () => {
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  };

  // LOD - only show details when close
  const shouldShowText = distance < 6;

  // Portrait frame dimensions
  const frameWidth = 2.5;
  const frameHeight = 3.5;
  const frameDepth = 0.2;

  const fabricWidth = frameWidth - 0.3;
  const fabricHeight = frameHeight - 0.3;

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/* Portrait Frame */}
      <RigidBody type="fixed" colliders="cuboid">
        <Box
          ref={frameRef}
          args={[frameWidth, frameHeight, frameDepth]}
          position={[0, 0, 0]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <primitive object={materials.frameMaterial} />
        </Box>
      </RigidBody>

      {/* Batik Fabric */}
      <mesh
        position={[0, 0, frameDepth/2 + 0.01]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry args={[fabricWidth, fabricHeight]} />
        <primitive object={materials.fabricMaterial} />
      </mesh>

      {/* Bookmark Indicator */}
      {isBookmarked && isNearby && (
        <mesh position={[frameWidth/2 - 0.2, frameHeight/2 - 0.2, frameDepth/2 + 0.1]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshBasicMaterial color="#ffd700" />
        </mesh>
      )}

      {/* Information Panel - Only when close */}
      {shouldShowText && (
        <group position={[0, -frameHeight/2 - 0.6, 0.1]}>
          <mesh>
            <planeGeometry args={[frameWidth, 0.8]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.7} />
          </mesh>

          <Text
            position={[0, 0.2, 0.01]}
            fontSize={0.1}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={frameWidth - 0.2}
          >
            {batik.nama}
          </Text>

          {batik.seniman && (
            <Text
              position={[0, 0, 0.01]}
              fontSize={0.06}
              color="#ffd700"
              anchorX="center"
              anchorY="middle"
              maxWidth={frameWidth - 0.2}
            >
              {batik.seniman}
            </Text>
          )}

          <Text
            position={[0, -0.2, 0.01]}
            fontSize={0.05}
            color="#cccccc"
            anchorX="center"
            anchorY="middle"
          >
            {batik.tahun}
          </Text>
        </group>
      )}
    </group>
  );
}