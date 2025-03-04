import { useState, useCallback } from 'react';
import { BatikFormData } from '../types';
import { useFileHandling } from './useFileHandling';

export const useFormSubmission = () => {
    const [formData, setFormData] = useState<BatikFormData>({
        nama: '',
        kode: '',
        alamat: '',
        seniman: '',
        pointmap: '',
        tahun: '',
        dimensi: '',
        translations: {},
        foto: [],
        temaIds: [],
        subTemaIds: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const {
        images,
        handleFileChange,
        removeImage,
        uploadImagesToCloudinary,
        uploading,
        error: uploadError,
        setImages,
        alert, // Add this
        hideAlert, // Add this
        showAlert, // Add this
    } = useFileHandling({
        initialImages:
            formData.foto?.map((img) => ({
                link: img.url, // Convert url to link
            })) || [],
    });

    const validateForm = useCallback((): boolean => {
        if (!formData.nama.trim()) {
            setError('Nama batik harus diisi');
            showAlert('error', 'Nama batik harus diisi');
            return false;
        }

        if (!formData.tahun.trim()) {
            setError('Tahun harus diisi');
            showAlert('error', 'Tahun harus diisi');
            return false;
        }

        if (!formData.dimensi.trim()) {
            setError('Dimensi harus diisi');
            showAlert('error', 'Dimensi harus diisi');
            return false;
        }

        if (images.length === 0) {
            setError('Minimal satu foto harus diupload');
            showAlert('error', 'Minimal satu foto harus diupload');
            return false;
        }

        // if (Object.keys(formData.translations).length === 0) {
        //     setError('Minimal satu terjemahan harus diisi');
        //     showAlert('error', 'Minimal satu terjemahan harus diisi');
        //     return false;
        // }

        if (Object.keys(formData.translations).length <= 1) {
            setError('Indonesia and English translation must be filled');
            showAlert(
                'error',
                'Indonesia and English translation must be filled'
            );
            return false;
        }

        if (formData.translations[1]) {
            const translation = formData.translations[1];

            // Check if at least one field is null
            const hasNullValue = Object.values(translation).some(
                (value) => value === null || value === ''
            );

            if (hasNullValue) {
                setError('Ada Field yang masih kosong pada terjemahan');
                showAlert(
                    'error',
                    'Ada Field yang masih kosong pada terjemahan'
                );
                return false;
            }
        }

        if (formData.translations[2]) {
            const translation = formData.translations[2];

            // Check if at least one field is null
            const hasNullValue = Object.values(translation).some(
                (value) => value === null || value === ''
            );

            if (hasNullValue) {
                setError(
                    'There is a field that is still empty in english the translation'
                );
                showAlert(
                    'error',
                    'There is a field that is still empty in english the translation'
                );
                return false;
            }
        }

        if (formData.temaIds.length === 0) {
            setError('Tema harus diisi');
            showAlert('error', 'Tema harus diisi');
            return false;
        }
        return true;
    }, [formData, images, showAlert]);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        },
        []
    );

    const handleTranslationChange = useCallback(
        (
            languageId: number,
            field: keyof BatikFormData['translations'][number],
            value: string
        ) => {
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

    const handleTemaChange = useCallback((temaIds: number[]) => {
        setFormData((prev) => ({
            ...prev,
            temaIds,
        }));
    }, []);

    const handleSubTemaChange = useCallback((subTemaIds: number[]) => {
        setFormData((prev) => ({
            ...prev,
            subTemaIds,
        }));
    }, []);

    const resetForm = useCallback(() => {
        setFormData({
            nama: '',
            kode: '',
            alamat: '',
            seniman: '',
            pointmap: '',
            tahun: '',
            dimensi: '',
            translations: {},
            foto: [],
            temaIds: [],
            subTemaIds: [],
        });
        setImages([]);
        setSuccess(false);
        setError(null);
        hideAlert();
    }, [setImages, hideAlert]);

    const submitForm = useCallback(async () => {
        setError(null);

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            // First upload images to Cloudinary
            const uploadedImages = await uploadImagesToCloudinary();

            // Create a FormData instance
            const formDataObj = new FormData();

            // Add basic fields
            formDataObj.append('nama', formData.nama);
            formDataObj.append('kode', formData.kode || '');
            formDataObj.append('alamat', formData.alamat || '');
            formDataObj.append('seniman', formData.seniman || '');
            formDataObj.append('pointmap', formData.pointmap);
            formDataObj.append('tahun', formData.tahun);
            formDataObj.append('dimensi', formData.dimensi);

            // Convert tema and subTema IDs to numbers and stringify
            const temaIds = formData.temaIds.map((id) => Number(id));
            const subTemaIds = formData.subTemaIds.map((id) => Number(id));

            formDataObj.append('temaIds', JSON.stringify(temaIds));
            formDataObj.append('subTemaIds', JSON.stringify(subTemaIds));

            const translationsArray = Object.entries(formData.translations).map(
                ([languageId, data]) => ({
                    ...data,
                    languageId: Number(languageId), // Put languageId after spread to avoid overwriting
                })
            );
            formDataObj.append(
                'translations',
                JSON.stringify(translationsArray)
            );

            // Process photos
            const fotoArray = uploadedImages.map((img) => img.link);
            formDataObj.append('foto', JSON.stringify(fotoArray));

            // Submit to your API
            const response = await fetch('/api/batik', {
                method: 'POST',
                body: formDataObj,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message ?? 'Terjadi kesalahan saat menyimpan data'
                );
            }

            setSuccess(true);
            showAlert('success', 'Data batik berhasil disimpan!');
            resetForm();
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : 'Terjadi kesalahan';
            setError(errorMessage);
            showAlert('error', errorMessage);
            console.error('Submission error:', err);
        } finally {
            setLoading(false);
        }
    }, [
        formData,
        validateForm,
        uploadImagesToCloudinary,
        resetForm,
        showAlert,
    ]);

    return {
        formData,
        loading,
        error: error ?? uploadError,
        success,
        images,
        uploading,
        handleInputChange,
        handleTranslationChange,
        handleTemaChange,
        handleSubTemaChange,
        handleFileChange,
        removeImage,
        submitForm,
        resetForm,
        alert, // Add this
        hideAlert, // Add this
    };
};
