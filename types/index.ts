// types/index.ts
export interface Language {
    id: number;
    code: string;
    name: string;
    isDefault: boolean;
  }
  
  export interface Foto {
    id: number;
    link: string;
    batikId: number;
  }
  
  export interface Tema {
    id: number;
    nama: string;
  }
  
  export interface SubTema {
    id: number;
    nama: string;
    temaId: number;
  }
  
  export interface BatikTranslation {
    id: number;
    batikId: number;
    languageId: number;
    warna: string;
    teknik: string;
    jenisKain: string;
    histori: string;
    pewarna: string;
    bentuk: string;
    language: Language;
  }
  
  export interface Batik {
    id: number;
    kode?: string;
    alamat?: string;
    seniman?: string;
    pointmap?: string;
    nama: string;
    tahun: string;
    dimensi: string;
    translations: BatikTranslation[];
    foto: Foto[];
    tema: Tema[];
    subTema: SubTema[];
  }
  