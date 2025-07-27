// components/museum/Museum.tsx
'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { MuseumBuilding } from './MuseumBuilding';
import { BatikGallery } from './BatikGallery';
import { FirstPersonControls } from './FirstPersonControls';
import { MuseumUI } from './MuseumUI';
import { LoadingScreen } from './LoadingScreen';
import { ControlsInstructions } from './ControlsInstructions';
import { useMuseumStore } from '@/lib/stores/museumStore';
import { TextureManager } from '@/lib/utils/TextureManager';
import type { Batik } from '@/lib/types';
import * as THREE from 'three';

interface MuseumProps {
  batiks: Batik[];
}

// Optimized Environment
function MuseumEnvironment() {
  return (
    <>
      <ambientLight intensity={0.5} color="#f0f8ff" />
      <directionalLight
        position={[20, 30, 20]}
        intensity={0.8}
        color="#fff8dc"
        castShadow={false}
      />
      <directionalLight
        position={[-20, 20, -20]}
        intensity={0.3}
        color="#e6f3ff"
      />
    </>
  );
}

export function Museum({ batiks }: MuseumProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentFloor, setBatiks } = useMuseumStore();

  // components/museum/Museum.tsx - Tambahkan logging
    useEffect(() => {
        const initializeMuseum = async () => {
            try {
            console.log('🏛️ Initializing Museum with batiks:', batiks.length);
            
            // Debug: Log sample batik data
            if (batiks.length > 0) {
                console.log('📊 Sample batik data:', {
                name: batiks[0].nama,
                photos: batiks[0].foto?.length || 0,
                firstPhotoUrl: batiks[0].foto?.[0]?.link || 'No URL'
                });
            }

            if (!batiks || batiks.length === 0) {
                setError('No batik collection available');
                setIsLoading(false);
                return;
            }

            const validBatiks = batiks.filter(batik => 
                batik && batik.id && batik.nama
            );

            console.log(`✅ Valid batiks: ${validBatiks.length}/${batiks.length}`);
            
            setBatiks(validBatiks);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsLoading(false);
            } catch (err) {
            console.error('❌ Museum initialization failed:', err);
            setError('Failed to initialize museum');
            setIsLoading(false);
            }
        };

        initializeMuseum();
    }, [batiks, setBatiks]);

  if (isLoading) return <LoadingScreen />;
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Museum Error</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.href = '/gallery'}
            className="bg-red-600 text-white px-6 py-3 rounded-lg"
          >
            Return to Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-gray-100">
      <Canvas
        camera={{ 
          position: [0, 2, 15], 
          fov: 75,
          near: 0.1,
          far: 100
        }}
        shadows={false}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
        }}
        className="w-full h-full"
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Suspense fallback={null}>
          <MuseumEnvironment />
          
          <Physics gravity={[0, -9.81, 0]} debug={false}>
            <MuseumBuilding />
            <BatikGallery batiks={batiks} currentFloor={currentFloor} />
          </Physics>
          
          <FirstPersonControls speed={5} sensitivity={0.002} />
        </Suspense>
      </Canvas>
      
      <MuseumUI />
      
      {showInstructions && (
        <ControlsInstructions onClose={() => setShowInstructions(false)} />
      )}

      {/* Exit Button */}
      <button
        onClick={() => window.location.href = '/gallery'}
        className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg z-50 transition-colors"
      >
        🚪 Exit Museum
      </button>

      {/* Help Button */}
      <button
        onClick={() => setShowInstructions(true)}
        className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg z-50 transition-colors"
      >
        ❓ Controls
      </button>
    </div>
  );
}