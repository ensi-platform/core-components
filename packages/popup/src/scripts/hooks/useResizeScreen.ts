import {
    type ExtractBreakpoint,
    defaultTokens,
    useIsomorphicLayoutEffect,
} from '@ensi-platform/core-components-common';

import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

import { useState } from 'react';

export const useResizeScreen = (breakpoint: ExtractBreakpoint<typeof defaultTokens> = 'sm') => {
    const [isAdaptive, setIsAdaptive] = useState(false);

    useIsomorphicLayoutEffect(() => {
        if (!window) return;
        const handleResize = () => {
            const { innerWidth } = window;

            setIsAdaptive(innerWidth < defaultTokens.layout.breakpoints[breakpoint]);
        };

        const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
        const observer = new ResizeObserver(handleResize);

        handleResize();
        observer.observe(document.body);

        return () => {
            observer.disconnect();
        };
    }, [breakpoint]);

    return isAdaptive;
};
