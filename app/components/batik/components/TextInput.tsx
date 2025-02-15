import React from 'react';
import { TextInputProps } from '../types';

export const TextInput: React.FC<TextInputProps> = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = 'text',
    error,
}) => {
    return (
        <div>
            <label className='block text-sm font-medium text-gray-700'>
                {label}
            </label>
            <input
                type={type}
                name={name as string}
                value={value}
                onChange={onChange}
                className={`mt-2 w-full rounded-md border p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                    error ? 'border-red-500' : 'border-gray-300'
                } focus:border-transparent`}
                placeholder={placeholder}
            />
            {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
        </div>
    );
};