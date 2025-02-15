export interface Language {
    id: number;
    code: string;
    name: string;
    isDefault: boolean;
  }
  
  export interface Tema {
    id: number;
    nama: string;
    translations: TemaTranslation[];
    subTema: SubTema[];
  }
  
  export interface SubTema {
    id: number;
    nama: string;
    temaId: number;
    translations: SubTemaTranslation[];
  }
  
  export interface TemaTranslation {
    id: number;
    temaId: number;
    languageId: number;
    nama: string;
  }
  
  export interface SubTemaTranslation {
    id: number;
    subTemaId: number;
    languageId: number;
    nama: string;
  }
  
  export interface BatikTranslation {
    languageId: number;
    warna: string;
    teknik: string;
    jenisKain: string;
    histori: string;
    pewarna: string;
    bentuk: string;
  }
  
  export interface Foto {
    id?: number;
    link: string;
    file?: File;
  }
  
  export interface BatikFormData {
    nama: string;
    tahun: string;
    dimensi: string;
    kode: string;
    alamat: string;
    seniman: string;
    pointmap: string;
    translations: Record<number, {
      languageId: number;
      warna?: string;
      teknik?: string;
      jenisKain?: string;
      pewarna?: string;
      bentuk?: string;
      histori?: string;
    }>;
    foto: Array<{
      url: string;
      publicId?: string;
    }>;
    temaIds: number[];
    subTemaIds: number[];
  }
  
  export interface CloudinaryUploadResponse {
    secure_url: string;
    public_id: string;
  }
  