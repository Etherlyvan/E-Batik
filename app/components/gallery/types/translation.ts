// app\components\gallery\types\translation.ts

interface GalleryTranslations {
    title: string;
    subtitle: string;
    search: string;
    filters: {
      title: string;
      tema: string;
      tahun: string;
      teknik: string;
      reset: string;
    };
    results: string;
    empty: {
      title: string;
      message: string;
    };
  }
  
  // Japanese translations have a different structure
  interface JapaneseGalleryTranslations {
    comingSoon: string;
  }
  
  interface BaseTranslationStructure {
    gallery: GalleryTranslations;
  }
  
  interface JapaneseTranslationStructure {
    gallery: JapaneseGalleryTranslations;
  }
  
  export interface Translations {
    id: BaseTranslationStructure;
    en: BaseTranslationStructure;
    ja: JapaneseTranslationStructure;
  }