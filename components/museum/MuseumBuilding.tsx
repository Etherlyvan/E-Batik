// components/museum/MuseumBuilding.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { Box, Plane, Cylinder } from '@react-three/drei';
import { TextureLoader, RepeatWrapping } from 'three';
import * as THREE from 'three';

export function MuseumBuilding() {
  const buildingRef = useRef<THREE.Group>(null);

  // Load only essential textures - reduced from multiple maps to single textures
  const floorTexture = useLoader(TextureLoader, '/textures/WoodFloor040_4K-JPG/WoodFloor040_4K-JPG_Color.jpg');
  const wallTexture = useLoader(TextureLoader, '/textures/leather_white_4k.gltf/textures/leather_white_diff_4k.jpg');
  const ceilingTexture = useLoader(TextureLoader, '/textures/OfficeCeiling005_4K-JPG/OfficeCeiling005_4K-JPG_Color.jpg');

  // Configure textures with proper wrapping
  useEffect(() => {
    // Floor texture configuration
    if (floorTexture) {
      floorTexture.wrapS = RepeatWrapping;
      floorTexture.wrapT = RepeatWrapping;
      floorTexture.repeat.set(8, 8);
      floorTexture.generateMipmaps = true;
    }

    // Wall texture configuration
    if (wallTexture) {
      wallTexture.wrapS = RepeatWrapping;
      wallTexture.wrapT = RepeatWrapping;
      wallTexture.repeat.set(3, 3);
      wallTexture.generateMipmaps = true;
    }

    // Ceiling texture configuration
    if (ceilingTexture) {
      ceilingTexture.wrapS = RepeatWrapping;
      ceilingTexture.wrapT = RepeatWrapping;
      ceilingTexture.repeat.set(4, 4);
      ceilingTexture.generateMipmaps = true;
    }
  }, [floorTexture, wallTexture, ceilingTexture]);

  return (
    <group ref={buildingRef}>
      {/* Ground Floor with Wood Texture */}
      <RigidBody type="fixed">
        <Plane 
          args={[60, 60]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, 0, 0]}
        >
          <meshStandardMaterial 
            map={floorTexture}
            roughness={0.8}
            metalness={0.1}
          />
        </Plane>
      </RigidBody>

      {/* Multi-level floors */}
      {[1, 2, 3].map((floor) => (
        <group key={floor}>
          {/* Floor Platform */}
          <RigidBody type="fixed">
            <Box 
              args={[58, 0.5, 58]} 
              position={[0, (floor - 1) * 6, 0]}
            >
              <meshStandardMaterial 
                map={floor === 1 ? undefined : floorTexture}
                color={floor === 1 ? "#f5f5dc" : "#ffffff"}
                roughness={0.8}
                metalness={0.1}
                transparent={floor === 1}
                opacity={floor === 1 ? 0 : 1}
              />
            </Box>
          </RigidBody>

          {/* Ceiling */}
          {floor < 3 && (
            <RigidBody type="fixed">
              <Box 
                args={[58, 0.2, 58]} 
                position={[0, floor * 6 - 0.1, 0]}
              >
                <meshStandardMaterial 
                  map={ceilingTexture}
                  roughness={0.7}
                  metalness={0.0}
                  transparent
                  opacity={0.95}
                />
              </Box>
            </RigidBody>
          )}
        </group>
      ))}

      {/* Outer Walls - Reuse same material */}
      {[
        { args: [60, 25, 1], position: [0, 12.5, -30] }, // Front
        { args: [60, 25, 1], position: [0, 12.5, 30] },  // Back
        { args: [1, 25, 60], position: [-30, 12.5, 0] }, // Left
        { args: [1, 25, 60], position: [30, 12.5, 0] },  // Right
      ].map((wall, index) => (
        <RigidBody key={index} type="fixed">
          <Box args={wall.args as [number, number, number]} position={wall.position as [number, number, number]}>
            <meshStandardMaterial 
              map={wallTexture}
              roughness={0.6}
              metalness={0.1}
            />
          </Box>
        </RigidBody>
      ))}

      {/* Interior Support Columns - Simple material */}
      {[-20, -10, 0, 10, 20].map((x) => 
        [-20, -10, 0, 10, 20].map((z) => (
          <group key={`${x}-${z}`}>
            {!(x === 0 && z === 0) && (
              <Cylinder
                args={[0.4, 0.4, 18]}
                position={[x, 9, z]}
              >
                <meshStandardMaterial 
                  color="#f5deb3"
                  roughness={0.4}
                  metalness={0.1}
                />
              </Cylinder>
            )}
          </group>
        ))
      )}

      {/* Museum Entrance */}
      <group position={[0, 1, -29.5]}>
        <Box args={[12, 6, 0.5]}>
          <meshStandardMaterial 
            color="#8b4513"
            roughness={0.8}
            metalness={0.2}
          />
        </Box>
      </group>

      {/* Museum Sign */}
      <group position={[0, 20, -29.8]}>
        <Box args={[25, 4, 0.3]}>
          <meshStandardMaterial 
            map={floorTexture}
            roughness={0.7}
            metalness={0.1}
          />
        </Box>
      </group>

      {/* Floor Indicators */}
      {[1, 2, 3].map((floor) => (
        <group key={floor} position={[-28, (floor - 1) * 6 + 3, 0]}>
          <Box args={[2, 2, 0.2]}>
            <meshStandardMaterial 
              color="#ffd700"
              emissive="#ffaa00"
              emissiveIntensity={0.3}
              roughness={0.2}
              metalness={0.8}
            />
          </Box>
        </group>
      ))}

      {/* Room Dividers - Simple glass material */}
      {[1, 2, 3].map((floor) => (
        <group key={`divider-${floor}`}>
          <RigidBody type="fixed">
            <Box 
              args={[0.3, 5, 40]} 
              position={[0, (floor - 1) * 6 + 2.5, 0]}
            >
              <meshStandardMaterial 
                color="#e6d4c1"
                transparent
                opacity={0.3}
                roughness={0.1}
                metalness={0.9}
              />
            </Box>
          </RigidBody>
        </group>
      ))}

      {/* Interior Walls - Reuse wall texture */}
      {[1, 2, 3].map((floor) => (
        <group key={`interior-${floor}`}>
          <RigidBody type="fixed">
            <Box 
              args={[40, 4, 0.2]} 
              position={[0, (floor - 1) * 6 + 2, -15]}
            >
              <meshStandardMaterial 
                map={wallTexture}
                transparent
                opacity={0.8}
                roughness={0.6}
                metalness={0.1}
              />
            </Box>
          </RigidBody>

          <RigidBody type="fixed">
            <Box 
              args={[40, 4, 0.2]} 
              position={[0, (floor - 1) * 6 + 2, 15]}
            >
              <meshStandardMaterial 
                map={wallTexture}
                transparent
                opacity={0.8}
                roughness={0.6}
                metalness={0.1}
              />
            </Box>
          </RigidBody>
        </group>
      ))}
    </group>
  );
}