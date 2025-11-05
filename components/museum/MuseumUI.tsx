// components/museum/MuseumUI.tsx (Simplified - Remove Tutorial & Audio)
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Settings, 
  Map, 
  Search,
  Bookmark,
  BarChart3,
  Eye,
  EyeOff
} from 'lucide-react';
import { useMuseumStore } from '@/lib/stores/museumStore';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { BatikDetailModal } from './BatikDetailModal';
import { Minimap } from './Minimap';
import { FloorTransition } from './FloorTransition';
import { PerformanceMonitor } from '@/lib/utils/PerformanceMonitor';

interface PerformanceStats {
  fps: number;
  memory: number;
  drawCalls: number;
  triangles: number;
  textures: number;
}

export function MuseumUI() {
  const { 
    currentFloor, 
    selectedBatik, 
    setSelectedBatik,
    getBatiksByFloor,
    getTotalBatiks,
    showMinimap,
    toggleMinimap,
    showPerformanceStats,
    togglePerformanceStats,
    searchQuery,
    setSearchQuery,
    bookmarkedBatiks,
    quality
  } = useMuseumStore();
  
  const { currentLanguage } = useLanguage();
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [performanceStats, setPerformanceStats] = useState<PerformanceStats>({
    fps: 0,
    memory: 0,
    drawCalls: 0,
    triangles: 0,
    textures: 0
  });
  
  const isIndonesian = currentLanguage.code === 'id';
  const currentFloorBatiks = getBatiksByFloor(currentFloor);
  const totalBatiks = getTotalBatiks();

  // Performance monitoring
  useEffect(() => {
    const monitor = PerformanceMonitor.getInstance();
    const unsubscribe = monitor.subscribe((metrics) => {
      setPerformanceStats(metrics);
    });

    return unsubscribe;
  }, []);

  const handleExitMuseum = () => {
    if (window.confirm(isIndonesian ? 'Keluar dari museum?' : 'Exit museum?')) {
      window.location.href = '/gallery';
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-4 left-4 right-4 z-30 flex items-center justify-between">
        {/* Museum Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/70 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-amber-500"
        >
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🏛️</div>
            <div>
              <div className="text-white font-bold text-lg">
                {isIndonesian ? 'Museum Batik Digital' : 'Digital Batik Museum'}
              </div>
              <div className="text-amber-300 text-sm">
                {isIndonesian ? `Lantai ${currentFloor}` : `Floor ${currentFloor}`} • 
                <span className="ml-1">
                  {currentFloorBatiks.length} {isIndonesian ? 'koleksi' : 'collections'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          {/* Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`p-3 rounded-lg transition-colors ${
              showSearch ? 'bg-blue-600' : 'bg-black/70 hover:bg-black/80'
            } text-white border border-amber-500`}
            title={isIndonesian ? 'Cari Batik' : 'Search Batik'}
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Minimap Toggle */}
          <button
            onClick={toggleMinimap}
            className={`p-3 rounded-lg transition-colors ${
              showMinimap ? 'bg-blue-600' : 'bg-black/70 hover:bg-black/80'
            } text-white border border-amber-500`}
            title={isIndonesian ? 'Minimap' : 'Minimap'}
          >
            <Map className="w-5 h-5" />
          </button>

          {/* Settings */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-3 bg-black/70 hover:bg-black/80 text-white rounded-lg transition-colors border border-amber-500"
            title={isIndonesian ? 'Pengaturan' : 'Settings'}
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Exit */}
          <button
            onClick={handleExitMuseum}
            className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            title={isIndonesian ? 'Keluar Museum' : 'Exit Museum'}
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Search Panel */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-30"
          >
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-amber-500 max-w-md mx-auto">
              <div className="flex items-center space-x-3 mb-3">
                <Search className="w-5 h-5 text-amber-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isIndonesian ? 'Cari batik...' : 'Search batik...'}
                  className="flex-1 bg-transparent text-white placeholder-amber-300 outline-none"
                  autoFocus
                />
              </div>
              
              {searchQuery && (
                <div className="text-amber-300 text-sm">
                  {isIndonesian ? 'Tekan Enter untuk mencari di museum' : 'Press Enter to search in museum'}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-20 right-4 z-30 w-80"
          >
            <div className="bg-black/90 backdrop-blur-sm rounded-lg border border-amber-500 overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-amber-900/50">
                <h3 className="text-white font-semibold flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  {isIndonesian ? 'Pengaturan' : 'Settings'}
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-amber-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Performance Stats Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-amber-300 text-sm">
                    {isIndonesian ? 'Statistik Performa' : 'Performance Stats'}
                  </span>
                  <button
                    onClick={togglePerformanceStats}
                    className={`p-2 rounded transition-colors ${
                      showPerformanceStats ? 'bg-green-600' : 'bg-gray-600'
                    }`}
                  >
                    {showPerformanceStats ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>

                {/* Bookmarks */}
                <div className="flex items-center justify-between">
                  <span className="text-amber-300 text-sm">
                    {isIndonesian ? 'Bookmark Tersimpan' : 'Saved Bookmarks'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Bookmark className="w-4 h-4 text-amber-400" />
                    <span className="text-white">{bookmarkedBatiks.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Performance Stats */}
      <AnimatePresence>
        {showPerformanceStats && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed bottom-4 left-4 z-30"
          >
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-amber-500 text-xs">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300 font-semibold">Performance</span>
              </div>
              <div className="space-y-1 text-white">
                <div className="flex justify-between">
                  <span>FPS:</span>
                  <span className={performanceStats.fps < 30 ? 'text-red-400' : 'text-green-400'}>
                    {performanceStats.fps}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Memory:</span>
                  <span>{performanceStats.memory}MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Quality:</span>
                  <span className="capitalize text-amber-300">{quality}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floor Stats */}
      <div className="fixed bottom-4 right-4 z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/70 backdrop-blur-sm rounded-lg p-4 border border-amber-500"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400 mb-1">
              {currentFloorBatiks.length}
            </div>
            <div className="text-amber-300 text-sm mb-2">
              {isIndonesian ? 'Koleksi Lantai Ini' : 'Floor Collections'}
            </div>
            <div className="text-xs text-gray-300">
              {isIndonesian ? `Total: ${totalBatiks} batik` : `Total: ${totalBatiks} batiks`}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Keyboard Hints */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-amber-500"
        >
          <div className="text-white text-center text-sm">
            <div className="font-semibold text-amber-300 mb-2">
              {isIndonesian ? 'Kontrol Cepat' : 'Quick Controls'}
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-amber-400">WASD:</span> {isIndonesian ? 'Bergerak' : 'Move'}
              </div>
              <div>
                <span className="text-amber-400">1-3:</span> {isIndonesian ? 'Lantai' : 'Floors'}
              </div>
              <div>
                <span className="text-amber-400">M:</span> {isIndonesian ? 'Minimap' : 'Minimap'}
              </div>
              <div>
                <span className="text-amber-400">ESC:</span> {isIndonesian ? 'Lepas Mouse' : 'Release Mouse'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Components */}
      {showMinimap && <Minimap />}
      <FloorTransition />

      {/* Batik Detail Modal */}
      <AnimatePresence>
        {selectedBatik && (
          <BatikDetailModal
            batik={selectedBatik}
            onClose={() => setSelectedBatik(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}