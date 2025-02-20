'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

// Define types for the dropdown options
type OptionType =
    | string
    | { id: number; nama: string; subTema?: { id: number; nama: string }[] };

interface FilterValues {
    tema: string[];
    tahun: string;
    teknik: string;
    subTema: string[];
    pewarna: string;
    bentuk: string;
    jenisKain: string;
}

interface FilterOption {
    id: number;
    nama: string;
    subTema?: { id: number; nama: string }[];
}

interface GalleryFilterProps {
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
    activeFilters: FilterValues;
    setActiveFilters: (filters: FilterValues) => void;
    temaOptions: FilterOption[];
}

interface DropdownProps<T extends OptionType> {
    label: string;
    selected: string | string[];
    options: T[];
    onSelect: (selected: string | string[]) => void;
    multiple?: boolean;
    disabled?: boolean;
    renderOption?: (option: T) => string;
    placeholder?: string;
}

const Dropdown = <T extends OptionType>({
    label,
    selected,
    options,
    onSelect,
    multiple = false,
    disabled = false,
    renderOption = (option: T): string =>
        typeof option === 'string' ? option : option.nama,
    placeholder,
}: DropdownProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value: string) => {
        if (multiple) {
            const selectedValues = Array.isArray(selected) ? selected : [];
            const newSelected = selectedValues.includes(value)
                ? selectedValues.filter((v) => v !== value)
                : [...selectedValues, value];
            onSelect(newSelected);
        } else {
            onSelect(value);
            setIsOpen(false);
        }
    };

    const getDisplayValue = () => {
        if (multiple && Array.isArray(selected)) {
            if (selected.length === 0) return '';
            return options
                .filter((opt) =>
                    selected.includes(
                        typeof opt === 'string' ? opt : String(opt.id)
                    )
                )
                .map((opt) => renderOption(opt))
                .join(', ');
        }
        if (!selected) return '';
        const selectedOption = options.find((opt) =>
            typeof opt === 'string'
                ? opt === selected
                : String(opt.id) === selected
        );
        return selectedOption ? renderOption(selectedOption) : '';
    };

    return (
        <div className='relative' ref={dropdownRef}>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
                {label}
            </label>
            <div className='relative'>
                <div
                    className='relative cursor-pointer'
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                >
                    <div className='w-full p-2 border rounded-md bg-white flex justify-between items-center'>
                        <span
                            className={`${
                                !getDisplayValue() ? 'text-gray-400' : ''
                            }`}
                        >
                            {getDisplayValue() || placeholder}
                        </span>
                        <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                                isOpen ? 'transform rotate-180' : ''
                            }`}
                        />
                    </div>
                    {isOpen && !disabled && (
                        <div className='absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto'>
                            {options.map((option) => {
                                const value =
                                    typeof option === 'string'
                                        ? option
                                        : String(option.id);
                                const label = renderOption(option);
                                const isSelected = multiple
                                    ? Array.isArray(selected) &&
                                      selected.includes(value)
                                    : selected === value;

                                return (
                                    <div
                                        key={value}
                                        className={`p-2 hover:bg-gray-100 cursor-pointer ${
                                            isSelected
                                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                                : ''
                                        }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelect(value);
                                        }}
                                    >
                                        {label}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const GalleryFilter: React.FC<GalleryFilterProps> = ({
    showFilters,
    activeFilters,
    setActiveFilters,
    temaOptions,
}) => {
    const { t } = useTranslation();

    const availableSubTemas = temaOptions
        .filter((tema) => activeFilters.tema.includes(tema.id.toString()))
        .flatMap((tema) => tema.subTema || []);

    const clearFilters = () => {
        setActiveFilters({
            tema: [],
            subTema: [],
            tahun: '',
            teknik: '',
            pewarna: '',
            bentuk: '',
            jenisKain: '',
        });
    };

    const tahunOptions = Array.from({ length: 25 }, (_, i) =>
        (2000 + i).toString()
    );

    // Ambil opsi dari translasi
    const teknikOptions = [
        t('gallery.filters.teknikOptions.cap'),
        t('gallery.filters.teknikOptions.tulis'),
        t('gallery.filters.teknikOptions.kombinasi'),
        t('gallery.filters.teknikOptions.printing'),
    ];
    
    const pewarnaOptions = [
        t('gallery.filters.pewarnaOptions.sintetis'),
        t('gallery.filters.pewarnaOptions.alam'),
        t('gallery.filters.pewarnaOptions.kombinasi'),
    ];
    
    const bentukOptions = [
        t('gallery.filters.bentukOptions.geometris'),
        t('gallery.filters.bentukOptions.nonGeometris'),
        t('gallery.filters.bentukOptions.kombinasi'),
    ];
    
    const jenisKainOptions = [
        t('gallery.filters.jenisKainOptions.katun'),
        t('gallery.filters.jenisKainOptions.sutra'),
        t('gallery.filters.jenisKainOptions.rayon'),
        t('gallery.filters.jenisKainOptions.linen'),
    ];
    
    if (!showFilters) return null;

    return (
        <div className='bg-white rounded-lg shadow-sm p-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                <div className='w-full'>
                    <Dropdown<FilterOption>
                        label={t('gallery.filters.tema')}
                        selected={activeFilters.tema}
                        options={temaOptions}
                        onSelect={(selected) =>
                            setActiveFilters({
                                ...activeFilters,
                                tema: selected as string[],
                            })
                        }
                        multiple={true}
                        placeholder={`${t('gallery.filters.select')} ${t(
                            'gallery.filters.tema'
                        )}`}
                    />
                </div>

                <div className='w-full'>
                    <Dropdown<FilterOption>
                        label={t('gallery.filters.subTema')}
                        selected={activeFilters.subTema}
                        options={availableSubTemas}
                        onSelect={(selected) =>
                            setActiveFilters({
                                ...activeFilters,
                                subTema: selected as string[],
                            })
                        }
                        multiple={true}
                        disabled={activeFilters.tema.length === 0}
                        placeholder={`${t('gallery.filters.select')} ${t(
                            'gallery.filters.subTema'
                        )}`}
                    />
                </div>

                <div className='w-full'>
                    <Dropdown<string>
                        label={t('gallery.filters.tahun')}
                        selected={activeFilters.tahun}
                        options={tahunOptions}
                        onSelect={(selected) =>
                            setActiveFilters({
                                ...activeFilters,
                                tahun: selected as string,
                            })
                        }
                        placeholder={`${t('gallery.filters.select')} ${t(
                            'gallery.filters.tahun'
                        )}`}
                    />
                </div>

                <div className='w-full'>
                    <Dropdown<string>
                        label={t('gallery.filters.teknik')}
                        selected={activeFilters.teknik}
                        options={teknikOptions}
                        onSelect={(selected) =>
                            setActiveFilters({
                                ...activeFilters,
                                teknik: selected as string,
                            })
                        }
                        placeholder={`${t('gallery.filters.select')} ${t(
                            'gallery.filters.teknik'
                        )}`}
                    />
                </div>

                <div className='w-full'>
                    <Dropdown<string>
                        label={t('gallery.filters.pewarna')}
                        selected={activeFilters.pewarna}
                        options={pewarnaOptions}
                        onSelect={(selected) =>
                            setActiveFilters({
                                ...activeFilters,
                                pewarna: selected as string,
                            })
                        }
                        placeholder={`${t('gallery.filters.select')} ${t(
                            'gallery.filters.pewarna'
                        )}`}
                    />
                </div>

                <div className='w-full'>
                    <Dropdown<string>
                        label={t('gallery.filters.bentuk')}
                        selected={activeFilters.bentuk}
                        options={bentukOptions}
                        onSelect={(selected) =>
                            setActiveFilters({
                                ...activeFilters,
                                bentuk: selected as string,
                            })
                        }
                        placeholder={`${t('gallery.filters.select')} ${t(
                            'gallery.filters.bentuk'
                        )}`}
                    />
                </div>

                <div className='w-full'>
                    <Dropdown<string>
                        label={t('gallery.filters.jenisKain')}
                        selected={activeFilters.jenisKain}
                        options={jenisKainOptions}
                        onSelect={(selected) =>
                            setActiveFilters({
                                ...activeFilters,
                                jenisKain: selected as string,
                            })
                        }
                        placeholder={`${t('gallery.filters.select')} ${t(
                            'gallery.filters.jenisKain'
                        )}`}
                    />
                </div>

                {(activeFilters.tema.length > 0 ||
                    activeFilters.subTema.length > 0 ||
                    activeFilters.tahun !== '' ||
                    activeFilters.teknik !== '' ||
                    activeFilters.pewarna !== '' ||
                    activeFilters.bentuk !== '' ||
                    activeFilters.jenisKain !== '') && (
                    <button
                        onClick={clearFilters}
                        className='flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 '
                        aria-label={t('gallery.filters.reset')}
                    >
                        Clear Filter
                    </button>
                )}
            </div>
        </div>
    );
};

export default GalleryFilter;
