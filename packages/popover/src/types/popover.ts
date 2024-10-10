import { ReactNode, MutableRefObject } from 'react';
import { TransitionOptions } from 'react-transition-state';

import { CSSObject } from '@emotion/react';

import { RefElementType, PositionType } from './common';

export interface IPopoverProps {
    tabFocusableWrapper?: boolean;

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
     * For example, if there is not enough space at the bottom,
     * it will still be shown below.
     */
    preventFlip?: boolean;

    /**
     * Prevent the popover from repositioning if it does not fit into the visible area.
     */
    preventOverflow?: boolean;

    /**
     * Allows the popover to adjust its height based on the screen boundaries
     * if the content is too large for the visible area.
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
     * Function that returns the container where the popover will be rendered
     */
    getPortalContainer?: () => HTMLElement;

    /**
     * TransitionOptions passed to the useTransition hook.
     */
    transitionOptions?: TransitionOptions;

    /**
     * Render the component wrapped in Transition
     */
    withTransition?: boolean;

    /**
     * Identifier for automated testing systems
     */
    dataTestId?: string;

    /**
     * Holds a function that allows updating the component's position
     */
    update?: MutableRefObject<() => void>;

    /**
     * Additional class name
     */
    className?: string;

    /**
     * Component z-index
     */
    zIndex?: number;

    /**
     * If the popover does not fit in the specified position,
     * it will try to open in another position.
     * The positions are tried in order from this list.
     * If not provided, the popover opens in the opposite direction of the given position.
     */
    fallbackPlacements?: PositionType[];

    /**
     * Popover content
     */
    children?: ReactNode;
};
