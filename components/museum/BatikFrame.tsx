// components/museum/BatikFrame.tsx
'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useMuseumStore } from '@/lib/stores/museumStore';
import { TextureManager } from '@/lib/utils/TextureManager';
import { useLanguage } from '@/lib/contexts/LanguageContext';
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
  const [isLoading, setIsLoading] = useState(true);
  const { setSelectedBatik } = useMuseumStore();
  const { currentLanguage } = useLanguage();
  const { camera } = useThree();

  const isIndonesian = currentLanguage.code === 'id';

  // Load batik texture
  useEffect(() => {
    const loadBatikTexture = async () => {
      if (!batik.foto || batik.foto.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const textureManager = TextureManager.getInstance();
        const imageUrl = batik.foto[0]?.link;
        
        if (imageUrl) {
          const texture = await textureManager.loadTexture(imageUrl);
          setBatikTexture(texture);
        }
      } catch (error) {
        console.warn('Failed to load batik texture for:', batik.nama, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBatikTexture();
  }, [batik.foto, batik.nama]);

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

  // Distance checking and interaction
  useFrame(() => {
    if (meshRef.current && camera) {
      try {
        const distance = camera.position.distanceTo(new THREE.Vector3(...position));
        const isClose = distance < 8;
        const isVeryClose = distance < 5;
        
        if (isClose !== isNear) {
          setIsNear(isClose);
        }
        
        if (isVeryClose !== canInteract) {
          setCanInteract(isVeryClose);
        }

        // Subtle hover effect
        if (isClose && meshRef.current) {
          meshRef.current.scale.setScalar(1.02);
        } else if (meshRef.current) {
          meshRef.current.scale.setScalar(1);
        }
      } catch (error) {
        console.warn('Error in frame animation:', error);
      }
    }
  });

  // Get translation for current language
  const translation = batik.translations?.find(
    t => t.languageId === currentLanguage.id
  ) || batik.translations?.[0];

  // Materials
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: isNear ? "#8b4513" : "#654321",
    emissive: canInteract ? "#332211" : "#000000",
    emissiveIntensity: canInteract ? 0.2 : 0,
    roughness: 0.8,
    metalness: 0.1,
  });

  const batikMaterial = batikTexture ? new THREE.MeshStandardMaterial({
    map: batikTexture,
    transparent: false,
    roughness: 0.1,
    metalness: 0.0,
  }) : new THREE.MeshStandardMaterial({ 
    color: "#f5f5f5",
    roughness: 0.2,
    metalness: 0.0,
  });

  const glassMaterial = new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 0.1,
    roughness: 0.0,
    metalness: 0.0,
    color: "#ffffff"
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Main Frame */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh ref={meshRef}>
          <boxGeometry args={[4.2, 3.2, 0.3]} />
          <primitive object={frameMaterial} />
        </mesh>
      </RigidBody>

      {/* Inner Frame */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[3.8, 2.8, 0.1]} />
        <meshStandardMaterial color="#654321" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Batik Image Plane */}
      <mesh position={[0, 0, 0.16]}>
        <planeGeometry args={[3.5, 2.5]} />
        <primitive object={batikMaterial} />
      </mesh>

      {/* Glass Protection */}
      <mesh position={[0, 0, 0.17]}>
        <planeGeometry args={[3.6, 2.6]} />
        <primitive object={glassMaterial} />
      </mesh>

      {/* Loading Indicator */}
      {isLoading && (
        <Html position={[0, -2.2, 0.5]} center distanceFactor={6}>
          <div className="bg-black/80 text-white p-2 rounded">
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
            <div className="text-xs">Loading...</div>
          </div>
        </Html>
      )}

      {/* Info Panel - Only show when near and loaded */}
      {isNear && !isLoading && (
        <Html
          position={[0, -2.2, 0.5]}
          center
          distanceFactor={6}
          className="pointer-events-none select-none"
        >
          <div className={`bg-black/90 backdrop-blur-sm rounded-lg p-4 shadow-xl border max-w-xs transition-all duration-300 ${
            canInteract ? 'border-green-400' : 'border-amber-400'
          }`}>
            <h3 className="font-bold text-amber-300 text-sm mb-2 line-clamp-2">
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

            {translation && (
              <p className="text-xs text-gray-300 mb-3 line-clamp-2">
                {translation.histori}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              {canInteract ? (
                <p className="text-xs text-green-400 font-medium animate-pulse">
                  ⌨️ {isIndonesian ? 'Tekan ENTER' : 'Press ENTER'}
                </p>
              ) : (
                <p className="text-xs text-amber-400">
                  🚶 {isIndonesian ? 'Dekati untuk berinteraksi' : 'Move closer to interact'}
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

      {/* Frame Lighting */}
      <spotLight
        position={[0, 0, 3]}
        angle={0.6}
        penumbra={0.3}
        intensity={canInteract ? 1.2 : isNear ? 0.8 : 0.5}
        color={canInteract ? "#00ff88" : isNear ? "#ffd700" : "#fff8dc"}
        castShadow={false}
        distance={10}
        decay={2}
      />

      {/* Additional lighting for better visibility */}
      {canInteract && (
        <pointLight
          position={[0, 0, 1.5]}
          intensity={0.3}
          distance={4}
          decay={2}
          color="#00ff88"
        />
      )}
    </group>
  );
}