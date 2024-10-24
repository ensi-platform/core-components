import { Children, cloneElement, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IconBigClosed, scale } from '@greensight/core-components-common';
import { CSSObject } from '@emotion/react';
import TagItem from './components/TagItem';
import { ITagsCompositionProps, ITagsProps } from './types';

/**
 * Wrapper for nameplates list
 */
export const Tags = ({
    className,
    disabled,
    wrap,
    CloseIcon = IconBigClosed,
    children,
    onDelete,
}: ITagsProps & Partial<ITagsCompositionProps>) => {
    const itemsRef = useRef<{ [key: number]: HTMLButtonElement }>({});
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [activeIndex, setActiveIndex] = useState(-1);

    const itemsCount = Children.count(children);

    const isValidIndex = useCallback((idx: number) => idx >= 0 && idx <= itemsCount - 1, [itemsCount]);

    /** Wrapper key down event handler */
    const onKeyPress = useCallback(
        (event: KeyboardEvent) => {
            setActiveIndex(oldValue => {
                if (!itemsCount) return -1;

                let value = oldValue;

                if (event.key === 'ArrowRight') {
                    value += 1;
                } else if (event.key === 'ArrowLeft') {
                    value -= 1;
                } else if (
                    event.key === 'ArrowDown' ||
                    event.key === 'ArrowUp' ||
                    event.code === 'Enter' ||
                    event.code === 'Space'
                ) {
                    event.stopPropagation();
                }

                if (value < 0) {
                    value = 0;
                }

                if (value > itemsCount - 1) {
                    value = itemsCount - 1;
                }

                itemsRef.current[value]?.focus();

                return value;
            });
        },
        [itemsCount]
    );

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        wrapper.addEventListener('keydown', onKeyPress);
        return () => {
            wrapper.removeEventListener('keydown', onKeyPress);
        };
    }, [onKeyPress]);

    const wrapperCSS: CSSObject = useMemo(
        () => ({
            display: 'flex',
            flexWrap: wrap ? 'wrap' : 'nowrap',
            flexDirection: 'row',
            gap: `${scale(1)}px ${scale(1, true)}px`,
        }),
        [wrap]
    );

    /** Getting props for n-th child */
    const getPropsForIth = useCallback(
        (index: number) => ({
            CloseIcon,
            tabIndex: -1,
            disabled,
            onDelete: () => {
                onDelete(index);

                const left = activeIndex - 1;
                const right = activeIndex + 1;

                if (isValidIndex(left)) {
                    itemsRef.current[left]?.focus();
                    setActiveIndex(left);
                } else if (isValidIndex(right)) {
                    itemsRef.current[right]?.focus();
                    setActiveIndex(right);
                } else {
                    setActiveIndex(-1);
                }
            },
            ref: (element: HTMLButtonElement) => {
                itemsRef.current[index] = element;
            },
            onBlur: () => {
                setTimeout(() => {
                    const flatItems = Object.values(itemsRef.current);

                    if (
                        document.activeElement instanceof HTMLButtonElement &&
                        !flatItems.includes(document.activeElement as any)
                    ) {
                        setActiveIndex(-1);
                    }
                }, 0);
            },
        }),
        [CloseIcon, activeIndex, disabled, isValidIndex, onDelete]
    );

    return itemsCount > 0 ? (
        <div
            className={className}
            css={wrapperCSS}
            tabIndex={disabled || !itemsCount || activeIndex === 0 ? -1 : 0}
            ref={wrapperRef}
        >
            {Children.map(children, (child, index) => {
                if (!isValidElement(child)) {
                    console.error('Tags require TagItem elements to be its children');
                    return;
                }

                return cloneElement<any>(child, {
                    ...getPropsForIth(index),
                    ...child.props,
                });
            })}
        </div>
    ) : null;
};

Tags.Tag = TagItem;
