import type { IBaseModalProps } from '@ensi-platform/core-components-base-modal';
import type { BaseThemeState } from '@ensi-platform/core-components-common';

import type { ReactNode } from 'react';

import type { PopupSizesEnum, PopupVariantsEnum } from '../scripts';
import type { PopupThemeType } from './theme';

export type ViewType = 'desktop' | 'mobile';
export type AlignType = 'left' | 'center' | 'right';

export interface IPopupState {
    /**
     * Stretches the content to its full height
     * @default false
     */
    flex?: boolean;

    /**
     * Has inner scroll
     * @default false
     */
    innerScroll?: boolean;

    /**
     * Sticky footer
     * @default false
     */
    stickyFooter?: boolean;

    /**
     * Sticky header
     * @default false
     */
    stickyHeader?: boolean;

    /**
     * Title alignment
     * @default 'left'
     */
    align?: AlignType;

    /**
     * The presence of the closure component (cross)
     * @default true
     */
    hasCloser?: ReactNode;

    /**
     * Trim the title
     * @default false
     */
    trim?: boolean;

    /**
     * Mobile or desktop view
     */
    view?: ViewType;

    /**
     * Fixes the position of the modal window after opening, preventing jumps if the content inside changes
     * @default false
     */
    fixedPosition?: boolean;

    /**
     * Enable header content
     * @default false
     */
    hasContent?: boolean;

    /**
     * Highlight BaseModal header / footer
     * @default false
     */
    highlighted?: boolean;

    /**
     * Full-screen display of content
     */
    isFullscreen?: boolean;
}

export interface IPopupProps
    extends BaseThemeState<typeof PopupVariantsEnum, typeof PopupSizesEnum, PopupThemeType>,
        IPopupState,
        IBaseModalProps {
    /**
     * Popup content
     */
    children?: ReactNode;

    /**
     * Additional styles
     */
    className?: string;
}

export interface IModalDesktopProps extends IPopupProps {
    /**
     * Modal window width
     * @default "md"
     */
    size?: PopupSizesEnum | keyof typeof PopupSizesEnum;
}

export interface IModalMobileProps extends Omit<IModalDesktopProps, 'size' | 'fixedPosition'> {}

export interface IModalResponsiveProps extends IModalDesktopProps {
    /**
     * The breakpoint, the desktop version starts from it
     * @default 1024
     */
    breakpoint?: number;
}
