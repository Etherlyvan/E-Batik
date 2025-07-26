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
  
  const batiksPerFloor = 12;
  const totalFloors = Math.ceil(batiks.length / batiksPerFloor);
  const floorHeight = 12;

  // Generate unique instance ID for this component
  const instanceId = useMemo(() => `museum-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, []);

  // Museum layout based on the floor plan image
  const createMuseumLayout = (floorIndex: number) => {
    const yOffset = floorIndex * floorHeight;
    const floorId = `${instanceId}-floor-${floorIndex}`;
    
    return (
      <group key={floorId} position={[0, yOffset, 0]}>
        {/* Main Floor */}
        <RigidBody type="fixed" key={`${floorId}-main-floor`}>
          <Plane
            args={[50, 30]}
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <meshStandardMaterial 
              color={floorIndex === currentFloor ? "#4A4A4A" : "#3A3A3A"} 
              roughness={0.8}
              metalness={0.1}
            />
          </Plane>
          <CuboidCollider args={[25, 0.1, 15]} position={[0, -0.1, 0]} />
        </RigidBody>

        {/* Outer Walls */}
        {[
          { pos: [0, 4, -15], rot: [0, 0, 0], size: [50, 8, 0.5], id: 'front' },
          { pos: [0, 4, 15], rot: [0, Math.PI, 0], size: [50, 8, 0.5], id: 'back' },
          { pos: [-25, 4, 0], rot: [0, Math.PI / 2, 0], size: [30, 8, 0.5], id: 'left' },
          { pos: [25, 4, 0], rot: [0, -Math.PI / 2, 0], size: [30, 8, 0.5], id: 'right' }
        ].map((wall, i) => (
          <RigidBody key={`${floorId}-outer-wall-${wall.id}-${i}`} type="fixed">
            <Box
              args={wall.size as [number, number, number]}
              position={wall.pos as [number, number, number]}
              rotation={wall.rot as [number, number, number]}
            >
              <meshStandardMaterial color="#2A2A2A" roughness={0.8} />
            </Box>
            <CuboidCollider 
              args={[wall.size[0]/2, wall.size[1]/2, wall.size[2]/2]} 
              position={wall.pos as [number, number, number]} 
            />
          </RigidBody>
        ))}

        {/* Interior Walls and Partitions */}
        {[
          { pos: [-15, 4, -8], size: [8, 8, 0.3], id: 'storage' },
          { pos: [0, 4, -8], size: [6, 8, 0.3], id: 'reception' },
          { pos: [15, 4, -8], size: [8, 8, 0.3], id: 'bathroom' },
          { pos: [-10, 4, 2], size: [0.3, 8, 8], id: 'partition-left' },
          { pos: [10, 4, 2], size: [0.3, 8, 8], id: 'partition-right' },
          { pos: [-5, 4, 8], size: [8, 8, 0.3], id: 'partition-back-left' },
          { pos: [5, 4, 8], size: [8, 8, 0.3], id: 'partition-back-right' }
        ].map((wall, i) => (
          <RigidBody key={`${floorId}-interior-wall-${wall.id}-${i}`} type="fixed">
            <Box
              args={wall.size as [number, number, number]}
              position={wall.pos as [number, number, number]}
            >
              <meshStandardMaterial color={wall.id.includes('partition') ? "#4A4A4A" : "#3A3A3A"} />
            </Box>
            <CuboidCollider 
              args={[wall.size[0]/2, wall.size[1]/2, wall.size[2]/2]} 
              position={wall.pos as [number, number, number]} 
            />
          </RigidBody>
        ))}

        {/* Ceiling */}
        <Plane
          key={`${floorId}-ceiling`}
          args={[50, 30]}
          position={[0, 8, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#2A2A2A" />
        </Plane>

        {/* Floor Information Panel */}
        <group key={`${floorId}-info-panel`} position={[0, 1.5, 12]}>
          <Box args={[6, 2, 0.2]}>
            <meshStandardMaterial color="#1a1a1a" />
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

  // Position batiks on walls with absolutely unique keys
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
      
      // Wall positions for batik frames
      const wallPositions = [
        { pos: [-18, 3, -14.5], rot: [0, 0, 0], wall: 'front', position: 'left' },
        { pos: [-6, 3, -14.5], rot: [0, 0, 0], wall: 'front', position: 'center-left' },
        { pos: [6, 3, -14.5], rot: [0, 0, 0], wall: 'front', position: 'center-right' },
        { pos: [18, 3, -14.5], rot: [0, 0, 0], wall: 'front', position: 'right' },
        { pos: [24.5, 3, -6], rot: [0, -Math.PI / 2, 0], wall: 'right', position: 'front' },
        { pos: [24.5, 3, 6], rot: [0, -Math.PI / 2, 0], wall: 'right', position: 'back' },
        { pos: [18, 3, 14.5], rot: [0, Math.PI, 0], wall: 'back', position: 'right' },
        { pos: [6, 3, 14.5], rot: [0, Math.PI, 0], wall: 'back', position: 'center-right' },
        { pos: [-6, 3, 14.5], rot: [0, Math.PI, 0], wall: 'back', position: 'center-left' },
        { pos: [-18, 3, 14.5], rot: [0, Math.PI, 0], wall: 'back', position: 'left' },
        { pos: [-24.5, 3, 6], rot: [0, Math.PI / 2, 0], wall: 'left', position: 'back' },
        { pos: [-24.5, 3, -6], rot: [0, Math.PI / 2, 0], wall: 'left', position: 'front' }
      ];
      
      floorBatiks.forEach((batik, index) => {
        if (index < wallPositions.length) {
          const wallPos = wallPositions[index];
          
          // Create absolutely unique key with timestamp and random
          const timestamp = Date.now();
          const random = Math.random().toString(36).substr(2, 9);
          const uniqueKey = `${instanceId}-batik-${batik.id}-floor-${floor}-wall-${wallPos.wall}-pos-${wallPos.position}-idx-${index}-${timestamp}-${random}`;
          
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
      {/* Preloader */}
      <BatikPreloader 
        batiks={batiks}
        currentFloor={currentFloor}
        onPreloadComplete={() => {}} 
      />

      {/* Orbit Controls for orbit mode */}
      {viewMode === 'orbit' && (
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={80}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
          target={[0, 4 + (currentFloor * floorHeight), 0]}
        />
      )}

      {/* Render visible floors with unique keys */}
      {Array.from({ length: 3 }).map((_, index) => {
        const floorIndex = Math.max(0, currentFloor - 1) + index;
        if (floorIndex >= totalFloors) return null;
        return createMuseumLayout(floorIndex);
      })}
      
      {/* Render batik frames with absolutely unique keys */}
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
      
      {/* Enhanced Lighting System with unique keys */}
      <ambientLight key={`${instanceId}-ambient-light`} intensity={0.6} color="#ffffff" />
      
      {/* Main floor lighting */}
      <pointLight
        key={`${instanceId}-main-light-${currentFloor}`}
        position={[0, 7 + (currentFloor * floorHeight), 0]}
        intensity={4}
        color="#fff8dc"
        distance={25}
        decay={1}
        castShadow
      />
      
      {/* Area-specific lighting with unique keys */}
      {[
        { pos: [15, 6 + (currentFloor * floorHeight), 0], id: 'right' },
        { pos: [-15, 6 + (currentFloor * floorHeight), 0], id: 'left' },
        { pos: [0, 6 + (currentFloor * floorHeight), 10], id: 'back' },
        { pos: [0, 6 + (currentFloor * floorHeight), -10], id: 'front' }
      ].map((light, i) => (
        <spotLight
          key={`${instanceId}-spot-light-${currentFloor}-${light.id}-${i}`}
          position={light.pos as [number, number, number]}
          target-position={[0, 2 + (currentFloor * floorHeight), 0]}
          intensity={2}
          angle={Math.PI / 3}
          penumbra={0.3}
          color="#ffffff"
          castShadow
        />
      ))}

      {/* Directional light for overall illumination */}
      <directionalLight
        key={`${instanceId}-directional-light-${currentFloor}`}
        position={[20, 20 + (currentFloor * floorHeight), 10]}
        intensity={1}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  );
}