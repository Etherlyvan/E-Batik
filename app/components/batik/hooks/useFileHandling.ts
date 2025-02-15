import { useState } from 'react';
import { FormData } from '../types';

export const useFileHandling = () => {
    const [previews, setPreviews] = useState<string[]>([]);
    const [previewLoading, setPreviewLoading] = useState(false);

    const convertToJpg = async (file: File): Promise<File | null> => {
        if (!file.name.toLowerCase().endsWith('.heic')) {
            return file; // Return as-is if not HEIC
        }

        try {
            const heic2any = (await import('heic2any')).default;
            const convertedBlobArray = await heic2any({
                blob: file,
                toType: 'image/jpeg',
            });

            const convertedBlob =
                convertedBlobArray instanceof Blob
                    ? convertedBlobArray
                    : convertedBlobArray[0];

            return new File(
                [convertedBlob],
                file.name.replace(/\.heic$/i, '.jpg'),
                {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                }
            );
        } catch (error) {
            console.error('Error converting HEIC file:', error);
            return null;
        }
    };

    const handleUpload = async (file: File): Promise<string | null> => {
        if (!file.name.toLowerCase().endsWith('.heic')) {
            return URL.createObjectURL(file);
        }

        try {
            const heic2any = (await import('heic2any')).default;
            const convertedBlobArray = await heic2any({
                blob: file,
                toType: 'image/jpeg',
            });

            const convertedBlob =
                convertedBlobArray instanceof Blob
                    ? convertedBlobArray
                    : convertedBlobArray[0];

            const convertedFile = new File(
                [convertedBlob],
                file.name.replace(/\.heic$/i, '.jpg'),
                {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                }
            );

            return URL.createObjectURL(convertedFile);
        } catch (error) {
            console.error('Error converting HEIC file:', error);
            return null;
        }
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
        setFormData: React.Dispatch<React.SetStateAction<FormData>>
    ) => {
        const files = event.target.files;
        if (!files) return;

        setPreviewLoading(true);

        const imageUrls = await Promise.all(
            Array.from(files).map(async (file) => await handleUpload(file))
        );

        // Ensure we don't add null values
        setPreviews((prev) => [
            ...prev,
            ...imageUrls.filter((url) => url !== null) as string[],
        ]);

        const convertedFiles = await Promise.all(
            Array.from(files).map(async (file) => {
                const convertedFile = await convertToJpg(file);
                return convertedFile || file; // Use converted file or original
            })
        );

        setFormData((prev) => ({
            ...prev,
            foto: prev.foto ? [...prev.foto, ...convertedFiles] : convertedFiles,
        }));

        setPreviewLoading(false);
    };

    return {
        previews,
        setPreviews,
        previewLoading,
        handleFileChange,
    };
};