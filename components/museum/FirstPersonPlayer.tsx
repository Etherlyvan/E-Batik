// components/museum/FirstPersonPlayer.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { Vector3, Box3 } from 'three';

interface FirstPersonPlayerProps {
  viewMode: 'fps' | 'orbit';
  isPointerLocked: boolean;
  onFloorChange: (floor: number) => void;
  currentFloor: number;
}

export function FirstPersonPlayer({ 
  viewMode, 
  isPointerLocked, 
  onFloorChange,
  currentFloor 
}: FirstPersonPlayerProps) {
  const { camera } = useThree();
  
  const playerRef = useRef<any>(null);
  const [, get] = useKeyboardControls();
  
  // Player state (similar to reference)
  const rotationRef = useRef({ x: 0, y: 0 });
  
  // Movement parameters (based on reference)
  const moveSpeed = 5;
  const sprintMultiplier = 1.5;
  const mouseSensitivity = 0.002;
  const maxVerticalAngle = Math.PI / 2.2;

  // Mouse controls (similar to reference eventListeners.js)
  useEffect(() => {
    if (viewMode !== 'fps') return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!isPointerLocked) return;

      const { movementX, movementY } = event;
      
      rotationRef.current.y -= movementX * mouseSensitivity;
      rotationRef.current.x -= movementY * mouseSensitivity;
      
      rotationRef.current.x = Math.max(
        -maxVerticalAngle, 
        Math.min(maxVerticalAngle, rotationRef.current.x)
      );
      
      camera.rotation.order = 'YXZ';
      camera.rotation.x = rotationRef.current.x;
      camera.rotation.y = rotationRef.current.y;
      camera.rotation.z = 0;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Floor switching (like reference)
      if (event.key === 'E' || event.key === 'e') {
        event.preventDefault();
        switchFloor(1);
      }
      if (event.key === 'Q' || event.key === 'q') {
        event.preventDefault();
        switchFloor(-1);
      }
      if (event.key === 'R' || event.key === 'r') {
        event.preventDefault();
        resetPlayerPosition();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [viewMode, isPointerLocked, camera]);

  const switchFloor = (direction: number) => {
    const maxFloors = 5;
    const newFloor = Math.max(0, Math.min(maxFloors - 1, currentFloor + direction));
    
    if (newFloor !== currentFloor && playerRef.current) {
      const newY = 1.6 + (newFloor * 12);
      playerRef.current.setTranslation({ x: 0, y: newY, z: 0 }, true);
      playerRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      onFloorChange(newFloor);
    }
  };

  const resetPlayerPosition = () => {
    if (playerRef.current) {
      const currentY = 1.6 + (currentFloor * 12);
      playerRef.current.setTranslation({ x: 0, y: currentY, z: 0 }, true);
      playerRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      
      rotationRef.current = { x: 0, y: 0 };
      camera.rotation.set(0, 0, 0);
    }
  };

  // Movement system (based on reference movement.js)
  useFrame((state, delta) => {
    if (viewMode !== 'fps' || !playerRef.current) return;

    const { forward, back, left, right, run } = get();
    
    const currentPos = playerRef.current.translation();
    const currentVel = playerRef.current.linvel();
    
    // Boundary check (similar to reference collision detection)
    if (Math.abs(currentPos.x) > 18 || Math.abs(currentPos.z) > 18 || currentPos.y < -5) {
      resetPlayerPosition();
      return;
    }
    
    // Movement calculation (based on reference)
    const moveSpeedDelta = (run ? moveSpeed * sprintMultiplier : moveSpeed) * delta;
    
    let moveX = 0;
    let moveZ = 0;
    
    // WASD mapping (like reference keysPressed)
    if (forward) moveZ = -1; // W
    if (back) moveZ = 1;     // S  
    if (left) moveX = -1;    // A
    if (right) moveX = 1;    // D
    
    // Normalize diagonal movement
    if (moveX !== 0 && moveZ !== 0) {
      const length = Math.sqrt(moveX * moveX + moveZ * moveZ);
      moveX /= length;
      moveZ /= length;
    }
    
    if (moveX !== 0 || moveZ !== 0) {
      // Transform movement based on camera rotation (like reference)
      const yaw = rotationRef.current.y;
      
      const worldMoveX = moveX * Math.cos(yaw) - moveZ * Math.sin(yaw);
      const worldMoveZ = moveX * Math.sin(yaw) + moveZ * Math.cos(yaw);
      
      // Apply movement
      playerRef.current.setLinvel({
        x: worldMoveX * moveSpeedDelta * 60, // Scale for physics
        y: currentVel.y,
        z: worldMoveZ * moveSpeedDelta * 60
      }, true);
    } else {
      // Stop horizontal movement
      playerRef.current.setLinvel({
        x: 0,
        y: currentVel.y,
        z: 0
      }, true);
    }
    
    // Update camera position (smooth follow)
    const targetCameraPos = new Vector3(
      currentPos.x, 
      currentPos.y + 0.6, 
      currentPos.z
    );
    
    camera.position.lerp(targetCameraPos, delta * 20);
  });

  // Initialize camera
  useEffect(() => {
    if (viewMode === 'fps') {
      const initialY = 1.6 + (currentFloor * 12);
      camera.position.set(0, initialY, 0);
      camera.rotation.order = 'YXZ';
      rotationRef.current = { x: 0, y: 0 };
      camera.rotation.set(0, 0, 0);
    }
  }, [viewMode, camera, currentFloor]);

  if (viewMode !== 'fps') return null;

  return (
    <RigidBody
      ref={playerRef}
      type="dynamic"
      position={[0, 1.6 + (currentFloor * 12), 0]}
      enabledRotations={[false, false, false]}
      lockRotations
      mass={1}
      friction={0.8}
      restitution={0}
    >
      <CapsuleCollider args={[0.8, 0.4]} />
    </RigidBody>
  );
}