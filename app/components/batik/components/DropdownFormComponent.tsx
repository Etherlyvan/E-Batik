import React from 'react';
import type { DropdownFormComponentProps, ListItem, FormData } from '../types';

export const DropdownFormComponent: React.FC<DropdownFormComponentProps> = ({
    title,
    formData,
    setFormData,
    list,
    errors,
    index,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setFormData((prev: FormData) => {
            const newData = { ...prev };
            if (title === 'Tema') {
                newData.tema[index] = value;
                newData.subTema[index] = '';
            } else {
                newData.subTema[index] = value;
            }
            return newData;
        });
    };

    const getValue = () => {
        return title === 'Tema' ? formData.tema[index] : formData.subTema[index];
    };

    const isDisabled = title === 'Sub Tema' && !formData.tema[index];

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{title}</label>
            <select
                value={getValue()}
                onChange={handleChange}
                disabled={isDisabled}
                className={`mt-2 w-full rounded-md border p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                    errors[title === 'Tema' ? 'tema' : 'subTema']
                        ? 'border-red-500'
                        : 'border-gray-300'
                } focus:border-transparent ${isDisabled ? 'bg-gray-100' : ''}`}
            >
                <option value="">Pilih {title}</option>
                {list.map((item: ListItem) => (
                    <option key={item.id} value={item.nama}>
                        {item.nama}
                    </option>
                ))}
            </select>
            {errors[title === 'Tema' ? 'tema' : 'subTema'] && (
                <p className="text-sm text-red-500">
                    {errors[title === 'Tema' ? 'tema' : 'subTema']}
                </p>
            )}
        </div>
    );
};
