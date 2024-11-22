import type { MutableRefObject, ReactNode } from 'react';

import type { BasePlacement, Obj, VariationPlacement, Modifier } from '@popperjs/core';

export type RefElementType = HTMLElement | null;

export type PositionType = BasePlacement | VariationPlacement;

export interface IPopperModifier {
    name: string;
    options: Obj;
};

export interface IUseModifierProps {
    /**
     * If `true`, an arrow will be drawn
     */
    withArrow?: boolean;

    /**
     * Prevent the popover from changing its position.
     */
    preventFlip?: boolean;

    /**
     * Prevent the popover from repositioning if it does not fit into the visible area.
     */
    preventOverflow?: boolean;

    /**
     * If the popover does not fit in the specified position,
     * it will try to open in another position.
     */
    fallbackPlacements?: PositionType[];

    /**
     * The arrow element
     */
    arrowElement?: HTMLElement;

    /**
     * Allows the popover to adjust its height based on the screen boundaries
     */
    availableHeight?: boolean;

    /**
     * Popover offset.
     */
    offset?: [number, number];
}

export interface IUsePopoverProps {
    /**
     * The arrow element
     */
    arrowElement?: HTMLElement;

    /**
     * The element relative to which the popover appears
     */
    anchorElement: RefElementType;

    /**
     * The popover element
     */
    popperElement?: HTMLElement;

    /**
     * Control the popover state (open/closed)
     */
    open: boolean;

    /**
     * Popover positioning
     */
    position?: PositionType;

    /**
     * Holds a function that allows updating the component's position
     */
    update?: MutableRefObject<() => void>;

    /**
     * Modifiers for the popover positioning
     */
    modifiers?: Array<Partial<Modifier<unknown, object>>>;

    /**
     * Function to toggle the popover state
     */
    toggle?: (toEnter?: boolean) => void

    /**
     * Popover content
     */
    children?: ReactNode;
}
