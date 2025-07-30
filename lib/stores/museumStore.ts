// lib/stores/museumStore.ts
import { create } from 'zustand';
import type { Batik } from '@/lib/types';

interface MuseumState {
  // Core museum state
  currentFloor: number;
  selectedBatik: Batik | null;
  batiks: Batik[];
  isViewingBatik: boolean;
  floorBatiks: Record<number, Batik[]>;
  totalFloors: number;
  
  // UI state
  showMinimap: boolean;
  showPerformanceStats: boolean;
  searchQuery: string;
  bookmarkedBatiks: number[];
  quality: 'low' | 'medium' | 'high';
  
  // Camera state
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  isTransitioning: boolean;
  
  // Loading state
  loading: boolean;
  loadingProgress: number;
  
  // Actions
  setCurrentFloor: (floor: number) => void;
  setSelectedBatik: (batik: Batik | null) => void;
  setBatiks: (batiks: Batik[]) => void;
  setIsViewingBatik: (viewing: boolean) => void;
  getBatiksByFloor: (floor: number) => Batik[];
  getTotalBatiks: () => number;
  getFloorStats: () => Record<number, number>;
  
  // UI actions
  toggleMinimap: () => void;
  togglePerformanceStats: () => void;
  setSearchQuery: (query: string) => void;
  toggleBookmark: (batikId: number) => void;
  setQuality: (quality: 'low' | 'medium' | 'high') => void;
  
  // Camera actions
  setCameraPosition: (position: [number, number, number]) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  setTransitioning: (transitioning: boolean) => void;
  
  // Loading actions
  setLoading: (loading: boolean, progress?: number) => void;
}

export const useMuseumStore = create<MuseumState>((set, get) => ({
  // Core museum state
  currentFloor: 1,
  selectedBatik: null,
  batiks: [],
  isViewingBatik: false,
  floorBatiks: {},
  totalFloors: 3,
  
  // UI state
  showMinimap: false,
  showPerformanceStats: false,
  searchQuery: '',
  bookmarkedBatiks: [],
  quality: 'medium',
  
  // Camera state
  cameraPosition: [0, 2, 15],
  cameraTarget: [0, 0, 0],
  isTransitioning: false,
  
  // Loading state
  loading: false,
  loadingProgress: 0,

  // Core actions
  setCurrentFloor: (floor) => {
        const state = get();
        
        // Validate floor number
        if (floor < 1 || floor > state.totalFloors || floor === state.currentFloor) {
            console.log(`🏢 Invalid floor change: current=${state.currentFloor}, requested=${floor}`);
            return;
        }

        console.log(`🏢 Changing floor: ${state.currentFloor} → ${floor}`);
        
        // Simple state update - tidak perlu timer di sini
        set({ 
            currentFloor: floor,
            cameraPosition: [0, (floor - 1) * 6 + 2, 15],
            isTransitioning: true
        });
        
        // Reset transitioning setelah delay singkat
        setTimeout(() => {
            set({ isTransitioning: false });
        }, 500);
    },
  
  setSelectedBatik: (batik) => set({ 
    selectedBatik: batik,
    isViewingBatik: !!batik 
  }),
  
  setBatiks: (batiks) => {
    if (!batiks || batiks.length === 0) {
      set({ 
        batiks: [], 
        floorBatiks: {},
        totalFloors: 3
      });
      return;
    }

    const floorBatiks: Record<number, Batik[]> = {};
    const batiksPerFloor = 20;
    const calculatedFloors = Math.max(3, Math.ceil(batiks.length / batiksPerFloor));
    
    // Initialize all floors
    for (let i = 1; i <= calculatedFloors; i++) {
      floorBatiks[i] = [];
    }
    
    // Distribute batiks evenly across floors
    batiks.forEach((batik, index) => {
      const floor = Math.floor(index / batiksPerFloor) + 1;
      if (floorBatiks[floor]) {
        floorBatiks[floor].push(batik);
      }
    });
    
    set({ 
      batiks, 
      floorBatiks,
      totalFloors: calculatedFloors
    });
  },
  
  setIsViewingBatik: (viewing) => set({ isViewingBatik: viewing }),
  
  getBatiksByFloor: (floor) => {
    const state = get();
    return state.floorBatiks[floor] || [];
  },

  getTotalBatiks: () => {
    const state = get();
    return state.batiks.length;
  },

  getFloorStats: () => {
    const state = get();
    const stats: Record<number, number> = {};
    Object.keys(state.floorBatiks).forEach(floor => {
      const floorNum = parseInt(floor);
      stats[floorNum] = state.floorBatiks[floorNum]?.length || 0;
    });
    return stats;
  },

  // UI actions
  toggleMinimap: () => set(state => ({ showMinimap: !state.showMinimap })),
  togglePerformanceStats: () => set(state => ({ showPerformanceStats: !state.showPerformanceStats })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleBookmark: (batikId) => set(state => ({
    bookmarkedBatiks: state.bookmarkedBatiks.includes(batikId)
      ? state.bookmarkedBatiks.filter(id => id !== batikId)
      : [...state.bookmarkedBatiks, batikId]
  })),
  setQuality: (quality) => set({ quality }),

  // Camera actions
  setCameraPosition: (position) => set({ cameraPosition: position }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),

  // Loading actions
  setLoading: (loading, progress = 0) => set({ loading, loadingProgress: progress }),
}));