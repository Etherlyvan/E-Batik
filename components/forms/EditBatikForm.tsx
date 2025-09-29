// 🎨 BATIK FEATURE - Form for editing batik entries
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageUpload } from './ImageUpload';
import { ThemeSelector } from './ThemeSelector';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { getBatikById, updateBatik } from '@/lib/actions/batik';
import { getThemes } from '@/lib/actions/themes';
import { getLanguages } from '@/lib/actions/languages';
import { uploadToCloudinary } from '@/lib/services/upload.service';
import type { Theme, Language, Batik } from '@/lib/types';

interface EditBatikFormProps {
  batikId: number;
}

interface FormData {
  nama: string;
  kode: string;
  seniman: string;
  alamat: string;
  tahun: string;
  dimensi: string;
  images: string[];
  themes: number[];
  subThemes: number[];
  newImageFiles?: File[];
  translations: Record<number, {
    warna: string;
    teknik: string;
    jenisKain: string;
    pewarna: string;
    bentuk: string;
    histori: string;
  }>;
}

export function EditBatikForm({ batikId }: EditBatikFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [batik, setBatik] = useState<Batik | null>(null);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<FormData>({
    nama: '',
    kode: '',
    seniman: '',
    alamat: '',
    tahun: '',
    dimensi: '',
    images: [],
    themes: [],
    subThemes: [],
    newImageFiles: [],
    translations: {},
  });

  const [activeLanguage, setActiveLanguage] = useState<number>(1);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [batikData, themesData, languagesData] = await Promise.all([
          getBatikById(batikId),
          getThemes(),
          getLanguages(),
        ]);

        setBatik(batikData);
        setThemes(themesData);
        setLanguages(languagesData);

        // Set active language
        const defaultLang = languagesData.find(lang => lang.isDefault) || languagesData[0];
        setActiveLanguage(defaultLang.id);

        // Populate form data
        const translationsMap: Record<number, {
          warna: string;
          teknik: string;
          jenisKain: string;
          pewarna: string;
          bentuk: string;
          histori: string;
        }> = {};
        
        batikData?.translations.forEach(translation => {
          translationsMap[translation.languageId] = {
            warna: translation.warna,
            teknik: translation.teknik,
            jenisKain: translation.jenisKain,
            pewarna: translation.pewarna,
            bentuk: translation.bentuk,
            histori: translation.histori,
          };
        });

        setFormData({
          nama: batikData?.nama || '',
          kode: batikData?.kode || '',
          seniman: batikData?.seniman || '',
          alamat: batikData?.alamat || '',
          tahun: batikData?.tahun || '',
          dimensi: batikData?.dimensi || '',
          images: batikData?.foto.map(f => f.link) || [],
          themes: batikData?.tema.map(t => t.id) || [],
          subThemes: batikData?.subTema?.map(st => st.id) || [],
          newImageFiles: [],
          translations: translationsMap,
        });
      } catch (error) {
        console.error('Error loading data:', error);
        setErrors({ general: 'Failed to load batik data' });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [batikId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTranslationChange = (languageId: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [languageId]: {
          ...prev.translations[languageId],
          [field]: value,
        },
      },
    }));
  };

  const handleThemeChange = (selectedThemes: number[], selectedSubThemes: number[]) => {
    setFormData(prev => ({ 
      ...prev, 
      themes: selectedThemes,
      subThemes: selectedSubThemes 
    }));
  };

  const handleImageUpload = (files: File[]) => {
    // Store File objects for upload, create preview URLs
    const fileObjects = Array.from(files);
    const previewUrls = fileObjects.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({ 
      ...prev, 
      images: [...prev.images, ...previewUrls],
      newImageFiles: [...(prev.newImageFiles || []), ...fileObjects]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nama.trim()) newErrors.nama = 'Batik name is required';
    if (!formData.tahun.trim()) newErrors.tahun = 'Year is required';
    if (!formData.dimensi.trim()) newErrors.dimensi = 'Dimensions are required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';
    if (formData.themes.length === 0) newErrors.themes = 'At least one theme is required';

    // Validate that at least one complete translation exists
    const completeTranslations = Object.values(formData.translations).filter(translation => 
      translation?.warna?.trim() && translation?.teknik?.trim() && 
      translation?.jenisKain?.trim() && translation?.pewarna?.trim() && 
      translation?.histori?.trim()
    );

    if (completeTranslations.length === 0) {
      newErrors.general = 'At least one complete translation is required (Color, Technique, Fabric Type, Dye, and History must all be filled for at least one language)';
    }

    // Validate individual translation fields for languages with data
    Object.keys(formData.translations).forEach(langIdStr => {
      const langId = parseInt(langIdStr);
      const translation = formData.translations[langId];
      if (translation) {
        // Only validate if user has started filling this language
        const hasAnyData = translation.warna || translation.teknik || 
                         translation.jenisKain || translation.pewarna || 
                         translation.histori || translation.bentuk;
        
        if (hasAnyData) {
          if (!translation.warna?.trim()) newErrors[`translation_${langId}_warna`] = 'Color is required';
          if (!translation.teknik?.trim()) newErrors[`translation_${langId}_teknik`] = 'Technique is required';
          if (!translation.jenisKain?.trim()) newErrors[`translation_${langId}_jenisKain`] = 'Fabric type is required';
          if (!translation.pewarna?.trim()) newErrors[`translation_${langId}_pewarna`] = 'Dye is required';
          if (!translation.histori?.trim()) newErrors[`translation_${langId}_histori`] = 'History is required';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setSaving(true);
      setErrors({});

      // Upload new images if any
      let finalImageUrls = [...formData.images];
      if (formData.newImageFiles && formData.newImageFiles.length > 0) {
        console.log('Uploading new images...', formData.newImageFiles.length);
        
        const uploadedImages = await Promise.all(
          formData.newImageFiles.map(async (file) => {
            try {
              const result = await uploadToCloudinary(file);
              return result.secure_url;
            } catch (uploadError) {
              console.error('Failed to upload image:', file.name, uploadError);
              throw new Error(`Failed to upload image: ${file.name}`);
            }
          })
        );
        
        // Filter out blob URLs and add uploaded URLs
        finalImageUrls = finalImageUrls
          .filter(url => !url.startsWith('blob:'))
          .concat(uploadedImages);
      }

      // Prepare translations - only include languages with meaningful data
      const translations = languages
        .map(lang => {
          const translation = formData.translations[lang.id];
          return {
            languageId: lang.id,
            warna: translation?.warna?.trim() || '',
            teknik: translation?.teknik?.trim() || '',
            jenisKain: translation?.jenisKain?.trim() || '',
            pewarna: translation?.pewarna?.trim() || '',
            bentuk: translation?.bentuk?.trim() || '',
            histori: translation?.histori?.trim() || '',
          };
        })
        .filter(translation => {
          // Only include translations that have at least some meaningful content
          const hasRequiredFields = translation.warna && translation.teknik && 
                                  translation.jenisKain && translation.pewarna && 
                                  translation.histori;
          return hasRequiredFields;
        });

      // Ensure at least one complete translation exists
      if (translations.length === 0) {
        throw new Error('At least one complete translation is required (all required fields must be filled)');
      }

      const updateData = {
        nama: formData.nama,
        kode: formData.kode,
        seniman: formData.seniman,
        alamat: formData.alamat,
        tahun: formData.tahun,
        dimensi: formData.dimensi,
        foto: finalImageUrls,
        temaIds: formData.themes,
        subTemaIds: formData.subThemes,
        translations,
      };

      await updateBatik(batikId, updateData);
      router.push('/gallery');
    } catch (error) {
      console.error('Error updating batik:', error);
      setErrors({ general: 'Failed to update batik. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" variant="primary" />
          <p className="text-amber-700 text-lg font-medium">
            Loading batik data...
          </p>
        </div>
      </div>
    );
  }

  if (!batik) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 text-lg">Batik not found</p>
      </div>
    );
  }

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
        {formData.images.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Current Images:</h3>
            <div className="grid grid-cols-3 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <Image 
                    src={image} 
                    alt={`Batik ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md"
                    width={96}
                    height={96}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = formData.images.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, images: newImages }));
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter history description..."
            />
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

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="submit" loading={saving}>
          Update Batik
        </Button>
      </div>
    </form>
  );
}