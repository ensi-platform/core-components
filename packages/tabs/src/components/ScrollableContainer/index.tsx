import type { CSSObject } from '@emotion/react';

import { compute } from 'compute-scroll-into-view';
import { type ReactNode, useEffect, useRef } from 'react';

import { useTabsTheme } from '../../context';

/**
 * Additional scrolling when clicking on a tab that does not fit
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getExtraScrollValue = (_: Element) => 40;

export type ScrollableContainerPropsType = {
    /**
     * Additional container class
     */
    containerCSS?: CSSObject;

    /**
     * Children components
     */
    children: ReactNode;

    /**
     * Active element (always will be visible)
     */
    activeChild: HTMLElement | null;
};

/**
 * Scrollable container for tabs headings
 * @param children list of tabs headings (```Tab``` component)
 * @param activeChild current active tab
 * @param containerCSS additional CSS for scrollable container
 */
export const ScrollableContainer = ({ containerCSS, children, activeChild }: ScrollableContainerPropsType) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeChild) {
            const actions = compute(activeChild, {
                scrollMode: 'if-needed',
                block: 'nearest',
                inline: 'nearest',
                boundary: containerRef.current,
            });

            actions.forEach(({ el, left }, index) => {
                if (index === 0) return;
                // eslint-disable-next-line no-param-reassign
                el.scrollLeft = el.scrollLeft > left ? left - getExtraScrollValue(el) : left + getExtraScrollValue(el);
            });
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
