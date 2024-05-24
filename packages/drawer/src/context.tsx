import { FC, ReactNode, createContext, useContext, useMemo } from 'react';

import { BaseThemeState, useThemeCSSPart } from '@greensight/core-components-common';

import { DrawerSize, DrawerState, DrawerTheme, DrawerThemeState, DrawerVariant } from './types';

const useFoo = () => useThemeCSSPart<Omit<DrawerThemeState, 'theme'>, DrawerTheme>(...([] as never as [any, any]));

type Context = Required<BaseThemeState<typeof DrawerVariant, typeof DrawerSize, DrawerTheme>> & {
    state: DrawerState;
    getCSS: ReturnType<typeof useFoo>;
};

type ContextProps = Required<BaseThemeState<typeof DrawerVariant, typeof DrawerSize, DrawerTheme>> & {
    state: DrawerState;
};

const DrawerThemeContext = createContext<Context | null>(null);
DrawerThemeContext.displayName = 'DrawerThemeContext';

export const DrawerThemeProvider: FC<{ children: ReactNode } & ContextProps> = ({
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

    const value = useMemo<Context>(
        () => ({
            getCSS,
            state,
            size,
            theme,
            variant,
        }),
        [getCSS, size, state, theme, variant]
    );

    return <DrawerThemeContext.Provider value={value}>{children}</DrawerThemeContext.Provider>;
};

export const useDrawerTheme = () => {
    const context = useContext(DrawerThemeContext);

    if (!context) {
        throw new Error(`Hook useDrawerTheme must be used within DrawerThemeProvider`);
    }

    return context;
};
