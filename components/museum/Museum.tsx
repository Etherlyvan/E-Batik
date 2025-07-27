// components/museum/Museum.tsx
'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Sky, useGLTF  } from '@react-three/drei';
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

useGLTF.preload('/models/bench/scene.gltf');
useGLTF.preload('/models/bench_2/scene.gltf');
useGLTF.preload('/models/ceiling-lamp/scene.gltf');
useGLTF.preload('/models/statue/scene.gltf');
interface MuseumProps {
  batiks: Batik[];
}

// Enhanced Museum Environment with optimized lighting for ceiling visibility
function MuseumEnvironment() {
  return (
    <>
      {/* Sky background */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
        mieCoefficient={0.005}
        mieDirectionalG={0.07}
        rayleigh={3}
        turbidity={10}
      />
      
      {/* Fog for depth and atmosphere */}
      <fog attach="fog" args={['#f0f8ff', 50, 120]} />
      
      {/* Ambient lighting - increased for better ceiling visibility */}
      <ambientLight intensity={0.4} color="#f0f8ff" />
      
      {/* Main directional light - positioned higher to illuminate ceilings */}
      <directionalLight
        position={[30, 50, 20]}
        intensity={1.2}
        color="#fff8dc"
        castShadow={false} // Disabled for performance
        target-position={[0, 0, 0]}
      />
      
      {/* Fill light from opposite direction */}
      <directionalLight
        position={[-20, 35, -15]}
        intensity={0.5}
        color="#e6f3ff"
      />
      
      {/* Top-down light specifically for ceiling illumination */}
      <directionalLight
        position={[0, 60, 0]}
        intensity={0.8}
        color="#ffffff"
        target-position={[0, 0, 0]}
      />
      
      {/* Rim light for depth and ceiling edges */}
      <directionalLight
        position={[0, 25, -40]}
        intensity={0.4}
        color="#ffeaa7"
      />
    </>
  );
}

export function Museum({ batiks }: MuseumProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const { currentFloor, setBatiks } = useMuseumStore();

  useEffect(() => {
    console.log('🏛️ Initializing Museum with', batiks.length, 'batiks');
    setBatiks(batiks);
    
    const timer = setTimeout(() => {
      console.log('✅ Museum loading complete');
      setIsLoading(false);
    }, 3000);
    
    // Cleanup function
    return () => {
      clearTimeout(timer);
      console.log('🧹 Cleaning up museum resources');
      TextureManager.getInstance().disposeAll();
    };
  }, [batiks, setBatiks]);

  // Show loading screen while initializing
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-blue-200 to-amber-100">
      <Canvas
        camera={{ 
          position: [0, 2, 15], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        shadows={false} // Disabled for performance
        gl={{
          antialias: false, // Disabled for performance
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false,
        }}
        className="w-full h-full"
        onCreated={({ gl, scene, camera }) => {
          console.log('🎨 Canvas created with WebGL context');
          console.log('📷 Camera position:', camera.position);
          
          // Optimize renderer settings
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
          
          // Scene optimization
          scene.matrixAutoUpdate = false;
        }}
      >
        <Suspense fallback={null}>
          <MuseumEnvironment />

          {/* Floor-specific enhanced lighting for ceiling visibility */}
          {[1, 2, 3].map((floor) => {
            const floorY = (floor - 1) * 6;
            const ceilingY = floor * 6 - 0.5;
            
            return (
              <group key={`floor-lighting-${floor}`}>
                {/* Main floor ambient light */}
                <pointLight
                  position={[0, floorY + 4, 0]}
                  intensity={0.8}
                  distance={35}
                  decay={2}
                  color="#fff8dc"
                />
                
                {/* Ceiling illumination lights */}
                <pointLight
                  position={[0, ceilingY - 2, 0]}
                  intensity={1.0}
                  distance={30}
                  decay={1.5}
                  color="#ffffff"
                />
                
                {/* Corner accent lights for better ceiling visibility */}
                <pointLight
                  position={[20, ceilingY - 1, 20]}
                  intensity={0.6}
                  distance={25}
                  decay={2}
                  color="#ffd700"
                />
                <pointLight
                  position={[-20, ceilingY - 1, -20]}
                  intensity={0.6}
                  distance={25}
                  decay={2}
                  color="#ffd700"
                />
                
                {/* Gallery wall lighting */}
                <spotLight
                  position={[-25, floorY + 4, 0]}
                  angle={Math.PI / 3}
                  penumbra={0.5}
                  intensity={0.8}
                  distance={30}
                  target-position={[-25, floorY, 0]}
                  color="#fff8dc"
                />
                <spotLight
                  position={[25, floorY + 4, 0]}
                  angle={Math.PI / 3}
                  penumbra={0.5}
                  intensity={0.8}
                  distance={30}
                  target-position={[25, floorY, 0]}
                  color="#fff8dc"
                />

                {/* Upward lights to illuminate ceiling from below */}
                {[-15, 0, 15].map((x) =>
                  [-15, 0, 15].map((z) => (
                    <spotLight
                      key={`uplight-${floor}-${x}-${z}`}
                      position={[x, floorY + 1, z]}
                      angle={Math.PI / 4}
                      penumbra={0.3}
                      intensity={0.5}
                      distance={8}
                      target-position={[x, ceilingY, z]}
                      color="#f0f8ff"
                    />
                  ))
                )}
              </group>
            );
          })}
          
          {/* Physics world */}
          <Physics 
            gravity={[0, -9.81, 0]}
            debug={false} // Set to true for physics debugging
          >
            <MuseumBuilding />
            <BatikGallery 
              batiks={batiks} 
              currentFloor={currentFloor}
            />
          </Physics>
          
          {/* First person controls */}
          <FirstPersonControls speed={5} sensitivity={0.002} />
        </Suspense>
      </Canvas>
      
      {/* UI Overlay */}
      <MuseumUI />
      
      {/* Initial instructions modal */}
      {showInstructions && (
        <ControlsInstructions onClose={() => setShowInstructions(false)} />
      )}

      {/* Performance monitor (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono">
          <div>Floor: {currentFloor}</div>
          <div>Batiks: {batiks.length}</div>
          <div>Cache: {TextureManager.getInstance().getCacheSize()}</div>
        </div>
      )}

      {/* Loading overlay for texture streaming */}
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <div className="bg-black/70 text-white px-3 py-1 rounded text-sm">
          🏛️ Museum Batik Digital
        </div>
      </div>

      {/* Emergency exit button */}
      <button
        onClick={() => window.location.href = '/gallery'}
        className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg z-50"
      >
        🚪 Exit Museum
      </button>

      {/* Fullscreen toggle */}
      <button
        onClick={() => {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            document.documentElement.requestFullscreen();
          }
        }}
        className="absolute top-4 right-20 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg z-50"
      >
        🖥️ Fullscreen
      </button>

      {/* Help toggle */}
      <button
        onClick={() => setShowInstructions(true)}
        className="absolute top-16 right-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg z-50"
      >
        ❓ Help
      </button>
    </div>
  );
}