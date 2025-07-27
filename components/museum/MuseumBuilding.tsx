// components/museum/MuseumBuilding.tsx
'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { Box, Plane } from '@react-three/drei';
import { TextureManager } from '@/lib/utils/TextureManager';
import { Bench } from './models/Bench';
import { CeilingLamp } from './models/CeilingLamp';
import { Statue } from './models/Statue';
import { PictureFrame } from './models/PictureFrame';
import * as THREE from 'three';

export function MuseumBuilding() {
  const buildingRef = useRef<THREE.Group>(null);
  const [floorTexture, setFloorTexture] = useState<THREE.Texture | null>(null);
  const [wallTexture, setWallTexture] = useState<THREE.Texture | null>(null);
  const [ceilingTexture, setCeilingTexture] = useState<THREE.Texture | null>(null);

  // Load textures (sama seperti sebelumnya)
  useEffect(() => {
    const textureManager = TextureManager.getInstance();
    
    const loadTextures = async () => {
      try {
        console.log('🔄 Loading building textures...');
        
        const [floor, wall, ceiling] = await Promise.all([
          textureManager.loadTexture('/textures/WoodFloor040_4K-JPG/WoodFloor040_4K-JPG_Color.jpg', {
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.RepeatWrapping,
            repeat: [8, 8]
          }),
          textureManager.loadTexture('/textures/leather_white_4k.gltf/textures/leather_white_diff_4k.jpg', {
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.RepeatWrapping,
            repeat: [3, 3]
          }),
          textureManager.loadTexture('/textures/OfficeCeiling005_4K-JPG/OfficeCeiling005_4K-JPG_Color.jpg', {
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.RepeatWrapping,
            repeat: [6, 6]
          })
        ]);

        setFloorTexture(floor);
        setWallTexture(wall);
        setCeilingTexture(ceiling);

      } catch (error) {
        console.error('❌ Failed to load textures:', error);
      }
    };

    loadTextures();
  }, []);

  // Materials (sama seperti sebelumnya)
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
      roughness: 0.6,
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
      <RigidBody type="fixed">
        <Plane 
          args={[60, 60]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, 0, 0]}
        >
          <primitive object={materials.floor} />
        </Plane>
      </RigidBody>

      {/* Floors and Ceilings */}
      {[1, 2, 3].map((floorLevel) => {
        const floorY = (floorLevel - 1) * 6;
        const ceilingY = floorLevel * 6 - 0.5;
        
        return (
          <group key={`floor-${floorLevel}`}>
            <RigidBody type="fixed">
              <Box args={[58, 0.5, 58]} position={[0, floorY, 0]}>
                <primitive object={materials.floor} />
              </Box>
            </RigidBody>

            <RigidBody type="fixed">
              <Box args={[58, 0.3, 58]} position={[0, ceilingY, 0]}>
                <primitive object={materials.ceiling} />
              </Box>
            </RigidBody>

            <Plane
              args={[58, 58]}
              rotation={[Math.PI / 2, 0, 0]}
              position={[0, ceilingY + 0.1, 0]}
            >
              <primitive object={materials.ceiling} />
            </Plane>
          </group>
        );
      })}

      {/* Solid Outer Walls */}
      <RigidBody type="fixed" colliders="cuboid">
        <Box args={[60, 30, 2]} position={[0, 15, -31]}>
          <primitive object={materials.wall} />
        </Box>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <Box args={[60, 30, 2]} position={[0, 15, 31]}>
          <primitive object={materials.wall} />
        </Box>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <Box args={[2, 30, 60]} position={[-31, 15, 0]}>
          <primitive object={materials.wall} />
        </Box>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <Box args={[2, 30, 60]} position={[31, 15, 0]}>
          <primitive object={materials.wall} />
        </Box>
      </RigidBody>

      {/* Museum Entrance */}
      <RigidBody type="fixed">
        <Box args={[12, 8, 1]} position={[0, 4, -30.5]}>
          <meshStandardMaterial color="#8b4513" roughness={0.8} metalness={0.2} />
        </Box>
      </RigidBody>

      {/* MODERN BENCHES - Updated */}
      {[1, 2, 3].map((floor) => {
        const y = (floor - 1) * 6 + 0.25;
        return (
          <group key={`benches-floor-${floor}`}>
            <Bench position={[-8, y, -12]} rotation={[0, 0, 0]} />
            <Bench position={[8, y, -12]} rotation={[0, Math.PI, 0]} />
            <Bench position={[-8, y, 12]} rotation={[0, 0, 0]} />
            <Bench position={[8, y, 12]} rotation={[0, Math.PI, 0]} />
            <Bench position={[-18, y, 0]} rotation={[0, Math.PI / 2, 0]} />
            <Bench position={[18, y, 0]} rotation={[0, -Math.PI / 2, 0]} />
            
            {/* Center seating area */}
            <Bench position={[0, y, -8]} rotation={[0, 0, 0]} />
            <Bench position={[0, y, 8]} rotation={[0, Math.PI, 0]} />
          </group>
        );
      })}

      {/* MODERN CEILING LAMPS - Updated */}
      {[1, 2, 3].map((floor) => {
        const y = floor * 6 - 1.5;
        return (
          <group key={`lamps-floor-${floor}`}>
            {[-12, 0, 12].map((x) =>
              [-12, 0, 12].map((z) => (
                <CeilingLamp
                  key={`lamp-${floor}-${x}-${z}`}
                  position={[x, y, z]}
                  lightIntensity={1.2}
                  lightColor="#fff8dc"
                />
              ))
            )}
            
            {/* Additional lighting for better coverage */}
            <CeilingLamp position={[-6, y, -6]} lightIntensity={0.8} />
            <CeilingLamp position={[6, y, 6]} lightIntensity={0.8} />
            <CeilingLamp position={[-6, y, 6]} lightIntensity={0.8} />
            <CeilingLamp position={[6, y, -6]} lightIntensity={0.8} />
          </group>
        );
      })}

      {/* APHRODITE STATUES - Updated */}
      {[1, 2, 3].map((floor) => {
        const y = (floor - 1) * 6 + 0.25;
        return (
          <group key={`statues-floor-${floor}`}>
            {/* Main centerpiece */}
            <Statue
              position={[0, y, 0]}
              rotation={[0, 0, 0]}
              scale={[1.2, 1.2, 1.2]}
              title={`Aphrodite Kallipygos - Floor ${floor}`}
              description="Ancient Greek statue representing beauty and grace, now protecting our batik collection"
            />
            
            {/* Corner statues */}
            <Statue
              position={[-22, y, -22]}
              rotation={[0, Math.PI / 4, 0]}
              scale={[0.8, 0.8, 0.8]}
              title="Guardian of Heritage"
              description="Ancient guardian watching over Indonesian cultural treasures"
            />
            
            <Statue
              position={[22, y, 22]}
              rotation={[0, -Math.PI / 4, 0]}
              scale={[0.8, 0.8, 0.8]}
              title="Muse of Arts"
              description="Inspiring creativity and preserving artistic traditions"
            />
            
            {/* Gallery entrance statues */}
            <Statue
              position={[-25, y, 0]}
              rotation={[0, Math.PI / 2, 0]}
              scale={[0.7, 0.7, 0.7]}
              title="Welcome Guardian"
              description="Welcoming visitors to the batik gallery"
            />
            
            <Statue
              position={[25, y, 0]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[0.7, 0.7, 0.7]}
              title="Cultural Sentinel"
              description="Protecting the legacy of Indonesian batik art"
            />
          </group>
        );
      })}

      {/* WOODEN PICTURE FRAMES - New Addition */}
      {[1, 2, 3].map((floor) => {
        const y = (floor - 1) * 6 + 2.5; // Wall height
        return (
          <group key={`frames-floor-${floor}`}>
            {/* Left wall frames */}
            {[-20, -10, 0, 10, 20].map((z, index) => (
              <PictureFrame
                key={`left-frame-${floor}-${index}`}
                position={[-29, y, z]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[0.8, 0.8, 0.8]}
              />
            ))}
            
            {/* Right wall frames */}
            {[-20, -10, 0, 10, 20].map((z, index) => (
              <PictureFrame
                key={`right-frame-${floor}-${index}`}
                position={[29, y, z]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={[0.8, 0.8, 0.8]}
              />
            ))}
            
            {/* Back wall frames */}
            {[-15, -5, 5, 15].map((x, index) => (
              <PictureFrame
                key={`back-frame-${floor}-${index}`}
                position={[x, y, 29]}
                rotation={[0, Math.PI, 0]}
                scale={[0.8, 0.8, 0.8]}
              />
            ))}
          </group>
        );
      })}

      {/* Interior Walls */}
      {[1, 2, 3].map((floorLevel) => {
        const wallY = (floorLevel - 1) * 6 + 3;
        return (
          <group key={`interior-walls-${floorLevel}`}>
            <RigidBody type="fixed" colliders="cuboid">
              <Box args={[40, 5, 1]} position={[0, wallY, -15]}>
                <primitive object={materials.wall} />
              </Box>
            </RigidBody>

            <RigidBody type="fixed" colliders="cuboid">
              <Box args={[40, 5, 1]} position={[0, wallY, 15]}>
                <primitive object={materials.wall} />
              </Box>
            </RigidBody>
          </group>
        );
      })}

      {/* Floor Indicators */}
      {[1, 2, 3].map((floorLevel) => (
        <RigidBody key={`indicator-${floorLevel}`} type="fixed">
          <Box args={[3, 3, 0.5]} position={[-27, (floorLevel - 1) * 6 + 1.5, 0]}>
            <meshStandardMaterial 
              color="#ffd700"
              emissive="#ffaa00"
              emissiveIntensity={0.3}
            />
          </Box>
        </RigidBody>
      ))}
    </group>
  );
}