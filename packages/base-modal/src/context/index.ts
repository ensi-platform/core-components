import { createContext } from 'react';

import type { IBaseModalContext } from '../types';

export const BaseModalContext = createContext<IBaseModalContext>({
    hasFooter: false,
    hasHeader: false,
    hasScroll: false,
    headerHighlighted: false,
    footerHighlighted: false,
    headerOffset: 0,
    setHeaderOffset: () => null,
    contentRef: () => null,
    setHasHeader: () => null,
    setHasFooter: () => null,
    onClose: () => null,
});
