'use client';
import React, { useState } from 'react';
import { submitData } from '@/app/lib/submitdata';

interface FormData {
    foto: File | null;
    nama: string;
    tahun: string;
    tema: string;
    warna: string;
    teknik: string;
    jenisKain: string;
    pewarna: string;
    bentuk: string;
    histori: string;
    dimensi: string;
}

const initialFormData: FormData = {
    foto: null,
    nama: '',
    tahun: '',
    tema: '',
    warna: '',
    teknik: '',
    jenisKain: '',
    pewarna: '',
    bentuk: '',
    histori: '',
    dimensi: '',
};

const BatikForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({ ...formData, foto: file });

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('foto', formData.foto as Blob);
            formDataToSend.append('nama', formData.nama);
            formDataToSend.append('tahun', formData.tahun);
            formDataToSend.append('tema', formData.tema);
            formDataToSend.append('warna', formData.warna);
            formDataToSend.append('teknik', formData.teknik);
            formDataToSend.append('jenisKain', formData.jenisKain);
            formDataToSend.append('pewarna', formData.pewarna);
            formDataToSend.append('bentuk', formData.bentuk);
            formDataToSend.append('histori', formData.histori);
            formDataToSend.append('dimensi', formData.dimensi);

            const response = await submitData(formDataToSend);

            console.log('Response data:', response);
            alert('Data batik berhasil disimpan!');
            setFormData(initialFormData);
            setPreview(null);
        } catch (error) {
            console.error('Error:', error);
            alert('Gagal menyimpan data. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-2xl mx-auto'>
                <div className='bg-white rounded-xl shadow-md p-6 sm:p-8'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-8 text-center'>
                        Tambah Data Batik
                    </h2>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* File Upload with Preview */}
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium text-gray-700'>
                                Foto Batik
                            </label>
                            <div className='mt-1 flex flex-col items-center'>
                                {preview && (
                                    <div className='mb-4'>
                                        <img
                                            src={preview}
                                            alt='Preview'
                                            className='h-48 w-auto object-contain rounded-lg'
                                        />
                                    </div>
                                )}
                                <div className='w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                                    <div className='space-y-1 text-center'>
                                        <svg
                                            className='mx-auto h-12 w-12 text-gray-400'
                                            stroke='currentColor'
                                            fill='none'
                                            viewBox='0 0 48 48'
                                            aria-hidden='true'
                                        >
                                            <path
                                                d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                                strokeWidth={2}
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                        <div className='flex text-sm text-gray-600'>
                                            <label className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'>
                                                <span>Upload file</span>
                                                <input
                                                    type='file'
                                                    className='sr-only'
                                                    name='foto'
                                                    onChange={handleFileChange}
                                                    accept='image/*'
                                                    required
                                                />
                                            </label>
                                            <p className='pl-1'>
                                                atau drag and drop
                                            </p>
                                        </div>
                                        <p className='text-xs text-gray-500'>
                                            PNG, JPG, GIF sampai 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Nama Batik
                                </label>
                                <input
                                    type='text'
                                    name='nama'
                                    value={formData.nama}
                                    onChange={handleChange}
                                    required
                                    className='mt-2 w-full rounded-md border border-gray-300 p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                                    placeholder='Masukkan nama batik'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Tahun Pembuatan
                                </label>
                                <input
                                    type='number'
                                    name='tahun'
                                    value={formData.tahun}
                                    onChange={handleChange}
                                    required
                                    className='mt-2 w-full rounded-md border border-gray-300 p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                                    placeholder='Contoh: 2024'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Tema
                                </label>
                                <input
                                    type='text'
                                    name='tema'
                                    value={formData.tema}
                                    onChange={handleChange}
                                    required
                                    className='mt-2 w-full rounded-md border border-gray-300 p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                                    placeholder='Tema batik'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Warna
                                </label>
                                <input
                                    type='text'
                                    name='warna'
                                    value={formData.warna}
                                    onChange={handleChange}
                                    required
                                    className='mt-2 w-full rounded-md border border-gray-300 p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                                    placeholder='Warna dominan'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Teknik
                                </label>
                                <input
                                    type='text'
                                    name='teknik'
                                    value={formData.teknik}
                                    onChange={handleChange}
                                    required
                                    className='mt-2 w-full rounded-md border border-gray-300 p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                                    placeholder='Teknik pembuatan'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Jenis Kain
                                </label>
                                <input
                                    type='text'
                                    name='jenisKain'
                                    value={formData.jenisKain}
                                    onChange={handleChange}
                                    required
                                    className='mt-2 w-full rounded-md border border-gray-300 p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                                    placeholder='Jenis kain yang digunakan'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Pewarna
                                </label>
                                <input
                                    type='text'
                                    name='pewarna'
                                    value={formData.pewarna}
                                    onChange={handleChange}
                                    required
                                    className='mt-2 w-full rounded-md border border-gray-300 p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                                    placeholder='Jenis pewarna'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Bentuk
                                </label>
                                <input
                                    type='text'
                                    name='bentuk'
                                    value={formData.bentuk}
                                    onChange={handleChange}
                                    required
                                    className='mt-2 w-full rounded-md border border-gray-300 p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                                    placeholder='Bentuk motif'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Dimensi
                                </label>
                                <input
                                    type='text'
                                    name='dimensi'
                                    value={formData.dimensi}
                                    onChange={handleChange}
                                    required
                                    className='mt-2 w-full rounded-md border border-gray-300 p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                                    placeholder='Contoh: 200cm x 110cm'
                                />
                            </div>

                            <div className='sm:col-span-2'>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Histori
                                </label>
                                <textarea
                                    name='histori'
                                    value={formData.histori}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className='mt-2 w-full rounded-md border border-gray-300 p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
                                    placeholder='Ceritakan sejarah dan makna batik ini...'
                                />
                            </div>
                        </div>

                        <div className='pt-5'>
                            <button
                                type='submit'
                                disabled={loading}
                                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed'
                            >
                                {loading ? (
                                    <span className='flex items-center'>
                                        <svg
                                            className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                        >
                                            <circle
                                                className='opacity-25'
                                                cx='12'
                                                cy='12'
                                                r='10'
                                                stroke='currentColor'
                                                strokeWidth='4'
                                            ></circle>
                                            <path
                                                className='opacity-75'
                                                fill='currentColor'
                                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                            ></path>
                                        </svg>
                                        Menyimpan...
                                    </span>
                                ) : (
                                    'Simpan Data'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BatikForm;
