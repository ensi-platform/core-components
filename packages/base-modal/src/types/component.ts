import type { IBackdropProps } from '@ensi-platform/core-components-backdrop';
import type { IPortalProps } from '@ensi-platform/core-components-portal';

import type { CSSObject } from '@emotion/react';

import type { FC, KeyboardEvent, MouseEvent, MutableRefObject, ReactNode } from 'react';
import type { TransitionStatus } from 'react-transition-state';

import type { ClosureReasonsEmum } from '../scripts';

export type ClosureReasonsType = `${ClosureReasonsEmum}`;

export interface IBaseModalProps {
    /**
     * BaseModal content
     */
    children?: ReactNode;

    /**
     * BaseModal backdrop
     */
    Backdrop?: FC<IBackdropProps>;

    /**
     * Props for BaseModal backdrop
     */
    backdropProps?: Partial<IBackdropProps> & Record<string, unknown>;

    /**
     * Function that returns the container to which the portals will be added
     */
    container?: IPortalProps['getPortalContainer'];

    /**
     * Disable automatic focus transfer to the modal when opening
     * @default false
     */
    disableAutoFocus?: boolean;

    /**
     * Disable focus lock
     * @default false
     */
    disableFocusLock?: boolean;

    /**
     * Disable focus restoration
     * @default false
     */
    disableRestoreFocus?: boolean;

    /**
     * Disable the `callback` call when pressing Escape
     * @default false
     */
    disableEscapeKeyDown?: boolean;

    /**
     * Disable the `callback` call when clicking on the backdrop
     * @default false
     */
    disableBackdropClick?: boolean;

    /**
     * Disable scroll lock when opening a modal window
     * @default false
     */
    disableBlockingScroll?: boolean;

    /**
     * Content of the modal are always in the DOM
     * @default false
     */
    keepMounted?: boolean;

    /**
     * Is modal open
     */
    open: boolean;

    /**
     * Additional styles
     */
    className?: string;

    /**
     * Additional content styles
     */
    contentCSS?: CSSObject;

    /**
     * Additional wrapper styles
     */
    wrapperCSS?: CSSObject;

    /**
     * Scroll handler
     */
    scrollHandler?: 'wrapper' | 'content' | MutableRefObject<HTMLDivElement | null>;

    /**
     * Backdrop click handler
     */
    onBackdropClick?: (event: MouseEvent) => void;

    /**
     * Escape click handler
     *
     * Called if `disableEscapeKeyDown` is false and the modal window is in focus
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;

    /**
     * Close handler
     */
    onClose?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>, reason?: ClosureReasonsType) => void;

    /**
     * Function that will be called after component mount
     */
    onMount?: () => void;

    /**
     * Function that will be called after component unmount
     */
    onUnmount?: () => void;

    /**
     * Identifier for automated testing systems
     */
    dataTestId?: string;

    /**
     * Modal z-index
     */
    zIndex?: number;

    /**
     * Ref that can be set to a component area
     */
    componentRef?: MutableRefObject<HTMLDivElement | null>;

    /**
     * Animation time
     * @default 200
     */
    timeout?: number;

    /**
     * Styles for react-transition-state
     */
    transitionStyles?: Partial<Record<TransitionStatus, CSSObject>>;

    /**
     * Modal id
     */
    id?: string;
}
