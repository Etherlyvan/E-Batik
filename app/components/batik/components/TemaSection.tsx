import React from 'react';
import { DropdownFormComponent } from './DropdownFormComponent';
import { TemaSectionProps } from '../types';

export const TemaSection: React.FC<TemaSectionProps> = ({
    formData,
    setFormData,
    temaList,
    errors,
    addNewTema,
}) => {
    return (
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
                            index={index}
                        />
                    </div>

                    <div>
                        <DropdownFormComponent
                            title='Sub Tema'
                            formData={formData}
                            setFormData={setFormData}
                            list={
                                temaList.find((t) => t.nama === tema)?.subTema || []
                            }
                            errors={errors}
                            index={index}
                        />
                    </div>
                    <div className='mt-4 mb-4'>
                        -------------
                    </div>
                </div>
            ))}

            <button
                type='button'
                onClick={addNewTema}
                className='mt-2 p-2 bg-indigo-600 text-white rounded-md'
            >
                Add New Tema
            </button>
        </div>
    );
};