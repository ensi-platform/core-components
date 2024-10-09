import type { MutableRefObject, ReactElement, ReactNode } from 'react';
import type { PopoverProps, Position } from '@greensight/core-components-popover';
import type { CSSObject } from '@emotion/react';

import type { ITooltipState, TriggerType } from './common';
import type { TooltipThemeType } from './themes';

/**
 * Props for the Tooltip component
 */
export interface ITooltipProps extends ITooltipState {
    /**
     * Tooltip content
     */
    content: ReactNode;

    /**
     * Tooltip position
     */
    position?: Position;

    /**
     * Delay before opening the tooltip
     */
    onOpenDelay?: number;

    /**
     * Delay before closing the tooltip
     */
    onCloseDelay?: number;

    /**
     * Handler for opening the tooltip
     */
    onOpen?: () => void;

    /**
     * Handler for closing the tooltip
     */
    onClose?: () => void;

    /**
     * Event that triggers the tooltip
     */
    trigger?: TriggerType;

    /**
     * If `true`, the tooltip will be open
     */
    open?: boolean;

    /**
     * Identifier for automated testing systems
     */
    dataTestId?: string;

    /**
     * Tooltip child elements. Tooltip will open when events are triggered on these elements.
     */
    children: ReactElement;

    /**
     * Tooltip offset
     */
    offset?: [number, number];

    /**
     * Function that returns the container in which the tooltip will be rendered
     */
    getPortalContainer?: () => HTMLElement;

    /**
     * Additional styles for the arrow
     */
    arrowCSS?: CSSObject;

    /**
     * Additional styles for the content
     */
    contentCSS?: CSSObject;

    /**
     * Additional class for the popover
     */
    className?: string;

    /**
     * Additional styles for the wrapper around the child elements
     */
    targetCSS?: CSSObject;

    /**
     * Stores the function to update the component's position
     */
    updatePopover?: PopoverProps['update'];

    /**
     * Component's z-index
     */
    zIndex?: number;

    /**
     * Ref for the wrapper around child elements
     */
    targetRef?: MutableRefObject<HTMLElement | null>;

    /**
     * If the tooltip doesn't fit in the specified position (position),
     * it will try to open in other positions, listed in this array.
     * If not passed, it will open in the opposite direction of the given position.
     */
    fallbackPlacements?: PopoverProps['fallbackPlacements'];

    /**
     * Prevents the tooltip from changing its position if it doesn't fit the visible area.
     */
    preventOverflow?: PopoverProps['preventOverflow'];

    /**
     * Allows the tooltip to adjust its height to fit the screen boundaries if the content is too large.
     */
    availableHeight?: PopoverProps['availableHeight'];

    /**
     * The element the tooltip will be positioned relative to.
     */
    anchor?: PopoverProps['anchorElement'];

    /**
     * Use the width of the parent element
     */
    useAnchorWidth?: boolean;

    /**
     * Theme
     */
    theme?: TooltipThemeType;
}
