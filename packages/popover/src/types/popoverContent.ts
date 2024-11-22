
import type { Ref, LegacyRef, ReactNode, CSSProperties } from 'react';
import type { CSSObject } from '@emotion/react';

import type { RefElementType } from './common';

export interface IPopoverContentProps {
    /**
     * Computed z-index for the popover
     */
    computedZIndex?: number;

    /**
     * Popover attributes
     */
    attributes?: any;

    /**
     * Reference to the popover element
     */
    ref?: Ref<HTMLDivElement>;

    /**
     * Use the width of the parent element
     */
    useAnchorWidth?: boolean;

    /**
     * The element relative to which the popover appears
     */
    referenceElement?: RefElementType;

    /**
     * If `true`, wrap content to be tab-focusable
     */
    tabFocusableWrapper?: boolean;

    /**
     * Identifier for automated testing systems
     */
    dataTestId?: string;

    /**
     * Additional class name
     */
    className?: string;

    /**
     * Additional popover style
     */
    popperStyles?: { [key: string]: CSSProperties },

    /**
     * Additional popover style
     */
    popperCSS?: CSSObject;

    /**
     * Allows the popover to adjust its height based on the screen boundaries
     */
    availableHeight?: boolean;

    /**
     * Function to set the popper element
     */
    setPopperElement?: LegacyRef<HTMLDivElement>;

    /**
     * Popover content
     */
    children?: ReactNode;

    /**
     * Arrow element
     */
    arrow: ReactNode | null;
}
