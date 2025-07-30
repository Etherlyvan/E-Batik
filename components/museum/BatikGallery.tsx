// components/museum/BatikGallery.tsx
'use client';

import { useMemo } from 'react';
import { BatikFrame } from './BatikFrame';
import { useMuseumStore } from '@/lib/stores/museumStore';
import type { Batik } from '@/lib/types';

interface BatikGalleryProps {
  batiks: Batik[];
  currentFloor: number;
}

export function BatikGallery({ batiks, currentFloor }: BatikGalleryProps) {
  const { getBatiksByFloor } = useMuseumStore();
  
  const floorBatiks = useMemo(() => {
    const batiksOnFloor = getBatiksByFloor(currentFloor);
    console.log(`🖼️ Floor ${currentFloor}: ${batiksOnFloor.length} batik frames`);
    return batiksOnFloor;
  }, [currentFloor, getBatiksByFloor]);

  // Portrait frame positioning with proper spacing
  const framePositions = useMemo(() => {
    const positions: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
    }> = [];

    const floorHeight = (currentFloor - 1) * 6 + 2.5; // Adjusted for portrait frames
    const frameSpacing = 5.5; // Increased spacing for portrait frames

    // Back Wall - 6 portrait frames
    for (let i = 0; i < 6; i++) {
      positions.push({
        position: [-13.75 + (i * frameSpacing), floorHeight, -24] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number]
      });
    }

    // Left Wall - 4 portrait frames
    for (let i = 0; i < 4; i++) {
      positions.push({
        position: [-24, floorHeight, -11 + (i * frameSpacing)] as [number, number, number],
        rotation: [0, Math.PI / 2, 0] as [number, number, number]
      });
    }

    // Right Wall - 4 portrait frames  
    for (let i = 0; i < 4; i++) {
      positions.push({
        position: [24, floorHeight, -11 + (i * frameSpacing)] as [number, number, number],
        rotation: [0, -Math.PI / 2, 0] as [number, number, number]
      });
    }

    // Front Wall - 4 portrait frames
    for (let i = 0; i < 4; i++) {
      positions.push({
        position: [-8.25 + (i * frameSpacing), floorHeight, 24] as [number, number, number],
        rotation: [0, Math.PI, 0] as [number, number, number]
      });
    }

    return positions;
  }, [currentFloor]);

  if (!floorBatiks || floorBatiks.length === 0) {
    return (
      <group>
        {/* Empty floor message */}
        <mesh position={[0, (currentFloor - 1) * 6 + 3, 0]}>
          <planeGeometry args={[6, 2]} />
          <meshStandardMaterial color="#f0f0f0" transparent opacity={0.8} />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      {/* Render Portrait Batik Frames */}
      {floorBatiks.map((batik, index) => {
        const frameData = framePositions[index];
        if (!frameData || !batik) {
          console.warn(`❌ Missing frame data or batik for index ${index} on floor ${currentFloor}`);
          return null;
        }

        console.log(`📍 Placing portrait frame ${index + 1}: ${batik.nama} at position`, frameData.position);

        return (
          <BatikFrame
            key={`${currentFloor}-${batik.id}`}
            batik={batik}
            position={frameData.position}
            rotation={frameData.rotation}
            scale={0.9} // Slightly smaller scale for portrait frames
          />
        );
      })}
    </group>
  );
}