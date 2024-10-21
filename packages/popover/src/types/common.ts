import { MutableRefObject } from 'react';
import { CSSObject } from '@emotion/react';

import { BasePlacement, Obj, VariationPlacement } from '@popperjs/core';

import { IBasePopoverProps } from '.';

export type RefElementType = HTMLElement | null;

export type PositionType = BasePlacement | VariationPlacement;

export interface IPopperModifier {
    name: string;
    options: Obj;
};

export interface IPositionModifiers {
    /**
     * If the popover does not fit in the specified position,
     * it will try to open in another position.
     */
    fallbackPlacements?: PositionType[];

    /**
     * Allows the popover to adjust its height based on the screen boundaries
     */
    availableHeight?: boolean;

    /**
     * Popover offset.
     */
    offset?: [number, number];
}

export interface IStyledProps {
    /**
     * Additional popover style
     */
    popperCSS?: CSSObject;

    /**
     * Additional arrow style
     */
    arrowCSS?: CSSObject;

    /**
     * Additional class name
     */
    className?: string;

    /**
     * Identifier for automated testing systems
     */
    dataTestId?: string;

    /**
     * Component z-index
     */
    zIndex?: number;
}

export interface IUseModifierProps extends IPositionModifiers {
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
     * The arrow element
     */
    arrowElement?: HTMLElement;
}

export interface IUsePopoverProps extends IBasePopoverProps, IPositionModifiers {
    /**
     * The arrow element
     */
    arrowElement?: HTMLElement;

    /**
     * The popover element
     */
    popperElement?: HTMLElement;

    /**
     * Holds a function that allows updating the component's position
     */
    update?: MutableRefObject<() => void>;

    /**
     * Modifiers for the popover positioning
     */
    modifiers?: IUseModifierProps;

    /**
     * Function to toggle the popover state
     */
    toggle?: () => void;
}
