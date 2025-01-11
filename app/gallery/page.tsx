'use client'
import { useEffect, useState } from 'react';
import GalleryCard from '@/app/components/GalleryCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Search, Filter, X} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AddBatikButton from '@/app/components/button/addBatik';
import BatikDetailPopup from '@/app/components/BatikDetailPopUp';
import Pagination from '@/app/components/Pagination';

interface Batik {
  id: number;
  foto: string;
  nama: string;
  tema: string;
  tahun: string;
  warna: string;
  teknik: string;
  jenisKain: string;
  pewarna: string;
  bentuk: string;
  histori: string;
  dimensi: string;
}

const filterOptions = [
  { value: 'all', label: 'Semua Tema' },
  { value: 'Klasik', label: 'Klasik' },
  { value: 'Modern', label: 'Modern' },
  { value: 'Pesisir', label: 'Pesisir' },
  { value: 'Pedalaman', label: 'Pedalaman' },
  { value: 'Keraton', label: 'Keraton' },
];

const Gallery = () => {
  const { user } = useAuth();
  const [batiks, setBatiks] = useState<Batik[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBatik, setSelectedBatik] = useState<Batik | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({
    tema: 'all',
    tahun: '',
    teknik: '',
  });

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchBatiks = async () => {
      try {
        const response = await fetch('/api/batik');
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setBatiks(data);
        } else {
          setError('Data tidak valid');
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError('Gagal mengambil data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBatiks();
  }, []);

  useEffect(() => {
    // Reset ke halaman pertama ketika filter berubah
    setCurrentPage(1);
  }, [searchTerm, activeFilters]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus batik ini?')) {
      try {
        const response = await fetch(`/api/batik?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setBatiks(batiks.filter(batik => batik.id !== id));
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Gagal menghapus batik');
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError('Terjadi kesalahan saat menghapus batik');
      }
    }
  };

  const openPopup = (batik: Batik) => {
    setSelectedBatik(batik);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedBatik(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setActiveFilters({
      tema: 'all',
      tahun: '',
      teknik: '',
    });
  };

  const filteredBatiks = batiks.filter(batik => {
    const matchesSearchTerm = batik.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTema = activeFilters.tema === 'all' || batik.tema === activeFilters.tema;
    const matchesTahun = !activeFilters.tahun || batik.tahun.includes(activeFilters.tahun);
    const matchesTeknik = !activeFilters.teknik || batik.teknik.toLowerCase().includes(activeFilters.teknik.toLowerCase());
    
    return matchesSearchTerm && matchesTema && matchesTahun && matchesTeknik;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredBatiks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBatiks.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-12 h-12 text-primary mx-auto mb-4" />
          </motion.div>
          <p className="text-gray-600 font-medium">Memuat koleksi batik...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md mx-4"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-3">Error</h2>
          <p className="text-gray-600">{error}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <div className="max-w-screen-2xl mx-auto py-16 px-4"> 
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative inline-block mb-8"
          >
            <h1 className="text-6xl font-bold text-gray-900 mb-4 relative z-10">
              Gallery Batik
            </h1>
            <div className="absolute -bottom-2 left-0 w-full h-3 bg-primary/20 -rotate-1"></div>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Koleksi batik tradisional Indonesia yang menampilkan keindahan dan keragaman budaya nusantara
          </motion.p>
        </div>

        {/* Add Button Section */}
        {user && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <AddBatikButton />
          </motion.div>
        )}

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 space-y-4"
        >
          {/* Search and Main Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Cari batik berdasarkan nama..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              <span>Filter</span>
              {Object.values(activeFilters).some(v => v !== 'all' && v !== '') && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-white rounded-full">
                  {Object.values(activeFilters).filter(v => v !== 'all' && v !== '').length}
                </span>
              )}
            </button>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Tema Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tema Batik
                    </label>
                    <select
                      value={activeFilters.tema}
                      onChange={(e) => setActiveFilters({...activeFilters, tema: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      {filterOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tahun Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tahun Pembuatan
                    </label>
                    <input
                      type="text"
                      value={activeFilters.tahun}
                      onChange={(e) => setActiveFilters({...activeFilters, tahun: e.target.value})}
                      placeholder="Contoh: 2020"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  {/* Teknik Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teknik Pembuatan
                    </label>
                    <input
                      type="text"
                      value={activeFilters.teknik}
                      onChange={(e) => setActiveFilters({...activeFilters, teknik: e.target.value})}
                      placeholder="Contoh: Cap, Tulis"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Clear Filters Button */}
                {Object.values(activeFilters).some(v => v !== 'all' && v !== '') && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-sm text-primary hover:text-primary-dark flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reset semua filter
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Count */}
          <div className="text-sm text-gray-500">
            Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredBatiks.length)} dari {filteredBatiks.length} batik
          </div>
        </motion.div>
        
        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          {currentItems.length > 0 ? (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {currentItems.map((batik, index) => (
                  <motion.div
                    key={batik.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.3
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                    className="transform-gpu"
                  >
                    <div 
                      onClick={() => openPopup(batik)}
                      className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <GalleryCard 
                        foto={batik.foto}
                        nama={batik.nama}
                        tema={batik.tema}
                        tahun={batik.tahun}
                        onDelete={() => handleDelete(batik.id)}
                        showDeleteButton={!!user}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="min-h-[40vh] flex items-center justify-center"
            >
              <div className="text-center bg-white p-8 rounded-xl shadow-sm max-w-md w-full">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Koleksi Kosong
                </h3>
                <p className="text-gray-500 mb-6">
                  Belum ada data batik yang tersedia. Mulai tambahkan koleksi batik pertama Anda.
                </p>
                {user && <AddBatikButton />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Batik Detail Popup */}
      <AnimatePresence>
        {isPopupOpen && (
          <BatikDetailPopup 
            isOpen={isPopupOpen} 
            onClose={closePopup} 
            batik={selectedBatik} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
