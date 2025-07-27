// components/museum/MuseumBuilding.tsx
'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { Box, Plane } from '@react-three/drei';
import { TextureManager } from '@/lib/utils/TextureManager';
import * as THREE from 'three';

export function MuseumBuilding() {
  const buildingRef = useRef<THREE.Group>(null);
  const [floorTexture, setFloorTexture] = useState<THREE.Texture | null>(null);
  const [wallTexture, setWallTexture] = useState<THREE.Texture | null>(null);
  const [ceilingTexture, setCeilingTexture] = useState<THREE.Texture | null>(null);

  // Load textures dengan path yang benar
  useEffect(() => {
    const textureManager = TextureManager.getInstance();
    
    const loadTextures = async () => {
      try {
        console.log('🏗️ Loading museum textures...');
        
        const [floor, wall, ceiling] = await Promise.all([
          // Floor texture - Wood Floor
          textureManager.loadTexture('/textures/WoodFloor040_4K-JPG/WoodFloor040_4K-JPG_Color.jpg', {
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.RepeatWrapping,
            repeat: [10, 10]
          }).catch(() => null),
          
          // Wall texture - Leather White Rough
          textureManager.loadTexture('/textures/leather_white_4k.gltf/textures/leather_white_rough_4k.jpg', {
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.RepeatWrapping,
            repeat: [4, 4]
          }).catch(() => null),
          
          // Ceiling texture - Office Ceiling
          textureManager.loadTexture('/textures/OfficeCeiling005_4K-JPG/OfficeCeiling005_4K-JPG_Color.jpg', {
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.RepeatWrapping,
            repeat: [8, 8]
          }).catch(() => null)
        ]);

        setFloorTexture(floor);
        setWallTexture(wall);
        setCeilingTexture(ceiling);

        console.log('✅ Museum textures loaded:', { floor: !!floor, wall: !!wall, ceiling: !!ceiling });
      } catch (error) {
        console.error('❌ Failed to load textures:', error);
      }
    };

    loadTextures();
  }, []);

  // Optimized materials
  const materials = useMemo(() => ({
    floor: new THREE.MeshStandardMaterial({
      map: floorTexture,
      color: floorTexture ? 0xffffff : 0xd2b48c,
      roughness: 0.8,
      metalness: 0.1,
    }),
    wall: new THREE.MeshStandardMaterial({
      map: wallTexture,
      color: wallTexture ? 0xffffff : 0xf5f5dc,
      roughness: 0.7,
      metalness: 0.1,
    }),
    ceiling: new THREE.MeshStandardMaterial({
      map: ceilingTexture,
      color: ceilingTexture ? 0xffffff : 0xf0f0f0,
      roughness: 0.3,
      metalness: 0.1,
    }),
  }), [floorTexture, wallTexture, ceilingTexture]);

  return (
    <group ref={buildingRef}>
      {/* Ground Floor */}
      <RigidBody type="fixed" colliders="cuboid">
        <Plane 
          args={[50, 50]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, 0, 0]}
        >
          <primitive object={materials.floor} />
        </Plane>
      </RigidBody>

      {/* Simple Box Rooms - 3 Floors */}
      {[1, 2, 3].map((floorLevel) => {
        const floorY = (floorLevel - 1) * 6;
        const ceilingY = floorLevel * 6 - 0.5;
        
        return (
          <group key={`floor-${floorLevel}`}>
            {/* Floor */}
            <RigidBody type="fixed" colliders="cuboid">
              <Box args={[48, 0.2, 48]} position={[0, floorY, 0]}>
                <primitive object={materials.floor} />
              </Box>
            </RigidBody>

            {/* Ceiling */}
            <RigidBody type="fixed" colliders="cuboid">
              <Box args={[48, 0.2, 48]} position={[0, ceilingY, 0]}>
                <primitive object={materials.ceiling} />
              </Box>
            </RigidBody>
          </group>
        );
      })}

      {/* Simple Box Walls */}
      {[
        { position: [0, 9, -25], args: [50, 18, 1] as [number, number, number] }, // Back
        { position: [0, 9, 25], args: [50, 18, 1] as [number, number, number] },  // Front
        { position: [-25, 9, 0], args: [1, 18, 50] as [number, number, number] }, // Left
        { position: [25, 9, 0], args: [1, 18, 50] as [number, number, number] },  // Right
      ].map((wall, index) => (
        <RigidBody key={`wall-${index}`} type="fixed" colliders="cuboid">
          <Box args={wall.args} position={wall.position as [number, number, number]}>
            <primitive object={materials.wall} />
          </Box>
        </RigidBody>
      ))}

      {/* Minimal Lighting - Only 4 ceiling lamps per floor */}
      {[1, 2, 3].map((floor) => {
        const y = floor * 6 - 2;
        return (
          <group key={`lighting-${floor}`}>
            {/* Corner lighting only */}
            <pointLight position={[-12, y, -12]} intensity={0.8} distance={20} decay={2} color="#fff8dc" />
            <pointLight position={[12, y, -12]} intensity={0.8} distance={20} decay={2} color="#fff8dc" />
            <pointLight position={[-12, y, 12]} intensity={0.8} distance={20} decay={2} color="#fff8dc" />
            <pointLight position={[12, y, 12]} intensity={0.8} distance={20} decay={2} color="#fff8dc" />
          </group>
        );
      })}

      
    </group>
  );
}