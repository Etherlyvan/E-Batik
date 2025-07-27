// components/museum/BatikFrame.tsx
'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useMuseumStore } from '@/lib/stores/museumStore';
import { TextureManager } from '@/lib/utils/TextureManager';
import type { Batik } from '@/lib/types';
import * as THREE from 'three';

interface BatikFrameProps {
  batik: Batik;
  position: [number, number, number];
  rotation: [number, number, number];
  floor: number;
}

export function BatikFrame({ batik, position, rotation, floor }: BatikFrameProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isNear, setIsNear] = useState(false);
  const [canInteract, setCanInteract] = useState(false);
  const [batikTexture, setBatikTexture] = useState<THREE.Texture | null>(null);
  const { setSelectedBatik } = useMuseumStore();
  const { camera } = useThree();

  // Load textures with optimization
  useEffect(() => {
    const textureManager = TextureManager.getInstance();
    
    const loadTextures = async () => {
      try {
        const texture = await textureManager.loadTexture(
          batik.foto[0]?.link || '/images/placeholder.jpg'
        );
        setBatikTexture(texture);
      } catch (error) {
        console.warn('Failed to load batik texture:', error);
      }
    };

    loadTextures();

    // Cleanup on unmount
    return () => {
      // Don't dispose here, let TextureManager handle it
    };
  }, [batik.foto]);

  // Keyboard interaction
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Enter' && canInteract) {
        setSelectedBatik(batik);
      }
    };

    if (canInteract) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [canInteract, batik, setSelectedBatik]);

  useFrame(() => {
    if (meshRef.current) {
      // Check distance to frame
      const distance = camera.position.distanceTo(new THREE.Vector3(...position));
      const isClose = distance < 6;
      const isVeryClose = distance < 4;
      
      if (isClose !== isNear) {
        setIsNear(isClose);
      }
      
      if (isVeryClose !== canInteract) {
        setCanInteract(isVeryClose);
      }

      // Subtle glow animation when near
      if (isClose) {
        meshRef.current.scale.setScalar(1.01);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  // Optimized materials
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: isNear ? "#a0522d" : "#8b4513",
    emissive: canInteract ? "#332211" : "#000000",
    emissiveIntensity: canInteract ? 0.2 : 0,
    roughness: 0.8,
    metalness: 0.1,
  });

  const innerFrameMaterial = new THREE.MeshStandardMaterial({
    color: "#654321",
    roughness: 0.6,
    metalness: 0.2,
  });

  const batikMaterial = batikTexture ? new THREE.MeshStandardMaterial({
    map: batikTexture,
    transparent: true,
    opacity: 0.95,
    roughness: 0.1,
    metalness: 0.0,
  }) : new THREE.MeshStandardMaterial({ color: "#cccccc" });

  const glassMaterial = new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 0.1,
    roughness: 0.0,
    metalness: 0.0,
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <RigidBody type="fixed">
        <mesh ref={meshRef}>
          <boxGeometry args={[4.2, 3.2, 0.3]} />
          <primitive object={frameMaterial} />
        </mesh>
      </RigidBody>

      {/* Inner Frame */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[3.8, 2.8, 0.1]} />
        <primitive object={innerFrameMaterial} />
      </mesh>

      {/* Batik Image */}
      <mesh position={[0, 0, 0.16]}>
        <planeGeometry args={[3.5, 2.5]} />
        <primitive object={batikMaterial} />
      </mesh>

      {/* Glass Protection */}
      <mesh position={[0, 0, 0.17]}>
        <planeGeometry args={[3.6, 2.6]} />
        <primitive object={glassMaterial} />
      </mesh>

      {/* Info Panel - Only show when near */}
      {isNear && (
        <Html
          position={[0, -2.2, 0.5]}
          center
          distanceFactor={6}
          className="pointer-events-none select-none"
        >
          <div className={`bg-black/90 backdrop-blur-sm rounded-lg p-3 shadow-xl border max-w-xs transition-all duration-300 ${
            canInteract ? 'border-green-400' : 'border-amber-400'
          }`}>
            <h3 className="font-bold text-amber-300 text-sm mb-1 line-clamp-1">
              {batik.nama}
            </h3>
            {batik.seniman && (
              <p className="text-xs text-amber-200 mb-1 line-clamp-1">
                🎨 {batik.seniman}
              </p>
            )}
            <p className="text-xs text-gray-300 mb-2">
              📅 {batik.tahun}
            </p>
            <div className="flex items-center justify-between">
              {canInteract ? (
                <p className="text-xs text-green-400 font-medium animate-pulse">
                  ⌨️ Press ENTER to view
                </p>
              ) : (
                <p className="text-xs text-amber-400">
                  🚶 Move closer to interact
                </p>
              )}
              {batik.kode && (
                <span className="text-xs bg-amber-600 text-white px-2 py-1 rounded-full">
                  {batik.kode}
                </span>
              )}
            </div>
          </div>
        </Html>
      )}

      {/* Optimized lighting */}
      <spotLight
        position={[0, 0, 3]}
        angle={0.6}
        penumbra={0.3}
        intensity={canInteract ? 1.5 : isNear ? 1.0 : 0.6}
        color={canInteract ? "#00ff88" : isNear ? "#ffd700" : "#fff8dc"}
        castShadow={false} // Disable shadows for performance
      />

      {/* Reduced lighting for performance */}
      {canInteract && (
        <pointLight
          position={[0, 0, 1.5]}
          intensity={0.4}
          distance={3}
          decay={2}
          color="#00ff88"
        />
      )}
    </group>
  );
}