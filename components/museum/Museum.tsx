// components/museum/Museum.tsx
'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Sky } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { MuseumBuilding } from './MuseumBuilding';
import { BatikGallery } from './BatikGallery';
import { FirstPersonControls } from './FirstPersonControls';
import { MuseumUI } from './MuseumUI';
import { LoadingScreen } from './LoadingScreen';
import { ControlsInstructions } from './ControlsInstructions';
import { useMuseumStore } from '@/lib/stores/museumStore';
import type { Batik } from '@/lib/types';
import * as THREE from 'three';

interface MuseumProps {
  batiks: Batik[];
}

// Enhanced Museum Environment with Sky
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
      <fog attach="fog" args={['#f0f8ff', 40, 100]} />
      
      {/* Main lighting setup */}
      <ambientLight intensity={0.3} color="#f0f8ff" />
      
      {/* Key light - Sun simulation */}
      <directionalLight
        position={[20, 30, 10]}
        intensity={1.5}
        color="#fff8dc"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={100}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light from opposite direction */}
      <directionalLight
        position={[-15, 20, -10]}
        intensity={0.4}
        color="#e6f3ff"
      />
      
      {/* Rim light for depth */}
      <directionalLight
        position={[0, 15, -30]}
        intensity={0.3}
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
    setBatiks(batiks);
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [batiks, setBatiks]);

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
        shadows={{
          enabled: true,
          type: THREE.PCFSoftShadowMap,
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <MuseumEnvironment />

          {/* Floor-specific accent lighting */}
          {[1, 2, 3].map((floor) => (
            <group key={floor}>
              {/* Main floor lighting */}
              <pointLight
                position={[0, (floor - 1) * 6 + 4.5, 0]}
                intensity={0.8}
                distance={35}
                decay={2}
                color="#fff8dc"
                castShadow
              />
              
              {/* Corner accent lights */}
              <pointLight
                position={[20, (floor - 1) * 6 + 4, 20]}
                intensity={0.4}
                distance={25}
                decay={2}
                color="#ffd700"
              />
              <pointLight
                position={[-20, (floor - 1) * 6 + 4, -20]}
                intensity={0.4}
                distance={25}
                decay={2}
                color="#ffd700"
              />
              
              {/* Gallery specific lighting */}
              <spotLight
                position={[-25, (floor - 1) * 6 + 4, 0]}
                angle={Math.PI / 3}
                penumbra={0.5}
                intensity={0.6}
                distance={30}
                target-position={[-25, (floor - 1) * 6, 0]}
                color="#fff8dc"
                castShadow
              />
              <spotLight
                position={[25, (floor - 1) * 6 + 4, 0]}
                angle={Math.PI / 3}
                penumbra={0.5}
                intensity={0.6}
                distance={30}
                target-position={[25, (floor - 1) * 6, 0]}
                color="#fff8dc"
                castShadow
              />
            </group>
          ))}
          
          <Physics gravity={[0, -9.81, 0]}>
            <MuseumBuilding />
            <BatikGallery 
              batiks={batiks} 
              currentFloor={currentFloor}
            />
          </Physics>
          
          <FirstPersonControls speed={5} sensitivity={0.002} />
        </Suspense>
      </Canvas>
      
      <MuseumUI />
      
      {showInstructions && (
        <ControlsInstructions onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
}