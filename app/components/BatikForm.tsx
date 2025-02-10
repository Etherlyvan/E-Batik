'use client';
import React, { useEffect, useState } from 'react';
import { submitData } from '@/app/lib/submitdata';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Trash2 } from 'lucide-react';

import { DropdownFormComponent } from './DropdownFormComponent';
import { SubTema } from '@prisma/client';

type FormErrors = {
    foto?: string;
    nama?: string;
    tahun?: string;
    tema?: string;
    subTema?: string;
    warna?: string;
    teknik?: string;
    jenisKain?: string;
    pewarna?: string;
    bentuk?: string;
    histori?: string;
    dimensi?: string;
};

interface FormData {
    foto: File[] | null;
    nama: string;
    tahun: number;
    tema: string[];
    subTema: string[];
    warna: string;
    teknik: string;
    jenisKain: string;
    pewarna: string;
    bentuk: string;
    histori: string;
    dimensi: string;
}

interface temaAPIResponse {
    id: number;
    nama: string;
    subTema: SubTema[];
}

const formSchema = z.object({
    foto: z
        .array(z.instanceof(File))
        .min(1, {
            message: 'Minimal satu foto harus diunggah',
        })
        .refine((files) => files.every((file) => file.size > 0), {
            message: 'Setiap foto harus memiliki ukuran lebih dari 0 byte',
        }),
    nama: z.string().min(1, { message: 'Nama harus diisi' }),
    tahun: z.coerce
        .number()
        .int()
        .min(1, { message: 'Tahun harus diisi dan harus angka yang valid' }),
    tema: z.array(z.string()).min(1, { message: 'Tema harus diisi' }),
    subTema: z.array(z.string()).min(1, { message: 'Tema harus diisi' }),
    warna: z.string().min(1, { message: 'Warna harus diisi' }),
    teknik: z.string().min(1, { message: 'Teknik harus diisi' }),
    jenisKain: z.string().min(1, { message: 'Jenis Kain harus diisi' }),
    pewarna: z.string().min(1, { message: 'Pewarna harus diisi' }),
    bentuk: z.string().min(1, { message: 'Bentuk harus diisi' }),
    histori: z.string().min(1, { message: 'Histori harus diisi' }),
    dimensi: z.string().min(1, { message: 'Dimensi harus diisi' }),
});

const initialFormData: FormData = {
    foto: [],
    nama: '',
    tahun: 0,
    tema: [],
    subTema: [],
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
    const [previews, setPreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [previewLoading, setPreviewLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [temaList, setTemaList] = useState<temaAPIResponse[]>([]);

    useEffect(() => {
        const fetchTema = async () => {
            try {
                const response = await fetch('/api/tema');
                const data = await response.json();
                setTemaList(data);
                console.log(data[0].subTema);
            } catch (error) {
                console.error('Error fetching tema:', error);
            }
        };
        fetchTema();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        event: React.ChangeEvent<HTMLInputElement>
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
            ...imageUrls.filter((url) => url !== null),
        ]);

        setFormData((prev) => ({
            ...prev,
            foto: Array.from(files),
        }));

        setPreviewLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        const validationResult = formSchema.safeParse({ ...formData });

        if (!validationResult.success) {
            const errorMessages: { [key: string]: string } = {};

            validationResult.error.errors.forEach((error) => {
                const field = error.path[0];
                errorMessages[field] = error.message;
            });

            setErrors(errorMessages);
            setLoading(false);
            return;
        }

        try {
            const formDataToSend = new FormData();

            formData.foto!.forEach((foto, index) => {
                formDataToSend.append(`foto[${index}]`, foto);
            });
            formDataToSend.append('nama', formData.nama);
            formDataToSend.append('tahun', formData.tahun.toString());
            formData.tema.forEach((tema, index) => {
                formDataToSend.append(`tema[${index}]`, tema);
            });

            // Append the subTema array as separate key-value pairs
            formData.subTema.forEach((subTema, index) => {
                formDataToSend.append(`subTema[${index}]`, subTema);
            });
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
            // setPreview(null);
        } catch (error) {
            console.error('Error:', error);
            alert('Gagal menyimpan data. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const addNewTema = () => {
        setFormData((prev) => ({
            ...prev,
            tema: [...prev.tema, ''],
            subTema: [...prev.subTema, ''], // Tambahkan elemen kosong untuk tema baru
        }));
    };

    // const handleTemaChange = (
    //     e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
    // ) => {
    //     const value = e.target.value;
    //     if (value === 'other') {
    //         setShowOtherInput(true); // Switch to input mode
    //         setFormData((prev) => ({ ...prev, tema: '' })); // Reset theme value
    //     } else {
    //         setShowOtherInput(false); // Keep dropdown mode
    //         setFormData((prev) => ({ ...prev, tema: value }));
    //     }
    // };

    // const resetToDropdown = () => {
    //     setShowOtherInput(false);
    //     setFormData((prev) => ({ ...prev, tema: '' }));
    // };

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
                                {/* Multiple Image Preview */}
                                {previews.length > 0 && (
                                    <div className='mb-4 grid grid-cols-4 gap-2'>
                                        {previews.map((preview, index) => (
                                            <div
                                                key={index}
                                                className='relative group'
                                            >
                                                <img
                                                    src={preview}
                                                    alt='Preview'
                                                    className=' w-24 h-24 object-fill rounded-lg'
                                                />

                                                <motion.button
                                                    type='button'
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => {
                                                        setPreviews((prev) =>
                                                            prev.filter(
                                                                (_, i) =>
                                                                    i !== index
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
                                        errors.foto
                                            ? 'border-red-500'
                                            : 'border-gray-300'
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
                                            <p className='pl-1'>
                                                atau drag and drop
                                            </p>
                                        </div>
                                        <p className='text-xs text-gray-500'>
                                            PNG, JPG, GIF sampai 10MB
                                        </p>
                                    </div>
                                </div>
                                {errors.foto && (
                                    <p className='text-sm text-red-500 mt-2'>
                                        {errors.foto}
                                    </p>
                                )}
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
                                    className={`mt-2 w-full rounded-md border p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                                        errors.nama
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } focus:border-transparent`}
                                    placeholder='Masukkan nama batik'
                                />
                                {errors.nama && (
                                    <p className='mt-1 text-sm text-red-500'>
                                        {errors.nama}
                                    </p>
                                )}
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
                                    className={`mt-2 w-full rounded-md border p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                                        errors.tahun
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } focus:border-transparent`}
                                    placeholder='Contoh: 2024'
                                />
                                {errors.tahun && (
                                    <p className='mt-1 text-sm text-red-500'>
                                        {errors.tahun}
                                    </p>
                                )}
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
                                    className={`mt-2 w-full rounded-md border p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                                        errors.warna
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } focus:border-transparent`}
                                    placeholder='Warna dominan'
                                />
                                {errors.warna && (
                                    <p className='mt-1 text-sm text-red-500'>
                                        {errors.warna}
                                    </p>
                                )}
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
                                    className={`mt-2 w-full rounded-md border p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                                        errors.teknik
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } focus:border-transparent`}
                                    placeholder='Teknik pembuatan'
                                />
                                {errors.teknik && (
                                    <p className='mt-1 text-sm text-red-500'>
                                        {errors.teknik}
                                    </p>
                                )}
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
                                    className={`mt-2 w-full rounded-md border p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                                        errors.jenisKain
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } focus:border-transparent`}
                                    placeholder='Jenis kain yang digunakan'
                                />
                                {errors.jenisKain && (
                                    <p className='mt-1 text-sm text-red-500'>
                                        {errors.jenisKain}
                                    </p>
                                )}
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
                                    className={`mt-2 w-full rounded-md border p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                                        errors.pewarna
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } focus:border-transparent`}
                                    placeholder='Jenis pewarna'
                                />
                                {errors.pewarna && (
                                    <p className='mt-1 text-sm text-red-500'>
                                        {errors.pewarna}
                                    </p>
                                )}
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
                                    className={`mt-2 w-full rounded-md border p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                                        errors.bentuk
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } focus:border-transparent`}
                                    placeholder='Bentuk motif'
                                />
                                {errors.bentuk && (
                                    <p className='mt-1 text-sm text-red-500'>
                                        {errors.bentuk}
                                    </p>
                                )}
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
                                    className={`mt-2 w-full rounded-md border p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                                        errors.dimensi
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } focus:border-transparent`}
                                    placeholder='Contoh: 200cm x 110cm'
                                />
                                {errors.dimensi && (
                                    <p className='mt-1 text-sm text-red-500'>
                                        {errors.dimensi}
                                    </p>
                                )}
                            </div>

                            <div className='sm:col-span-2'>
                                {formData.tema.map((tema, index) => (
                                    <div key={`tema-${index}`}>
                                        <div>
                                            <DropdownFormComponent
                                                title='Tema'
                                                formData={formData}
                                                setFormData={setFormData}
                                                list={temaList}
                                                errors={errors}
                                                index={index} // Pass index untuk mengatur tema tertentu
                                            />
                                        </div>

                                        <div>
                                            <DropdownFormComponent
                                                title='Sub Tema'
                                                formData={formData}
                                                setFormData={setFormData}
                                                list={
                                                    temaList.find(
                                                        (t) => t.nama === tema
                                                    )?.subTema || []
                                                }
                                                errors={errors}
                                                index={index} // Pass index untuk mengatur tema tertentu
                                            />
                                        </div>
                                        <div className='mt-4 mb-4'>
                                            -------------
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* {formData.subTema.map((tema, index) => (
                                    <div
                                        className='w-1/2'
                                        key={`subtema-${index}`}
                                    >
                                        <DropdownFormComponent
                                            title='Sub Tema'
                                            formData={formData}
                                            setFormData={setFormData}
                                            list={temaList[0].subTema}
                                            errors={errors}
                                            index={index} // Pass index untuk mengatur tema tertentu
                                        />
                                    </div>
                                ))} */}

                            {/* Tombol untuk menambah tema baru */}
                            <div className='sm:col-span-2'>
                                <button
                                    type='button'
                                    onClick={addNewTema}
                                    className='mt-2 p-2 bg-indigo-600 text-white rounded-md'
                                >
                                    Add New Tema
                                </button>
                            </div>

                            {/* {temaList.length > 0 ? (
                                <DropdownFormComponent
                                    formData={formData}
                                    setFormData={setFormData}
                                    list={temaList[0].subTema}
                                    errors={errors}
                                />
                            ) : (
                                <p>Loading...</p>
                            )} */}

                            <div className='sm:col-span-2'>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Histori
                                </label>
                                <textarea
                                    name='histori'
                                    value={formData.histori}
                                    onChange={handleChange}
                                    rows={4}
                                    className={`mt-2 w-full rounded-md border p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                                        errors.histori
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } focus:border-transparent`}
                                    placeholder='Ceritakan sejarah dan makna batik ini...'
                                />
                                {errors.histori && (
                                    <p className='mt-1 text-sm text-red-500'>
                                        {errors.histori}
                                    </p>
                                )}
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
