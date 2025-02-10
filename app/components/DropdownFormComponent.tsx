import { useState } from 'react';
import { X } from 'lucide-react';

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

interface DropdownFormComponentProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    list: any[];
    errors: FormErrors;
    index: number;
    title: string;
}
export const DropdownFormComponent = (props: DropdownFormComponentProps) => {
    const { title, formData, setFormData, list, errors, index } = props;
    const [showOtherInput, setShowOtherInput] = useState<boolean>(false);
    console.log(list);

    const handleTemaChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
        const value = e.target.value;
        if (value === 'other') {
            setShowOtherInput(true); // Switch to input mode
            setFormData((prev) => {
                const updatedFormData = { ...prev };
                if (title === 'Sub Tema') {
                    const updatedSubTema = [...updatedFormData.subTema];
                    updatedSubTema[index] = ''; // Reset the subTema value at this index
                    updatedFormData.subTema = updatedSubTema;
                } else {
                    const updatedTema = [...updatedFormData.tema];
                    updatedTema[index] = ''; // Reset the tema value at this index
                    updatedFormData.tema = updatedTema;
                }
                return updatedFormData;
            });
        } else {
            setShowOtherInput(false); // Keep dropdown mode
            if (value && title === 'Tema') {
                setFormData((prev) => {
                    const updatedTema = [...prev.tema];
                    updatedTema[index] = value; // Update the tema at the specific index
                    return { ...prev, tema: updatedTema };
                });
            }

            if (value && title === 'Sub Tema') {
                setFormData((prev) => {
                    const updatedSubTema = [...prev.subTema];
                    updatedSubTema[index] = value; // Update the tema at the specific index
                    return { ...prev, subTema: updatedSubTema };
                });
            }
        }
    };

    const handleManualInputChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
        const value = e.target.value;

        setFormData((prev) => {
            const updatedFormData = { ...prev }; // Clone the previous state

            if (title === 'Sub Tema') {
                // If title is 'subTema', update the subTema array at the specific index
                const updatedSubTema = [...updatedFormData.subTema];
                updatedSubTema[index] = value; // Set the new value at the specific index
                updatedFormData.subTema = updatedSubTema;
            } else if (title === 'Tema') {
                // If title is 'tema', update the tema array at the specific index
                const updatedTema = [...updatedFormData.tema];
                updatedTema[index] = value; // Set the new value at the specific index
                updatedFormData.tema = updatedTema;
            }

            return updatedFormData; // Return the updated formData
        });
    };

    const resetToDropdown = () => {
        setShowOtherInput(false);
        setFormData((prev) => {
            const updatedFormData = { ...prev }; // Clone the previous state

            if (title === 'sub Tema') {
                const updatedSubTema = [...updatedFormData.subTema];
                updatedSubTema[index] = ''; // Reset the subTema value at the specific index
                updatedFormData.subTema = updatedSubTema;
            } else if (title === 'tema') {
                const updatedTema = [...updatedFormData.tema];
                updatedTema[index] = ''; // Reset the tema value at the specific index
                updatedFormData.tema = updatedTema;
            }

            return updatedFormData; // Return the updated formData
        });
    };

    return (
        <div>
            <label className='block text-sm font-medium text-gray-700'>
                {title}
            </label>

            {!showOtherInput ? (
                // Dropdown Mode
                <select
                    name={
                        title == 'Tema' ? `tema-${index}` : `subTema-${index}`
                    }
                    value={
                        title == 'Tema'
                            ? formData.tema[index]
                            : formData.subTema[index]
                    }
                    onChange={handleTemaChange}
                    className={`mt-2 w-full rounded-md border p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                        errors.tema ? 'border-red-500' : 'border-gray-300'
                    } focus:border-transparent`}
                >
                    <option value=''>Pilih {title}</option>
                    {list.map((item) => (
                        <option key={item.id} value={item.nama}>
                            {item.nama}
                        </option>
                    ))}
                    <option value='other'>Lainnya...</option>
                </select>
            ) : (
                // Input Mode (When "Other" is selected)
                <div className='relative mt-2'>
                    <input
                        type='text'
                        name='tema'
                        placeholder={`Masukkan ${title} Lain`}
                        value={
                            title == 'Tema'
                                ? formData.tema[index]
                                : formData.subTema[index]
                        }
                        onChange={handleManualInputChange}
                        className='mt-2 w-full rounded-md border p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 border-gray-300'
                    />
                    <button
                        type='button'
                        onClick={resetToDropdown}
                        className='mt-1 absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                    >
                        <X size={18} />
                    </button>
                </div>
            )}

            {errors.tema && (
                <p className='mt-1 text-sm text-red-500'>{errors.tema}</p>
            )}
        </div>
    );
};
