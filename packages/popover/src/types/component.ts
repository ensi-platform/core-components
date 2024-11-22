import type { TransitionOptions } from 'react-transition-state';

import type { IUsePopoverProps, IUseModifierProps, IPopoverArrowProps, IPopoverContentProps } from '.'

export interface IPopoverProps extends IUsePopoverProps, IUseModifierProps, IPopoverArrowProps, IPopoverContentProps {
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
     * Component z-index
     */
    zIndex?: number;
}
