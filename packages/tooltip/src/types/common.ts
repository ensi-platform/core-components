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
