import type { FC } from 'react';
import { I18nextProvider } from 'react-i18next';

import type { IInternalLanguageProviderProps } from './types';

const InternalLanguageProvider: FC<IInternalLanguageProviderProps> = ({ children, i18n, defaultNS }) => (
    <I18nextProvider i18n={i18n} defaultNS={defaultNS}>
        {children}
    </I18nextProvider>
);

export default InternalLanguageProvider;
