// 🎨 BATIK FEATURE - Form for creating/editing batik entries
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageUpload } from './ImageUpload';
import { ThemeSelector } from './ThemeSelector';
import { useBatikForm } from '@/lib/hooks/batik/useBatikForm';
import type { Theme, Language } from '@/lib/types';

interface BatikFormProps {
  themes: Theme[];
  languages: Language[];
}

export function BatikForm({ themes, languages }: BatikFormProps) {
  const router = useRouter();
  const {
    formData,
    loading,
    uploadProgress,
    errors,
    handleInputChange,
    handleTranslationChange,
    handleThemeChange,
    handleImageUpload,
    submitForm,
  } = useBatikForm();

  const [activeLanguage, setActiveLanguage] = useState(
    languages.find(lang => lang.isDefault)?.id || languages[0]?.id
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitForm();
      router.push('/gallery');
    } catch {
      // Error handling is done in the hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Error Message */}
      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{errors.general}</p>
        </div>
      )}
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Batik Name"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            error={errors.nama}
            required
          />

          <Input
            label="Batik Code"
            name="kode"
            value={formData.kode}
            onChange={handleInputChange}
            error={errors.kode}
          />

          <Input
            label="Artist"
            name="seniman"
            value={formData.seniman}
            onChange={handleInputChange}
            error={errors.seniman}
          />

          <Input
            label="Location"
            name="alamat"
            value={formData.alamat}
            onChange={handleInputChange}
            error={errors.alamat}
          />

          <Input
            label="Year"
            name="tahun"
            value={formData.tahun}
            onChange={handleInputChange}
            error={errors.tahun}
            required
          />

          <Input
            label="Dimensions"
            name="dimensi"
            value={formData.dimensi}
            onChange={handleInputChange}
            error={errors.dimensi}
            placeholder="e.g., 100cm x 200cm"
            required
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Images</h2>
        <ImageUpload
          onUpload={handleImageUpload}
          maxFiles={10}
          error={errors.images}
        />
      </div>

      {/* Language Translations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Translations</h2>

        {/* Language Tabs */}
        <div className="flex space-x-2 border-b pb-2 mb-4">
          {languages.map((lang) => (
            <button
              key={lang.id}
              type="button"
              onClick={() => setActiveLanguage(lang.id)}
              className={`px-3 py-1 rounded ${
                activeLanguage === lang.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>

        {/* Translation Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Color"
            value={formData.translations[activeLanguage]?.warna || ''}
            onChange={(e) => handleTranslationChange(activeLanguage, 'warna', e.target.value)}
            error={errors[`translation_${activeLanguage}_warna`]}
            required
          />

          <Input
            label="Technique"
            value={formData.translations[activeLanguage]?.teknik || ''}
            onChange={(e) => handleTranslationChange(activeLanguage, 'teknik', e.target.value)}
            error={errors[`translation_${activeLanguage}_teknik`]}
            required
          />

          <Input
            label="Fabric Type"
            value={formData.translations[activeLanguage]?.jenisKain || ''}
            onChange={(e) => handleTranslationChange(activeLanguage, 'jenisKain', e.target.value)}
            error={errors[`translation_${activeLanguage}_jenisKain`]}
            required
          />

          <Input
            label="Dye"
            value={formData.translations[activeLanguage]?.pewarna || ''}
            onChange={(e) => handleTranslationChange(activeLanguage, 'pewarna', e.target.value)}
            error={errors[`translation_${activeLanguage}_pewarna`]}
            required
          />

          <div className="md:col-span-2">
            <Input
              label="Shape"
              value={formData.translations[activeLanguage]?.bentuk || ''}
              onChange={(e) => handleTranslationChange(activeLanguage, 'bentuk', e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              History
            </label>
            <textarea
              value={formData.translations[activeLanguage]?.histori || ''}
              onChange={(e) => handleTranslationChange(activeLanguage, 'histori', e.target.value)}
              rows={4}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors[`translation_${activeLanguage}_histori`] ? 'border-red-500' : ''
              }`}
              placeholder="Enter history description..."
              required
            />
            {errors[`translation_${activeLanguage}_histori`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`translation_${activeLanguage}_histori`]}</p>
            )}
          </div>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <ThemeSelector
          themes={themes}
          selectedThemes={formData.themes}
          selectedSubThemes={formData.subThemes}
          onThemeChange={handleThemeChange}
        />
        {errors.themes && (
          <p className="text-red-500 text-sm mt-2">{errors.themes}</p>
        )}
      </div>

      {/* Upload Progress */}
      {loading && uploadProgress && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <p className="text-blue-700 font-medium">{uploadProgress}</p>
          </div>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {loading ? (uploadProgress || 'Processing...') : 'Add Batik'}
        </Button>
      </div>
    </form>
  );
}