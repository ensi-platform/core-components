import { CSSObject } from '@emotion/core';
import { compute } from 'compute-scroll-into-view';
import { ReactNode, useEffect, useRef } from 'react';

import { useTabsTheme } from '../../context';

/**
 * Дополнительная прокрутка при клике на не поместившийся таб
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getExtraScrollValue = (_: Element) => 40;

const isFullyVisible = (element: HTMLElement, container: HTMLElement) => {
    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return (
        elementRect.left >= containerRect.left &&
        elementRect.right <= containerRect.right &&
        elementRect.top >= containerRect.top &&
        elementRect.bottom <= containerRect.bottom
    );
};

const THRESHOLD = 40;

const scrollToVisible = (element: HTMLElement, container: HTMLElement) => {
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const visibleWidth = containerRect.width;

    let targetScrollLeft = container.scrollLeft;

    if (elementRect.left < containerRect.left) {
        // The left side of the element is not visible
        targetScrollLeft = Math.max(0, elementRect.left - containerRect.left + container.scrollLeft - THRESHOLD);
    } else if (elementRect.right > containerRect.right) {
        // The right side of the element is not visible
        targetScrollLeft = Math.min(
            container.scrollWidth - visibleWidth,
            elementRect.right - visibleWidth + container.scrollLeft + THRESHOLD
        );
    }

    container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
    });
};

export type ScrollableContainerProps = {
    /**
     * Дополнительный класс контейнера
     */
    containerCSS?: CSSObject;

    /**
     * Дочерние компоненты
     */
    children: ReactNode;

    /**
     * Активный элемент (всегда будет в видимой области)
     */
    activeChild: HTMLElement | null;
};

export const ScrollableContainer = ({ containerCSS, children, activeChild }: ScrollableContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeChild) {
            const actions = compute(activeChild, {
                scrollMode: 'if-needed',
                block: 'nearest',
                inline: 'nearest',
                boundary: containerRef.current,
            });

            if (actions.length > 1) {
                actions.forEach(({ el, left }, index) => {
                    if (index === 0) return;
                    // eslint-disable-next-line no-param-reassign
                    el.scrollLeft =
                        el.scrollLeft > left ? left - getExtraScrollValue(el) : left + getExtraScrollValue(el);
                });
                return;
            }

            if (!isFullyVisible(activeChild, containerRef.current || document.documentElement)) {
                scrollToVisible(activeChild, containerRef.current || document.documentElement);
            }
        }
    }, [activeChild]);

    const { getCSS } = useTabsTheme();

    return (
        <div
            css={{
                ...(getCSS('scrollableContainer') as any),
                ...containerCSS,
            }}
            ref={containerRef}
        >
            {children}
        </div>
    );
};

ScrollableContainer.displayName = 'ScrollableContainer';
