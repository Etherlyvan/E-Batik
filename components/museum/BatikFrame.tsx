// components/museum/BatikFrame.tsx
'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
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

// Wooden Frame Model Component
function WoodenFrameModel({ 
  position, 
  rotation, 
  scale = [2, 2, 1] 
}: { 
  position: [number, number, number]; 
  rotation: [number, number, number]; 
  scale?: [number, number, number] 
}) {
  let gltf;
  
  try {
    gltf = useGLTF('/models/wooden_picture_frame/scene.gltf');
  } catch (error) {
    console.warn('Failed to load wooden frame model:', error);
    // Fallback to simple box frame
    return (
      <RigidBody type="fixed" colliders="cuboid">
        <group position={position} rotation={rotation}>
          <mesh>
            <boxGeometry args={[3.2, 2.4, 0.3]} />
            <meshStandardMaterial color="#8b4513" roughness={0.8} metalness={0.2} />
          </mesh>
        </group>
      </RigidBody>
    );
  }

  if (!gltf || !gltf.scene) {
    return (
      <RigidBody type="fixed" colliders="cuboid">
        <group position={position} rotation={rotation}>
          <mesh>
            <boxGeometry args={[3.2, 2.4, 0.3]} />
            <meshStandardMaterial color="#8b4513" roughness={0.8} metalness={0.2} />
          </mesh>
        </group>
      </RigidBody>
    );
  }

  const clonedScene = gltf.scene.clone();

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <group position={position} rotation={rotation}>
        <primitive object={clonedScene} scale={scale} />
      </group>
    </RigidBody>
  );
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
        console.warn('Failed to load batik texture:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBatikTexture();
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

  // Distance checking
  useFrame(() => {
    if (camera) {
      try {
        const distance = camera.position.distanceTo(new THREE.Vector3(...position));
        const isClose = distance < 6;
        const isVeryClose = distance < 4;
        
        if (isClose !== isNear) {
          setIsNear(isClose);
        }
        
        if (isVeryClose !== canInteract) {
          setCanInteract(isVeryClose);
        }
      } catch (error) {
        console.warn('Error in frame distance check:', error);
      }
    }
  });

  const translation = batik.translations?.find(
    t => t.languageId === currentLanguage.id
  ) || batik.translations?.[0];

  return (
    <group>
      {/* Wooden Frame Model */}
      <Suspense fallback={null}>
        <WoodenFrameModel
          position={position}
          rotation={rotation}
          scale={[2, 2, 1]}
        />
      </Suspense>

      {/* Batik Image Plane */}
      <mesh position={[position[0], position[1], position[2] + 0.1]}>
        <planeGeometry args={[2.5, 1.8]} />
        <meshStandardMaterial
          map={batikTexture}
          transparent={false}
          roughness={0.1}
          metalness={0.0}
        />
      </mesh>

      {/* Info Panel */}
      {isNear && !isLoading && (
        <Html
          position={[position[0], position[1] - 1.5, position[2] + 0.5]}
          center
          distanceFactor={6}
        >
          <div className={`bg-black/90 rounded-lg p-3 shadow-xl border max-w-xs ${
            canInteract ? 'border-green-400' : 'border-amber-400'
          }`}>
            <h3 className="font-bold text-amber-300 text-sm mb-1">
              {batik.nama}
            </h3>
            
            {batik.seniman && (
              <p className="text-xs text-amber-200 mb-1">
                🎨 {batik.seniman}
              </p>
            )}
            
            <p className="text-xs text-gray-300 mb-2">
              📅 {batik.tahun}
            </p>

            <div className="flex items-center justify-between">
              {canInteract ? (
                <p className="text-xs text-green-400 font-medium animate-pulse">
                  ⌨️ {isIndonesian ? 'Tekan ENTER' : 'Press ENTER'}
                </p>
              ) : (
                <p className="text-xs text-amber-400">
                  🚶 {isIndonesian ? 'Dekati' : 'Move closer'}
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

      {/* Simple lighting */}
      {isNear && (
        <spotLight
          position={[position[0], position[1] + 1, position[2] + 2]}
          angle={0.5}
          penumbra={0.3}
          intensity={0.8}
          color="#ffd700"
          distance={8}
          decay={2}
        />
      )}
    </group>
  );
}

// Preload frame model
try {
  useGLTF.preload('/models/wooden_picture_frame/scene.gltf');
} catch (error) {
  console.warn('Failed to preload wooden frame model:', error);
}