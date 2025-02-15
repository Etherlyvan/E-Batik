import React, { useCallback } from 'react';
import { Foto } from '../types';

interface ImageUploadProps {
  images: Foto[];
  onFileChange: (files: FileList | null) => void;
  onRemove: (index: number) => void;
  error?: string | null;
  uploading?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onFileChange,
  onRemove,
  error,
  uploading = false
}) => {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onFileChange(e.dataTransfer.files);
  }, [onFileChange]);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
        type="file"
        id="file-upload"
        multiple
        accept="image/*,.heic,.heif"
        className="hidden"
        onChange={(e) => onFileChange(e.target.files)}
        disabled={uploading}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-blue-600 hover:text-blue-800"
        >
          Klik untuk upload
        </label>
        <p className="text-sm text-gray-500 mt-2">atau drag & drop file gambar di sini</p>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {uploading && <p className="text-gray-500 text-sm mt-2">Sedang mengupload...</p>}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.link}
                alt={`Preview ${index}`}
                className="w-full h-32 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 
                           opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={uploading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
