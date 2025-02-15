import { SubTema as PrismaSubTema } from '@prisma/client';

// export interface FormErrors {
//     foto?: string;
//     nama?: string;
//     tahun?: string;
//     tema?: string;
//     subTema?: string;
//     warna?: string;
//     teknik?: string;
//     jenisKain?: string;
//     pewarna?: string;
//     bentuk?: string;
//     histori?: string;
//     dimensi?: string;
// }

export interface FormData {
    foto: File[];
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

export interface TemaAPIResponse {
    id: number;
    nama: string;
    subTema: PrismaSubTema[];
}

export interface TextInputProps {
    label: string;
    name: keyof FormData;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: string;
    error?: string;
}

export interface TextAreaProps {
    label: string;
    name: keyof FormData;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    rows?: number;
    error?: string;
}

export interface ImageUploadProps {
    previews: string[];
    setPreviews: React.Dispatch<React.SetStateAction<string[]>>;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    previewLoading: boolean;
    error?: string;
}

// export interface DropdownFormComponentProps {
//     title: 'Tema' | 'Sub Tema';
//     formData: FormData;
//     setFormData: React.Dispatch<React.SetStateAction<FormData>>;
//     list: TemaAPIResponse[] | PrismaSubTema[];
//     errors: FormErrors;
//     index: number;
// }
export interface ListItem {
    id: string | number;
    nama: string;
}
export interface DropdownFormComponentProps {
    title: 'Tema' | 'Sub Tema';
    formData: {
        tema: string[];
        subTema: string[];
    };
    setFormData: React.Dispatch<React.SetStateAction<FormData>>; // Using FormData instead of any
    list: ListItem[];
    errors: {
        tema?: string;
        subTema?: string;
    };
    index: number;
}


export interface TemaSectionProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    temaList: TemaAPIResponse[];
    errors: FormErrors;
    addNewTema: () => void;
}

export interface IBatikFormData {
    foto: File[];
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

export type FormErrors = {
    [K in keyof IBatikFormData]?: string;
};


