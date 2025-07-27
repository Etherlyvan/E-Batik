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

  // Optimized positioning for smaller frames with proper spacing
  const framePositions = useMemo(() => {
    const positions: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
    }> = [];

    const floorHeight = (currentFloor - 1) * 6 + 2.5; // Adjusted height for smaller frames

    // Back Wall - 8 frames with proper spacing for smaller frames
    for (let i = 0; i < 8; i++) {
      positions.push({
        position: [-17.5 + (i * 5), floorHeight, -24] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number]
      });
    }

    // Left Wall - 6 frames
    for (let i = 0; i < 6; i++) {
      positions.push({
        position: [-24, floorHeight, -15 + (i * 5)] as [number, number, number],
        rotation: [0, Math.PI / 2, 0] as [number, number, number]
      });
    }

    // Right Wall - 6 frames  
    for (let i = 0; i < 6; i++) {
      positions.push({
        position: [24, floorHeight, -15 + (i * 5)] as [number, number, number],
        rotation: [0, -Math.PI / 2, 0] as [number, number, number]
      });
    }

    return positions;
  }, [currentFloor]);

  if (!floorBatiks || floorBatiks.length === 0) {
    return (
      <group>
        {/* Empty floor message */}
        <mesh position={[0, (currentFloor - 1) * 6 + 2.5, 0]}>
          <planeGeometry args={[4, 1]} />
          <meshStandardMaterial color="#f0f0f0" transparent opacity={0.8} />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      {/* Render Smaller Batik Frames */}
      {floorBatiks.map((batik, index) => {
        const frameData = framePositions[index];
        if (!frameData || !batik) {
          console.warn(`❌ Missing frame data or batik for index ${index} on floor ${currentFloor}`);
          return null;
        }

        console.log(`📍 Placing frame ${index + 1}: ${batik.nama} at position`, frameData.position);

        return (
          <BatikFrame
            key={`batik-${batik.id}-floor-${currentFloor}-${index}`}
            batik={batik}
            position={frameData.position}
            rotation={frameData.rotation}
            floor={currentFloor}
          />
        );
      })}
    </group>
  );
}