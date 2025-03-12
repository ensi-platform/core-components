import { ThemeProvider, defaultTheme } from '@ensi-platform/core-components-common';

import type { FC } from 'react';
import { I18nextProvider } from 'react-i18next';

import { addInternalTranslations } from './scripts/helpers';
import i18n from './scripts/i18n';
import type { IInternalThemeProviderProps } from './types';

const InternalThemeProvider: FC<IInternalThemeProviderProps> = ({ children, i18nInstance }) => {
    if (i18nInstance) {
        addInternalTranslations(i18nInstance);
    }

    const instance = i18nInstance || i18n;

    return (
        <I18nextProvider i18n={instance} defaultNS="translation">
            <ThemeProvider theme={defaultTheme.theme}>{children}</ThemeProvider>
        </I18nextProvider>
    );
};

export default InternalThemeProvider;
