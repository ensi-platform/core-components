import type { CSSObject } from '@emotion/react';

import type { HTMLProps, MouseEvent, ReactNode } from 'react';
import type { TransitionStatus } from 'react-transition-state';

export interface IBackdropProps extends HTMLProps<HTMLDivElement> {
    /**
     * Makes the backdrop transparent
     * @default false
     */
    invisible?: boolean;

    /**
     * Is component open
     * @default false
     */
    isOpen: boolean;

    /**
     * Handler for the end of the animation and the destroying of the component
     */
    onDestroy?: () => void;

    /**
     * Backdrop click handler
     */
    onClose?: (event: MouseEvent<HTMLElement>) => void;

    /**
     * Identifier for automated testing systems
     */
    dataTestId?: string;

    /**
     * Animation time
     * @default 200
     */
    timeout?: number;

    /**
     * Styles for different states for react-transition-state
     */
    transitionStyles?: Partial<Record<TransitionStatus, CSSObject>>;

    /**
     * z-index property for div::after inside Backdrop
     */
    zIndex?: number;

    /**
     * Backdrop children
     */
    children?: ReactNode;

    /**
     * Additional backdrop styles
     */
    className?: string;
}
