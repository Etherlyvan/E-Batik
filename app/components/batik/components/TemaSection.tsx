import React from 'react';
import { Tema, SubTema } from '../types';

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
  onSubTemaChange
}) => {
  // Get all available subTemas from selected temas
  const availableSubTemas: SubTema[] = temas
    .filter(tema => selectedTemaIds.includes(tema.id))
    .flatMap(tema => tema.subTema);

  const handleTemaChange = (temaId: number, checked: boolean) => {
    const newSelectedTemaIds = checked
      ? [...selectedTemaIds, temaId]
      : selectedTemaIds.filter(id => id !== temaId);
    
    onTemaChange(newSelectedTemaIds);
    
    // If tema is unchecked, remove its subtemas from selection
    if (!checked) {
      const temaToRemove = temas.find(t => t.id === temaId);
      if (temaToRemove) {
        const subTemaIdsToRemove = temaToRemove.subTema.map(st => st.id);
        const newSubTemaIds = selectedSubTemaIds.filter(
          id => !subTemaIdsToRemove.includes(id)
        );
        onSubTemaChange(newSubTemaIds);
      }
    }
  };

  const handleSubTemaChange = (subTemaId: number, checked: boolean) => {
    const newSelectedSubTemaIds = checked
      ? [...selectedSubTemaIds, subTemaId]
      : selectedSubTemaIds.filter(id => id !== subTemaId);
    
    onSubTemaChange(newSelectedSubTemaIds);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Tema</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {temas.map(tema => (
            <div key={tema.id} className="flex items-start">
              <input
                type="checkbox"
                id={`tema-${tema.id}`}
                checked={selectedTemaIds.includes(tema.id)}
                onChange={(e) => handleTemaChange(tema.id, e.target.checked)}
                className="mt-1 mr-2"
              />
              <label htmlFor={`tema-${tema.id}`} className="text-sm">
                {tema.nama}
              </label>
            </div>
          ))}
        </div>
      </div>

      {availableSubTemas.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">Sub Tema</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {availableSubTemas.map(subTema => (
              <div key={subTema.id} className="flex items-start">
                <input
                  type="checkbox"
                  id={`subtema-${subTema.id}`}
                  checked={selectedSubTemaIds.includes(subTema.id)}
                  onChange={(e) => handleSubTemaChange(subTema.id, e.target.checked)}
                  className="mt-1 mr-2"
                />
                <label htmlFor={`subtema-${subTema.id}`} className="text-sm">
                  {subTema.nama}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
