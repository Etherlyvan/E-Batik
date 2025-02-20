import React from 'react';
import { Tema } from '../types';
import { useLanguage } from '@/context/LanguageContext';

interface TemaSectionProps {
    temas: Tema[];
    selectedTemaIds: number[];
    selectedSubTemaIds: number[];
    onTemaChange: (temaIds: number[]) => void;
    onSubTemaChange: (subTemaIds: number[]) => void;
}

export const TemaSection: React.FC<TemaSectionProps> = ({
    temas,
    selectedTemaIds,
    selectedSubTemaIds,
    onTemaChange,
    onSubTemaChange,
}) => {
    const { currentLanguage } = useLanguage();
    const idx = currentLanguage.code === 'id' ? 1 : 0;

    const handleTemaChange = (temaId: number, checked: boolean) => {
        const newSelectedTemaIds = checked
            ? [...selectedTemaIds, temaId]
            : selectedTemaIds.filter((id) => id !== temaId);

        onTemaChange(newSelectedTemaIds);

        // Jika Tema tidak dipilih, hapus subtema yang terkait
        if (!checked) {
            const temaToRemove = temas.find((t) => t.id === temaId);
            if (temaToRemove) {
                const subTemaIdsToRemove = temaToRemove.subTema.map(
                    (st) => st.id
                );
                const newSubTemaIds = selectedSubTemaIds.filter(
                    (id) => !subTemaIdsToRemove.includes(id)
                );
                onSubTemaChange(newSubTemaIds);
            }
        }
    };

    const handleSubTemaChange = (subTemaId: number, checked: boolean) => {
        const newSelectedSubTemaIds = checked
            ? [...selectedSubTemaIds, subTemaId]
            : selectedSubTemaIds.filter((id) => id !== subTemaId);

        onSubTemaChange(newSelectedSubTemaIds);
    };

    return (
        <div className='space-y-6'>
            <h3 className='text-lg font-medium'>
                {currentLanguage.code == 'id' ? 'Tema' : 'Theme'}
            </h3>
            <div className='flex flex-col gap-6'>
                {temas.map((tema) => (
                    <div key={tema.id} className='flex flex-col'>
                        {/* Tema Checkbox */}
                        <div className='flex items-center space-x-2'>
                            <input
                                type='checkbox'
                                id={`tema-${tema.id}`}
                                checked={selectedTemaIds.includes(tema.id)}
                                onChange={(e) =>
                                    handleTemaChange(tema.id, e.target.checked)
                                }
                                className='w-4 h-4'
                            />
                            <label
                                htmlFor={`tema-${tema.id}`}
                                className='text-sm font-semibold'
                            >
                                {tema.translations[idx].nama}
                            </label>
                        </div>

                        {/* SubTema */}
                        {selectedTemaIds.includes(tema.id) && (
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 ml-6 mt-2'>
                                {tema.subTema.map((subTema) => (
                                    <div
                                        key={subTema.id}
                                        className='flex items-center space-x-2'
                                    >
                                        <input
                                            type='checkbox'
                                            id={`subtema-${subTema.id}`}
                                            checked={selectedSubTemaIds.includes(
                                                subTema.id
                                            )}
                                            onChange={(e) =>
                                                handleSubTemaChange(
                                                    subTema.id,
                                                    e.target.checked
                                                )
                                            }
                                            className='w-4 h-4'
                                        />
                                        <label
                                            htmlFor={`subtema-${subTema.id}`}
                                            className='text-sm'
                                        >
                                            {subTema.translations.find(
                                                (item) =>
                                                    item.languageId ===
                                                    currentLanguage.id
                                            )?.nama || 'Unknown'}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
