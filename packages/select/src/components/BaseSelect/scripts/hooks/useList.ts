import { RefObject, useCallback, useEffect } from 'react';

import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

import { useIsomorphicLayoutEffect } from '@greensight/core-components-common';

import { SelectProps } from '../../../../types';
import { useSelect } from './useSelect';

type useSelectReturnType = ReturnType<typeof useSelect>;

export const useList = ({
    listRef,
    wrapperRef,

    selectedItems,

    items,
    isOpen,
    optionsListWidth,
}: {
    listRef: RefObject<HTMLDivElement>;
    wrapperRef: RefObject<HTMLDivElement>;

    selectedItems: useSelectReturnType['selectedItems'];

    isOpen: SelectProps['isOpen'];
    items: SelectProps['options'];
    optionsListWidth: SelectProps['optionsListWidth'];
}) => {
    const calcOptionsListWidth = useCallback(() => {
        if (listRef.current) {
            const widthAttr = optionsListWidth === 'field' ? 'width' : 'minWidth';

            const optionsListMinWidth = wrapperRef.current ? wrapperRef.current.getBoundingClientRect().width : 0;

            listRef.current.setAttribute('style', '');
            listRef.current.style[widthAttr] = `${optionsListMinWidth}px`;
        }
    }, [listRef, optionsListWidth, wrapperRef]);

    useEffect(() => {
        const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
        const observer = new ResizeObserver(calcOptionsListWidth);
        if (wrapperRef.current) {
            observer.observe(wrapperRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [calcOptionsListWidth, isOpen, optionsListWidth, wrapperRef]);

    useIsomorphicLayoutEffect(calcOptionsListWidth, [isOpen, optionsListWidth, items, selectedItems]);
};
