import { ThemeProvider, defaultTheme } from '@ensi-platform/core-components-common';

import type { FC } from 'react';

import type { IInternalThemeProviderProps } from './types';

const InternalThemeProvider: FC<IInternalThemeProviderProps> = ({ children }) => (
    <ThemeProvider theme={defaultTheme.theme}>{children}</ThemeProvider>
);

export default InternalThemeProvider;
