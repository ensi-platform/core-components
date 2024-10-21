
import { Ref } from 'react';

import { RefElementType } from './common';
import { IBasePopoverProps, IStyledProps } from '.'

export interface IPopoverContentProps extends IBasePopoverProps, IStyledProps {
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
     * The element relative to which the popover appears
     */
    referenceElement?: RefElementType;

    /**
     * If `true`, wrap content to be tab-focusable
     */
    tabFocusableWrapper?: boolean;

    /**
     * Shift for the arrow positioning
     */
    arrowShift?: number;

    /**
     * Function to set the arrow element
     */
    setArrowElement?: (element: HTMLElement) => void;

    /**
     * Function to set the popper element
     */
    setPopperElement?: (element: HTMLElement) => void;
}
