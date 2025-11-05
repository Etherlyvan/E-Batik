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
    const [uploadProgress, setUploadProgress] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));

            // Clear error when user starts typing
            if (errors[name]) {
                setErrors((prev) => ({ ...prev, [name]: '' }));
            }
        },
        [errors]
    );

    const handleTranslationChange = useCallback(
        (languageId: number, field: keyof BatikTranslation, value: string) => {
            setFormData((prev) => ({
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
        },
        []
    );

    const handleThemeChange = useCallback((themes: number[], subThemes: number[]) => {
        setFormData((prev) => ({ ...prev, themes, subThemes }));
    }, []);

    const handleImageUpload = useCallback((files: File[]) => {
        setFormData((prev) => ({ ...prev, images: files }));
    }, []);

    const validateForm = (dataToValidate = formData): boolean => {
        const newErrors: Record<string, string> = {};

        if (!dataToValidate.nama.trim()) newErrors.nama = 'Batik name is required';
        if (!dataToValidate.tahun.trim()) newErrors.tahun = 'Year is required';
        if (!dataToValidate.dimensi.trim()) newErrors.dimensi = 'Dimensions are required';
        if (!dataToValidate.images || dataToValidate.images.length === 0) {
            newErrors.images = 'At least one image is required';
        }
        if (dataToValidate.themes.length === 0) newErrors.themes = 'At least one theme is required';

        // Validate that at least one complete translation exists
        const completeTranslations = Object.values(dataToValidate.translations).filter(translation => 
            translation?.warna?.trim() && translation?.teknik?.trim() && 
            translation?.jenisKain?.trim() && translation?.pewarna?.trim() && 
            translation?.histori?.trim()
        );

        if (completeTranslations.length === 0) {
            newErrors.translations = 'At least one complete translation is required';
        }

        // Validate individual translation fields for active languages
        Object.keys(dataToValidate.translations).forEach(langIdStr => {
            const langId = parseInt(langIdStr);
            const translation = dataToValidate.translations[langId];
            if (translation) {
                // Only validate if user has started filling this language
                const hasAnyData = translation.warna || translation.teknik || 
                                 translation.jenisKain || translation.pewarna || 
                                 translation.histori || translation.bentuk;
                
                if (hasAnyData) {
                    if (!translation.warna?.trim()) newErrors[`translation_${langId}_warna`] = `Color is required`;
                    if (!translation.teknik?.trim()) newErrors[`translation_${langId}_teknik`] = `Technique is required`;
                    if (!translation.jenisKain?.trim()) newErrors[`translation_${langId}_jenisKain`] = `Fabric type is required`;
                    if (!translation.pewarna?.trim()) newErrors[`translation_${langId}_pewarna`] = `Dye is required`;
                    if (!translation.histori?.trim()) newErrors[`translation_${langId}_histori`] = `History is required`;
                    // bentuk is optional
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitForm = async () => {
        // Create a snapshot of current form data to avoid dependency issues
        const currentFormData = { ...formData };
        if (!validateForm(currentFormData)) return;

        setLoading(true);
        setErrors({});

        try {
            // Validate images before upload
            if (!currentFormData.images || currentFormData.images.length === 0) {
                throw new Error('No images selected for upload');
            }

            // Upload images first
            setUploadProgress(`Uploading ${currentFormData.images.length} images to Cloudinary...`);
            console.log('Uploading images to Cloudinary...', currentFormData.images.length);
            
            const uploadedImages = await Promise.all(
                currentFormData.images.map(async (file, index) => {
                    try {
                        setUploadProgress(`Uploading image ${index + 1} of ${currentFormData.images.length}...`);
                        const result = await uploadToCloudinary(file);
                        console.log(`Image ${index + 1} uploaded:`, result.secure_url);
                        return result;
                    } catch (uploadError) {
                        console.error('Failed to upload image:', file.name, uploadError);
                        throw new Error(`Failed to upload image: ${file.name}`);
                    }
                })
            );
            
            setUploadProgress('Images uploaded successfully. Saving batik...');
            console.log('Images uploaded successfully:', uploadedImages.map(img => img.secure_url));

            // Prepare data for submission using snapshot
            const createData: CreateBatikData = {
                nama: currentFormData.nama.trim(),
                kode: currentFormData.kode?.trim() || undefined,
                alamat: currentFormData.alamat?.trim() || undefined,
                seniman: currentFormData.seniman?.trim() || undefined,
                pointmap: currentFormData.pointmap?.trim() || undefined,
                tahun: currentFormData.tahun.trim(),
                dimensi: currentFormData.dimensi.trim(),
                translations: Object.values(currentFormData.translations).filter(t => 
                    t.warna?.trim() && t.teknik?.trim() && t.jenisKain?.trim() && 
                    t.pewarna?.trim() && t.histori?.trim()
                ).map(t => ({
                    ...t,
                    bentuk: t.bentuk?.trim() || ''
                })),
                temaIds: currentFormData.themes,
                subTemaIds: currentFormData.subThemes,
                foto: uploadedImages.map(img => img.secure_url),
            };

            // Create batik
            setUploadProgress('Saving batik to database...');
            await createBatik(createData);
            setUploadProgress('Batik saved successfully!');

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
            setUploadProgress('');
        }
    };

    return {
        formData,
        loading,
        uploadProgress,
        errors,
        handleInputChange,
        handleTranslationChange,
        handleThemeChange,
        handleImageUpload,
        submitForm,
    };
}
