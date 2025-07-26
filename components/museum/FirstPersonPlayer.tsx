// components/museum/FirstPersonPlayer.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { Vector3, Euler } from 'three';

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
  
  // Player rotation state
  const rotationRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, z: 0 });
  
  // Movement parameters
  const moveSpeed = 10;
  const sprintMultiplier = 2.0;
  const mouseSensitivity = 0.002;
  const maxVerticalAngle = Math.PI / 2.2;

  // Mouse movement controls
  useEffect(() => {
    if (viewMode !== 'fps') return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!isPointerLocked) return;

      const { movementX, movementY } = event;
      
      // Mouse movement mapping
      rotationRef.current.y -= movementX * mouseSensitivity; // Horizontal (left/right)
      rotationRef.current.x -= movementY * mouseSensitivity; // Vertical (up/down)
      
      // Clamp vertical rotation
      rotationRef.current.x = Math.max(
        -maxVerticalAngle, 
        Math.min(maxVerticalAngle, rotationRef.current.x)
      );
      
      // Apply rotation to camera
      camera.rotation.order = 'YXZ';
      camera.rotation.x = rotationRef.current.x;
      camera.rotation.y = rotationRef.current.y;
      camera.rotation.z = 0;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Floor switching
      if (event.key === 'E' || event.key === 'e') {
        event.preventDefault();
        switchFloor(1);
      }
      if (event.key === 'Q' || event.key === 'q') {
        event.preventDefault();
        switchFloor(-1);
      }
      // Reset position
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

  // Floor switching
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
      
      // Reset rotation
      rotationRef.current = { x: 0, y: 0 };
      camera.rotation.set(0, 0, 0);
    }
  };

  // FIXED: WASD Movement System - Standar Game Controls
  useFrame((state, delta) => {
    if (viewMode !== 'fps' || !playerRef.current) return;

    const { forward, back, left, right, run } = get();
    
    const currentPos = playerRef.current.translation();
    const currentVel = playerRef.current.linvel();
    
    // Boundary check
    if (Math.abs(currentPos.x) > 23 || Math.abs(currentPos.z) > 13 || currentPos.y < -5) {
      resetPlayerPosition();
      return;
    }
    
    // FIXED: Movement direction calculation - Standard FPS controls
    const direction = new Vector3(0, 0, 0);
    
    // W = Forward (negative Z in local space)
    if (forward) direction.z -= 1;
    // S = Backward (positive Z in local space)  
    if (back) direction.z += 1;
    // A = Left (negative X in local space)
    if (left) direction.x -= 1;
    // D = Right (positive X in local space)
    if (right) direction.x += 1;
    
    if (direction.length() > 0) {
      direction.normalize();
      
      // Apply camera Y rotation to movement direction
      const yRotation = rotationRef.current.y;
      const rotatedDirection = new Vector3();
      
      // Standard FPS rotation matrix
      rotatedDirection.x = direction.x * Math.cos(yRotation) - direction.z * Math.sin(yRotation);
      rotatedDirection.z = direction.x * Math.sin(yRotation) + direction.z * Math.cos(yRotation);
      rotatedDirection.y = 0; // No vertical movement from WASD
      
      direction.copy(rotatedDirection);
    }
    
    // Calculate speed
    const currentSpeed = run ? moveSpeed * sprintMultiplier : moveSpeed;
    
    // Apply movement
    const targetVelocityX = direction.x * currentSpeed;
    const targetVelocityZ = direction.z * currentSpeed;
    
    // Smooth velocity interpolation
    const dampingFactor = 12;
    velocityRef.current.x = lerp(velocityRef.current.x, targetVelocityX, delta * dampingFactor);
    velocityRef.current.z = lerp(velocityRef.current.z, targetVelocityZ, delta * dampingFactor);
    
    // Apply velocity to physics body
    playerRef.current.setLinvel({
      x: velocityRef.current.x,
      y: currentVel.y, // Keep gravity
      z: velocityRef.current.z
    }, true);
    
    // Update camera position to follow player
    const cameraOffset = new Vector3(0, 0.6, 0);
    const newCameraPos = new Vector3(currentPos.x, currentPos.y, currentPos.z).add(cameraOffset);
    camera.position.lerp(newCameraPos, delta * 20);
  });

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  // Initialize camera position
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