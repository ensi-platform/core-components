import { en, ru } from '@ensi-platform/core-components-common';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ru: { translation: ru },
        },
        fallbackLng: 'ru',
        lng: 'ru',
        debug: process.env.NODE_ENV === 'development',

        interpolation: {
            escapeValue: false,
        },

        defaultNS: 'translation',
        ns: ['translation'],
    });

export default i18n;
