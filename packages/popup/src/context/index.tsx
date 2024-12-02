import { type FC, createContext, useMemo } from 'react';

import type { IContext, IContextProps } from '../types';

const PopupContext = createContext<IContext | null>(null);

PopupContext.displayName = 'PopupContext';

export const PopupContextProvider: FC<IContextProps> = ({ children, size, variant, state, getCSS }) => {
    const value = useMemo<IContext>(
        () => ({
            getCSS,
            state,
            size,
            variant,
        }),
        [size, state, variant, getCSS]
    );

    return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>;
};

export { PopupContext };
