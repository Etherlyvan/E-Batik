// components/museum/PerformanceOptimizer.tsx (Fixed)
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerformanceMonitor } from '@/lib/utils/PerformanceMonitor';
import * as THREE from 'three';

interface PerformanceOptimizerProps {
  onQualityChange?: (quality: 'low' | 'medium' | 'high') => void;
}

export function PerformanceOptimizer({ onQualityChange }: PerformanceOptimizerProps) {
  const { gl } = useThree();
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [monitor] = useState(() => PerformanceMonitor.getInstance());

  const applyQualitySettings = useCallback((newQuality: 'low' | 'medium' | 'high') => {
    switch (newQuality) {
      case 'low':
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1));
        gl.shadowMap.enabled = false;
        break;
      case 'medium':
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFShadowMap;
        break;
      case 'high':
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
        break;
    }
  }, [gl]);

  useEffect(() => {
    const unsubscribe = monitor.subscribe(() => {
      const recommendedQuality = monitor.getQualityRecommendation();
      
      if (recommendedQuality !== quality) {
        setQuality(recommendedQuality);
        onQualityChange?.(recommendedQuality);
        
        // Apply quality settings to renderer
        applyQualitySettings(recommendedQuality);
      }
    });

    return unsubscribe;
<<<<<<< HEAD
  }, [monitor, quality, onQualityChange, applyQualitySettings]);
=======
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitor, quality, onQualityChange]);

  const applyQualitySettings = (newQuality: 'low' | 'medium' | 'high') => {
    switch (newQuality) {
      case 'low':
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1));
        gl.shadowMap.enabled = false;
        // Note: antialias is read-only, set during context creation
        break;
      case 'medium':
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFShadowMap;
        break;
      case 'high':
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
        // Note: antialias is read-only, set during context creation
        break;
    }
  };
>>>>>>> f4dc652 (feat: japanese translation, virtual gallery, and enhance on pagination)

  useFrame(() => {
    monitor.updateMetrics(gl);
  });

  return null;
}