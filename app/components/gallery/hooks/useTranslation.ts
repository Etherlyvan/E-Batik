import translations from '@/locales/translations.json';
import { useLanguage } from '../../../../context/LanguageContext';
import { Translations } from '@/app/components/gallery/types/translation';

type LanguageCode = keyof Translations;
type TranslationValue = string | Record<string, unknown>;

export const useTranslation = () => {
    const { currentLanguage } = useLanguage();

    const t = (key: string): string => {
        const keys = key.split('.');
        const languageCode = currentLanguage.code as LanguageCode;
        let value: TranslationValue = translations[languageCode];

        for (const k of keys) {
            if (typeof value === 'object' && value !== null && k in value) {
                value = value[k] as TranslationValue;
            } else {
                return key; // Return the key if translation is not found
            }
        }

        return typeof value === 'string' ? value : key;
    };

    return { t };
};
