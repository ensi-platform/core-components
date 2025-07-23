import { type i18n } from 'i18next';
import type { ReactNode } from 'react';

export interface ICoreComponentsProviderProps {
    /**
     * Provider's children
     */
    children: ReactNode;
    /**
     * i18n instance
     */
    i18nInstance?: i18n;
}
