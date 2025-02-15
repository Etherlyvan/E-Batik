import React from 'react';
import { TextAreaProps } from '../types';

export const TextArea: React.FC<TextAreaProps> = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    rows = 4,
    error,
}) => {
    return (
        <div>
            <label className='block text-sm font-medium text-gray-700'>
                {label}
            </label>
            <textarea
                name={name as string}
                value={value}
                onChange={onChange}
                rows={rows}
                className={`mt-2 w-full rounded-md border p-2 text-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                    error ? 'border-red-500' : 'border-gray-300'
                } focus:border-transparent`}
                placeholder={placeholder}
            />
            {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
        </div>
    );
};