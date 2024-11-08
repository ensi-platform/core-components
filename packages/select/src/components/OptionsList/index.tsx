import { defaultTheme, scale } from '@ensi-platform/core-components-common';

import { forwardRef, useCallback, useEffect, useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import { useSelectTheme } from '../../context';
import { type SelectItem } from '../../types';
import { type OptionsListProps, type useVisibleOptionsArgs } from './types';

const createCounter = () => {
    let count = 0;
    // eslint-disable-next-line no-plusplus
    return () => count++;
};
const { colors } = defaultTheme;

export function useVisibleOptions({
    visibleOptions,
    listRef,
    styleTargetRef = listRef,
    isOpen,
    invalidate,
}: useVisibleOptionsArgs) {
    useEffect(() => {
        const list = listRef.current;
        const styleTarget = styleTargetRef.current;

        if (isOpen && list && styleTarget) {
            const optionsNodes = ([] as HTMLElement[]).slice.call(list.children, 0, visibleOptions + 1);

            let height = optionsNodes.slice(0, visibleOptions).reduce((acc, child) => acc + child.clientHeight, 0);

            if (visibleOptions < list.children.length) {
                // Добавляем половинку
                height += Math.ceil(optionsNodes[optionsNodes.length - 1].clientHeight / 2);
            }

            styleTarget.style.height = `${height}px`;
        }
    }, [listRef, isOpen, styleTargetRef, visibleOptions, invalidate]);
}

export const OptionsList = forwardRef(
    (
        {
            className,
            Option,
            getOptionProps,
            options = [],
            emptyPlaceholder,
            visibleOptions = 4,
            onScroll,
            isOpen,
            header,
            footer,
        }: OptionsListProps,
        ref
    ) => {
        const renderOption = useCallback(
            // @ts-ignore
            (option: SelectItem, index: number) => <Option key={option.label} {...getOptionProps(option, index)} />,
            [Option, getOptionProps]
        );

        const listRef = useRef<HTMLDivElement>(null);
        const counter = createCounter();

        useVisibleOptions({
            visibleOptions,
            listRef,
            isOpen,
            invalidate: options,
        });

        const { getCSS } = useSelectTheme();

        if (options.length === 0 && !emptyPlaceholder) {
            return null;
        }

        const renderListItems = () => (
            <>
                {options.map(option => renderOption(option, counter()))}

                {emptyPlaceholder && options.length === 0 && (
                    <div
                        css={{
                            color: colors.grey400,
                            padding: scale(1),
                        }}
                    >
                        {emptyPlaceholder}
                    </div>
                )}
            </>
        );

        const renderWithNativeScrollbar = () => (
            <ul
                className="option-list"
                css={{
                    overflow: 'auto',
                    width: '100%',
                    ...getCSS('optionListWrapper'),
                }}
                ref={mergeRefs([listRef, ref])}
                onScroll={onScroll as any}
            >
                {renderListItems()}
            </ul>
        );

        return (
            <div
                className={className}
                css={{
                    width: '100%',
                    outline: 'none',
                    ...getCSS('optionList'),
                }}
            >
                {header}
                {renderWithNativeScrollbar()}
                {footer}
            </div>
        );
    }
);
