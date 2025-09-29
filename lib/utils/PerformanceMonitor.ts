// lib/utils/PerformanceMonitor.ts (Fixed)
'use client';

import * as THREE from 'three';

interface PerformanceMetrics {
  fps: number;
  memory: number;
  drawCalls: number;
  triangles: number;
  textures: number;
}

// Extend Performance interface for Chrome's memory API
interface ExtendedPerformance extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics = {
    fps: 0,
    memory: 0,
    drawCalls: 0,
    triangles: 0,
    textures: 0,
  };
  private callbacks: ((metrics: PerformanceMetrics) => void)[] = [];
  private lastTime = 0;
  private frameCount = 0;

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  updateMetrics(renderer: THREE.WebGLRenderer) {
    const now = performance.now();
    this.frameCount++;

    // Update FPS every second
    if (now - this.lastTime >= 1000) {
      this.metrics.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
      this.frameCount = 0;
      this.lastTime = now;
    }

    // Update renderer info
    if (renderer && renderer.info) {
      this.metrics.drawCalls = renderer.info.render.calls;
      this.metrics.triangles = renderer.info.render.triangles;
    }

    // Memory usage (approximate) - Fixed type assertion
    const extendedPerf = performance as ExtendedPerformance;
    if (extendedPerf.memory) {
      this.metrics.memory = Math.round(extendedPerf.memory.usedJSHeapSize / 1024 / 1024);
    }

    // Notify callbacks
    this.callbacks.forEach(callback => callback(this.metrics));
  }

  subscribe(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) this.callbacks.splice(index, 1);
    };
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  getQualityRecommendation(): 'low' | 'medium' | 'high' {
    if (this.metrics.fps < 30 || this.metrics.memory > 500) return 'low';
    if (this.metrics.fps < 50 || this.metrics.memory > 300) return 'medium';
    return 'high';
  }
}