import type { IPopoverProps } from '@ensi-platform/core-components-popover';

export interface ITooltipState {
    /**
     * Tag for the target wrapper
     * @default div
     */
    targetTag?: 'div' | 'span';
}

export interface IUseTooltipProps {
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
     * Determines if the tooltip should be visible by default, overriding user interactions.
     */

    forcedOpen?: boolean;

    /**
     * Event that triggers the tooltip
     */
    trigger?: 'click' | 'hover';
}

export interface IUseFollowCursor {
    /**
     * Custom cursor position
     */
    cursorPosition: {
        x: number;
        y: number;
    } | null;

    /**
     * Enable contextmenu follow cursor
     */
    contextmenuFollowCursor?: boolean;

    /**
     * Event that triggers the tooltip
     */
    trigger?: 'click' | 'hover';

    /**
     * Popover positioning
     */
    position: IPopoverProps['position'];

    /**
     * The element relative to which the popover appears
     */
    target: IPopoverProps['anchorElement'];
}

export interface IUseHideOnEsc extends Partial<Pick<IPopoverProps, 'open'>> {
    /**
     * Enable hiding on escape
     */
    enableHideOnEsc?: boolean;

    /**
     * Handler for closing the tooltip
     */
    handleClose: () => void;
}
