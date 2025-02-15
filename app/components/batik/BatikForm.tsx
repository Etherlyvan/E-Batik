'use client';
import React, { useEffect, useState } from 'react';

// Types
import { FormData, TemaAPIResponse } from './types';

// Hooks
import { useFileHandling } from './hooks/useFileHandling';
import { useFormSubmission } from './hooks/useFormSubmission';

// Components
import { ImageUpload } from './components/ImageUpload';
import { TextInput } from './components/TextInput';
import { TextArea } from './components/TextArea';
import { TemaSection } from './components/TemaSection';

const initialFormData: FormData = {
    foto: [],
    nama: '',
    tahun: 0,
    tema: [''],
    subTema: [''],
    warna: '',
    teknik: '',
    jenisKain: '',
    pewarna: '',
    bentuk: '',
    histori: '',
    dimensi: '',
};

const BatikForm: React.FC = () => {
    const [temaList, setTemaList] = useState<TemaAPIResponse[]>([]);
    
    const {
        previews,
        setPreviews,
        previewLoading,
        handleFileChange,
    } = useFileHandling();
    
    const resetPreviews = () => setPreviews([]);
    
    const {
        formData,
        setFormData,
        loading,
        errors,
        handleChange,
        handleSubmit,
        addNewTema,
    } = useFormSubmission(initialFormData, resetPreviews);

    useEffect(() => {
        const fetchTema = async () => {
            try {
                const response = await fetch('/api/tema');
                const data = await response.json();
                setTemaList(data);
            } catch (error) {
                console.error('Error fetching tema:', error);
            }
        };
        fetchTema();
    }, []);

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileChange(e, setFormData);
    };

    return (
        <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-2xl mx-auto'>
                <div className='bg-white rounded-xl shadow-md p-6 sm:p-8'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-8 text-center'>
                        Tambah Data Batik
                    </h2>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <ImageUpload
                            previews={previews}
                            setPreviews={setPreviews}
                            handleFileChange={handleImageFileChange}
                            previewLoading={previewLoading}
                            error={errors.foto}
                        />

                        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                            <TextInput
                                label="Nama Batik"
                                name="nama"
                                value={formData.nama}
                                onChange={handleChange}
                                placeholder="Masukkan nama batik"
                                error={errors.nama}
                            />

                            <TextInput
                                label="Tahun Pembuatan"
                                name="tahun"
                                value={formData.tahun}
                                onChange={handleChange}
                                placeholder="Contoh: 2024"
                                type="number"
                                error={errors.tahun}
                            />

                            <TextInput
                                label="Warna"
                                name="warna"
                                value={formData.warna}
                                onChange={handleChange}
                                placeholder="Warna dominan"
                                error={errors.warna}
                            />

                            <TextInput
                                label="Teknik"
                                name="teknik"
                                value={formData.teknik}
                                onChange={handleChange}
                                placeholder="Teknik pembuatan"
                                error={errors.teknik}
                            />

                            <TextInput
                                label="Jenis Kain"
                                name="jenisKain"
                                value={formData.jenisKain}
                                onChange={handleChange}
                                placeholder="Jenis kain yang digunakan"
                                error={errors.jenisKain}
                            />

                            <TextInput
                                label="Pewarna"
                                name="pewarna"
                                value={formData.pewarna}
                                onChange={handleChange}
                                placeholder="Jenis pewarna"
                                error={errors.pewarna}
                            />

                            <TextInput
                                label="Bentuk"
                                name="bentuk"
                                value={formData.bentuk}
                                onChange={handleChange}
                                placeholder="Bentuk motif"
                                error={errors.bentuk}
                            />

                            <TextInput
                                label="Dimensi"
                                name="dimensi"
                                value={formData.dimensi}
                                onChange={handleChange}
                                placeholder="Contoh: 200cm x 110cm"
                                error={errors.dimensi}
                            />

                            <TemaSection
                                formData={formData}
                                setFormData={setFormData}
                                temaList={temaList}
                                errors={errors}
                                addNewTema={addNewTema}
                            />

                            <div className='sm:col-span-2'>
                                <TextArea
                                    label="Histori"
                                    name="histori"
                                    value={formData.histori}
                                    onChange={handleChange}
                                    placeholder="Ceritakan sejarah dan makna batik ini..."
                                    error={errors.histori}
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