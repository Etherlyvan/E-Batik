// 🎨 BATIK FEATURE - Custom hook for batik form management
'use client';

import { useState, useCallback } from 'react';
import { createBatik } from '@/lib/actions/batik';
import { uploadToCloudinary } from '@/lib/services/upload.service';
import type { CreateBatikData, BatikTranslation } from '@/lib/types/batik';

interface BatikFormData {
  nama: string;
  kode: string;
  alamat: string;
  seniman: string;
  pointmap: string;
  tahun: string;
  dimensi: string;
  translations: Record<number, BatikTranslation>;
  themes: number[];
  subThemes: number[];
  images: File[];
}

export function useBatikForm() {
  const [formData, setFormData] = useState<BatikFormData>({
    nama: '',
    kode: '',
    alamat: '',
    seniman: '',
    pointmap: '',
    tahun: '',
    dimensi: '',
    translations: {},
    themes: [],
    subThemes: [],
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleTranslationChange = useCallback((
    languageId: number,
    field: keyof BatikTranslation,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [languageId]: {
          ...prev.translations[languageId],
          languageId,
          [field]: value,
        },
      },
    }));
  }, []);

  const handleThemeChange = useCallback((themes: number[]) => {
    setFormData(prev => ({ ...prev, themes }));
  }, []);

  const handleImageUpload = useCallback((files: File[]) => {
    setFormData(prev => ({ ...prev, images: files }));
  }, []);

  const submitForm = useCallback(async () => {
    setLoading(true);
    setErrors({});

    try {
      // Upload images first
      const uploadedImages = await Promise.all(
        formData.images.map(file => uploadToCloudinary(file))
      );

      // Prepare data for submission
      const createData: CreateBatikData = {
        nama: formData.nama,
        kode: formData.kode || undefined,
        alamat: formData.alamat || undefined,
        seniman: formData.seniman || undefined,
        pointmap: formData.pointmap || undefined,
        tahun: formData.tahun,
        dimensi: formData.dimensi,
        translations: Object.values(formData.translations),
        temaIds: formData.themes,
        subTemaIds: formData.subThemes,
        foto: uploadedImages.map(img => img.secure_url),
      };

      // Create batik
      await createBatik(createData);

      // Reset form
      setFormData({
        nama: '',
        kode: '',
        alamat: '',
        seniman: '',
        pointmap: '',
        tahun: '',
        dimensi: '',
        translations: {},
        themes: [],
        subThemes: [],
        images: [],
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ general: 'Failed to save batik. Please try again.' });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [formData]);

  return {
    formData,
    loading,
    errors,
    handleInputChange,
    handleTranslationChange,
    handleThemeChange,
    handleImageUpload,
    submitForm,
  };
}