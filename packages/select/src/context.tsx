import { BaseThemeState, useThemeCSSPart } from '@ensi-platform/core-components-common';

import { FC, ReactNode, createContext, useContext, useMemo } from 'react';

import { SelectSize, SelectState, SelectTheme, SelectThemeState, SelectVariant } from './types';

const useFoo = () => useThemeCSSPart<Omit<SelectThemeState, 'theme'>, SelectTheme>(...([] as never as [any, any]));

interface IContext extends Required<BaseThemeState<typeof SelectVariant, typeof SelectSize, SelectTheme>> {
    state: SelectState;
    getCSS: ReturnType<typeof useFoo>;
}

type ContextPropsType = Required<BaseThemeState<typeof SelectVariant, typeof SelectSize, SelectTheme>> & {
    state: SelectState;
};

const SelectThemeContext = createContext<IContext | null>(null);
SelectThemeContext.displayName = 'SelectThemeContext';

export const SelectThemeProvider: FC<{ children: ReactNode } & ContextPropsType> = ({
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

    return <SelectThemeContext.Provider value={value}>{children}</SelectThemeContext.Provider>;
};

export const useSelectTheme = () => {
    const context = useContext(SelectThemeContext);

    if (!context) {
        throw new Error(`Hook useSelectTheme must be used within SelectThemeProvider`);
    }

    return context;
};
