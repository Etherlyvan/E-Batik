// components/museum/Museum3D.tsx
'use client';

import { useRef, useMemo } from 'react';
import { Box, Plane, Text } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Group } from 'three';
import { BatikFrame } from './BatikFrame';
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
  
  const batiksPerFloor = 16; // 4 per wall * 4 walls
  const totalFloors = Math.ceil(batiks.length / batiksPerFloor);
  const floorHeight = 12;

  // Generate unique instance ID
  const instanceId = useMemo(() => `museum-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, []);

  // Create museum layout (similar to reference)
  const createMuseumLayout = (floorIndex: number) => {
    const yOffset = floorIndex * floorHeight;
    const floorId = `${instanceId}-floor-${floorIndex}`;
    
    return (
      <group key={floorId} position={[0, yOffset, 0]}>
        {/* Floor */}
        <RigidBody type="fixed" key={`${floorId}-floor`}>
          <Plane
            args={[40, 40]}
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <meshBasicMaterial color="#444444" />
          </Plane>
          <CuboidCollider args={[20, 0.1, 20]} position={[0, -0.1, 0]} />
        </RigidBody>

        {/* Walls - Similar to reference structure */}
        {/* Front Wall */}
        <RigidBody type="fixed" key={`${floorId}-front-wall`}>
          <Box args={[40, 8, 0.5]} position={[0, 4, -20]}>
            <meshBasicMaterial color="#666666" />
          </Box>
          <CuboidCollider args={[20, 4, 0.25]} position={[0, 4, -20]} />
        </RigidBody>

        {/* Back Wall */}
        <RigidBody type="fixed" key={`${floorId}-back-wall`}>
          <Box args={[40, 8, 0.5]} position={[0, 4, 20]}>
            <meshBasicMaterial color="#666666" />
          </Box>
          <CuboidCollider args={[20, 4, 0.25]} position={[0, 4, 20]} />
        </RigidBody>

        {/* Left Wall */}
        <RigidBody type="fixed" key={`${floorId}-left-wall`}>
          <Box args={[40, 8, 0.5]} position={[-20, 4, 0]} rotation={[0, Math.PI / 2, 0]}>
            <meshBasicMaterial color="#666666" />
          </Box>
          <CuboidCollider args={[20, 4, 0.25]} position={[-20, 4, 0]} />
        </RigidBody>

        {/* Right Wall */}
        <RigidBody type="fixed" key={`${floorId}-right-wall`}>
          <Box args={[40, 8, 0.5]} position={[20, 4, 0]} rotation={[0, Math.PI / 2, 0]}>
            <meshBasicMaterial color="#666666" />
          </Box>
          <CuboidCollider args={[20, 4, 0.25]} position={[20, 4, 0]} />
        </RigidBody>

        {/* Ceiling */}
        <Plane
          key={`${floorId}-ceiling`}
          args={[40, 40]}
          position={[0, 8, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial color="#333333" />
        </Plane>

        {/* Floor Information Panel */}
        <group key={`${floorId}-info-panel`} position={[0, 1.5, 18]}>
          <Box args={[6, 2, 0.2]}>
            <meshBasicMaterial color="#1a1a1a" />
          </Box>
          <Text
            position={[0, 0.5, 0.2]}
            fontSize={0.6}
            color="gold"
            anchorX="center"
            anchorY="middle"
          >
            FLOOR {floorIndex + 1}
          </Text>
          <Text
            position={[0, -0.3, 0.2]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Batik Collection Gallery
          </Text>
          <Text
            position={[0, -0.8, 0.2]}
            fontSize={0.2}
            color="lightgray"
            anchorX="center"
            anchorY="middle"
          >
            Press E/Q to change floors • R to reset position
          </Text>
        </group>
      </group>
    );
  };

  // Position batiks on walls (like paintings in reference)
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
      floor: number,
      uniqueKey: string
    }> = [];
    
    floorsToRender.forEach(floor => {
      const startIndex = floor * batiksPerFloor;
      const endIndex = Math.min(startIndex + batiksPerFloor, batiks.length);
      const floorBatiks = batiks.slice(startIndex, endIndex);
      
      // Wall positions (similar to paintingData.js)
      const wallPositions = [
        // Front Wall (4 batiks)
        ...Array.from({ length: 4 }, (_, i) => ({
          pos: [-15 + 10 * i, 3, -19.5],
          rot: [0, 0, 0],
          wall: 'front',
          position: `front-${i}`
        })),
        // Back Wall (4 batiks)
        ...Array.from({ length: 4 }, (_, i) => ({
          pos: [-15 + 10 * i, 3, 19.5],
          rot: [0, Math.PI, 0],
          wall: 'back',
          position: `back-${i}`
        })),
        // Left Wall (4 batiks)
        ...Array.from({ length: 4 }, (_, i) => ({
          pos: [-19.5, 3, -15 + 10 * i],
          rot: [0, Math.PI / 2, 0],
          wall: 'left',
          position: `left-${i}`
        })),
        // Right Wall (4 batiks)
        ...Array.from({ length: 4 }, (_, i) => ({
          pos: [19.5, 3, -15 + 10 * i],
          rot: [0, -Math.PI / 2, 0],
          wall: 'right',
          position: `right-${i}`
        }))
      ];
      
      floorBatiks.forEach((batik, index) => {
        if (index < wallPositions.length) {
          const wallPos = wallPositions[index];
          
          const timestamp = Date.now();
          const random = Math.random().toString(36).substr(2, 9);
          const uniqueKey = `${instanceId}-batik-${batik.id}-floor-${floor}-${wallPos.wall}-${wallPos.position}-${index}-${timestamp}-${random}`;
          
          visible.push({ 
            batik, 
            position: [
              wallPos.pos[0], 
              wallPos.pos[1] + (floor * floorHeight), 
              wallPos.pos[2]
            ] as [number, number, number], 
            rotation: wallPos.rot as [number, number, number], 
            floor,
            uniqueKey
          });
        }
      });
    });
    
    return visible;
  }, [batiks, currentFloor, batiksPerFloor, totalFloors, floorHeight, instanceId]);

  return (
    <group ref={groupRef}>
      {/* Render visible floors */}
      {Array.from({ length: 3 }).map((_, index) => {
        const floorIndex = Math.max(0, currentFloor - 1) + index;
        if (floorIndex >= totalFloors) return null;
        return createMuseumLayout(floorIndex);
      })}
      
      {/* Render batik frames */}
      {visibleBatiks.map(({ batik, position, rotation, floor, uniqueKey }) => (
        <BatikFrame
          key={uniqueKey}
          batik={batik}
          position={position}
          rotation={rotation}
          isSelected={selectedBatik?.id === batik.id}
          onClick={() => onBatikSelect(batik)}
        />
      ))}
      
      {/* Simple Lighting (like reference) */}
      <ambientLight intensity={1.0} color="#ffffff" />
      <directionalLight
        position={[10, 20 + (currentFloor * floorHeight), 10]}
        intensity={0.8}
        color="#ffffff"
        castShadow={false}
      />
    </group>
  );
}