import type { IPopoverProps } from '@ensi-platform/core-components-popover';

import type { CSSObject } from '@emotion/react';

import type { MutableRefObject, ReactElement } from 'react';

import type { ITooltipState, IUseTooltipProps, TooltipThemeType } from '.';

/**
 * Props for the Tooltip component
 */
export interface ITooltipProps extends IPopoverProps, ITooltipState, IUseTooltipProps {
    /**
     * Tooltip content
     */
    content: IPopoverProps['children'];

    /**
     * Identifier for automated testing systems
     */
    dataTestId?: string;

    /**
     * Tooltip child elements. Tooltip will open when events are triggered on these elements.
     */
    children: ReactElement;

    /**
     * Additional styles for the content
     */
    contentCSS?: IPopoverProps['popperCSS'];

    /**
     * Additional styles for the wrapper around the child elements
     */
    targetCSS?: CSSObject;

    /**
     * Stores the function to update the component's position
     */
    updatePopover?: IPopoverProps['update'];

    /**
     * Ref for the wrapper around child elements
     */
    targetRef?: MutableRefObject<HTMLElement | null>;

    /**
     * Theme
     */
    theme?: TooltipThemeType;
}
