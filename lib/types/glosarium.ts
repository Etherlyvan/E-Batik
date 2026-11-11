export type KategoriGlosarium =
  | 'Semua'
  | 'Alat'
  | 'Bahan'
  | 'Teknik'
  | 'Motif'
  | 'Filosofi & Budaya'
  | 'Flora & Fauna'
  | 'Istilah Terkait';

export interface GlosariumItem {
  id: string;
  istilah: string;
  abjad: string;
  kategori: string;
  definisi: string;
  definisi_en?: string;
  definisi_jp?: string;
  contohPenggunaan?: string;
}

