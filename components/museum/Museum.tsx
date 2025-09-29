// components/museum/Museum.tsx (Performance Optimized)
'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { KeyboardControls } from '@react-three/drei';
import { ErrorBoundary } from 'react-error-boundary';
import { MuseumBuilding } from './MuseumBuilding';
import { BatikFrame } from './BatikFrame';
import { FirstPersonControls } from './FirstPersonControls';
import { MuseumUI } from './MuseumUI';
import { useMuseumStore } from '@/lib/stores/museumStore';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { Batik } from '@/lib/types';

interface MuseumProps {
  batiks: Batik[];
}

// Keyboard controls mapping
const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'reset', keys: ['KeyR'] },
];

function MuseumContent({ batiks }: { batiks: Batik[] }) {
  const { 
    setBatiks, 
    getBatiksByFloor, 
    quality,
    setLoading,
    setQuality
  } = useMuseumStore();

  const [isInitialized, setIsInitialized] = useState(false);

  // Auto-detect performance and adjust quality
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
      
      // Simple performance detection
      if (renderer.includes('Intel') || renderer.includes('Integrated')) {
        setQuality('low');
      } else if (renderer.includes('GTX') || renderer.includes('RTX') || renderer.includes('RX')) {
        setQuality('high');
      } else {
        setQuality('medium');
      }
    }
  }, [setQuality]);

  // Initialize museum data
  useEffect(() => {
    setLoading(true, 0);
    setBatiks(batiks);
    setIsInitialized(true);
    setLoading(false, 100);
  }, [batiks, setBatiks, setLoading]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 to-orange-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-white mt-4">Loading museum...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black">
      <KeyboardControls map={keyboardMap}>
        <Canvas
          shadows={quality === 'high'}
          camera={{ 
            fov: 75, 
            near: 0.1, 
            far: 1000, 
            position: [0, 2, 15] 
          }}
          gl={{ 
            antialias: quality !== 'low',
            powerPreference: "high-performance",
            alpha: false,
            depth: true,
            stencil: false,
           
          }}
          performance={{ min: 0.5 }}
          onCreated={({ gl }) => {
            gl.setClearColor('#87CEEB'); // Sky blue background
          }}
        >
          <Suspense fallback={null}>
            {/* Lighting - Simplified */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />

            {/* Physics World */}
            <Physics 
              gravity={[0, -9.81, 0]}
              debug={false}
              timeStep={1/60}
            >
              {/* Museum Building */}
              <MuseumBuilding />

              {/* Batik Frames - Only current floor for performance */}
              {(() => {
                const currentFloor = useMuseumStore.getState().currentFloor;
                const floorBatiks = getBatiksByFloor(currentFloor);
                const framePositions = generateFramePositions(currentFloor);
                
                return floorBatiks.slice(0, 16).map((batik, index) => {
                  const frameData = framePositions[index];
                  if (!frameData) return null;

                  return (
                    <BatikFrame
                      key={`${currentFloor}-${batik.id}`}
                      batik={batik}
                      position={frameData.position}
                      rotation={frameData.rotation}
                      scale={0.9}
                    />
                  );
                });
              })()}

              {/* First Person Controls */}
                <FirstPersonControls 
                    speed={quality === 'low' ? 2 : 2.5} // Dikurangi dari 4-5 ke 2-2.5
                    sensitivity={0.0015} // Dikurangi dari 0.002
                    smoothing={0.15} // Ditingkatkan untuk movement yang lebih smooth
                />
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>

      {/* UI Overlay */}
      <MuseumUI />
    </div>
  );
}

// Generate frame positions
function generateFramePositions(floor: number) {
  const positions: Array<{ position: [number, number, number]; rotation: [number, number, number] }> = [];
  const yOffset = (floor - 1) * 6 + 2.5;

  // Back Wall - 4 frames
  for (let i = 0; i < 4; i++) {
    positions.push({
      position: [-9 + (i * 6), yOffset, -24] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number]
    });
  }

  // Left Wall - 4 frames  
  for (let i = 0; i < 4; i++) {
    positions.push({
      position: [-24, yOffset, -9 + (i * 6)] as [number, number, number],
      rotation: [0, Math.PI / 2, 0] as [number, number, number]
    });
  }

  // Right Wall - 4 frames
  for (let i = 0; i < 4; i++) {
    positions.push({
      position: [24, yOffset, -9 + (i * 6)] as [number, number, number],
      rotation: [0, -Math.PI / 2, 0] as [number, number, number]
    });
  }

  // Front Wall - 4 frames
  for (let i = 0; i < 4; i++) {
    positions.push({
      position: [-9 + (i * 6), yOffset, 24] as [number, number, number],
      rotation: [0, Math.PI, 0] as [number, number, number]
    });
  }

  return positions;
}

export function Museum({ batiks }: MuseumProps) {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => (
        <div className="min-h-screen bg-red-100 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Museum Error</h2>
            <button
              onClick={resetErrorBoundary}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      onReset={() => window.location.reload()}
    >
      <MuseumContent batiks={batiks} />
    </ErrorBoundary>
  );
}