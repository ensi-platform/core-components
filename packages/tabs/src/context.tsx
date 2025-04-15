import { useThemeCSSPart } from '@ensi-platform/core-components-common';

import { type FC, type ReactNode, createContext, useContext, useMemo } from 'react';

import type { ITabsContextProps, ITabsThemeContext } from './types/context';

const TabsThemeContext = createContext<ITabsThemeContext | null>(null);
TabsThemeContext.displayName = 'TabsThemeContext';

export const TabsThemeProvider: FC<{ children: ReactNode } & ITabsContextProps> = ({
    idPrefix,
    children,
    size,
    theme,
    variant,
    state,
}) => {
    const getCSS = useThemeCSSPart(theme, {
        ...state,
        size,
        variant,
    });

    const value = useMemo<ITabsThemeContext>(
        () => ({
            getCSS,
            idPrefix,
            state,
            size,
            theme,
            variant,
        }),
        [getCSS, size, state, theme, variant, idPrefix]
    );

    return <TabsThemeContext.Provider value={value}>{children}</TabsThemeContext.Provider>;
};

export const useTabsTheme = () => {
    const context = useContext(TabsThemeContext);

    if (!context) {
        throw new Error(`Hook useTabsTheme must be used within TabsThemeProvider`);
    }

    return context;
};
