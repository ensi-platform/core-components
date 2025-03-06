import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    lng: (typeof window !== 'undefined' && localStorage.getItem('i18nextLng')) || 'ru',
    fallbackLng: 'ru',
    debug: process.env.NODE_ENV === 'development',
    preload: ['ru', 'en'],

    defaultNS: 'common',

    react: {
        useSuspense: false,
    },

    detection: {
        order: ['htmlTag', 'cookie', 'localStorage', 'navigator'],
        caches: ['localStorage'],
    },
});

export default i18n;
