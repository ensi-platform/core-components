import { type i18n } from 'i18next';
import type { ReactNode } from 'react';

export interface IInternalLanguageProviderProps {
    /**
     * Provider's children
     */
    children: ReactNode;
    /**
     * i18n object
     */
    i18n: i18n;
    /**
     * Default namespace
     */
    defaultNS: string;
}
