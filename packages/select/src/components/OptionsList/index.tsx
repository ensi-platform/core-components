import { forwardRef, useEffect, useMemo, useRef } from 'react';

import mergeRefs from 'react-merge-refs';

import { useSelectTheme } from '../../context';
import { OptionsListProps } from './types';

export const OptionsList = forwardRef(
    ({ className, visibleOptionsCount = 4, isOpen, children }: OptionsListProps, ref) => {
        const listRef = useRef<HTMLDivElement>(null);
        const { getCSS } = useSelectTheme();

        useEffect(() => {
            if (!isOpen || !listRef.current) return;

            const list = listRef.current;
            const visibleChildren = Array.from(list.children).slice(0, visibleOptionsCount + 1);
            let height = visibleChildren
                .slice(0, visibleOptionsCount)
                .reduce((acc, child) => acc + child.clientHeight, 0);

            if (visibleChildren.length > visibleOptionsCount) {
                height += Math.ceil(visibleChildren[visibleChildren.length - 1].clientHeight / 2);
            }

            list.style.height = `${height}px`;
        }, [listRef, isOpen, visibleOptionsCount, children]);

        const totalListCSS = useMemo(
            () => ({
                ...getCSS('optionList'),
            }),
            [getCSS]
        );

        return (
            <ul css={totalListCSS} ref={mergeRefs([listRef, ref])} className={className}>
                {children}
            </ul>
        );
    }
);

export default OptionsList;
