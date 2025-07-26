// components/museum/Museum3D.tsx
'use client';

import { useRef, useMemo } from 'react';
import { Text, Box, Plane, OrbitControls } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Group } from 'three';
import { BatikFrame } from './BatikFrame';
import { BatikPreloader } from './BatikPreloader';
import type { Batik } from '@/lib/types';

interface Museum3DProps {
  batiks: Batik[];
  onBatikSelect: (batik: Batik | null) => void;
  selectedBatik: Batik | null;
  viewMode: 'fps' | 'orbit';
  currentFloor: number;
}

export function Museum3D({ 
  batiks, 
  onBatikSelect, 
  selectedBatik, 
  viewMode, 
  currentFloor 
}: Museum3DProps) {
  const groupRef = useRef<Group>(null);
  
  const batiksPerFloor = 8; // Reduced for better performance
  const totalFloors = Math.ceil(batiks.length / batiksPerFloor);
  const floorHeight = 10; // Increased spacing between floors

  // Only render batiks for current floor and adjacent floors
  const visibleBatiks = useMemo(() => {
    const floorsToRender = [
      Math.max(0, currentFloor - 1),
      currentFloor,
      Math.min(totalFloors - 1, currentFloor + 1)
    ];
    
    const visible: Array<{
      batik: Batik, 
      position: [number, number, number], 
      rotation: [number, number, number],
      floor: number
    }> = [];
    
    floorsToRender.forEach(floor => {
      const startIndex = floor * batiksPerFloor;
      const endIndex = Math.min(startIndex + batiksPerFloor, batiks.length);
      const floorBatiks = batiks.slice(startIndex, endIndex);
      
      floorBatiks.forEach((batik, index) => {
        const wallIndex = Math.floor(index / 2); // 2 batiks per wall
        const frameIndex = index % 2;
        const wallHeight = 3;
        
        let position: [number, number, number];
        let rotation: [number, number, number];
        
        switch (wallIndex) {
          case 0: // Front wall
            position = [(frameIndex - 0.5) * 4, wallHeight, -9];
            rotation = [0, 0, 0];
            break;
          case 1: // Right wall
            position = [9, wallHeight, (frameIndex - 0.5) * 4];
            rotation = [0, -Math.PI / 2, 0];
            break;
          case 2: // Back wall
            position = [-(frameIndex - 0.5) * 4, wallHeight, 9];
            rotation = [0, Math.PI, 0];
            break;
          case 3: // Left wall
            position = [-9, wallHeight, -(frameIndex - 0.5) * 4];
            rotation = [0, Math.PI / 2, 0];
            break;
          default:
            position = [0, wallHeight, 0];
            rotation = [0, 0, 0];
        }
        
        visible.push({ batik, position, rotation, floor });
      });
    });
    
    return visible;
  }, [batiks, currentFloor, batiksPerFloor, totalFloors]);

  return (
    <group ref={groupRef}>
      {/* Preloader */}
      <BatikPreloader 
        batiks={batiks}
        currentFloor={currentFloor}
        onPreloadComplete={() => {}} 
      />

      {/* Orbit Controls */}
      {viewMode === 'orbit' && (
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
          target={[0, 2 + (currentFloor * floorHeight), 0]}
        />
      )}

      {/* Render only visible floors */}
      {Array.from({ length: 3 }).map((_, index) => {
        const floorIndex = Math.max(0, currentFloor - 1) + index;
        if (floorIndex >= totalFloors) return null;
        
        return (
          <group key={floorIndex} position={[0, floorIndex * floorHeight, 0]}>
            {/* Floor */}
            <RigidBody type="fixed">
              <Plane
                args={[20, 20]}
                position={[0, 0, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                receiveShadow
              >
                <meshStandardMaterial 
                  color={floorIndex === currentFloor ? "#3F3F3F" : "#2F2F2F"} 
                  roughness={0.1}
                  metalness={0.1}
                />
              </Plane>
              <CuboidCollider args={[10, 0.1, 10]} position={[0, -0.1, 0]} />
            </RigidBody>
            
            {/* Walls */}
            <group>
              {[
                { pos: [0, 4, -10], rot: [0, 0, 0] },      // Front
                { pos: [0, 4, 10], rot: [0, Math.PI, 0] }, // Back
                { pos: [-10, 4, 0], rot: [0, Math.PI / 2, 0] }, // Left
                { pos: [10, 4, 0], rot: [0, -Math.PI / 2, 0] }  // Right
              ].map((wall, i) => (
                <RigidBody key={i} type="fixed">
                  <Plane
                    args={[20, 8]}
                    position={wall.pos as [number, number, number]}
                    rotation={wall.rot as [number, number, number]}
                  >
                    <meshStandardMaterial color="#1a1a1a" />
                  </Plane>
                  <CuboidCollider 
                    args={[10, 4, 0.1]} 
                    position={wall.pos as [number, number, number]} 
                  />
                </RigidBody>
              ))}
            </group>
            
            {/* Ceiling */}
            <Plane
              args={[20, 20]}
              position={[0, 8, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <meshStandardMaterial color="#2a2a2a" />
            </Plane>

            {/* Floor Information */}
            <group position={[0, 1.5, 8]}>
              <Box args={[4, 1.2, 0.1]}>
                <meshStandardMaterial color="#1a1a1a" />
              </Box>
              <Text
                position={[0, 0.3, 0.1]}
                fontSize={0.4}
                color="gold"
                anchorX="center"
                anchorY="middle"
              >
                FLOOR {floorIndex + 1}
              </Text>
              <Text
                position={[0, -0.3, 0.1]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                Press E/Q to change floors
              </Text>
            </group>

            {/* Central Elevator Shaft */}
            <RigidBody type="fixed">
              <Box args={[2, 8, 2]} position={[0, 4, 0]}>
                <meshStandardMaterial 
                  color={floorIndex === currentFloor ? "#FFD700" : "#8B4513"} 
                />
              </Box>
              <Text
                position={[0, 6, 1.1]}
                fontSize={0.3}
                color={floorIndex === currentFloor ? "black" : "gold"}
                anchorX="center"
                anchorY="middle"
              >
                ELEVATOR
              </Text>
              <Text
                position={[0, 5.5, 1.1]}
                fontSize={0.15}
                color={floorIndex === currentFloor ? "black" : "white"}
                anchorX="center"
                anchorY="middle"
              >
                Floor {floorIndex + 1}
              </Text>
              <CuboidCollider args={[1, 4, 1]} position={[0, 4, 0]} />
            </RigidBody>
          </group>
        );
      })}
      
      {/* Render only visible batik frames */}
      {visibleBatiks.map(({ batik, position, rotation, floor }) => (
        <group key={`${batik.id}-${floor}`} position={[0, floor * floorHeight, 0]}>
          <BatikFrame
            batik={batik}
            position={[position[0], position[1], position[2]]}
            rotation={rotation}
            isSelected={selectedBatik?.id === batik.id}
            onClick={() => onBatikSelect(batik)}
          />
        </group>
      ))}
      
      {/* Optimized Lighting */}
      <ambientLight intensity={0.8} color="#ffffff" />
      
      {/* Floor-specific lighting */}
      <pointLight
        position={[0, 7 + (currentFloor * floorHeight), 0]}
        intensity={3}
        color="#fff8dc"
        distance={18}
        decay={1}
      />
      
      {/* Wall accent lights */}
      {[
        [8, 4 + (currentFloor * floorHeight), 0],
        [-8, 4 + (currentFloor * floorHeight), 0],
        [0, 4 + (currentFloor * floorHeight), 8],
        [0, 4 + (currentFloor * floorHeight), -8]
      ].map((pos, i) => (
        <spotLight
          key={i}
          position={pos as [number, number, number]}
          target-position={[0, 2 + (currentFloor * floorHeight), 0]}
          intensity={1.5}
          angle={Math.PI / 4}
          penumbra={0.3}
          color="#ffffff"
        />
      ))}
    </group>
  );
}