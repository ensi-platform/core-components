import { useThemeCSSPart } from '@ensi-platform/core-components-common';

import { type FC, createContext, useMemo } from 'react';

import type { IContext, IContextProps } from '../types';

const DrawerContext = createContext<IContext | null>(null);
DrawerContext.displayName = 'DrawerThemeContext';

export const DrawerThemeProvider: FC<IContextProps> = ({ children, size, theme, variant, state }) => {
    const getCSS = useThemeCSSPart(theme, {
        ...state,
        size,
        variant,
    });

    const value = useMemo<IContext>(
        () => ({
            getCSS,
            state,
            size,
            theme,
            variant,
        }),
        [getCSS, size, state, theme, variant]
    );

    return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
};

export { DrawerContext };
