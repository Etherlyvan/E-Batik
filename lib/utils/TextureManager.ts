// lib/utils/TextureManager.ts (Updated)
import { Texture, TextureLoader, LinearFilter, LinearMipmapLinearFilter } from 'three';
import * as THREE from 'three';

interface TextureOptions {
  wrapS?: THREE.Wrapping;
  wrapT?: THREE.Wrapping;
  repeat?: [number, number];
  quality?: 'low' | 'medium' | 'high';
}

interface CachedTexture {
  texture: Texture;
  lastUsed: number;
  references: number;
}

class TextureManager {
  private static instance: TextureManager;
  private textureCache: Map<string, CachedTexture> = new Map();
  private loader: TextureLoader = new TextureLoader();
  private loadingPromises: Map<string, Promise<Texture | null>> = new Map();
  private maxCacheSize = 100;
  private maxMemoryMB = 200;
  private currentMemoryMB = 0;

  static getInstance(): TextureManager {
    if (!TextureManager.instance) {
      TextureManager.instance = new TextureManager();
    }
    return TextureManager.instance;
  }

  async loadTexture(url: string, options: TextureOptions = {}): Promise<Texture | null> {
    if (!url) return null;

    const cacheKey = `${url}_${JSON.stringify(options)}`;
    
    // Return cached texture
    const cached = this.textureCache.get(cacheKey);
    if (cached) {
      cached.lastUsed = Date.now();
      cached.references++;
      return cached.texture;
    }

    // Return existing loading promise
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey)!;
    }

    // Create new loading promise
    const loadingPromise = this.createLoadingPromise(url, options, cacheKey);
    this.loadingPromises.set(cacheKey, loadingPromise);

    return loadingPromise;
  }

  private async createLoadingPromise(
    url: string, 
    options: TextureOptions, 
    cacheKey: string
  ): Promise<Texture | null> {
    return new Promise((resolve) => {
      // Check memory before loading
      if (this.currentMemoryMB > this.maxMemoryMB) {
        this.cleanupOldTextures();
      }

      this.loader.load(
        url,
        (texture) => {
          try {
            this.configureTexture(texture, options);
            
            // Estimate texture memory usage
            const memoryMB = this.estimateTextureMemory(texture);
            this.currentMemoryMB += memoryMB;

            // Cache the texture
            this.textureCache.set(cacheKey, {
              texture,
              lastUsed: Date.now(),
              references: 1
            });

            this.loadingPromises.delete(cacheKey);
            resolve(texture);
          } catch (error) {
            console.error('Error configuring texture:', error);
            this.loadingPromises.delete(cacheKey);
            resolve(null);
          }
        },
        undefined,
        (error) => {
          console.error('Failed to load texture:', url, error);
          this.loadingPromises.delete(cacheKey);
          resolve(null);
        }
      );
    });
  }

  private configureTexture(texture: Texture, options: TextureOptions) {
    // Apply options
    if (options.wrapS) texture.wrapS = options.wrapS;
    if (options.wrapT) texture.wrapT = options.wrapT;
    if (options.repeat) texture.repeat.set(options.repeat[0], options.repeat[1]);

    // Quality settings
    const quality = options.quality || 'medium';
    switch (quality) {
      case 'low':
        texture.minFilter = LinearFilter;
        texture.magFilter = LinearFilter;
        texture.generateMipmaps = false;
        break;
      case 'medium':
        texture.minFilter = LinearMipmapLinearFilter;
        texture.magFilter = LinearFilter;
        texture.generateMipmaps = true;
        break;
      case 'high':
        texture.minFilter = LinearMipmapLinearFilter;
        texture.magFilter = LinearFilter;
        texture.generateMipmaps = true;
        texture.anisotropy = 4;
        break;
    }

    texture.flipY = false;
    texture.needsUpdate = true;
  }

  private estimateTextureMemory(texture: Texture): number {
    const image = texture.image;
    if (!image) return 0;
    
    const width = image.width || 512;
    const height = image.height || 512;
    const bytesPerPixel = 4; // RGBA
    
    return (width * height * bytesPerPixel) / (1024 * 1024); // MB
  }

  private cleanupOldTextures() {
    const entries = Array.from(this.textureCache.entries());
    entries.sort((a, b) => a[1].lastUsed - b[1].lastUsed);

    // Remove oldest textures until memory is under limit
    for (const [key, cached] of entries) {
      if (this.currentMemoryMB <= this.maxMemoryMB * 0.8) break;
      if (cached.references <= 0) {
        this.disposeTexture(key);
      }
    }
  }

  releaseTexture(url: string, options: TextureOptions = {}) {
    const cacheKey = `${url}_${JSON.stringify(options)}`;
    const cached = this.textureCache.get(cacheKey);
    if (cached) {
      cached.references = Math.max(0, cached.references - 1);
    }
  }

  private disposeTexture(cacheKey: string) {
    const cached = this.textureCache.get(cacheKey);
    if (cached) {
      cached.texture.dispose();
      this.currentMemoryMB -= this.estimateTextureMemory(cached.texture);
      this.textureCache.delete(cacheKey);
    }
  }

  disposeAll() {
    this.textureCache.forEach((cached, key) => {
      cached.texture.dispose();
    });
    this.textureCache.clear();
    this.loadingPromises.clear();
    this.currentMemoryMB = 0;
  }

  getStats() {
    return {
      cachedTextures: this.textureCache.size,
      memoryUsageMB: this.currentMemoryMB,
      loadingTextures: this.loadingPromises.size,
    };
  }
}

export { TextureManager };