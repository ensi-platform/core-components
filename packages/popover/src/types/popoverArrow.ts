import { CSSObject } from '@emotion/react';

import { IStyledProps } from '.';

export interface IPopoverArrowProps extends IStyledProps {
    /**
     * Additional popover style
     */
    popperStyles?: CSSObject;

    /**
     * Shift for the arrow positioning
     */
    arrowShift?: number;

    /**
     * Function to set the arrow element
     */
    setArrowElement?: (element: HTMLElement) => void;
}
