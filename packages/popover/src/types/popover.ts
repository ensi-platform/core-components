import { ReactNode, MutableRefObject } from 'react';
import { TransitionOptions } from 'react-transition-state';

import { CSSObject } from '@emotion/react';

import { RefElementType, PositionType } from './common';

import { IStyledProps, IPositionModifiers } from '.'

export interface IBasePopoverProps {
    /**
     * Control the popover state (open/closed)
     */
    open: boolean;

    /**
     * The element relative to which the popover appears
     */
    anchorElement: RefElementType;

    /**
     * Use the width of the parent element
     */
    useAnchorWidth?: boolean;

    /**
     * Popover positioning
     */
    position?: PositionType;

    /**
     * Prevent the popover from changing its position.
     */
    preventFlip?: boolean;

    /**
     * Prevent the popover from repositioning if it does not fit into the visible area.
     */
    preventOverflow?: boolean;

    /**
     * Allows the popover to adjust its height based on the screen boundaries
     */
    availableHeight?: boolean;

    /**
     * If `true`, an arrow will be drawn
     */
    withArrow?: boolean;

    /**
     * Popover offset.
     * If positioning is top or bottom, then [x, y].
     * If positioning is left or right, then [y, x].
     */
    offset?: [number, number];

    /**
     * Additional popover style
     */
    popperCSS?: CSSObject;

    /**
     * Additional arrow style
     */
    arrowCSS?: CSSObject;

    /**
     * Popover content
     */
    children?: ReactNode;
}

export interface IPopoverProps extends IBasePopoverProps, IStyledProps, IPositionModifiers {
    /**
     * Function that returns the container where the popover will be rendered
     */
    getPortalContainer?: () => HTMLElement;

    /**
     * Transition options for the popover
     */
    transitionOptions?: TransitionOptions;

    /**
     * Render the component wrapped in Transition
     */
    withTransition?: boolean;

    /**
     * Holds a function that allows updating the component's position
     */
    update?: MutableRefObject<() => void>;
}
