import { useState, useCallback } from 'react';
import { Foto, CloudinaryUploadResponse } from '../types';

interface UseFileHandlingProps {
  initialImages?: Foto[];
}

export const useFileHandling = ({ initialImages = [] }: UseFileHandlingProps = {}) => {
  const [images, setImages] = useState<Foto[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertHeicToJpg = async (file: File): Promise<File> => {
    if (file.type === 'image/heic' || file.type === 'image/heif' || 
        file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
      try {
        // Dynamic import with proper error handling
        const heic2any = (await import('heic2any')).default;
        
        // Convert to blob first
        const blob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.8
        });

        // Handle both single blob and array of blobs
        const jpegBlob = Array.isArray(blob) ? blob[0] : blob;
        
        // Create new file with proper name and type
        return new File(
          [jpegBlob],
          file.name.replace(/\.(heic|HEIC|heif|HEIF)$/, '.jpg'),
          { type: 'image/jpeg' }
        );
      } catch (error) {
        console.error('Error converting HEIC to JPG:', error);
        // Re-throw with more specific error message
        throw new Error('Tidak dapat mengkonversi gambar HEIC. Pastikan format file benar.');
      }
    }
    return file;
  };

  const handleFileChange = useCallback(async (files: FileList | null) => {
    if (!files) return;

    setUploading(true);
    setError(null);
    
    try {
      const processedImages = await Promise.all(
        Array.from(files).map(async (file) => {
          // Validate file type
          if (!file.type.startsWith('image/') && 
              !file.name.toLowerCase().endsWith('.heic') && 
              !file.name.toLowerCase().endsWith('.heif')) {
            throw new Error(`File "${file.name}" bukan format gambar yang didukung`);
          }

          // Process file
          const processedFile = await convertHeicToJpg(file);
          
          // Create preview URL
          const previewUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error(`Gagal membaca file "${file.name}"`));
            reader.readAsDataURL(processedFile);
          });

          return {
            link: previewUrl,
            file: processedFile
          };
        })
      );

      setImages(prev => [...prev, ...processedImages]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memproses gambar');
      console.error('File processing error:', err);
    } finally {
      setUploading(false);
    }
  }, []);

  const removeImage = useCallback((index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  const uploadImagesToCloudinary = useCallback(async (): Promise<Foto[]> => {
    setUploading(true);
    setError(null);
    
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'preset-BatikDigital';
      
      if (!cloudName) {
        throw new Error('Konfigurasi Cloudinary tidak ditemukan');
      }
      
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          if (!image.file) return image;

          const formData = new FormData();
          formData.append('file', image.file);
          formData.append('upload_preset', uploadPreset);
          
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `Gagal mengupload ${image.file.name}`);
          }
          
          const data: CloudinaryUploadResponse = await response.json();
          return { link: data.secure_url };
        })
      );
      
      return uploadedImages;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan saat upload';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setUploading(false);
    }
  }, [images]);

  return {
    images,
    uploading,
    error,
    handleFileChange,
    removeImage,
    uploadImagesToCloudinary
  };
};

