// app/components/gallery/components/GalleryFilter.tsx
'use client';
import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

interface FilterValues {
  tema: string;
  tahun: string;
  teknik: string;
}

interface GalleryFilterProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  activeFilters: FilterValues;
  setActiveFilters: (filters: FilterValues) => void;
  filterOptions: { value: string; label: string }[];
}

const GalleryFilter: React.FC<GalleryFilterProps> = ({
  showFilters,
  setShowFilters,
  activeFilters,
  setActiveFilters,
  filterOptions,
}) => {
  const { t } = useTranslation();

  const clearFilters = () => {
    setActiveFilters({
      tema: 'all',
      tahun: '',
      teknik: '',
    });
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Filter className="h-5 w-5 mr-2" />
        <span>{t('gallery.filters.title')}</span>
        {Object.values(activeFilters).some((v) => v !== 'all' && v !== '') && (
          <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-white rounded-full">
            {Object.values(activeFilters).filter((v) => v !== 'all' && v !== '').length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('gallery.filters.tema')}
                </label>
                <select
                  value={activeFilters.tema}
                  onChange={(e) =>
                    setActiveFilters({ ...activeFilters, tema: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('gallery.filters.tahun')}
                </label>
                <input
                  type="text"
                  value={activeFilters.tahun}
                  onChange={(e) =>
                    setActiveFilters({ ...activeFilters, tahun: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="2020"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('gallery.filters.teknik')}
                </label>
                <input
                  type="text"
                  value={activeFilters.teknik}
                  onChange={(e) =>
                    setActiveFilters({ ...activeFilters, teknik: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Cap, Tulis"
                />
              </div>
            </div>

            {Object.values(activeFilters).some((v) => v !== 'all' && v !== '') && (
              <button
                onClick={clearFilters}
                className="mt-4 text-sm text-primary hover:text-primary-dark flex items-center"
              >
                <X className="h-4 w-4 mr-1" />
                {t('gallery.filters.reset')}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryFilter;
