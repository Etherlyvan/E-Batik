// components/museum/BatikFrame.tsx
'use client';

import { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useMuseumStore } from '@/lib/stores/museumStore';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';
import * as THREE from 'three';

interface BatikFrameProps {
  batik: Batik;
  position: [number, number, number];
  rotation: [number, number, number];
  floor: number;
}

// Large Portrait Frame with Direct Texture Loading
function LargePortraitFrame({ 
  position, 
  rotation, 
  imageUrl,
  batikName
}: { 
  position: [number, number, number]; 
  rotation: [number, number, number];
  imageUrl: string | null;
  batikName: string;
}) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      console.warn(`No image URL for ${batikName}`);
      setHasError(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    const loader = new THREE.TextureLoader();
    
    console.log(`🔄 Loading image for ${batikName}: ${imageUrl}`);

    loader.load(
      imageUrl,
      (loadedTexture) => {
        // Configure texture
        loadedTexture.minFilter = THREE.LinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        loadedTexture.wrapS = THREE.ClampToEdgeWrapping;
        loadedTexture.wrapT = THREE.ClampToEdgeWrapping;
        loadedTexture.flipY = false;
        loadedTexture.needsUpdate = true;
        
        setTexture(loadedTexture);
        setIsLoading(false);
        console.log(`✅ Image loaded successfully for ${batikName}`);
      },
      (progress) => {
        console.log(`📊 Loading progress for ${batikName}: ${Math.round((progress.loaded / progress.total) * 100)}%`);
      },
      (error) => {
        console.error(`❌ Failed to load image for ${batikName}:`, error);
        setHasError(true);
        setIsLoading(false);
      }
    );

    return () => {
      if (texture) {
        texture.dispose();
      }
    };
  }, [imageUrl, batikName, texture]);

  return (
    <RigidBody type="fixed" colliders="cuboid">
      <group position={position} rotation={rotation}>
        {/* Large Frame Border - Much Bigger */}
        <mesh>
          <boxGeometry args={[4.0, 5.5, 0.2]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.1} />
        </mesh>
        
        {/* Inner Frame */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[3.6, 5.1, 0.1]} />
          <meshStandardMaterial color="#34495e" />
        </mesh>
        
        {/* Background for image */}
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[3.4, 4.9]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        
        {/* Batik Image or Placeholder */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[3.2, 4.7]} />
          {isLoading ? (
            <meshStandardMaterial color="#e0e0e0" />
          ) : hasError || !texture ? (
            <meshStandardMaterial color="#f8f9fa" />
          ) : (
            <meshStandardMaterial map={texture} />
          )}
        </mesh>
        
        {/* Loading Indicator */}
        {isLoading && (
          <mesh position={[0, 0, 0.12]}>
            <planeGeometry args={[2, 0.5]} />
            <meshStandardMaterial color="#3498db" transparent opacity={0.8} />
          </mesh>
        )}
        
        {/* Error Indicator */}
        {hasError && !isLoading && (
          <mesh position={[0, 0, 0.12]}>
            <planeGeometry args={[2.5, 0.8]} />
            <meshStandardMaterial color="#e74c3c" transparent opacity={0.7} />
          </mesh>
        )}
        
        {/* Glass Effect */}
        <mesh position={[0, 0, 0.13]}>
          <planeGeometry args={[3.5, 5.0]} />
          <meshStandardMaterial 
            transparent 
            opacity={0.05} 
            color="#ffffff"
            roughness={0.0}
            metalness={0.9}
          />
        </mesh>

        {/* Frame Shadow */}
        <mesh position={[0.1, -0.1, -0.05]}>
          <planeGeometry args={[4.1, 5.6]} />
          <meshStandardMaterial 
            transparent 
            opacity={0.2} 
            color="#000000"
          />
        </mesh>
      </group>
    </RigidBody>
  );
}

export function BatikFrame({ batik, position, rotation, floor }: BatikFrameProps) {
  const [isNear, setIsNear] = useState(false);
  const [canInteract, setCanInteract] = useState(false);
  const { setSelectedBatik } = useMuseumStore();
  const { currentLanguage } = useLanguage();
  const { camera } = useThree();

  const isIndonesian = currentLanguage.code === 'id';

  // Get image URL with better error handling - Fixed useMemo import
  const imageUrl = useMemo(() => {
    if (!batik.foto || batik.foto.length === 0) {
      console.warn(`No photos available for batik: ${batik.nama}`);
      return null;
    }
    
    const firstPhoto = batik.foto[0];
    if (!firstPhoto || !firstPhoto.link) {
      console.warn(`Invalid photo data for batik: ${batik.nama}`);
      return null;
    }
    
    console.log(`Image URL for ${batik.nama}: ${firstPhoto.link}`);
    return firstPhoto.link;
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

  // Distance checking with larger detection range
  useFrame(() => {
    if (camera) {
      try {
        const distance = camera.position.distanceTo(new THREE.Vector3(...position));
        const isClose = distance < 12; // Increased range for larger frames
        const isVeryClose = distance < 8;
        
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

  return (
    <group>
      {/* Large Portrait Frame */}
      <Suspense fallback={null}>
        <LargePortraitFrame
          position={position}
          rotation={rotation}
          imageUrl={imageUrl}
          batikName={batik.nama}
        />
      </Suspense>

      {/* Enhanced Info Panel for Larger Frame */}
      {isNear && (
        <Html
          position={[position[0], position[1] - 3.5, position[2] + 0.8]}
          center
          distanceFactor={8}
        >
          <div className={`bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-2 max-w-sm ${
            canInteract ? 'border-green-500' : 'border-gray-300'
          }`}>
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              {batik.nama}
            </h3>
            
            {batik.seniman && (
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Artist:</span> {batik.seniman}
              </p>
            )}
            
            {batik.alamat && (
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Location:</span> {batik.alamat}
              </p>
            )}
            
            <p className="text-sm text-gray-500 mb-3">
              <span className="font-medium">Year:</span> {batik.tahun}
            </p>

            {/* Image Status */}
            {!imageUrl && (
              <p className="text-xs text-red-500 mb-2 bg-red-50 p-2 rounded">
                ⚠️ No image available
              </p>
            )}

            <div className="flex items-center justify-between">
              {canInteract ? (
                <p className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                  {isIndonesian ? 'Tekan ENTER untuk detail' : 'Press ENTER for details'}
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  {isIndonesian ? 'Dekati untuk melihat' : 'Move closer to view'}
                </p>
              )}
              
              {batik.kode && (
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                  {batik.kode}
                </span>
              )}
            </div>
          </div>
        </Html>
      )}

      {/* Enhanced lighting for larger frame */}
      {isNear && (
        <>
          <spotLight
            position={[position[0], position[1] + 2, position[2] + 2]}
            angle={0.4}
            penumbra={0.3}
            intensity={1.2}
            color="#ffffff"
            distance={10}
            decay={2}
          />
          <pointLight
            position={[position[0], position[1], position[2] + 1]}
            intensity={0.5}
            distance={8}
            color="#fff8dc"
          />
        </>
      )}
    </group>
  );
}