import type { LegacyRef, CSSProperties } from 'react';
import type { CSSObject } from '@emotion/react';

export interface IPopoverArrowProps {
    /**
     * Shift for the arrow positioning
     */
    arrowShift?: boolean;

    /**
     * Additional arrow style
     */
    arrowCSS?: CSSObject;

    /**
     * Additional popover style
     */
    popperStyles?: { [key: string]: CSSProperties },

    /**
     * Function to set the arrow element
     */
    setArrowElement?: LegacyRef<HTMLDivElement>;
}
