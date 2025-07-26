// components/museum/BatikFrame.tsx
'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { TextureLoader, RepeatWrapping } from 'three';
import { RigidBody } from '@react-three/rapier';
import { useMuseumStore } from '@/lib/stores/museumStore';
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
  const { setSelectedBatik } = useMuseumStore();
  const { camera } = useThree();

  // Load batik texture
  const texture = useLoader(TextureLoader, batik.foto[0]?.link || '/images/placeholder.jpg');
  
  // Load wood texture for frame
  const frameTexture = useLoader(TextureLoader, '/textures/WoodFloor040_4K-JPG/WoodFloor040_4K-JPG_Color.jpg');
  const frameNormal = useLoader(TextureLoader, '/textures/WoodFloor040_4K-JPG/WoodFloor040_4K-JPG_NormalGL.jpg');
  const frameRoughness = useLoader(TextureLoader, '/textures/WoodFloor040_4K-JPG/WoodFloor040_4K-JPG_Roughness.jpg');

  // Configure frame textures
  useEffect(() => {
    [frameTexture, frameNormal, frameRoughness].forEach(tex => {
      if (tex) {
        tex.wrapS = RepeatWrapping;
        tex.wrapT = RepeatWrapping;
        tex.repeat.set(0.5, 0.5);
      }
    });
  }, [frameTexture, frameNormal, frameRoughness]);

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

  return (
    <group position={position} rotation={rotation}>
      {/* Frame with Wood Texture */}
      <RigidBody type="fixed">
        <mesh ref={meshRef}>
          <boxGeometry args={[4.2, 3.2, 0.3]} />
          <meshStandardMaterial 
            map={frameTexture}
            normalMap={frameNormal}
            roughnessMap={frameRoughness}
            color={isNear ? "#a0522d" : "#8b4513"}
            emissive={canInteract ? "#332211" : "#000000"}
            emissiveIntensity={canInteract ? 0.2 : 0}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      </RigidBody>

      {/* Inner Frame */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[3.8, 2.8, 0.1]} />
        <meshStandardMaterial 
          color="#654321"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Batik Image */}
      <mesh position={[0, 0, 0.16]}>
        <planeGeometry args={[3.5, 2.5]} />
        <meshStandardMaterial 
          map={texture}
          transparent
          opacity={0.95}
          roughness={0.1}
          metalness={0.0}
        />
      </mesh>

      {/* Glass Protection */}
      <mesh position={[0, 0, 0.17]}>
        <planeGeometry args={[3.6, 2.6]} />
        <meshStandardMaterial 
          transparent
          opacity={0.1}
          roughness={0.0}
          metalness={0.0}
          envMapIntensity={1}
        />
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

      {/* Enhanced lighting for the frame */}
      <spotLight
        position={[0, 0, 3]}
        angle={0.6}
        penumbra={0.3}
        intensity={canInteract ? 2.0 : isNear ? 1.2 : 0.8}
        color={canInteract ? "#00ff88" : isNear ? "#ffd700" : "#fff8dc"}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Ambient frame lighting */}
      <pointLight
        position={[0, 0, 1]}
        intensity={0.4}
        distance={4}
        decay={2}
        color="#ffeb3b"
      />

      {/* Interaction indicator light */}
      {canInteract && (
        <pointLight
          position={[0, 0, 1.5]}
          intensity={0.6}
          distance={3}
          decay={2}
          color="#00ff88"
        />
      )}
    </group>
  );
}