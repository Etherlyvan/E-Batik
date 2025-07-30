// components/museum/PerformanceOptimizer.tsx (Fixed)
'use client';

import { useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerformanceMonitor } from '@/lib/utils/PerformanceMonitor';
import * as THREE from 'three';

interface PerformanceOptimizerProps {
  onQualityChange?: (quality: 'low' | 'medium' | 'high') => void;
}

export function PerformanceOptimizer({ onQualityChange }: PerformanceOptimizerProps) {
  const { gl, scene } = useThree();
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [monitor] = useState(() => PerformanceMonitor.getInstance());

  useEffect(() => {
    const unsubscribe = monitor.subscribe((metrics: any) => {
      const recommendedQuality = monitor.getQualityRecommendation();
      
      if (recommendedQuality !== quality) {
        setQuality(recommendedQuality);
        onQualityChange?.(recommendedQuality);
        
        // Apply quality settings to renderer
        applyQualitySettings(recommendedQuality);
      }
    });

    return unsubscribe;
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

  useFrame(() => {
    monitor.updateMetrics(gl, scene);
  });

  return null;
}