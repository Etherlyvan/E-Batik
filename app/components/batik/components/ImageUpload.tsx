import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Trash2 } from 'lucide-react';
import { ImageUploadProps } from '../types';

export const ImageUpload: React.FC<ImageUploadProps> = ({
    previews,
    setPreviews,
    handleFileChange,
    previewLoading,
    error,
}) => {
    return (
        <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
                Foto Batik
            </label>
            <div className='mt-1 flex flex-col items-center'>
                {previewLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='text-center mb-3'
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        >
                            <Loader2 className='w-12 h-12 text-primary mx-auto mb-4' />
                        </motion.div>
                        <p className='text-gray-600 font-medium'>
                            Memuat Gambar...
                        </p>
                    </motion.div>
                )}
                
                {previews.length > 0 && (
                    <div className='mb-4 grid grid-cols-4 gap-2'>
                        {previews.map((preview, index) => (
                            <div key={index} className='relative group'>
                                <img
                                    src={preview}
                                    alt='Preview'
                                    className='w-24 h-24 object-fill rounded-lg'
                                />
                                <motion.button
                                    type='button'
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => {
                                        setPreviews((prev) =>
                                            prev.filter(
                                                (_, i) => i !== index
                                            )
                                        );
                                    }}
                                    className='absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                                >
                                    <Trash2 className='w-4 h-4' />
                                </motion.button>
                            </div>
                        ))}
                    </div>
                )}
                
                <div
                    className={`w-full flex justify-center px-6 pt-5 pb-6 border-2 ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } border-dashed rounded-md`}
                >
                    <div className='space-y-1 text-center'>
                        <svg
                            className='mx-auto h-12 w-12 text-gray-400'
                            stroke='currentColor'
                            fill='none'
                            viewBox='0 0 48 48'
                        >
                            <path
                                d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                strokeWidth={2}
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                        <div className='flex text-sm text-gray-600'>
                            <label className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500'>
                                <span>Upload file</span>
                                <input
                                    type='file'
                                    className='sr-only'
                                    name='foto'
                                    onChange={handleFileChange}
                                    accept='image/*'
                                    multiple
                                />
                            </label>
                            <p className='pl-1'>atau drag and drop</p>
                        </div>
                        <p className='text-xs text-gray-500'>
                            PNG, JPG, GIF sampai 10MB
                        </p>
                    </div>
                </div>
                
                {error && <p className='text-sm text-red-500 mt-2'>{error}</p>}
            </div>
        </div>
    );
};