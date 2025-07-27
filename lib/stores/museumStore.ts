// lib/stores/museumStore.ts
import { create } from 'zustand';
import type { Batik } from '@/lib/types';

interface MuseumState {
  currentFloor: number;
  selectedBatik: Batik | null;
  batiks: Batik[];
  isViewingBatik: boolean;
  floorBatiks: Record<number, Batik[]>;
  totalFloors: number;
  
  setCurrentFloor: (floor: number) => void;
  setSelectedBatik: (batik: Batik | null) => void;
  setBatiks: (batiks: Batik[]) => void;
  setIsViewingBatik: (viewing: boolean) => void;
  getBatiksByFloor: (floor: number) => Batik[];
  getTotalBatiks: () => number;
  getFloorStats: () => Record<number, number>;
}

export const useMuseumStore = create<MuseumState>((set, get) => ({
  currentFloor: 1,
  selectedBatik: null,
  batiks: [],
  isViewingBatik: false,
  floorBatiks: {},
  totalFloors: 3,

  setCurrentFloor: (floor) => {
    const state = get();
    if (floor >= 1 && floor <= state.totalFloors) {
      set({ currentFloor: floor });
    }
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
    
    console.log('🏛️ Museum: Distributed batiks across floors:', {
      totalBatiks: batiks.length,
      totalFloors: calculatedFloors,
      distribution: Object.keys(floorBatiks).map(floor => ({
        floor: parseInt(floor),
        count: floorBatiks[parseInt(floor)].length
      }))
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
}));