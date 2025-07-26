// components/museum/Museum3D.tsx - Update dengan collision
'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Plane, OrbitControls } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Mesh, Group } from 'three';
import { BatikFrame } from './BatikFrame';
import type { Batik } from '@/lib/types';

interface Museum3DProps {
  batiks: Batik[];
  onBatikSelect: (batik: Batik | null) => void;
  selectedBatik: Batik | null;
  viewMode: 'fps' | 'orbit';
}

export function Museum3D({ batiks, onBatikSelect, selectedBatik, viewMode }: Museum3DProps) {
  const groupRef = useRef<Group>(null);
  
  // Organize batiks in a grid layout
  const batikPositions = useMemo(() => {
    const positions: Array<{batik: Batik, position: [number, number, number], rotation: [number, number, number]}> = [];
    const wallSpacing = 8;
    const frameSpacing = 3;
    const wallHeight = 3;
    
    batiks.forEach((batik, index) => {
      if (index < 20) {
        const wallIndex = Math.floor(index / 5);
        const frameIndex = index % 5;
        
        let position: [number, number, number];
        let rotation: [number, number, number];
        
        switch (wallIndex) {
          case 0: // Front wall
            position = [(frameIndex - 2) * frameSpacing, wallHeight, -wallSpacing + 0.1];
            rotation = [0, 0, 0];
            break;
          case 1: // Right wall
            position = [wallSpacing - 0.1, wallHeight, (frameIndex - 2) * frameSpacing];
            rotation = [0, -Math.PI / 2, 0];
            break;
          case 2: // Back wall
            position = [-(frameIndex - 2) * frameSpacing, wallHeight, wallSpacing - 0.1];
            rotation = [0, Math.PI, 0];
            break;
          case 3: // Left wall
            position = [-wallSpacing + 0.1, wallHeight, -(frameIndex - 2) * frameSpacing];
            rotation = [0, Math.PI / 2, 0];
            break;
          default:
            position = [0, wallHeight, 0];
            rotation = [0, 0, 0];
        }
        
        positions.push({ batik, position, rotation });
      }
    });
    
    return positions;
  }, [batiks]);

  return (
    <group ref={groupRef}>
      {/* Orbit Controls for camera mode */}
      {viewMode === 'orbit' && (
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
        />
      )}

      {/* Museum Floor with Physics */}
      <RigidBody type="fixed">
        <Plane
          args={[20, 20]}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <meshStandardMaterial 
            color="#2F2F2F" 
            roughness={0.1}
            metalness={0.1}
          />
        </Plane>
        <CuboidCollider args={[10, 0.1, 10]} position={[0, -0.1, 0]} />
      </RigidBody>
      
      {/* Museum Walls with Physics */}
      <group>
        {/* Front Wall */}
        <RigidBody type="fixed">
          <Plane
            args={[20, 8]}
            position={[0, 4, -10]}
            rotation={[0, 0, 0]}
          >
            <meshStandardMaterial color="#1a1a1a" />
          </Plane>
          <CuboidCollider args={[10, 4, 0.1]} position={[0, 4, -10]} />
        </RigidBody>
        
        {/* Back Wall */}
        <RigidBody type="fixed">
          <Plane
            args={[20, 8]}
            position={[0, 4, 10]}
            rotation={[0, Math.PI, 0]}
          >
            <meshStandardMaterial color="#1a1a1a" />
          </Plane>
          <CuboidCollider args={[10, 4, 0.1]} position={[0, 4, 10]} />
        </RigidBody>
        
        {/* Left Wall */}
        <RigidBody type="fixed">
          <Plane
            args={[20, 8]}
            position={[-10, 4, 0]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <meshStandardMaterial color="#1a1a1a" />
          </Plane>
          <CuboidCollider args={[10, 4, 0.1]} position={[-10, 4, 0]} />
        </RigidBody>
        
        {/* Right Wall */}
        <RigidBody type="fixed">
          <Plane
            args={[20, 8]}
            position={[10, 4, 0]}
            rotation={[0, -Math.PI / 2, 0]}
          >
            <meshStandardMaterial color="#1a1a1a" />
          </Plane>
          <CuboidCollider args={[10, 4, 0.1]} position={[10, 4, 0]} />
        </RigidBody>
      </group>
      
      {/* Ceiling */}
      <Plane
        args={[20, 20]}
        position={[0, 8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#2a2a2a" />
      </Plane>
      
      {/* Batik Frames */}
      {batikPositions.map(({ batik, position, rotation }, index) => (
        <BatikFrame
          key={batik.id}
          batik={batik}
          position={position}
          rotation={rotation}
          isSelected={selectedBatik?.id === batik.id}
          onClick={() => onBatikSelect(batik)}
        />
      ))}
      
      {/* Museum Lighting */}
      <ambientLight intensity={0.6} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      
      {/* Center Pedestal with Physics */}
      <RigidBody type="fixed">
        <group position={[0, 0, 0]}>
          <Box args={[2, 1, 2]} position={[0, 0.5, 0]}>
            <meshStandardMaterial color="#8B4513" />
          </Box>
          <Text
            position={[0, 1.2, 0]}
            fontSize={0.3}
            color="gold"
            anchorX="center"
            anchorY="middle"
          >
            BATIK SPHERE
          </Text>
          <Text
            position={[0, 0.8, 0]}
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Digital Heritage Museum
          </Text>
        </group>
        <CuboidCollider args={[1, 0.5, 1]} position={[0, 0.5, 0]} />
      </RigidBody>

      {/* Additional Museum Props */}
      {/* Benches */}
      {Array.from({ length: 4 }, (_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.cos(angle) * 4;
        const z = Math.sin(angle) * 4;
        
        return (
          <RigidBody key={i} type="fixed">
            <Box args={[1.5, 0.4, 0.4]} position={[x, 0.2, z]}>
              <meshStandardMaterial color="#654321" />
            </Box>
            <CuboidCollider args={[0.75, 0.2, 0.2]} position={[x, 0.2, z]} />
          </RigidBody>
        );
      })}
      {/* Spotlight untuk setiap dinding */}
      {Array.from({ length: 4 }, (_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.cos(angle) * 7;
        const z = Math.sin(angle) * 7;
        
        return (
          <spotLight
            key={i}
            position={[x, 6, z]}
            target-position={[-x * 0.8, 3, -z * 0.8]}
            intensity={2}
            angle={Math.PI / 3}
            penumbra={0.3}
            color="#ffffff"
            castShadow
          />
        );
      })}

      {/* Center ceiling light */}
      <pointLight
        position={[0, 7, 0]}
        intensity={1.5}
        color="#fff8dc"
        distance={15}
        decay={1}
      />
    </group>
  );
}