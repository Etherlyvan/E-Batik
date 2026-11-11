// components/glosarium/GlosariumClient.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Sparkles, Filter, RotateCcw } from 'lucide-react';
import { GlosariumItem, KategoriGlosarium } from '@/lib/types/glosarium';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface GlosariumClientProps {
  initialItems: GlosariumItem[];
}

const KATEGORI_OPTIONS: KategoriGlosarium[] = [
  'Semua',
  'Motif',
  'Teknik',
  'Alat',
  'Bahan',
  'Filosofi & Budaya',
  'Flora & Fauna',
  'Istilah Terkait',
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function GlosariumClient({ initialItems }: GlosariumClientProps) {
  const { currentLanguage } = useLanguage();
  const isIndo = currentLanguage?.code === 'id';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<KategoriGlosarium>('Semua');
  const [selectedAbjad, setSelectedAbjad] = useState<string>('Semua');

  // Filter items based on search query, category, and alphabet
  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.istilah.toLowerCase().includes(q) ||
        item.definisi.toLowerCase().includes(q);

      const matchKategori =
        selectedKategori === 'Semua' || item.kategori === selectedKategori;

      const firstChar = item.abjad?.toUpperCase() || item.istilah.trim().charAt(0).toUpperCase();
      const matchAbjad = selectedAbjad === 'Semua' || firstChar === selectedAbjad;

      return matchQuery && matchKategori && matchAbjad;
    });
  }, [initialItems, searchQuery, selectedKategori, selectedAbjad]);

  // Set of available letters in the current dataset
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    initialItems.forEach((item) => {
      const char = item.abjad?.toUpperCase() || item.istilah.trim().charAt(0).toUpperCase();
      if (char >= 'A' && char <= 'Z') {
        letters.add(char);
      }
    });
    return letters;
  }, [initialItems]);

  // Reset all filters
  const handleReset = () => {
    setSearchQuery('');
    setSelectedKategori('Semua');
    setSelectedAbjad('Semua');
  };

  const getBadgeStyle = (kategori: string) => {
    switch (kategori) {
      case 'Alat':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Bahan':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Teknik':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Motif':
        return 'bg-[#5a2b2b]/10 text-[#5a2b2b] border-[#5a2b2b]/30 font-semibold';
      case 'Filosofi & Budaya':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Flora & Fauna':
        return 'bg-teal-100 text-teal-900 border-teal-300';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Hero / Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5a2b2b]/10 text-[#5a2b2b] text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3">
            <Sparkles className="w-4 h-4 text-[#5a2b2b]" />
            {isIndo ? 'Khazanah Istilah & Budaya' : 'Batik Terms & Culture'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3a2020] tracking-tight">
            {isIndo ? 'Glosarium Batik' : 'Batik Glossary'}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {isIndo
              ? 'Koleksi lengkap istilah, filosofi motif, teknik pembatikan, alat & bahan, serta khazanah warisan budaya batik nusantara.'
              : 'Complete repository of batik terminology, motifs philosophy, crafting techniques, and cultural heritage.'}
          </p>
        </motion.div>

        {/* Filter & Search Bar Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-stone-200 p-4 sm:p-6 mb-8 space-y-5"
        >
          {/* Live Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isIndo
                  ? 'Cari istilah, alat, teknik, atau motif batik (misal: canting, kawung, soga)...'
                  : 'Search terms, tools, techniques, or motifs...'
              }
              className="w-full pl-11 pr-10 py-3 text-stone-900 bg-stone-50/80 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a2b2b]/30 focus:border-[#5a2b2b] transition placeholder:text-stone-400 text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Hapus pencarian"
                className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-600 bg-stone-200 hover:bg-stone-300 rounded-full w-5 h-5 flex items-center justify-center transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Kategori Filters (Pills) */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
              <Filter className="w-3.5 h-3.5" />
              <span>{isIndo ? 'Kategori' : 'Category'}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {KATEGORI_OPTIONS.map((kat) => {
                const isActive = selectedKategori === kat;
                return (
                  <button
                    key={kat}
                    onClick={() => setSelectedKategori(kat)}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition duration-150 ${
                      isActive
                        ? 'bg-[#5a2b2b] text-white shadow-sm'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {kat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Alphabet Bar (A - Z) */}
          <div className="border-t border-stone-100 pt-3">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isIndo ? 'Indeks Abjad (A–Z)' : 'Alphabetical Index'}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
              <button
                onClick={() => setSelectedAbjad('Semua')}
                className={`px-3 py-1 text-xs rounded-md font-medium transition ${
                  selectedAbjad === 'Semua'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {isIndo ? 'Semua' : 'All'}
              </button>

              {ALPHABET.map((char) => {
                const hasItem = availableLetters.has(char);
                const isSelected = selectedAbjad === char;
                return (
                  <button
                    key={char}
                    disabled={!hasItem}
                    onClick={() => setSelectedAbjad(char)}
                    title={hasItem ? `Huruf ${char}` : `Belum ada istilah huruf ${char}`}
                    className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm rounded-md font-semibold transition ${
                      isSelected
                        ? 'bg-[#5a2b2b] text-white shadow-sm ring-2 ring-[#5a2b2b]/30'
                        : hasItem
                        ? 'text-stone-800 bg-stone-100 hover:bg-amber-100 hover:text-amber-900'
                        : 'text-stone-300 bg-transparent cursor-not-allowed'
                    }`}
                  >
                    {char}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Info & Counter Bar */}
        <div className="flex justify-between items-center mb-6 px-1 text-xs sm:text-sm text-stone-600">
          <div>
            {isIndo ? (
              <span>
                Menampilkan <strong>{filteredItems.length}</strong> istilah dari total{' '}
                <strong>{initialItems.length}</strong> kosa kata
              </span>
            ) : (
              <span>
                Showing <strong>{filteredItems.length}</strong> of{' '}
                <strong>{initialItems.length}</strong> terms
              </span>
            )}
          </div>
          {(searchQuery || selectedKategori !== 'Semua' || selectedAbjad !== 'Semua') && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-[#5a2b2b] hover:text-[#3a1b1b] font-medium transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isIndo ? 'Reset Filter' : 'Reset'}</span>
            </button>
          )}
        </div>

        {/* Term Cards Grid */}
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.3) }}
                  className="bg-white rounded-2xl p-5 border border-stone-200/90 hover:border-[#5a2b2b]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Top: Term + Category Badge */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center border border-stone-200 group-hover:bg-[#5a2b2b] group-hover:text-white transition-colors duration-200">
                          {item.abjad || item.istilah.charAt(0).toUpperCase()}
                        </span>
                        <h2 className="text-lg font-bold text-stone-900 group-hover:text-[#5a2b2b] transition-colors duration-200 tracking-tight">
                          {item.istilah}
                        </h2>
                      </div>
                      <span
                        className={`text-[11px] px-2.5 py-0.5 rounded-full border whitespace-nowrap ${getBadgeStyle(
                          item.kategori
                        )}`}
                      >
                        {item.kategori}
                      </span>
                    </div>

                    {/* Definition */}
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-2.5 text-justify">
                      {item.definisi}
                    </p>
                  </div>

                  {/* Contoh / Catatan Tambahan (jika ada) */}
                  {item.contohPenggunaan && (
                    <div className="mt-4 pt-3 border-t border-stone-100">
                      <span className="text-[11px] text-stone-400 font-medium block">Contoh:</span>
                      <p className="text-xs text-stone-500 italic mt-0.5">
                        &ldquo;{item.contohPenggunaan}&rdquo;
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl border border-dashed border-stone-300 p-12 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-800">
                {isIndo ? 'Istilah tidak ditemukan' : 'No terms found'}
              </h3>
              <p className="text-stone-500 text-sm mt-1 max-w-md mx-auto">
                {isIndo
                  ? `Tidak ada istilah yang cocok dengan kata kunci "${searchQuery}". Coba gunakan kata kunci lain atau reset filter.`
                  : `No terms matched "${searchQuery}". Try different keywords or reset your filters.`}
              </p>
              <button
                onClick={handleReset}
                className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-[#5a2b2b] text-white rounded-xl text-sm font-medium hover:bg-[#472222] transition shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                {isIndo ? 'Kembalikan Semua Istilah' : 'Show All Terms'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
