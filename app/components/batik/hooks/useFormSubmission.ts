import { useState } from 'react';
import { z } from 'zod';
import { submitData } from '@/app/lib/submitdata';
import { IBatikFormData, FormErrors } from '@/app/components/batik/types';

// Schema for validation
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

export const useFormSubmission = (
    initialFormData: IBatikFormData,
    resetPreviews: () => void
) => {
    const [formData, setFormData] = useState<IBatikFormData>(initialFormData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        
        const validationResult = formSchema.safeParse({ ...formData });

        if (!validationResult.success) {
            const errorMessages: FormErrors = {};

            validationResult.error.errors.forEach((error) => {
                const field = error.path[0];
                errorMessages[field as keyof IBatikFormData] = error.message;
            });

            setErrors(errorMessages);
            setLoading(false);
            return;
        }

        try {
            const formDataToSend = new globalThis.FormData();

            formData.foto.forEach((foto, index) => {
                formDataToSend.append(`foto[${index}]`, foto);
            });
            
            formDataToSend.append('nama', formData.nama);
            formDataToSend.append('tahun', formData.tahun.toString());
            
            formData.tema.forEach((tema, index) => {
                formDataToSend.append(`tema[${index}]`, tema);
            });

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
            resetPreviews();
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
            subTema: [...prev.subTema, ''],
        }));
    };

    return {
        formData,
        setFormData,
        loading,
        errors,
        handleChange,
        handleSubmit,
        addNewTema,
    };
};